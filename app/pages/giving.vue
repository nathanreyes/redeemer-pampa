<script setup lang="ts">
// Phase 4: replace this link with the Amplify embed once the snippet is
// available. Keeping a link-out regardless — payment iframes get blocked.
const givingUrl = 'https://www.easytithe.com/dl/?uid=rede225179';
useHead({ title: 'Giving — Redeemer Pampa' });
</script>

<template>
  <div class="mx-auto max-w-3xl px-5 py-16">
    <h1 id="motivation" class="text-title font-medium">Motivation</h1>
    <p class="prose-measure mt-5 text-ink-600">
      We desire to be generous as a church family — in our time, resources,
      talents, energy, relationships, and in our finances. We want to be
      reminded that all of life is worship. We don’t want you to give out of
      compulsion or guilt but instead to give generously, cheerfully as an act
      of worship and in light of God’s abundant generosity (II Corinthians 9:7).
      Giving stirs our affections for and trust in Jesus as our provider.
    </p>

    <h2 id="methods" class="mt-14 text-title font-medium">Methods</h2>
    <p class="prose-measure mt-5 text-ink-600">
      There are two ways to give:
    </p>
    <ul class="prose-measure mt-4 list-disc space-y-2 pl-5 text-ink-600">
      <li>
        There is a basket at the back of the worship area at Redeemer Pampa
        where you can leave your offering or tithe.
      </li>
      <li>You can give online, using the link below.</li>
    </ul>

    <a
      :href="givingUrl"
      target="_blank"
      rel="noopener"
      class="mt-8 inline-block rounded-md bg-brand-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-800"
    >
      Give online
    </a>
  </div>
</template>
