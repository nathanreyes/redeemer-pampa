<template>
  <div class='banner-container relative'>
    <hero-bg></hero-bg>
    <div class='flex h-full p-8'>
      <div class='w-1/2 flex flex-col justify-center items-start ml-10'>
        <p class='text-4xl text-white font-light'>
          Nothing trumps the <br /> redeeming work of Jesus on <br /> the cross.
        </p>
        <div class='divider mt-10 mb-8'></div>
        <p class='text-blue-lighter font-light text-xl leading-normal mb-10'>
          It's why we have adoped <br /> the name Redeemer
        </p>
        <a
          href='#'
          class='inline-flex items-center text-lg text-white font-light bg-blue-light py-3 px-4 outline-none rounded no-underline'
          v-scroll-to='"#core-values"'>
          See Our Core Values
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            class='fill-current w-6 h-6 ml-2'>
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
          </svg>
        </a>
      </div>
      <div class='w-1/2 flex flex-col justify-center items-center'>
        <div class='ml-8'>
          <div class='mb-10'>
            <p class='text-xl tracking-wide font-semibold text-blue-darker uppercase mb-4'>
              Podcasts
            </p>
            <p class='mb-6'>
              <a href='#' :class='linkClass'>
                Listen to our latest sermon
              </a>
            </p>
            <p>
              <a href='#' :class='linkClass'>
                Listen to previous sermons
              </a>
            </p>
          </div>
          <div class=''>
            <p class='text-xl tracking-wide font-semibold text-blue-darker uppercase mb-4'>
              Contact
            </p>
            <p class='mb-6'>
              <a href='#' :class='linkClass'>
                Contact us
              </a>
            </p>
            <p>
              <a href='#' :class='linkClass'>
                See our location
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeroBg from './HeroBg';

export default {
  components: {
    HeroBg,
  },
  data() {
    return {
      linkClass:
        'text-blue-dark font-semibold tracking-wide pb-1 no-underline border-b-2 border-blue-dark',
    };
  },
};
</script>


<style scoped>
.banner-container {
  height: 500px;
  overflow: hidden;
}
.divider {
  width: 100px;
  height: 1px;
  border-top: 2px solid white;
  opacity: 0.3;
}
</style>

