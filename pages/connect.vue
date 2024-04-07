<template>
  <div>
    <!--Page Menu-->
    <page-nav-menu :menu-items="menuItems"></page-nav-menu>
    <!--Worship Section-->
    <div class="section">
      <div class="container">
        <h1 class="section-title" id="worship">Worship</h1>
        <p class="ml-8 content">
          Join us for morning services every Sunday at 9:15am and 11:00am
        </p>
      </div>
    </div>
    <!--Gospel Community Description Section-->
    <div class="section">
      <div class="container">
        <h1 class="section-title" id="gospel-communities">
          Gospel Communities
        </h1>
        <div class="flex flex-col md:flex-row">
          <div
            class="flex-grow mb-4 col flex items-center md:text-right md:mr-2"
          >
            <img
              class="w-full md:w-auto rounded-lg"
              src="https://res.cloudinary.com/dqgcfqzpk/image/upload/v1685916200/redeemer-pampa/girls-cookout.jpg"
            />
          </div>
          <div class="flex-grow col">
            <p class="content ml-8 md:pr-6 md:border-r md:border-grey">
              We at Redeemer Pampa don’t want our Sunday morning service to be
              the apex of our week. Instead it will simply be a part (definitely
              an important part, but still a just a part) of our week as a
              family. Gospel Communities (GC’s) are another vital part of
              Redeemer Pampa.
            </p>
          </div>
        </div>
        <p class="mt-6 mb-6 ml-8 text-right italic text-blue-dark content">
          The goal of our GC’s is to see the gospel bear fruit in our lives as
          both individuals and as a community of people while we disciple one
          another, pray with/for one another, study scripture, and serve on
          mission together.
        </p>
        <p class="ml-8 content">
          Gospel Communities serve as the primary extension of our spiritual
          family, as we strive to learn to apply the gospel to life. Our GC’s
          meet weekly and are casual gatherings of individuals of different
          ages, life stages, and family dynamics. A typical gathering will
          include either a meal/snacks/or a dessert, a deeper look at the
          previous Sunday’s sermon text, prayer, conversation, and community.
          Groups are open – new folks are welcome each and every week.
        </p>
      </div>
    </div>
    <!--Gospel Community Groups Section-->
    <div class="bg-grey-lighter shadow-inner py-4">
      <div class="section">
        <div class="grid">
          <gc-card
            v-for="gc in gospelCommunities"
            :key="gc.hosts"
            :time="gc.time"
            :hosts="gc.hosts"
            :address="gc.address"
            :subaddress="gc.subaddress"
            :more-info="gc.moreInfo"
          ></gc-card>
        </div>
      </div>
    </div>
    <!--Sermons-->
    <sermons></sermons>
  </div>
</template>

<script>
import PageNavMenu from '../components/PageNavMenu';
import GcCard from '../components/GcCard';
import content from '@/content/pages/connect.json';

export default {
  components: {
    PageNavMenu,
    GcCard,
  },
  data() {
    return {
      sectionClass: 'mt-8 mb-8 px-4 max-w-lg mx-auto',
      menuItems: [
        {
          title: 'Worship',
          url: '#worship',
        },
        {
          title: 'Gospel Communities',
          url: '#gospel-communities',
        },
      ],
      gospelCommunities: content.gospelCommunities,
    };
  },
};
</script>

<style>
.breadcrumb:not(:first-child)::before {
  color: #cacaca;
  content: '\0002f';
}

.grid {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
}
</style>
