import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import buildSiteContent from './util/buildSiteContent.js';

const contentDir = fileURLToPath(new URL('./content', import.meta.url));

export default defineNuxtConfig({
  compatibilityDate: '2026-08-15',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxt/fonts'],
  css: ['~/assets/css/main.css'],
  vite: { plugins: [tailwindcss()] },

  fonts: {
    // Self-hosted at build time — no request to Google from the browser.
    families: [
      // Archivo Narrow rather than Archivo: @nuxt/fonts downloads static
      // instances, so there is no width axis to condense with font-stretch.
      { name: 'Archivo Narrow', provider: 'google', weights: [400, 500, 600, 700], subsets: ['latin'] },
      { name: 'Spectral', provider: 'google', weights: [300, 400, 600], styles: ['normal', 'italic'], subsets: ['latin'] },
    ],
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Redeemer Pampa',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Redeemer Pampa is a church in Pampa, Texas, aligned with the Redeemer Network.',
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
