<script setup lang="ts">
import content from '~~/content/pages/home.json';

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
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <!-- Opaque, not translucent: the old nav set opacity on the whole element,
         which faded its own links and let page content ghost through. -->
    <header class="sticky top-0 z-40 border-b border-ink-100 bg-white">
      <div class="mx-auto flex h-20 max-w-6xl items-center justify-between px-5">
        <NuxtLink
          to="/"
          class="font-display text-xl tracking-tight text-ink-900 sm:text-2xl"
        >
          Redeemer Pampa
        </NuxtLink>

        <nav class="hidden items-center gap-1 md:flex">
          <NuxtLink
            v-for="item in nav"
            :key="item.to"
            :to="item.to"
            class="rounded px-3 py-2 text-sm font-medium text-ink-600 transition-colors hover:bg-ink-50 hover:text-brand-700"
            active-class="text-brand-700"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>

        <button
          class="rounded border border-ink-200 p-2 text-ink-600 md:hidden"
          :aria-expanded="menuOpen"
          aria-controls="mobile-nav"
          @click="menuOpen = !menuOpen"
        >
          <span class="sr-only">{{ menuOpen ? 'Close menu' : 'Open menu' }}</span>
          <svg class="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>

      <nav v-show="menuOpen" id="mobile-nav" class="border-t border-ink-100 bg-white md:hidden">
        <NuxtLink
          v-for="item in nav"
          :key="item.to"
          :to="item.to"
          class="block border-b border-ink-50 px-5 py-3 text-ink-600"
          active-class="text-brand-700"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>
    </header>

    <main class="flex-1">
      <slot />
    </main>

    <footer class="mt-24 bg-brand-900 text-brand-100">
      <div class="mx-auto max-w-6xl px-5 py-14">
        <div class="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div>
            <p class="font-display text-xl text-white">{{ churchInfo.name }}</p>
            <p class="mt-3 text-sm leading-relaxed">
              {{ churchInfo.address.street }}<br />
              {{ churchInfo.address.city }}, {{ churchInfo.address.state }}
              {{ churchInfo.address.zip }}
            </p>
            <p class="mt-3 text-sm">
              <a :href="`tel:${churchInfo.phone}`" class="hover:text-white">{{ churchInfo.phone }}</a><br />
              <a :href="`mailto:${churchInfo.email}`" class="hover:text-white">{{ churchInfo.email }}</a>
            </p>
          </div>
          <div>
            <p class="text-sm font-semibold uppercase tracking-wider text-brand-200">Gatherings</p>
            <p class="mt-3 text-sm">{{ churchInfo.serviceTime }}</p>
          </div>
        </div>
        <p class="mt-12 border-t border-brand-800 pt-6 text-xs text-brand-200">
          Copyright © {{ new Date().getFullYear() }} {{ churchInfo.name }}
        </p>
      </div>
    </footer>
  </div>
</template>
