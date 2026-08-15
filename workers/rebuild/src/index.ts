/**
 * Rebuilds the site when a new sermon is published.
 *
 * The site is static and its build fetches the podcast feed, so a sermon only
 * appears once a build runs. Pushing code triggers one; publishing an episode
 * does not, because the podcast host offers no webhook.
 *
 * This polls the feed hourly and fires the deploy hook only when the newest
 * episode has changed, so a sermon is live within the hour without spending a
 * build on the ~700 hours a year when nothing has happened.
 */

interface Env {
  /** Cloudflare deploy hook for the site. A secret — anyone holding it can trigger builds. */
  DEPLOY_HOOK_URL: string;
  /** Remembers the newest episode already built. */
  STATE: KVNamespace;
}

const FEED_URL = 'https://anchor.fm/s/530ebe8/podcast/rss';
const SEEN_KEY = 'newest-episode-guid';

/** The guid of the first <item>, which the feed lists newest first. */
function newestGuid(xml: string): string | null {
  const item = /<item>([\s\S]*?)<\/item>/.exec(xml)?.[1];
  if (!item) return null;
  const guid = /<guid[^>]*>([\s\S]*?)<\/guid>/.exec(item)?.[1];
  return guid ? guid.replace(/<!\[CDATA\[|\]\]>/g, '').trim() || null : null;
}

async function checkAndRebuild(env: Env): Promise<string> {
  if (!env.DEPLOY_HOOK_URL) return 'DEPLOY_HOOK_URL is not set — nothing to do';

  const feed = await fetch(FEED_URL, {
    headers: { 'user-agent': 'redeemer-pampa-rebuild/1.0' },
    cf: { cacheTtl: 0 },
  });
  if (!feed.ok) return `feed returned HTTP ${feed.status}`;

  const guid = newestGuid(await feed.text());
  if (!guid) return 'could not read a guid from the feed';

  const seen = await env.STATE.get(SEEN_KEY);
  if (seen === guid) return `no change (newest is still ${guid})`;

  const hook = await fetch(env.DEPLOY_HOOK_URL, { method: 'POST' });
  if (!hook.ok) {
    // Deliberately not recording the guid, so the next run retries.
    return `deploy hook returned HTTP ${hook.status} — will retry`;
  }

  await env.STATE.put(SEEN_KEY, guid);
  return seen
    ? `new episode ${guid} (was ${seen}) — build triggered`
    : `first run, recorded ${guid} — build triggered`;
}

export default {
  async scheduled(_controller, env: Env, ctx: ExecutionContext) {
    ctx.waitUntil(
      checkAndRebuild(env).then((outcome) => console.log(outcome)),
    );
  },
} satisfies ExportedHandler<Env>;
