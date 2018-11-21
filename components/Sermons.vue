<template>
  <div>
    <p v-for="lookup in sermonLookups" :key="lookup">
      {{ lookup}}
    </p>
  </div>
</template>

<script>
import sermonIndex from '../content/sermons';

export default {
  data() {
    return {
      sermonLookups: sermonIndex,
    };
  },
};
</script>
