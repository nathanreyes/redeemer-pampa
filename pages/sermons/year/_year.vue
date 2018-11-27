<template>
  <sermons :sermon-lookup="sermonLookup"/>
</template>

<script>
import Sermons from '@/components/Sermons';
import sermonLookups from '@/content/sermons/index.json';

export default {
  async asyncData({ params }) {
    const sermonLookup = sermonLookups.find(
      sl => sl.path === `/year/${params.year}`,
    );
    return { sermonLookup };
  },
  components: {
    Sermons,
  },
};
</script>

