<template>
  <div>
    <nuxt-link to='/services' :class='navClass'>Services & Staff</nuxt-link>
    <nuxt-link to='/services' :class='navClass'>Gospel Communities</nuxt-link>
    <nuxt-link to='/contact' :class='navClass'>Contact</nuxt-link>
    <nuxt-link to='/giving' :class='navClass'>Giving</nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    isMobile: Boolean,
  },
  data() {
    return {
      navClass:
        'link rounded block text-blue text-xl text-center mb-4 py-2 px-4 tracking-wide lg:mb-0',
    };
  },
};
</script>
