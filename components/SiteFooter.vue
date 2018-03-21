<template>
  <div class='bg-blue w-full'>
    <div class='container mx-auto text-white'>
      <div class='flex flex-col items-center px-8 py-8 lg:flex-row lg:justify-center'>
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
      <div class='flex justify-center pb-8'>
        <a class='link text-blue-darker' href='https://www.facebook.com/RedeemerPampa/'>Facebook Logo</a>
        <a class='link text-blue-darker ml-4'>Acts 29 Logo</a>
        <a class='link text-blue-darker ml-4'>Redeemer Logo</a>
      </div>
    </div>
    <div class='flex-no-shrink flex justify-center text-blue-light py-8 border-t border-blue-light'>
      Copyright © 2018 Redeemer Pampa
    </div>
  </div>
</template>

<script>
import menus from '~/util/menus.json';

export default {
  data() {
    return {
      menus,
      colClass: 'flex flex-col mt-8',
      headingClass:
        'text-xl text-center text-blue-lightest font-light mb-4 md:text-left',
      subheadingClass: 'link text-center mb-3 text-white md:text-left',
    };
  },
  methods: {
    getColClass(idx) {
      return `flex flex-col mt-8 mx-4`;
    },
  },
};
</script>
