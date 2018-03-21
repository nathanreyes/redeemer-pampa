<template>
  <div>
    <nuxt-link
      v-for='menu in menus'
      :key='menu.header'
      :to='menu.url'
      :class='navClass'>
      {{ menu.header }}
    </nuxt-link>
  </div>
</template>

<script>
import menus from '~/util/menus.json';

export default {
  props: {
    isMobile: Boolean,
  },
  data() {
    return {
      menus,
      navClass:
        'link rounded block text-blue text-xl text-center mb-4 py-2 px-4 tracking-wide lg:mb-0',
    };
  },
};
</script>
