<template>
  <div>
    <nav
      class='fixed w-full py-3 px-6 flex justify-between items-center flex-wrap bg-white z-20'>
      <div class='flex items-center flex-no-shrink mr-6 z-10 bg-white'>
        <nuxt-link to='/' class='link rounded block text-blue text-xl py-2 px-4 tracking-wide'>
          Redeemer
        </nuxt-link>
      </div>
      <div class='block lg:hidden bg-white z-10'>
        <button
          class='flex items-center px-3 py-2 border rounded'
          @click='menuVisible = !menuVisible'>
          <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
          </svg>
        </button>
      </div>
      <nav-menu
        class='hidden lg:flex justify-center items-center w-auto'>
      </nav-menu>
      <div class='relative flex-grow w-full lg:hidden block -mx-6'>
        <transition
          name='fade'
          tag='div'>
          <nav-menu
            class='absolute pin-t pin-r w-full bg-grey-lighter mt-3 pt-3'
            v-if='menuVisible'>
          </nav-menu>
        </transition>
      </div>
    </nav>
    <nuxt/>
  </div>
</template>

<script>
import NavMenu from '~/components/NavMenu';

export default {
  components: {
    NavMenu,
  },
  data() {
    return {
      menuVisible: false,
    };
  },
};
</script>

<style>
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
