<template>
  <div>
    <nav class='fixed w-full py-3 flex justify-center items-center bg-grey-lightest z-20'>
      <div class='block lg:hidden'>
        <button class='flex items-center px-3 py-2 border rounded'>
          <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
          </svg>
        </button>
      </div>
      <div class='w-full block flex-grow lg:flex lg:justify-center lg:items-center lg:w-auto'>
        <nuxt-link to='/services' :class='navClass'>Services & Staff</nuxt-link>
        <nuxt-link to='/services' :class='navClass'>Gospel Communities</nuxt-link>
        <nuxt-link to='/contact' :class='navClass'>Contact</nuxt-link>
        <nuxt-link to='/giving' :class='navClass'>Giving</nuxt-link>
      </div>
    </nav>
    <nuxt/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navClass:
        'link rounded block text-blue text-xl mt-4 mr-8 py-2 px-4 tracking-wide lg:mt-0',
    };
  },
};
</script>

<style>

</style>
