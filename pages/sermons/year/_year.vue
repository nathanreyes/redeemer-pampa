<template>
  <SermonsList :sermon-lookup="sermonLookup" heading-tag="h1" />
</template>

<script>
import SermonsList from '@/components/SermonsList';
import sermonLookups from '@/content/sermons/index.json';

export default {
  async asyncData({ params }) {
    const sermonLookup = sermonLookups.find(
      (sl) => sl.path === `/year/${params.year}`,
    );
    return { sermonLookup };
  },
  components: {
    SermonsList,
  },
};
</script>
