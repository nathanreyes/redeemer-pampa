<template>
  <div
    class='min-h-screen flex flex-col bg-white relative'>
    <site-nav>
    </site-nav>
    <div class='main flex-grow'>
      <nuxt />
    </div>
    <site-footer>
    </site-footer>
  </div>
</template>

<script>
import SiteNav from '~/components/SiteNav';
import SiteFooter from '~/components/SiteFooter';

export default {
  components: {
    SiteNav,
    SiteFooter,
  },
};
</script>

<style scoped>
.main {
  margin-top: 70px;
  z-index: 1;
}
</style>
