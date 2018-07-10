<template>
  <div class="rounded overflow-hidden border bg-white shadow text-sm">
    <div class="px-6 py-4">
      <div class="font-bold text-xl text-center text-black">
        {{ address }}
      </div>
      <div
        class='mt-2 text-center text-sm text-grey-dark'
        v-if='subaddress'>
        {{ subaddress }}
      </div>
      <div class='mt-4 mb-4'>
        <div class='block text-grey-darker font-bold mb-2'>Time:</div>
        <div class='text-grey-darker'>{{ time }}</div>
      </div>
      <div class='mb-4'>
        <div class='block text-grey-darker font-bold mb-2'>Hosts:</div>
        <div class='text-grey-darker'>{{ hosts }}</div>
      </div>
      <div class='mb-4'>
        <div class='block text-grey-darker font-bold mb-2'>More:</div>
        <div
          class='text-grey-darker'>
          Contact <email :address='email'></email> for more information.</div>
      </div>
    </div>
  </div>
</template>

<script>
import Email from './Email';

export default {
  components: {
    Email,
  },
  props: {
    address: String,
    subaddress: String,
    time: String,
    hosts: String,
    email: String,
  },
};
</script>