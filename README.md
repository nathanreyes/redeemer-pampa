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
| Staff, Gospel Communities, church info | `content/pages/` | Edited at `/admin`, or by hand. |
| Page copy | page components | Hand-edited. |

Series and speaker names arrive as free text in the podcast description, so
`util/buildSiteContent.js` normalizes them through `SERIES_ALIASES` and
`LEADER_ALIASES`. Add new variants there.

## Editing content

`/admin` serves [Sveltia CMS](https://sveltiacms.app), a form editor over the
JSON in `content/pages/`. It runs entirely in the browser and commits to
`master` through the GitHub API, so a save triggers a Cloudflare build and is
live a couple of minutes later. Nothing runs on the server — the site stays
fully prerendered.

It covers elders and staff, beliefs, Gospel Communities, the podcast block, and
church info. Sermons are left out on purpose: the build regenerates them from
the podcast feed and would overwrite anything typed here.

Editors need a GitHub account with write access to the repo.

**One rule when changing `public/admin/config.yml`:** the CMS rewrites each
file from the fields the config lists, so a key left out of the config is
deleted from the JSON the next time anyone saves that file. Add a field to the
config whenever you add one to the content.

### One-time setup: sign in with GitHub

Until this is done, the login screen's **Sign In with Token** button works with
a GitHub personal access token that can write to the repo. The button below
replaces that with a normal "Sign in with GitHub".

The browser cannot hold the OAuth client secret, so the exchange needs a
Worker. [Sveltia publishes one](https://github.com/sveltia/sveltia-cms-auth);
it is deployed from its own repo, not this one.

1. **Deploy the Worker** — use the deploy button in that repo, or clone it and
   run `npx wrangler deploy`. Copy the resulting
   `https://sveltia-cms-auth.<subdomain>.workers.dev` URL.

2. **Register a GitHub OAuth app** at
   <https://github.com/settings/applications/new>. Set the authorization
   callback URL to `<worker-url>/callback`. Keep the client ID and secret.

3. **Give the Worker the credentials.** Cloudflare dashboard → the
   `sveltia-cms-auth` Worker → Settings → Variables:
   `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` (encrypted), and
   `ALLOWED_DOMAINS` set to the site's hostname so no other site can borrow it.

4. **Point the CMS at it.** Uncomment `base_url` in
   `public/admin/config.yml` and set it to the Worker URL.

### Uploads

Uploads go to one of two places, depending on the field.

**Staff portraits go to Cloudinary.** `app/utils/image.ts` applies the house
duotone through Cloudinary's transform URLs, so a portrait committed to the
repo would render untreated, in color, beside the others. The portrait field
opens Cloudinary's picker and stores the full URL.

This needs the account's API key filled into `public/admin/config.yml` — it is
committed as `YOUR_CLOUDINARY_API_KEY`. Find it under Cloudinary Console →
Settings → API Keys. The key is safe to commit: it names the account and grants
nothing by itself. The **API secret is not needed and must never go in the
config** — editors sign in to Cloudinary themselves the first time they open
the picker.

**Everything else commits into `public/images/`**, which `public/_headers`
caches for a year as immutable. Re-uploading under a name already in use keeps
serving the old file, so upload under a new name.

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
