<script setup lang="ts">
import content from '~~/content/pages/connect.json';
import home from '~~/content/pages/home.json';

const groups = content.gospelCommunities ?? [];
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
  </div>
</template>
