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
