<template>
  <div>
    <!--Page Menu-->
    <page-nav-menu :menu-items="menuItems"></page-nav-menu>
    <!--Staff Profiles Intro Section-->
    <div class="section">
      <h2 class="section-title" id="staff">Elders & Staff</h2>
      <p class="content mb-4">
        Redeemer Church is an elder-led church. Currently, we have
        {{ elderCount }} elders who work outside of Redeemer as well as elders
        who are employed by Redeemer Pampa. You can learn more about elders and
        the plurality of leadership that Redeemer Pampa has adopted
        <a href="/Plural-Leadership.pdf" class="link" target="_blank">here</a>.
      </p>
    </div>
    <!--Staff Profiles Bio Section-->
    <div class="bg-blue-dark shadow-inner py-4">
      <div class="section">
        <profile-card
          v-for="profile in staff"
          :key="profile.name"
          class="my-4 mx-auto"
          :name="profile.name"
          :role="profile.role"
          :email="profile.email"
          :img-url="profile.imgUrl"
          :description="profile.summary"
        ></profile-card>
      </div>
    </div>
    <!--Beliefs Section-->
    <div class="section">
      <h2 class="section-title" id="beliefs">Beliefs</h2>
      <div class="flex flex-col md:flex-row">
        <div class="md:hidden">
          <div class="w-full md:w-1/3 px-2 mb-4 md:mb-0">
            <label
              class="block uppercase tracking-wide text-grey-dark text-xs font-bold mb-3"
              for="belief-select"
              >Select to read more...</label
            >
            <div class="relative">
              <select
                class="block appearance-none w-full bg-grey-lighter border border-grey-light text-grey-darker py-3 px-4 pr-8 rounded leading-tight"
                id="belief-select"
                v-model="selectedBelief"
              >
                <option
                  v-for="belief in beliefs"
                  :key="belief.title"
                  :value="belief"
                >
                  {{ belief.title }}
                </option>
              </select>
              <div
                class="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker"
              >
                <svg
                  class="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <ul class="hidden md:flex flex-col list-reset mr-4">
          <li v-for="belief in beliefs" :key="belief.title" class="mb-2">
            <a
              href="#"
              class="inline-block border rounded text-sm no-underline py-1 px-3"
              :class="{
                'border-blue bg-blue text-white': belief === selectedBelief,
                'border-white hover:border-grey-lighter hover:bg-grey-lighter text-blue':
                  belief !== selectedBelief,
              }"
              @click.prevent="selectedBelief = belief"
              >{{ belief.title }}</a
            >
          </li>
        </ul>
        <div class="relative">
          <transition :name="transitionName">
            <div :key="selectedBelief.title">
              <p
                class="text-xl pl-4 ml-2 mb-4 text-grey-darker hidden md:block border-l-2 border-blue"
              >
                {{ selectedBelief.title }}
              </p>
              <p
                :key="selectedBelief.title"
                class="flex-grow content bg-grey-lightest border border-grey-light shadow-sm rounded px-6 mx-2 py-4"
              >
                {{ selectedBelief.description }}
              </p>
            </div>
          </transition>
        </div>
      </div>
    </div>
    <!--Church Planting Section-->
    <div class="bg-grey-lighter py-4">
      <div class="section">
        <h2 class="section-title" id="church_planting">Church Planting</h2>
        <p class="content ml-4">
          Redeemer Pampa is an independent church, but we voluntarily align
          ourselves with the Redeemer Network for the sake of networking,
          support and mission.
        </p>
        <h2 class="mt-6">
          <a
            href="https://redeemernetwork.org"
            target="_blank"
            class="link text-lg font-semibold tracking-wide"
            >Redeemer Network</a
          >
        </h2>
        <p class="content mt-2 ml-4">
          Redeemer Network churches share a collaborative vision to develop and
          train Godly leaders to plant healthy, thriving churches. Each church
          in the Redeemer Network is an autonomous church, but we share common
          theology, values, and vision. You can learn more about our involvement
          with the Redeemer Network at
          <a href="https://redeemernetwork.org" target="_blank" class="link"
            >www.redeemernetwork.org</a
          >.
        </p>
        <h2 class="mt-6">
          <a
            href="https://www.redeemerborger.org"
            target="_blank"
            class="link text-lg font-semibold tracking-wide"
          >
            Redeemer Borger
          </a>
        </h2>
        <div class="my-6">
          <img
            class="w-full md:w-auto rounded-lg"
            src="https://res.cloudinary.com/dqgcfqzpk/image/upload/v1632009052/redeemer-pampa/redeemerborger2.jpg"
          />
        </div>
        <h3
          class="text-2xl text-center md:text-left text-grey-darker tracking-wide"
        >
          The Calling
        </h3>
        <p class="content mt-4">
          In the spring of 2019, Ricky and Kallie Garzon were affirmed in their
          call to plant a church in Borger, Texas. Borger is Ricky's hometown
          and though he had served in many ministry roles in various places, he
          saw need among a people he knew and loved. Ricky joined the church
          planting residency at Redeemer Pampa and the Garzon family began
          attending to rest, learn, and prepare to plant a church in Borger.
        </p>
        <h3
          class="text-2xl text-center md:text-left text-grey-darker tracking-wide mt-6"
        >
          God's Faithfulness
        </h3>
        <p class="content mt-4">
          In March 2020, at the beginning stages of the initial COVID shutdown,
          the Garzons had gathered a core team which was meeting in their home.
          As restrictions continued to tighten, they moved their Sunday night
          core gatherings to ZOOM and continued planning and dreaming and
          trusting God. Through many difficult and unexpected decisions due to
          COVID including a very last-minute need to find a new gathering space,
          God was faithful to move the work of church planting forward and in
          December 2020, Redeemer Pampa commissioned the core team of Redeemer
          Borger to launch their Sunday morning gatherings. God provided an old
          downtown storefront in the heart of Borger which needed to be
          retro-fitted in the span of only a few weeks. The core team came
          together and prepared the space for their initial gathering on January
          17, 2021.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import PageNavMenu from '../components/PageNavMenu';
import ProfileCard from '../components/ProfileCard';
import content from '../content/pages/about.json';

export default {
  components: {
    PageNavMenu,
    ProfileCard,
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
          title: 'Church Planting',
          url: '#church_planting',
        },
      ],
      staff: content.staff,
      beliefs: content.beliefs,
      selectedBelief: content.beliefs[0],
      transitionName: '',
    };
  },
  computed: {
    elderCount() {
      return this.staff.filter((s) => s.role?.toLowerCase().includes('elder'))
        .length;
    },
  },
  watch: {
    selectedBelief(val, oldVal) {
      this.transitionName = this.getTransitionName(val, oldVal);
    },
  },
  methods: {
    getTransitionName(newBelief, oldBelief) {
      if (
        !newBelief ||
        !oldBelief ||
        !this.beliefs ||
        !this.beliefs.length ||
        newBelief === oldBelief
      )
        return '';
      return this.beliefs.indexOf(newBelief) < this.beliefs.indexOf(oldBelief)
        ? 'belief-prev'
        : 'belief-next';
    },
  },
};
</script>

<style scoped>
.belief-prev-enter-active,
.belief-prev-leave-active,
.belief-next-enter-active,
.belief-next-leave-active {
  transition: all 0.3s ease-in-out;
}
.belief-prev-enter,
.belief-prev-leave-to,
.belief-next-enter,
.belief-next-leave-to {
  opacity: 0;
}
.belief-prev-enter,
.belief-next-leave-to {
  transform: translateY(-20px);
}
.belief-prev-leave-to,
.belief-next-enter {
  transform: translateY(20px);
}
.belief-prev-leave-active,
.belief-next-leave-active {
  position: absolute;
}
</style>
