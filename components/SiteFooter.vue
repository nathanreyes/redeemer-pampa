<template>
  <div>
    <div class="bg-blue w-full shadow-inner">
      <div class="container mx-auto text-white">
        <div class="flex flex-col sm:flex-row sm:flex-wrap px-8 py-8 lg:flex-row lg:justify-center">
          <div
            v-for="(menu, i) in menus.filter(m => m.submenus)"
            :key="menu.header"
            :class="getColClass(i)"
            :style="{ minWidth: '200px' }"
          >
            <span :class="headingClass">{{ menu.header }}</span>
            <a
              v-for="submenu in menu.submenus"
              :key="submenu.title"
              :class="subheadingClass"
              :href="submenu.url"
            >{{ submenu.title }}</a>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-blue-darker">
      <div class="flex justify-center items-center text-white py-8">
        <!--Acts 29 Logo-->
        <a class="text-blue-darker" href="https://www.acts29.com" target="_blank">
          <svg
            class="w-8 h-8 fill-current"
            viewBox="0 0 248 248"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="62" cy="62" r="62" transform="scale(2)" fill="white"></circle>
            <mask
              id="mask0"
              mask-type="alpha"
              maskUnits="userSpaceOnUse"
              x="52"
              y="47"
              width="163"
              height="189"
            >
              <path
                d="M0 73.2067L28.1761 0H42.2642L14.088 73.2067H0Z"
                transform="translate(54 48) scale(2)"
                fill="#303030"
              ></path>
              <path
                d="M38.7421 19.8268L44.7799 4.06704L58.8679 41.1788H74.4654L79.5 52.5H63L76.5 86.5L66.5 93L51 52.5H37.5L32.7044 41.1788H47.2956L38.7421 19.8268Z"
                transform="translate(54 48) scale(2)"
                fill="transparent"
              ></path>
              <path
                d="M0 73.2067L28.1761 0H42.2642L14.088 73.2067H0Z"
                transform="translate(54 48) scale(2)"
                stroke="transparent"
              ></path>
              <path
                d="M38.7421 19.8268L44.7799 4.06704L58.8679 41.1788H74.4654L79.5 52.5H63L76.5 86.5L66.5 93L51 52.5H37.5L32.7044 41.1788H47.2956L38.7421 19.8268Z"
                transform="translate(54 48) scale(2)"
                stroke="black"
              ></path>
            </mask>
            <g mask="url(#mask0)">
              <circle cx="62" cy="62" r="62" transform="scale(2)" class="fill-current"></circle>
            </g>
          </svg>
        </a>
        <!--Redeemer Logo-->
        <a
          href="https://www.redeemernetwork.org"
          class="w-8 h-8 bg-white hover:bg-grey-lighter rounded-full no-underline flex items-center justify-center ml-6"
          target="_blank"
        >
          <span class="font-serif font-bold text-2xl text-blue-darker">R</span>
        </a>
        <!--Facebook Logo-->
        <a
          href="https://www.facebook.com/RedeemerPampa/"
          class="w-8 h-8 text-white rounded-full ml-6"
          target="_blank"
        >
          <svg
            class="fill-current"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
            id="Capa_1"
            x="0px"
            y="0px"
            viewBox="0 0 167.657 167.657"
            xml:space="preserve"
          >
            <path
              d="M83.829,0.349C37.532,0.349,0,37.881,0,84.178c0,41.523,30.222,75.911,69.848,82.57v-65.081H49.626   v-23.42h20.222V60.978c0-20.037,12.238-30.956,30.115-30.956c8.562,0,15.92,0.638,18.056,0.919v20.944l-12.399,0.006   c-9.72,0-11.594,4.618-11.594,11.397v14.947h23.193l-3.025,23.42H94.026v65.653c41.476-5.048,73.631-40.312,73.631-83.154   C167.657,37.881,130.125,0.349,83.829,0.349z"
            ></path>
          </svg>
        </a>
        <!--Twitter Logo-->
        <a href="https://twitter.com/RedeemerPampa" class="w-8 h-8 ml-6" target="_blank">
          <svg
            id="Logo_FIXED"
            data-name="Logo — FIXED"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 400 400"
            class="bg-white text-blue-darker rounded-full"
          >
            <defs>
              <style>
                .cls-1 {
                  fill: none;
                }
                .cls-2 {
                  fill: #1da1f2;
                }
              </style>
            </defs>
            <title>Twitter_Logo_Blue</title>
            <rect class="cls-1" width="400" height="400"></rect>
            <path
              class="fill-current"
              d="M153.62,301.59c94.34,0,145.94-78.16,145.94-145.94,0-2.22,0-4.43-.15-6.63A104.36,104.36,0,0,0,325,122.47a102.38,102.38,0,0,1-29.46,8.07,51.47,51.47,0,0,0,22.55-28.37,102.79,102.79,0,0,1-32.57,12.45,51.34,51.34,0,0,0-87.41,46.78A145.62,145.62,0,0,1,92.4,107.81a51.33,51.33,0,0,0,15.88,68.47A50.91,50.91,0,0,1,85,169.86c0,.21,0,.43,0,.65a51.31,51.31,0,0,0,41.15,50.28,51.21,51.21,0,0,1-23.16.88,51.35,51.35,0,0,0,47.92,35.62,102.92,102.92,0,0,1-63.7,22A104.41,104.41,0,0,1,75,278.55a145.21,145.21,0,0,0,78.62,23"
            ></path>
          </svg>
        </a>
      </div>
      <div
        class="flex-no-shrink flex flex-col items-center pb-8 text-sm text-blue-lighter font-light leading-normal"
      >
        <p>225 N. Cuyler St. (Downtown Pampa)</p>
        <p>P.O. Box 1294</p>
        <p>Pampa, TX 79066</p>
        <p>806.486.2561</p>
        <p>info.redeemerpampa@gmail.com</p>
        <p class="mt-2 text-grey-light">Services start at 11:00am every Sunday morning</p>
      </div>
      <div
        class="flex-no-shrink flex justify-center text-grey pb-8 text-xs font-light"
      >Copyright © 2018 Redeemer Pampa</div>
    </div>
  </div>
</template>

<script>
import menus from '~/util/menus.json';

export default {
  data() {
    return {
      menus,
      headingClass:
        'text-xl text-center text-blue-lightest font-light mb-4 md:text-left',
      subheadingClass: 'link text-center mb-3 text-white md:text-left',
    };
  },
  methods: {
    getColClass(idx) {
      return `flex flex-col mt-4 mx-4`;
    },
  },
};
</script>
