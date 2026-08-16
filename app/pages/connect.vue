<script setup lang="ts">
import content from '~~/content/pages/connect.json';
import home from '~~/content/pages/home.json';

const groups = content.gospelCommunities ?? [];
const podcast = content.podcast;
useHead({ title: 'Connect — Redeemer Pampa' });
</script>

<template>
  <div class="mx-auto max-w-[110rem] px-5 pb-32 pt-12 sm:px-8 sm:pt-20">
    <p class="eyebrow text-earth-400">Connect</p>
    <h1 id="worship" class="mt-6 text-colossal text-earth-900">Worship</h1>
    <p class="mt-8 max-w-2xl text-lede font-light text-earth-600">
      Join us for morning services every Sunday at
      {{ home.churchInfo.serviceTime.replace('Sundays @ ', '') }},
      at {{ home.churchInfo.address.street }} in Pampa.
    </p>

    <div class="horizon mt-16 text-earth-900"></div>

    <section class="grid gap-x-12 gap-y-8 py-16 lg:grid-cols-12">
      <h2 id="gospel-communities" class="text-section text-earth-900 lg:col-span-5">
        Gospel Communities
      </h2>
      <div class="lg:col-span-7">
        <p class="measure text-earth-600">
          We don’t want our Sunday morning service to be the apex of our week.
          Gospel Communities meet weekly and are casual gatherings of people of
          different ages, life stages, and family dynamics. A typical gathering
          includes a meal, a deeper look at the previous Sunday’s text, prayer,
          conversation, and community.
        </p>
        <p class="measure mt-5 text-earth-600">
          Groups are open — new folks are welcome each and every week.
        </p>
      </div>
    </section>

    <div class="horizon text-earth-900/25"></div>

    <p class="eyebrow mt-8 text-earth-400">
      Please text for addresses, as they may change over time
    </p>

    <!-- Groups as a record, matching the sermon archive. -->
    <ul class="mt-8">
      <li
        v-for="gc in groups"
        :key="gc.hosts"
        class="grid grid-cols-1 gap-x-8 gap-y-2 border-t border-earth-900/15 py-6 md:grid-cols-12 md:items-baseline"
      >
        <p class="eyebrow text-wheat-600 md:col-span-3">{{ gc.time }}</p>
        <h3 class="text-section normal-case text-earth-900 md:col-span-4">{{ gc.hosts }}</h3>
        <div class="text-earth-600 md:col-span-5">
          <p v-if="gc.address">{{ gc.address }}</p>
          <p v-if="gc.subaddress" class="text-earth-400">{{ gc.subaddress }}</p>
          <p v-if="gc.moreInfo" class="mt-1 text-sm italic">{{ gc.moreInfo }}</p>
        </div>
      </li>
    </ul>

    <!-- Podcast. The cover is a black square, so it is set on the pale ground
         as its own patch of land rather than inside a dark band, where it
         would vanish. -->
    <section v-if="podcast" id="podcast" class="border-t border-earth-900/15 pt-16">
      <p class="eyebrow text-earth-400">Podcast</p>

      <div class="mt-8 grid gap-x-12 gap-y-8 lg:grid-cols-12">
        <img
          :src="podcast.artwork"
          :alt="`Cover art for ${podcast.title}: ${podcast.subtitle}`"
          width="1000"
          height="1000"
          loading="lazy"
          decoding="async"
          class="w-full max-w-sm lg:col-span-4"
        />

        <div class="lg:col-span-8">
          <h2 class="text-section text-earth-900">{{ podcast.title }}</h2>
          <p class="eyebrow mt-3 text-wheat-600">{{ podcast.subtitle }}</p>

          <p
            v-for="para in podcast.description"
            :key="para"
            class="measure mt-6 text-earth-600"
          >
            {{ para }}
          </p>

          <!-- Apple and Spotify cover most people; the feed covers the rest,
               so no other player needs its own link. -->
          <div class="mt-10 flex flex-wrap gap-x-8 gap-y-3">
            <a
              v-for="(link, i) in podcast.links"
              :key="link.url"
              :href="link.url"
              target="_blank"
              rel="noopener"
              class="eyebrow border-b-2 pb-1 hover:text-wheat-600"
              :class="i === 0 ? 'border-wheat-500' : 'border-earth-900/20 hover:border-wheat-500'"
            >
              {{ link.label }}
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
