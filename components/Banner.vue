<template>
  <div
  class='banner text-base'
  :style='{ backgroundImage: `url(${image})` }'>
    <div class='relative w-full h-full'>
      <slot>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    image: null,
  },
};
</script>

<style scoped>
.banner {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  height: 670px;
  padding-top: 70px;
}
</style>