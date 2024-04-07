<template>
  <a
    :href="`mailto:${address}`"
    class="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker no-underline"
  >
    {{ address }}
  </a>
</template>

<script>
export default {
  props: {
    address: {
      type: String,
      required: true,
    },
  },
};
</script>
