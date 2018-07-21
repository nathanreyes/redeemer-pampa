<template>
  <div class='banner-container relative'>
    <div class='container mx-auto flex items-center h-full'>
      <!--Hero Left Column-->
      <div class='flex-grow flex flex-col items-center lg:items-start'>
        <!--Hero Header-->
        <p class='text-5xl text-white font-light text-center lg:text-left'>
          Nothing outweighs the <br /> redeeming work of Jesus on <br /> the cross.
        </p>
        <!--Divider Line-->
        <div class='divider mt-12 lg:mt-24 mb-12'></div>
        <a
          href='#'
          class='inline-flex items-center text-xl bg-blue-lightest text-black opacity-75 font-semibold h-12 px-4 border-2 border-white outline-none rounded no-underline'
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
      <!--Hero Right Column-->
      <div class='hidden lg:flex flex-col justify-center items-end'>
        <!--Wrapper for centering/alignment-->
        <div
          class='bg-white rounded-lg p-8'
          :style='{ opacity: 0.8 }'>
          <!--Podcasts Section-->
          <div class='mb-10'>
            <p class='text-xl tracking-wide font-semibold text-blue-darker uppercase mb-4 ml-10'>
              Podcasts
            </p>
            <p class='flex items-center mb-6'>
              <!--Headphones Icon-->
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                :class='iconClass'>
                <path d='M16 8A6 6 0 1 0 4 8v11H2a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2V8a8 8 0 1 1 16 0v3a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2V8zm-4 2h3v10h-3V10zm-7 0h3v10H5V10z'/>
              </svg>
              <a
                href='#'
                :class='linkClass'
                @click.prevent='togglePlayerVisible'>
                Listen to our latest sermon
              </a>
            </p>
            <p class='flex items-center'>
              <!--Calendar Icon-->
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                :class='iconClass'>
                <path d='M1 4c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4zm2 2v12h14V6H3zm2-6h2v2H5V0zm8 0h2v2h-2V0zM5 9h2v2H5V9zm0 4h2v2H5v-2zm4-4h2v2H9V9zm0 4h2v2H9v-2zm4-4h2v2h-2V9zm0 4h2v2h-2v-2z'/>
              </svg>
              <a
                href='https://anchor.fm/redeemer-pampa-podcast'
                target='_blank'
                :class='linkClass'>
                Listen to previous sermons
              </a>
            </p>
          </div>
          <!--Contact Section-->
          <div class=''>
            <p class='text-xl tracking-wide font-semibold text-blue-darker uppercase mb-4 ml-10'>
              Contact
            </p>
            <p class='flex items-center mb-6'>
              <!--Chat Bubble Icon-->
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                :class='iconClass'>
                <path d='M10 15l-4 4v-4H2a2 2 0 0 1-2-2V3c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-8zM5 7v2h2V7H5zm4 0v2h2V7H9zm4 0v2h2V7h-2z'/>
              </svg>
              <a
                href='#'
                :class='linkClass'
                v-scroll-to='"#contact-us"'>
                Contact us
              </a>
            </p>
            <p class='flex items-center'>
              <!--Map Icon-->
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                :class='iconClass'>
                <path d='M0 0l6 4 8-4 6 4v16l-6-4-8 4-6-4V0zm7 6v11l6-3V3L7 6z'/>
              </svg>
              <a
                href='#'
                :class='linkClass'
                v-scroll-to='"#map"'>
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
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      linkClass:
        'text-blue-dark font-semibold tracking-wide pb-1 no-underline border-b-2 border-blue-dark',
      iconClass: 'w-4 h-4 text-blue-dark fill-current mr-6',
    };
  },
  methods: {
    ...mapMutations(['togglePlayerVisible']),
  },
};
</script>


<style scoped>
.banner-container {
  height: 600px;
  overflow: hidden;
  background: url('https://res.cloudinary.com/dqgcfqzpk/image/upload/c_scale,w_1200/v1532109704/redeemer-pampa/group-prayer-edit.jpg');
  background-size: cover;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: top;
}
.divider {
  width: 100px;
  height: 1px;
  border-top: 2px solid white;
  opacity: 0.7;
}
</style>

