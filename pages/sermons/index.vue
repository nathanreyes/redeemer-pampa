<template>
  <sermons :sermon-lookup="sermonLookup"/>
</template>

<script>
import Sermons from '@/components/Sermons';
import sermonLookups from '@/content/sermons/index.json';

export default {
  async asyncData({ params, query }) {
    const sermonLookup = sermonLookups[0];
    return { sermonLookup };
  },
  components: {
    Sermons,
  },
};
</script>

