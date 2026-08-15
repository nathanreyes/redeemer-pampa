<script setup lang="ts">
import content from '~~/content/pages/about.json';

const staff = content.staff ?? [];
const beliefs = content.beliefs ?? [];
const selected = ref(0);
useHead({ title: 'About — Redeemer Pampa' });
</script>

<template>
  <div class="mx-auto max-w-4xl px-5 py-16">
    <h1 id="staff" class="text-title font-medium">Elders &amp; Staff</h1>
    <p class="prose-measure mt-5 text-ink-600">
      Redeemer Pampa is an elder-led church. You can learn more about the
      plurality of leadership we have adopted
      <a href="/Plural-Leadership.pdf" target="_blank" rel="noopener" class="font-medium text-brand-700 underline">here</a>.
    </p>

    <ul class="mt-10 grid gap-5 sm:grid-cols-2">
      <li v-for="person in staff" :key="person.name" class="rounded-lg border border-ink-100 p-5">
        <div class="flex items-start gap-4">
          <img
            v-if="person.imgUrl"
            :src="person.imgUrl"
            :alt="`Portrait of ${person.name}`"
            loading="lazy"
            class="size-16 shrink-0 rounded-full object-cover"
          />
          <div>
            <p class="font-semibold text-ink-900">{{ person.name }}</p>
            <p v-if="person.role" class="text-sm text-brand-700">{{ person.role }}</p>
          </div>
        </div>
        <p v-if="person.summary" class="mt-4 text-sm leading-relaxed text-ink-600">
          {{ person.summary }}
        </p>
      </li>
    </ul>

    <h2 id="beliefs" class="mt-20 text-title font-medium">Beliefs</h2>
    <div class="mt-8 grid gap-6 md:grid-cols-[14rem_1fr]">
      <ul class="flex flex-wrap gap-2 md:flex-col">
        <li v-for="(belief, i) in beliefs" :key="belief.title">
          <button
            class="rounded px-3 py-1.5 text-sm transition"
            :class="i === selected ? 'bg-brand-700 text-white' : 'text-brand-700 hover:bg-brand-50'"
            @click="selected = i"
          >
            {{ belief.title }}
          </button>
        </li>
      </ul>
      <div v-if="beliefs[selected]" class="rounded-lg border border-ink-100 bg-ink-50 p-6">
        <h3 class="font-sans text-base font-semibold text-ink-900">{{ beliefs[selected].title }}</h3>
        <p class="mt-3 leading-relaxed text-ink-600">{{ beliefs[selected].description }}</p>
      </div>
    </div>
  </div>
</template>
