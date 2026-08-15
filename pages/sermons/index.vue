<template>
  <SermonsList :sermon-lookup="sermonLookup" heading-tag="h1" />
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
