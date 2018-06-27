<template>
  <!-- <banner
    image='https://via.placeholder.com/800x600'>
  </banner> -->
  <div>
    <!--Page Menu-->
    <page-nav-menu
      :menu-items='menuItems'>
    </page-nav-menu>
    <div class='section'>
      <h2 class='section-title' id='staff'>Staff</h2>
      <p class='content'>
        
      </p>
    </div>
    <div class='section'>
      <h2 class='section-title' id='beliefs'>Beliefs</h2>
      <div
        class='flex'>
        <ul class="list-reset flex flex-col">
          <li
            v-for='belief in beliefs'
            :key='belief.title'
            class='mb-2'>
            <a
              href='#'
              class='inline-block border rounded text-sm no-underline py-1 px-3'
              :class='{
                "border-blue bg-blue text-white": belief === selectedBelief,
                "border-white hover:border-grey-lighter hover:bg-grey-lighter text-blue": belief !== selectedBelief
              }'
              @click.prevent='selectedBelief = belief'
              >
              {{ belief.title }}
            </a>
          </li>
        </ul>
        <div class='relative'>
          <transition name='belief'>
            <p
              v-for='belief in beliefs'
              :key='belief.title'
              class='flex-grow content ml-4'
              v-if='belief === selectedBelief'
              >
              {{ belief.description }}
            </p>
          </transition>
        </div>
      </div>
    </div>
    <div class='section'>
      <h2 class='section-title' id='history'>History</h2>
      <p class='content'>
        
      </p>
    </div>
    <div class='section'>
      <h2 class='section-title' id='affiliations'>Affiliations</h2>
      <p class='content ml-4'>
        Redeemer Pampa is an independent church, but we voluntarily align ourselves with a few organizations for the sake of networking, support and mission.
        Our partnerships are with the Redeemer Network and the Acts 29 Network. 
      </p>
      <h2 class='mt-6'>
        <a href='https://www.acts29.com' target='_blank' class='link text-lg font-semibold tracking-wide'>
          Acts 29
        </a>
      </h2>
      <p class='content mt-2 ml-4'>
        We are a part of the Acts 29 network. Acts 29 is not a denomination, but a network of like-minded churches planting churches.
        Check out the <a href='https://www.acts29.com' class='link' target='_blank'>Acts 29 website</a> for more information about the network.
      </p>
      <h2 class='mt-6'>
        <a href='https://www.redeemernetwork.org' target='_blank' class='link text-lg font-semibold tracking-wide'>
        Redeemer Network
      </a>
      </h2>
      <p class='content mt-2 ml-4'>
        The Redeemer Network is a family of Acts 29 churches mostly in West and Central Texas who are committed to planting and establishing healthy churches together.
        These churches are tied together by relational trust, theological distinctives (Acts 29), and a desire to plant more churches in collaboration.
        The Redeemer Network is our primary partner for accomplishing our vision to plant churches.
        You can learn more about our involvement with the Redeemer Network at <a href='https://www.redeemernetwork.org' target='_blank' class='link'>www.redeemernetwork.org</a>. 
      </p>
    </div>
  </div>
</template>

<script>
import Banner from '../components/Banner';
import PageNavMenu from '../components/PageNavMenu';
import beliefs from '../util/beliefs.json';

export default {
  components: {
    Banner,
    PageNavMenu,
  },
  data() {
    return {
      menuItems: [
        {
          title: 'Staff',
          url: '#staff',
        },
        {
          title: 'Beliefs',
          url: '#beliefs',
        },
        {
          title: 'History',
          url: '#history',
        },
        {
          title: 'Affiliations',
          url: '#affiliations',
        },
      ],
      beliefs,
      selectedBelief: beliefs[0],
    };
  },
};
</script>

<style scoped>
.belief-enter-active,
.belief-leave-active {
  background-color: white;
  transition: all 0.3s ease-in-out;
}
.belief-enter,
.belief-leave-to {
  opacity: 0;
}
/* .belief-enter {
  transform: translateY(-20px);
}
.belief-leave-to {
  transform: translateY(20px);
} */
.belief-leave-active {
  position: absolute;
}
</style>