<script setup lang="ts">
const givingUrl = 'https://www.easytithe.com/dl/?uid=rede225179';
useHead({ title: 'Giving — Redeemer Pampa' });
</script>

<template>
  <div class="mx-auto max-w-[110rem] px-5 pb-32 pt-12 sm:px-8 sm:pt-20">
    <p class="eyebrow text-earth-400">Giving</p>
    <h1 id="motivation" class="mt-6 text-colossal text-earth-900">Motivation</h1>

    <div class="horizon mt-14 text-earth-900"></div>

    <section class="grid gap-x-12 gap-y-6 py-14 lg:grid-cols-12">
      <p class="eyebrow text-earth-400 lg:col-span-3">Why we give</p>
      <div class="lg:col-span-9">
        <p class="measure text-earth-600">
          We desire to be generous as a church family — in our time, resources,
          talents, energy, relationships, and in our finances. We want to be
          reminded that all of life is worship.
        </p>
        <p class="measure mt-5 text-earth-600">
          We don’t want you to give out of compulsion or guilt but instead to
          give generously, cheerfully as an act of worship and in light of God’s
          abundant generosity (II Corinthians 9:7). Giving stirs our affections
          for and trust in Jesus as our provider.
        </p>
      </div>
    </section>

    <div class="horizon text-earth-900/25"></div>

    <section class="grid gap-x-12 gap-y-6 py-14 lg:grid-cols-12">
      <h2 id="methods" class="text-section text-earth-900 lg:col-span-3">Methods</h2>
      <div class="lg:col-span-9">
        <ol class="measure space-y-6 text-earth-600">
          <li class="flex gap-5">
            <span class="display shrink-0 text-2xl text-earth-300">I</span>
            <span>
              There is a basket at the back of the worship area at Redeemer
              Pampa where you can leave your offering or tithe.
            </span>
          </li>
          <li class="flex gap-5">
            <span class="display shrink-0 text-2xl text-earth-300">II</span>
            <span>You can give online, using the link below.</span>
          </li>
        </ol>

        <a
          :href="givingUrl"
          target="_blank"
          rel="noopener"
          class="eyebrow mt-10 inline-block border-b-2 border-wheat-500 pb-1 text-base hover:text-wheat-600"
        >
          Give online →
        </a>
      </div>
    </section>
  </div>
</template>
