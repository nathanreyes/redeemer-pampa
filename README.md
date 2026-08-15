# Redeemer Pampa

Website for Redeemer Pampa, a church in Pampa, TX, aligned with the Redeemer Network.

Nuxt 4 · Tailwind 4 · prerendered to static · hosted on Cloudflare Pages.

## Develop

```bash
nvm use          # 24.18.0, see .nvmrc
npm install
npm run dev
```

## Build

```bash
npm run generate     # static output in .output/public
npm run preview
```

`generate` refreshes the sermon archive from the podcast feed first. If the feed
is unreachable the build warns and uses the committed content in `content/`.

To refresh sermon content on its own:

```bash
npm run content
```

## Content

| What | Where | Owner |
| --- | --- | --- |
| Sermons | `content/sermons/` | Generated from the podcast RSS feed. Do not hand-edit — the next build overwrites it. Fix mistakes in Spotify for Creators. |
| Staff, Gospel Communities | `content/pages/` | Hand-edited. A CMS for these two is planned. |
| Church info, page copy | `content/pages/home.json`, page components | Hand-edited. |

Series and speaker names arrive as free text in the podcast description, so
`util/buildSiteContent.js` normalizes them through `SERIES_ALIASES` and
`LEADER_ALIASES`. Add new variants there.

## Deploy

Cloudflare Pages builds from Git.

| Setting | Value |
| --- | --- |
| Build command | `npm run generate` |
| Output directory | `.output/public` |
| Node version | from `.nvmrc` (24.18.0, preinstalled on the build image) |

## Rebuilding when a sermon is published

The site is static and its build reads the podcast feed, so a sermon only
appears once a build runs. Pushing code triggers one; publishing an episode
does not, because the podcast host offers no webhook.

`workers/rebuild` is a small Worker that closes that gap. It polls the feed
hourly and fires a deploy hook only when the newest episode has changed, so a
sermon is live within the hour without spending a build on the hours when
nothing has happened.

It is deployed separately from the site and changes rarely.

### One-time setup

1. **Create the deploy hook.** Cloudflare dashboard → Workers & Pages →
   `redeemer-pampa` → Settings → Builds → Deploy Hooks. Create one for the
   `master` branch and copy the URL. Treat it as a secret: anyone holding it
   can trigger builds.

2. **Create the KV namespace.** Pass the config explicitly, or wrangler writes
   the binding into the site's config at the repo root instead of the Worker's,
   under the wrong binding name:

   ```bash
   npx wrangler kv namespace create rebuild-state \
     --config workers/rebuild/wrangler.jsonc
   ```

   The binding must be named `STATE`. This is already done — the namespace id is
   committed in `workers/rebuild/wrangler.jsonc`.

3. **Store the hook URL as a secret** — never in the repo:

   ```bash
   npm run cron:secret     # paste the deploy hook URL when prompted
   ```

4. **Deploy:**

   ```bash
   npm run cron:deploy
   ```

5. **Turn off the old Zapier zap.** It fires a Netlify deploy on each new
   episode, and Netlify no longer builds this site.

### Verifying it ran

Trigger the scheduled handler without waiting for the hour:

```bash
npx wrangler dev --config workers/rebuild/wrangler.jsonc --test-scheduled
# then, in another shell:
curl "http://localhost:8787/__scheduled"
```

The first run has no stored state, so it treats the current newest episode as
new and fires one build. Every run after that logs `no change` until an
episode is published.

### Checking on it

```bash
npm run cron:tail
```

Each run logs one line: no change, a build triggered, or why it could not.
If the deploy hook fails the run does not record the episode, so the next
hour retries.
