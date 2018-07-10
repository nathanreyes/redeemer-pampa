<template>
  <nav class='nav fixed w-full px-6 flex justify-between items-center flex-wrap bg-white z-20 border-grey-lighter border-b'>
    <div class='flex h-full items-center flex-no-shrink mr-6 z-10'>
      <nuxt-link
        to='/'
        class='link rounded block text-grey-darker text-2xl py-2 tracking-wide font-serif'>
        Redeemer
      </nuxt-link>
    </div>
    <div class='block z-10 lg:hidden'>
      <button
        class='flex items-center px-3 py-2 border rounded'
        @click='menuVisible = !menuVisible'>
        <svg
          class='fill-current h-3 w-3'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'>
          <title>Menu</title>
          <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z'/>
        </svg>
      </button>
    </div>
    <site-nav-menu
      class='hidden justify-center items-center w-auto lg:flex'>
    </site-nav-menu>
    <div class='relative flex-grow w-full block -mx-6 lg:hidden'>
      <transition
        name='fade'
        tag='div'>
        <site-nav-menu
          class='absolute pin-t pin-r w-full bg-grey-lighter pt-3'
          v-if='menuVisible'>
        </site-nav-menu>
      </transition>
    </div>
  </nav>
</template>

<script>
import SiteNavMenu from './SiteNavMenu';

export default {
  components: {
    SiteNavMenu,
  },
  data() {
    return {
      menuVisible: false,
    };
  },
  watch: {
    $route() {
      this.menuVisible = false;
    },
  },
};
</script>

<style scoped>
.nav {
  height: 70px;
  opacity: 0.97;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease-in-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
