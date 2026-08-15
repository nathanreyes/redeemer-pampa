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
