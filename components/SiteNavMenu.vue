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
  data() {
    return {
      menus,
      navClass:
        'link nav-link rounded block text-blue text-center uppercase py-4 px-4 tracking-wide lg:mb-0',
    };
  },
};
</script>

<style scoped>
.nav-link:first-letter {
  font-size: 1.3rem;
}
</style>
