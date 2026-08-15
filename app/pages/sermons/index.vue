<script setup lang="ts">
interface Sermon {
  title: string;
  leader: string;
  series: string;
  date: string;
  summary?: string;
  podcastUrl?: string;
}

// Pulled in at build time by Vite, so the whole archive ships as one payload
// (~30KB gzipped) and search is instant with no network round trip.
const modules = import.meta.glob<{ default: { sermons: Sermon[] } }>(
  '~~/content/sermons/year/*.json',
  { eager: true },
);

const sermons = Object.values(modules)
  .flatMap((m) => m.default.sermons ?? [])
  .sort((a, b) => +new Date(b.date) - +new Date(a.date));

const seriesList = [...new Set(sermons.map((s) => s.series).filter(Boolean))].sort(
  (a, b) => a.localeCompare(b),
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

const shown = ref(30);
watch([query, series, year], () => (shown.value = 30));

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });

const reset = () => {
  query.value = '';
  series.value = '';
  year.value = '';
};

useHead({ title: 'Sermons — Redeemer Pampa' });
</script>

<template>
  <div class="mx-auto max-w-4xl px-5 py-16">
    <h1 class="text-title font-medium">Sermons</h1>
    <p class="prose-measure mt-4 text-ink-600">
      {{ sermons.length.toLocaleString() }} sermons going back to {{ years.at(-1) }}.
    </p>

    <!-- Filters. Replaces a sidebar that listed 48 series and 16 years with no
         way to search them. -->
    <div class="mt-8 grid gap-3 sm:grid-cols-[1fr_auto_auto]">
      <div>
        <label for="sermon-search" class="sr-only">Search sermons</label>
        <input
          id="sermon-search"
          v-model="query"
          type="search"
          placeholder="Search by title, speaker or series"
          class="w-full rounded-md border border-ink-200 px-4 py-2.5 text-ink-800 placeholder:text-ink-400 focus:border-brand-600"
        />
      </div>
      <div>
        <label for="sermon-series" class="sr-only">Filter by series</label>
        <select
          id="sermon-series"
          v-model="series"
          class="w-full rounded-md border border-ink-200 px-3 py-2.5 text-ink-800 sm:w-48"
        >
          <option value="">All series</option>
          <option v-for="s in seriesList" :key="s" :value="s">{{ s }}</option>
        </select>
      </div>
      <div>
        <label for="sermon-year" class="sr-only">Filter by year</label>
        <select
          id="sermon-year"
          v-model="year"
          class="w-full rounded-md border border-ink-200 px-3 py-2.5 text-ink-800 sm:w-32"
        >
          <option value="">All years</option>
          <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
        </select>
      </div>
    </div>

    <p class="mt-5 text-sm text-ink-400">
      {{ results.length.toLocaleString() }}
      {{ results.length === 1 ? 'sermon' : 'sermons' }}
      <button
        v-if="query || series || year"
        class="ml-2 font-medium text-brand-700 underline"
        @click="reset"
      >
        Clear filters
      </button>
    </p>

    <ol v-if="results.length" class="mt-6 divide-y divide-ink-100 border-t border-ink-100">
      <li v-for="sermon in results.slice(0, shown)" :key="sermon.date + sermon.title" class="py-5">
        <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h2 class="font-sans text-base font-semibold text-ink-900">{{ sermon.title }}</h2>
          <span v-if="sermon.series" class="rounded bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-700">
            {{ sermon.series }}
          </span>
        </div>
        <p class="mt-1 text-sm text-ink-400">
          {{ sermon.leader }} · <time :datetime="sermon.date">{{ formatDate(sermon.date) }}</time>
        </p>
        <p v-if="sermon.summary" class="prose-measure mt-2 text-sm text-ink-600">
          {{ sermon.summary }}
        </p>
        <a
          v-if="sermon.podcastUrl"
          :href="sermon.podcastUrl"
          target="_blank"
          rel="noopener"
          class="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-900"
        >
          <svg class="size-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M16 8A6 6 0 1 0 4 8v11H2a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2V8a8 8 0 1 1 16 0v3a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2V8zm-4 2h3v10h-3V10zm-7 0h3v10H5V10z" />
          </svg>
          Listen
        </a>
      </li>
    </ol>

    <p v-else class="mt-10 text-center text-ink-400">No sermons match those filters.</p>

    <div v-if="shown < results.length" class="mt-8 text-center">
      <button
        class="rounded-md border border-ink-200 px-5 py-2.5 text-sm font-semibold text-ink-600 hover:bg-ink-50"
        @click="shown += 50"
      >
        Show more
      </button>
    </div>
  </div>
</template>
