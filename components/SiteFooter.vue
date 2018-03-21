<template>
<div>
  <div class='bg-blue w-full shadow-inner'>
    <div class='container mx-auto text-white'>
      <div class='flex flex-col sm:flex-row sm:flex-wrap px-8 py-8 lg:flex-row lg:justify-center'>
        <div
          v-for='(menu, i) in menus'
          :key='menu.header'
          :class='getColClass(i)'
          :style='{ minWidth: "200px" }'>
          <span
            :class='headingClass'>
            {{ menu.header }}
          </span>
          <a
            v-for='submenu in menu.submenus'
            :key='submenu.title'
            :class='subheadingClass'
            :href='submenu.url'>
            {{ submenu.title }}
          </a>
        </div>
      </div>
    </div>
  </div>
  <div class='bg-blue-darker'>
    <div class='flex justify-center py-8'>
      <a class='link text-white' href='https://www.acts29.com' target='_blank'>Acts 29 Logo</a>
      <a class='link text-white ml-4' href='https://www.redeemernetwork.org' target='_blank'>Redeemer Logo</a>
      <a class='link text-white ml-4' href='https://www.facebook.com/RedeemerPampa/' taget='_blank'>Facebook Logo</a>
      <a class='link text-white ml-4' href='https://twitter.com/RedeemerPampa' target='_blank'>Twitter Logo</a>
    </div>
    <div
      class='flex-no-shrink flex flex-col items-center pb-8 text-sm text-blue-lighter font-light leading-normal'>
      <p>225 N. Cuyler St. (Downtown Pampa)</p>
      <p>P.O. Box 1294</p>
      <p>Pampa, TX 79066</p>
      <p>806.486.2561</p>
      <p>info.redeemerpampa@gmail.com</p>
    </div>
    <div
      class='flex-no-shrink flex justify-center text-grey pb-8 text-sm font-light'>
      Copyright © 2018 Redeemer Pampa
    </div>
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
