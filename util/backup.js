<template>
  <!--Beliefs Section-->
  <div class='section'>
    <h2
      class='section-title'
      id='sermons'>
      Sermons - {{ selectedSermonLookup.title }}
    </h2>
    <div class="inline-flex mb-4" v-if='false'>
      <button class='rounded-l' :class="getButtonClass('DATE')" @click="setViewBy('DATE')">
        By Year
      </button>
      <button class='rounded-r' :class="getButtonClass('SERIES')" @click="setViewBy('SERIES')">
        By Series
      </button>
    </div>
    <master-detail-list
      :items='sermonLookups'
      :groups='sermonGroups'
      :selected-item.sync='selectedSermonLookup'
      >
      <div slot-scope='{ item }'>
        <p class='text-grey text-lg italic ml-2 mt-2 text-center'
          v-if='!sermons || !sermons.length'>
          No sermons found
        </p>
        <div
          v-for='sermon in sermons'
          :key='sermon.title'
          class='bg-grey-lightest border border-grey-lighter rounded mb-4 overflow-hidden'
          v-else>
          <div class='border-l-2 border-blue p-6'>
            <h3 class='text-grey-darkest font-semibold mb-3'>{{ sermon.title }}</h3>
            <p class="text-grey-dark text-sm">
              Led by <span class='text-blue font-semibold'>{{ sermon.leader }}</span>
              on <span class='text-blue font-semibold'>{{ new Date(sermon.date).toLocaleDateString() }}</span>
              during the <span class='text-blue font-semibold'>{{ sermon.series }}</span> series.
            </p>
          </div>
        </div>
      </div>
    </master-detail-list>
  </div>
</template>

<script>
import sermonIndex from 'static/content/sermons/index.json';
import MasterDetailList from './MasterDetailList';

export default {
  components: {
    MasterDetailList,
  },
  props: {
    sermons: Array,
    sermonLookup: { type: Object, default: () => {} },
  },
  data() {
    return {
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
      this.$router.push({ path: `/sermons${val.path}` });
    },
  },
  methods: {
    getButtonClass(viewBy) {
      return viewBy === this.viewBy
        ? 'bg-blue-dark hover:bg-grey text-white hover:text-grey-dark font-bold py-2 px-4 outline-none'
        : 'bg-grey-light hover:bg-grey text-grey-dark font-bold py-2 px-4 outline-none';
    },
    setViewBy(viewBy) {
      this.viewBy = viewBy;
    },
  },
};
</script>