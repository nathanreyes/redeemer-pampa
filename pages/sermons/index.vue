<template>
  <SermonsList :sermon-lookup="sermonLookup" />
</template>

<script>
import SermonsList from '@/components/SermonsList';
import sermonLookups from '@/content/sermons/index.json';

export default {
  async asyncData({ params, query }) {
    const sermonLookup = sermonLookups[0];
    return { sermonLookup };
  },
  components: {
    SermonsList,
  },
};
</script>
