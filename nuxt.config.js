const fs = require('fs');
const path = require('path');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const glob = require('glob-all');
const buildSiteContent = require('./util/buildSiteContent');

class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-Za-z0-9-_:\/]+/g) || [];
  }
}

module.exports = {
  // server: {
  //   https: {
  //     key: fs.readFileSync(path.resolve(__dirname, '../certs/localhost.key')),
  //     cert: fs.readFileSync(path.resolve(__dirname, '../certs/localhost.crt')),
  //   },
  // },
  /*
   ** Headers of the page
   */
  head: {
    title: 'Redeemer Pampa',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Website for Redeemer Pampa, an Acts 29 church in Pampa, TX.',
      },
    ],
    script: [
      {
        src:
          'https://maps.googleapis.com/maps/api/js?key=AIzaSyAxHjdK3i5GDppHfiNiKLp9MLqd2FpTzrk',
        async: true,
        defer: true,
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800',
      },
    ],
  },
  /*
   ** Customize the progress bar color
   */
  loading: { color: '#3490dc' },
  /*
   ** Build configuration
   */
  build: {
    extractCSS: true,
    postcss: [require('tailwindcss')('./tailwind.js'), require('autoprefixer')],
    /*
     ** Run ESLint on save
     */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }
      if (!isDev) {
        config.plugins.push(
          new PurgecssPlugin({
            // purgecss configuration
            // https://github.com/FullHuman/purgecss
            paths: glob.sync([
              path.join(__dirname, './pages/**/*.vue'),
              path.join(__dirname, './layouts/**/*.vue'),
              path.join(__dirname, './components/**/*.vue'),
              path.join(__dirname, './util/**/*.js'),
            ]),
            extractors: [
              {
                extractor: TailwindExtractor,
                extensions: ['vue', 'js'],
              },
            ],
            whitelist: ['html', 'body', 'nuxt-progress'],
            whitelistPatterns: [
              /-enter-active$/,
              /-leave-active$/,
              /-enter$/,
              /-leave-to$/,
            ],
          }),
        );
      }
    },
  },
  plugins: ['~/plugins/vue-scrollto'],
  css: ['~/assets/styles/tailwind.css'],
  hooks: {
    generate: {
      before(nuxt) {
        buildSiteContent();
      },
    },
  },
  generate: {
    routes: function() {
      const sermons = require('./content/sermons/index.json');
      return sermons.map(sermon => `/sermons${sermon.path}`);
    },
  },
};
