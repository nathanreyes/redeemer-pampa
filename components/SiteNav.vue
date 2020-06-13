<template>
  <!--Nav Bar-->
  <nav class="nav fixed w-full bg-white z-20 border-grey-lighter border-b">
    <!--Nav Container-->
    <div
      class="container px-6 h-full flex justify-between items-center flex-no-wrap"
    >
      <!--Nav Left Section-->
      <div class="flex h-full items-center flex-no-shrink mr-6 z-10">
        <nuxt-link
          to="/"
          class="link rounded block text-grey-darker break-words text-lg sm:text-2xl py-2 tracking-wide font-serif"
        >
          Redeemer Pampa
        </nuxt-link>
      </div>
      <!--Nav Right Section-->
      <div class="flex lg:flex-row-reverse items-center">
        <!--Videos Link-->
        <!-- <nuxt-link to="/videos" class="link nav-link py-4 px-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="w-6 h-6 text-blue fill-current"
          >
            <path
              class="secondary"
              d="M13.59 12l6.7-6.7A1 1 0 0 1 22 6v12a1 1 0 0 1-1.7.7L13.58 12z"
            />
            <rect width="14" height="14" x="2" y="5" rx="2" />
          </svg>
        </nuxt-link> -->
        <!--Podcast Player Button-->
        <a
          class="link nav-link rounded block text-blue text-center uppercase py-4 px-4 tracking-wide mr-2 lg:m-0"
          @click.prevent="togglePlayerVisible"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            class="w-6 h-6 fill-current"
          >
            <path
              d="M16 8A6 6 0 1 0 4 8v11H2a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2V8a8 8 0 1 1 16 0v3a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2V8zm-4 2h3v10h-3V10zm-7 0h3v10H5V10z"
            />
          </svg>
        </a>

        <!--Mobile Menu Button-->
        <div class="block z-10 lg:hidden">
          <button
            class="flex items-center px-3 py-2 border rounded"
            @click="menuVisible = !menuVisible"
          >
            <svg
              class="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <!--Desktop Menu-->
        <site-nav-menu
          class="hidden lg:flex justify-center items-center w-auto"
        >
        </site-nav-menu>
      </div>
    </div>
    <!--Nav Toggle Area for Menu and Podcast Player-->
    <div class="relative flex-grow w-full block">
      <transition name="fade">
        <site-nav-menu
          class="absolute pin-t pin-r w-full pt-3 bg-grey-lighter shadow-outline lg:hidden"
          v-show="menuVisible"
        >
        </site-nav-menu>
      </transition>
      <transition name="fade">
        <iframe
          src="https://anchor.fm/redeemer-pampa-podcast/embed"
          class="absolute pin-t pin-r mt-3 mx-2"
          height="102px"
          frameborder="0"
          scrolling="no"
          v-show="playerVisible"
        >
        </iframe>
      </transition>
    </div>
  </nav>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
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
  computed: {
    ...mapState(['playerVisible']),
  },
  watch: {
    $route() {
      this.menuVisible = false;
    },
    menuVisible(val) {
      if (val && this.playerVisible) {
        this.togglePlayerVisible();
      }
    },
    playerVisible(val) {
      if (val && this.menuVisible) {
        this.menuVisible = false;
      }
    },
  },
  methods: {
    ...mapMutations(['togglePlayerVisible']),
  },
};
</script>

<style scoped>
.nav {
  height: 70px;
  opacity: 0.97;
}
</style>
