<script setup lang="ts">
interface Sermon {
  title: string;
  leader: string;
  series: string;
  date: string;
  summary?: string;
  podcastUrl?: string;
}

const modules = import.meta.glob<{ default: { sermons: Sermon[] } }>(
  '~~/content/sermons/year/*.json',
  { eager: true },
);

const sermons = Object.values(modules)
  .flatMap((m) => m.default.sermons ?? [])
  .sort((a, b) => +new Date(b.date) - +new Date(a.date));

const seriesList = [...new Set(sermons.map((s) => s.series).filter(Boolean))].sort((a, b) =>
  a.localeCompare(b),
);
const years = [...new Set(sermons.map((s) => s.date.slice(0, 4)))].sort().reverse();

const query = ref('');
const series = ref('');
const year = ref('');

const results = computed(() => {
  const q = query.value.trim().toLowerCase();
  return sermons.filter((s) => {
    if (series.value && s.series !== series.value) return false;
    if (year.value && !s.date.startsWith(year.value)) return false;
    if (!q) return true;
    return (
      s.title.toLowerCase().includes(q) ||
      s.leader.toLowerCase().includes(q) ||
      (s.series ?? '').toLowerCase().includes(q)
    );
  });
});

const shown = ref(40);
watch([query, series, year], () => (shown.value = 40));

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    timeZone: 'UTC',
  });

const reset = () => {
  query.value = '';
  series.value = '';
  year.value = '';
};

const filtered = computed(() => !!(query.value || series.value || year.value));

const selectClass =
  'eyebrow appearance-none border-b-2 border-earth-900/20 bg-transparent py-2 pr-6 text-earth-900 hover:border-wheat-500 focus:border-wheat-500';

useHead({ title: 'Sermons — Redeemer Pampa' });
</script>

<template>
  <div class="mx-auto max-w-[110rem] px-5 pb-32 pt-12 sm:px-8 sm:pt-20">
    <p class="eyebrow text-earth-400">The Archive</p>
    <h1 class="mt-6 text-colossal text-earth-900">Sermons</h1>

    <!-- The scale of the archive is the point: fifteen years, book by book. -->
    <p class="mt-8 max-w-2xl text-lede font-light text-earth-600">
      {{ sermons.length.toLocaleString() }} sermons preached at Redeemer Pampa
      since {{ years.at(-1) }}, working through {{ seriesList.length }} series
      of Scripture.
    </p>

    <!-- ============ FILTERS ============ -->
    <div class="horizon mt-14 text-earth-900"></div>

    <div class="flex flex-wrap items-end gap-x-10 gap-y-5 py-5">
      <div class="min-w-[16rem] flex-1">
        <label for="q" class="eyebrow block text-earth-400">Search</label>
        <input
          id="q"
          v-model="query"
          type="search"
          placeholder="Title, speaker or series"
          class="mt-2 w-full border-b-2 border-earth-900/20 bg-transparent py-2 text-lede font-light text-earth-900 placeholder:text-earth-300 focus:border-wheat-500 focus:outline-none"
        />
      </div>

      <div>
        <label for="series" class="eyebrow block text-earth-400">Series</label>
        <select id="series" v-model="series" :class="['mt-2 block w-48', selectClass]">
          <option value="">All series</option>
          <option v-for="s in seriesList" :key="s" :value="s">{{ s }}</option>
        </select>
      </div>

      <div>
        <label for="year" class="eyebrow block text-earth-400">Year</label>
        <select id="year" v-model="year" :class="['mt-2 block w-28', selectClass]">
          <option value="">All years</option>
          <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
        </select>
      </div>
    </div>

    <div class="horizon text-earth-900/25"></div>

    <p class="eyebrow mt-5 flex items-baseline gap-4 text-earth-400">
      <span class="tabular-nums text-earth-900">
        {{ results.length.toLocaleString() }} {{ results.length === 1 ? 'sermon' : 'sermons' }}
      </span>
      <button
        v-if="filtered"
        class="border-b-2 border-wheat-500 pb-0.5 text-wheat-600"
        @click="reset"
      >
        Clear
      </button>
    </p>

    <!-- ============ RESULTS ============ -->
    <!-- Laid out as a record, not as cards: aligned columns, tabular figures. -->
    <ol v-if="results.length" class="mt-8">
      <li
        v-for="sermon in results.slice(0, shown)"
        :key="sermon.date + sermon.title"
        class="group grid grid-cols-1 gap-x-8 gap-y-2 border-t border-earth-900/15 py-6 md:grid-cols-12 md:items-baseline"
      >
        <time
          :datetime="sermon.date"
          class="eyebrow tabular-nums text-earth-400 md:col-span-2"
        >
          {{ fmt(sermon.date) }}
        </time>

        <h2 class="text-section normal-case text-earth-900 md:col-span-5">
          {{ sermon.title }}
        </h2>

        <div class="md:col-span-3">
          <p class="eyebrow text-earth-500">{{ sermon.leader }}</p>
          <button
            v-if="sermon.series"
            class="mt-1 block text-sm font-light italic text-wheat-600 hover:underline"
            @click="series = sermon.series"
          >
            {{ sermon.series }}
          </button>
        </div>

        <div class="md:col-span-2 md:text-right">
          <a
            v-if="sermon.podcastUrl"
            :href="sermon.podcastUrl"
            target="_blank"
            rel="noopener"
            class="eyebrow inline-block border-b-2 border-earth-900/20 pb-1 transition-colors group-hover:border-wheat-500 hover:text-wheat-600"
          >
            Listen
          </a>
        </div>
      </li>
    </ol>

    <p v-else class="mt-16 text-lede font-light text-earth-400">
      No sermons match those filters.
    </p>

    <div v-if="shown < results.length" class="mt-12">
      <button
        class="eyebrow border-b-2 border-wheat-500 pb-1 hover:text-wheat-600"
        @click="shown += 60"
      >
        Show {{ Math.min(60, results.length - shown) }} more
      </button>
    </div>
  </div>
</template>
