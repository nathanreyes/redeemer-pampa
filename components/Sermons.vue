<template>
  <!--Beliefs Section-->
  <div class="section">
    <h2 class="section-title" id="sermons">Sermons - {{ selectedSermonLookup.title }}</h2>
    <div class="inline-flex mb-4" v-if="false">
      <button class="rounded-l" :class="getButtonClass('DATE')" @click="setViewBy('DATE')">By Year</button>
      <button
        class="rounded-r"
        :class="getButtonClass('SERIES')"
        @click="setViewBy('SERIES')"
      >By Series</button>
    </div>
    <master-detail-list
      :items="sermonLookups"
      :groups="sermonGroups"
      :selected-item.sync="selectedSermonLookup"
    >
      <div slot-scope="{ item }">
        <p
          class="text-grey text-lg italic ml-2 mt-2 text-center"
          v-if="!sermons || !sermons.length"
        >No sermons found</p>
        <div
          v-for="sermon in sermons"
          :key="sermon.title"
          class="bg-grey-lightest border border-grey-lighter rounded mb-4 overflow-hidden"
          v-else
        >
          <div class="border-l-2 border-blue px-6 py-4">
            <h3 class="text-grey-darkest font-semibold mb-3">{{ sermon.title }}</h3>
            <p class="text-grey-dark text-sm leading-normal">
              Led by
              <span class="text-grey-darker font-semibold">{{ sermon.leader }}</span>
              on
              <span
                class="text-grey-darker font-semibold"
              >{{ new Date(sermon.date).toLocaleDateString() }}</span>
              <span v-if="sermon.series">during the
                <nuxt-link
                  :to="getSeriesPath(sermon.series)"
                  class="mr-1 text-blue-dark text-sm font-semibold no-underline border-b border-blue-dark"
                >{{ sermon.series }}</nuxt-link>series.
              </span>
            </p>
            <p class="flex items-center mt-4" v-if="sermon.podcastUrl">
              <a
                :href="sermon.podcastUrl"
                target="_blank"
                class="flex items-center text-sm text-blue-darker font-semibold no-underline bg-blue-lighter px-4 py-2 rounded"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  class="w-4 h-4 fill-current"
                >
                  <path
                    d="M16 8A6 6 0 1 0 4 8v11H2a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2V8a8 8 0 1 1 16 0v3a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2V8zm-4 2h3v10h-3V10zm-7 0h3v10H5V10z"
                  ></path>
                </svg>
                <span class="ml-2">Listen to this sermon</span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </master-detail-list>
  </div>
</template>

<script>
import sermonIndex from '../content/sermons/index.json';
import MasterDetailList from './MasterDetailList';

export default {
  components: {
    MasterDetailList,
  },
  props: {
    sermonLookup: { type: Object, default: () => {} },
  },
  data() {
    return {
      sermons: [],
      sermonLookups: sermonIndex,
      sermonGroups: [
        {
          title: 'By Year',
          match: item => item.path.startsWith('/year/'),
        },
        {
          title: 'By Series',
          match: item => item.path.startsWith('/series/'),
        },
      ],
      selectedSermonLookup: this.sermonLookup,
      viewBy: 'DATE',
    };
  },
  watch: {
    selectedSermonLookup(val) {
      this.refreshSermons();
    },
  },
  mounted() {
    this.refreshSermons();
  },
  methods: {
    async refreshSermons() {
      this.sermons = (await import(`@/content/sermons${
        this.selectedSermonLookup.path
      }.json`)).sermons.sort((a, b) => new Date(b.date) - new Date(a.date));
    },
    getButtonClass(viewBy) {
      return viewBy === this.viewBy
        ? 'bg-blue-dark hover:bg-grey text-white hover:text-grey-dark font-bold py-2 px-4 outline-none'
        : 'bg-grey-light hover:bg-grey text-grey-dark font-bold py-2 px-4 outline-none';
    },
    setViewBy(viewBy) {
      this.viewBy = viewBy;
    },
    getSeriesPath(title) {
      const series = sermonIndex.find(s => s.title === title);
      return series ? `/sermons${series.path}` : '';
    },
  },
};
</script>