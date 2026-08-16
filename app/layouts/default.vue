<script setup lang="ts">
import content from '~~/content/pages/home.json';
import { usePlayer } from '~/stores/player';

const { churchInfo } = content;
const nav = [
  { label: 'Home', to: '/' },
  { label: 'Connect', to: '/connect' },
  { label: 'Sermons', to: '/sermons' },
  { label: 'About', to: '/about' },
  { label: 'Giving', to: '/giving' },
];
const menuOpen = ref(false);
const route = useRoute();
watch(() => route.fullPath, () => (menuOpen.value = false));

const shortTimes = churchInfo.serviceTime.replace('Sundays @ ', '').replace(' and ', ' · ');

// Only used to keep the footer clear of the fixed player bar.
const player = usePlayer();
</script>

<template>
  <div class="flex min-h-screen flex-col bg-sky-100">
    <!-- A thin rail, not a floating card. Opaque, sits on the horizon. -->
    <header class="sticky top-0 z-40 bg-sky-100 text-earth-900">
      <div class="mx-auto flex h-14 max-w-[110rem] items-center justify-between px-5 sm:px-8">
        <NuxtLink to="/" class="flex items-center gap-2.5 sm:gap-3">
          <LogoMark class="h-8 w-auto text-earth-900 sm:h-9" />
          <span class="wordmark text-base sm:text-lg">Redeemer&nbsp;Pampa</span>
        </NuxtLink>

        <nav class="hidden items-baseline gap-7 md:flex">
          <NuxtLink
            v-for="item in nav"
            :key="item.to"
            :to="item.to"
            class="eyebrow text-earth-500 transition-colors hover:text-earth-900"
            active-class="!text-earth-900"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>

        <p class="eyebrow hidden text-earth-400 lg:block">Sun {{ shortTimes }}</p>

        <button
          class="-mr-2 p-2 text-earth-900 md:hidden"
          :aria-expanded="menuOpen"
          aria-controls="mobile-nav"
          @click="menuOpen = !menuOpen"
        >
          <span class="sr-only">{{ menuOpen ? 'Close menu' : 'Open menu' }}</span>
          <svg class="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path v-if="!menuOpen" d="M0 3h20v1.6H0V3zm0 6h20v1.6H0V9zm0 6h20v1.6H0v-1.6z" />
            <path v-else d="M2.3 1.2 18.8 17.7l-1.1 1.1L1.2 2.3z M18.8 2.3 2.3 18.8l-1.1-1.1L17.7 1.2z" />
          </svg>
        </button>
      </div>
      <div class="horizon mx-5 text-earth-900/25 sm:mx-8"></div>

      <nav
        v-show="menuOpen"
        id="mobile-nav"
        class="bg-sky-100 px-5 pb-4 pt-2 md:hidden"
      >
        <NuxtLink
          v-for="item in nav"
          :key="item.to"
          :to="item.to"
          class="display block py-2 text-2xl text-earth-500"
          active-class="!text-earth-900"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>
    </header>

    <main class="flex-1">
      <slot />
    </main>

    <!-- Mounted in the layout, so it is never unmounted by navigation. -->
    <PlayerBar />

    <!-- The land: the footer is the dark ground the whole site sits on. -->
    <footer class="bg-earth-900 text-sky-200" :class="player.current ? 'pb-24' : ''">
      <div class="mx-auto max-w-[110rem] px-5 py-16 sm:px-8">
        <div class="flex flex-wrap items-end gap-8">
          <LogoMark class="h-32 w-auto text-sky-100 sm:h-40" />
          <p class="wordmark text-huge text-sky-100">Redeemer Pampa</p>
        </div>

        <div class="horizon mt-10 text-sky-100/20"></div>

        <div class="mt-8 grid gap-8 text-sm sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p class="eyebrow text-wheat-500">Gatherings</p>
            <p class="mt-2 leading-relaxed">{{ churchInfo.serviceTime }}</p>
          </div>
          <div>
            <p class="eyebrow text-wheat-500">Where</p>
            <p class="mt-2 leading-relaxed">
              {{ churchInfo.address.street }}<br />
              {{ churchInfo.address.mailStreet }}<br />
              {{ churchInfo.address.city }}, {{ churchInfo.address.state }}
              {{ churchInfo.address.zip }}
            </p>
          </div>
          <div>
            <p class="eyebrow text-wheat-500">Contact</p>
            <p class="mt-2 leading-relaxed">
              <a :href="`tel:${churchInfo.phone}`" class="hover:text-wheat-300">{{ churchInfo.phone }}</a><br />
              <a :href="`mailto:${churchInfo.email}`" class="break-words hover:text-wheat-300">
                {{ churchInfo.email }}
              </a>
            </p>
          </div>
          <div>
            <p class="eyebrow text-wheat-500">Elsewhere</p>
            <p class="mt-2 leading-relaxed">
              <a href="https://redeemernetwork.org" target="_blank" rel="noopener" class="hover:text-wheat-300">
                Redeemer Network
              </a>
              <template v-if="content.facebookUrl">
                <br />
                <a :href="content.facebookUrl" target="_blank" rel="noopener" class="hover:text-wheat-300">
                  Facebook
                </a>
              </template>
              <template v-if="content.instagramUrl">
                <br />
                <a :href="content.instagramUrl" target="_blank" rel="noopener" class="hover:text-wheat-300">
                  Instagram
                </a>
              </template>
              <br />
              <!-- Points at our own section rather than one player, so nobody
                   is sent to an app they don't use. -->
              <NuxtLink to="/connect#podcast" class="hover:text-wheat-300">
                Rugged &amp; Redeemed
              </NuxtLink>
            </p>
          </div>
        </div>

        <p class="eyebrow mt-14 text-earth-400">
          © {{ new Date().getFullYear() }} Redeemer Pampa · Pampa, Texas
        </p>
      </div>
    </footer>
  </div>
</template>
