<template>
  <div>
    <div class="bg-blue w-full shadow-inner">
      <div class="container mx-auto text-white">
        <div
          class="flex flex-col sm:flex-row sm:flex-wrap px-8 py-8 lg:flex-row lg:justify-center"
        >
          <div
            v-for="(menu, i) in menus.filter((m) => m.submenus)"
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
              >{{ submenu.title }}</a
            >
          </div>
        </div>
      </div>
    </div>
    <div class="bg-blue-darker">
      <div class="flex justify-center items-center text-white py-8">
        <!--Redeemer Logo-->
        <a
          href="https://redeemernetwork.org"
          class="w-8 h-8 bg-white hover:bg-grey-lighter rounded-full no-underline flex items-center justify-center"
          target="_blank"
        >
          <span class="font-serif font-bold text-2xl text-blue-darker">R</span>
        </a>
        <!--Facebook Logo-->
        <a
          v-if="facebookUrl"
          :href="facebookUrl"
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
      </div>
      <div
        class="flex-no-shrink flex flex-col items-center pb-8 text-sm text-blue-lighter font-light leading-normal"
      >
        <p>{{ street }}</p>
        <p>{{ mailStreet }}</p>
        <p>{{ city }}, {{ state }} {{ zip }}</p>
        <p>{{ phone }}</p>
        <p>{{ email }}</p>
        <p class="mt-2 text-grey-light">{{ serviceTime }}</p>
      </div>
      <div
        class="flex-no-shrink flex justify-center text-grey pb-8 text-xs font-light"
      >
        Copyright © 2018 Redeemer Pampa
      </div>
    </div>
  </div>
</template>

<script>
import menus from '~/util/menus.json';
import homeContent from '@/content/pages/home.json';

export default {
  data() {
    const { churchInfo, facebookUrl } = homeContent;
    const { email, phone, address, serviceTime } = churchInfo;
    const { street, mailStreet, city, state, zip } = address;

    return {
      menus,
      street,
      mailStreet,
      city,
      state,
      zip,
      phone,
      email,
      serviceTime,
      facebookUrl,
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
