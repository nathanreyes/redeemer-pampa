<script setup lang="ts">
import content from '~~/content/pages/about.json';

const staff = content.staff ?? [];
const beliefs = content.beliefs ?? [];
const selected = ref(0);
useHead({ title: 'About — Redeemer Pampa' });
</script>

<template>
  <div class="mx-auto max-w-[110rem] px-5 pb-32 pt-12 sm:px-8 sm:pt-20">
    <p class="eyebrow text-earth-400">About</p>
    <h1 id="staff" class="mt-6 text-colossal text-earth-900">Elders &amp; Staff</h1>

    <p class="mt-8 max-w-2xl text-lede font-light text-earth-600">
      Redeemer Pampa is an elder-led church. You can read more about the
      plurality of leadership we have adopted
      <a
        href="/Plural-Leadership.pdf"
        target="_blank"
        rel="noopener"
        class="border-b-2 border-wheat-500 hover:text-wheat-600"
        >here</a
      >.
    </p>

    <div class="horizon mt-14 text-earth-900"></div>

    <ul>
      <li
        v-for="person in staff"
        :key="person.name"
        class="grid grid-cols-1 gap-x-10 gap-y-4 border-b border-earth-900/15 py-10 md:grid-cols-12"
      >
        <div class="md:col-span-3">
          <img
            v-if="person.imgUrl"
            :src="person.imgUrl"
            :alt="`Portrait of ${person.name}`"
            width="480"
            height="600"
            loading="lazy"
            decoding="async"
            class="aspect-4/5 w-full max-w-[13rem] object-cover grayscale transition-all duration-500 hover:grayscale-0"
          />
        </div>
        <div class="md:col-span-4">
          <h2 class="text-section normal-case text-earth-900">{{ person.name }}</h2>
          <p v-if="person.role" class="eyebrow mt-2 text-wheat-600">{{ person.role }}</p>
        </div>
        <p v-if="person.summary" class="measure text-earth-600 md:col-span-5">
          {{ person.summary }}
        </p>
      </li>
    </ul>

    <!-- ============ BELIEFS ============ -->
    <section class="pt-20">
      <h2 id="beliefs" class="text-huge text-earth-900">Beliefs</h2>
      <div class="horizon mt-8 text-earth-900"></div>

      <div class="grid gap-x-12 gap-y-8 pt-8 lg:grid-cols-12">
        <ul class="flex flex-wrap gap-x-6 gap-y-2 lg:col-span-4 lg:flex-col lg:gap-y-1">
          <li v-for="(belief, i) in beliefs" :key="belief.title">
            <button
              class="eyebrow border-b-2 pb-1 transition-colors"
              :class="
                i === selected
                  ? 'border-wheat-500 text-earth-900'
                  : 'border-transparent text-earth-400 hover:text-earth-700'
              "
              @click="selected = i"
            >
              {{ belief.title }}
            </button>
          </li>
        </ul>

        <div v-if="beliefs[selected]" class="lg:col-span-8">
          <h3 class="text-section normal-case text-earth-900">
            {{ beliefs[selected].title }}
          </h3>
          <p class="measure mt-5 text-earth-600">{{ beliefs[selected].description }}</p>
        </div>
      </div>
    </section>

    <!-- ============ CHURCH PLANTING ============ -->
    <section class="pt-24">
      <div class="horizon text-earth-900/25"></div>
      <div class="grid gap-x-12 gap-y-6 pt-10 lg:grid-cols-12">
        <h2 id="church_planting" class="text-section text-earth-900 lg:col-span-4">
          Church Planting
        </h2>
        <div class="lg:col-span-8">
          <p class="measure text-earth-600">
            Redeemer Pampa is an independent church, but we voluntarily align
            ourselves with the Redeemer Network for the sake of networking,
            support and mission.
          </p>
          <a
            href="https://redeemernetwork.org"
            target="_blank"
            rel="noopener"
            class="eyebrow mt-6 inline-block border-b-2 border-wheat-500 pb-1 hover:text-wheat-600"
          >
            Redeemer Network →
          </a>
        </div>
      </div>
    </section>
  </div>
</template>
