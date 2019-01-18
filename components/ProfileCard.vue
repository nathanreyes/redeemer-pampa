<template>
  <div class="max-w-md">
    <div
      class="flex flex-col items-center md:flex-row md:items-start border-grey-light bg-white rounded p-6 leading-normal shadow"
    >
      <img
        class="w-24 h-24 rounded-full md:mr-6 mb-4 shadow"
        :src="imgUrl"
        :alt="`Avatar of ${name}`"
        v-if="imgUrl"
      >
      <div class="text-sm text-center md:text-left">
        <p class="text-black leading-none font-bold text-xl mb-2">{{ name }}</p>
        <p class="text-grey-dark tracking-wide inline-flex items-center mb-2">
          <svg
            class="fill-current text-grey w-4 h-4 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zM7 6v2a3 3 0 1 0 6 0V6a3 3 0 1 0-6 0zm-3.65 8.44a8 8 0 0 0 13.3 0 15.94 15.94 0 0 0-13.3 0z"
            ></path>
          </svg>
          {{ role }}
        </p>
        <p class="text-base text-grey-darker text-center md:text-left">{{ description }}</p>
        <p class="text-sm text-grey-dark text-center md:text-left mt-4" v-if="email">
          You can reach {{ firstName }} at
          <email :address="email"></email>.
        </p>
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
    name: {
      type: String,
      default: 'Name',
    },
    role: {
      type: String,
      default: 'Role',
    },
    imgUrl: String,
    email: String,
    description: {
      type: String,
      default:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.',
    },
  },
  computed: {
    firstName() {
      return this.name && this.name.split(' ')[0];
    },
  },
};
</script>
