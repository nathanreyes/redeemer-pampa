<template>
  <SermonsList :sermons="sermons" :sermon-lookup="sermonLookup" />
</template>

<script>
import SermonsList from '@/components/SermonsList';
import sermonLookups from '@/content/sermons/index.json';

export default {
  async asyncData({ params }) {
    let sermons = [];
    let sermonLookup = {};
    try {
      sermons = (await import(`@/content/sermons/series/${params.series}.json`))
        .sermons;
      sermonLookup = sermonLookups.find(
        (sl) => sl.path === `/series/${params.series}`,
      );
    } catch (ex) {}
    return { sermons, sermonLookup };
  },
  components: {
    SermonsList,
  },
};
</script>
