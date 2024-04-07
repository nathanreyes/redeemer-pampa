<template>
  <div class="rounded overflow-hidden border bg-white shadow text-sm">
    <div class="px-6 py-4">
      <div>
        <div class="block text-grey-darker font-bold mb-2">Time:</div>
        <div class="text-grey-darker">{{ time }}</div>
      </div>
      <div class="mt-4">
        <div class="block text-grey-darker font-bold mb-2">Hosts:</div>
        <div class="text-grey-darker leading-comfy">{{ hosts }}</div>
      </div>
      <div class="mt-4" v-if="moreInfo">
        <div class="block text-grey-darker font-bold mb-2">More:</div>
        <div class="text-grey-darker leading-comfy" v-html="moreInfo"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    time: String,
    hosts: String,
    email: String,
    moreInfo: String,
  },
};
</script>
