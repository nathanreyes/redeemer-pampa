<template>
  <div
    class='relative'>
    <nuxt-link
      v-for='menu in menus'
      :key='menu.header'
      :to='menu.url'
      :class='navClass'>
      {{ menu.header }}
    </nuxt-link>
    <a
      :class='navClass'
      @click='showPlayer = !showPlayer'>
      Listen
    </a>
    <div
      class='flex justify-center lg:absolute player'
      v-show='showPlayer'>
      <iframe src="https://anchor.fm/redeemer-pampa-podcast/embed" height="102px" width="400px" frameborder="0" scrolling="no"></iframe>
    </div>
  </div>
</template>

<script>
import menus from '~/util/menus.json';

export default {
  data() {
    return {
      menus,
      navClass:
        'link nav-link rounded block text-blue text-lg text-center uppercase py-4 px-4 tracking-wide lg:mb-0',
      showPlayer: false,
    };
  },
};
</script>

<style scoped>
.nav-link:first-letter {
  font-size: 1.4rem;
}
.player {
  top: 100%;
  right: 0;
  margin-top: 14px;
}
</style>
