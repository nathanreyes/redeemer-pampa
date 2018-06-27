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
        'link rounded block text-blue font-serif text-xl text-center uppercase mb-4 py-2 px-4 tracking-wide lg:mb-0',
    };
  },
};
</script>
