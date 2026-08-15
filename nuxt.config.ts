import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import buildSiteContent from './util/buildSiteContent.js';

const contentDir = fileURLToPath(new URL('./content', import.meta.url));

export default defineNuxtConfig({
  compatibilityDate: '2026-08-15',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt'],
  css: ['~/assets/css/main.css'],
  vite: { plugins: [tailwindcss()] },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Redeemer Pampa',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Redeemer Pampa is an Acts 29 church in Pampa, Texas.',
        },
      ],
      link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    },
  },

  nitro: {
    // Pin the preset. Nitro sees Cloudflare's WORKERS_CI and otherwise
    // auto-selects `cloudflare-module`, which builds a server Worker and
    // redirects wrangler to its own generated config expecting
    // .output/server/index.mjs. This site is fully prerendered, so no such
    // entry point exists and the deploy fails. `static` keeps the output to
    // .output/public and leaves wrangler.jsonc in charge.
    preset: 'static',
    prerender: {
      crawlLinks: true,
      routes: ['/', '/sermons'],
    },
  },

  hooks: {
    // Refresh sermon content from the podcast feed before prerendering, and
    // await it so the sermon routes below read the index it just wrote.
    async 'build:before'() {
      await buildSiteContent();
    },
  },
});
