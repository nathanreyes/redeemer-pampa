<script setup lang="ts">
import content from '~~/content/pages/connect.json';
import home from '~~/content/pages/home.json';

const groups = content.gospelCommunities ?? [];
useHead({ title: 'Connect — Redeemer Pampa' });
</script>

<template>
  <div class="mx-auto max-w-4xl px-5 py-16">
    <h1 id="worship" class="text-title font-medium">Worship</h1>
    <p class="prose-measure mt-5 text-ink-600">
      Join us for morning services every Sunday at
      {{ home.churchInfo.serviceTime.replace('Sundays @ ', '') }}.
    </p>

    <h2 id="gospel-communities" class="mt-16 text-title font-medium">Gospel Communities</h2>
    <p class="prose-measure mt-5 text-ink-600">
      We don’t want our Sunday morning service to be the apex of our week.
      Gospel Communities meet weekly and are casual gatherings of people of
      different ages, life stages, and family dynamics. Groups are open — new
      folks are welcome each and every week.
    </p>
    <p class="mt-6 text-sm italic text-ink-400">
      Please text for addresses, as they may change over time.
    </p>

    <ul class="mt-8 grid gap-4 sm:grid-cols-2">
      <li
        v-for="gc in groups"
        :key="gc.hosts"
        class="rounded-lg border border-ink-100 bg-ink-50 p-5"
      >
        <p class="font-semibold text-ink-900">{{ gc.hosts }}</p>
        <p v-if="gc.time" class="mt-1 text-sm text-brand-700">{{ gc.time }}</p>
        <p v-if="gc.address" class="mt-2 text-sm text-ink-600">{{ gc.address }}</p>
        <p v-if="gc.subaddress" class="text-sm text-ink-400">{{ gc.subaddress }}</p>
        <p v-if="gc.moreInfo" class="mt-2 text-sm text-ink-600">{{ gc.moreInfo }}</p>
      </li>
    </ul>
  </div>
</template>
