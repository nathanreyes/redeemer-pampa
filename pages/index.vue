<template>
  <div>
    <HeroSection />
    <div id="who-we-are" class="bg-white main-content">
      <!--Video Section-->
      <section v-if="videoUrl" class="bg-grey-lightest border-b">
        <div class="flex justify-center items-center py-24">
          <div class="w-full max-w-lg">
            <h3
              class="text-2xl text-center md:text-left text-grey-darker tracking-wide mb-8"
            >
              Live Video
            </h3>
            <div
              class="fb-video"
              :data-href="videoUrl"
              data-allowfullscreen="true"
              data-width=""
            ></div>
          </div>
        </div>
      </section>
      <!--Come As You Are Section-->
      <section class="md:py-24">
        <div class="flex flex-col-reverse container mx-auto md:flex-row">
          <!--Image-->
          <div class="flex-grow col md:text-right md:mr-4">
            <img
              class="w-full md:w-auto rounded-lg"
              :src="images.comeAsYouAre.url"
            />
          </div>
          <!--Description-->
          <div class="flex-grow m-4 col my-8 md:my-0">
            <h3
              class="text-2xl text-center md:text-left text-grey-darker tracking-wide mb-8"
            >
              Come As You Are
            </h3>
            <p
              class="italic text-grey-darkest text-right leading-normal tracking-wide"
            >
              "I believe; help my unbelief!"
            </p>
            <p class="text-blue font-bold text-sm text-right mt-3">
              - Mark 9:24
            </p>
            <p></p>
            <p class="text-xl mt-4 leading-normal">
              God doesn't want a self-perfecting version of ourselves. It is our
              vulnerable, repentant hearts that bring us closer to Him through
              His Spirit. With His power, we can cultivate a boldness to beat
              back sin.
            </p>
          </div>
        </div>
      </section>
      <!--Worship Through Generosity Section-->
      <section class="section-pattern-light shadow-inner">
        <div class="container px-4 py-8 text-center lg:w-2/3 light">
          <h3 class="mb-8 text-2xl tracking-wide text-blue-darkest">
            Worship Through Generosity
          </h3>
          <p
            class="my-8 text-3xl sm:text-5xl font-light leading-normal sm:leading-tight text-blue-darker"
          >
            Generosity is paramount in our sanctification as followers of
            Christ, who is eternally gracious to us as His adopted sons and
            daughters.
          </p>
          <p class="text-xl pt-8 font-light italic text-blue-darkest">
            We believe in the practice of grace together as a family.
          </p>
        </div>
      </section>
      <!--Simple Obedience Section-->
      <section class="py-0 md:py-24">
        <div class="container">
          <div class="flex flex-col md:flex-row">
            <!--Description-->
            <div class="flex-grow m-4 md:text-right col my-8 md:my-0">
              <h3
                class="text-2xl text-center md:text-left text-grey-darker tracking-wide mb-8"
              >
                Simple Obedience
              </h3>
              <p
                class="italic text-grey-darkest text-right leading-normal tracking-wide"
              >
                "Be still and know that I am God."
              </p>
              <p class="text-blue font-bold text-sm text-right mt-3">
                - Psalm 46:10
              </p>
              <p></p>
              <p class="text-xl mt-4 leading-normal">
                Simple living and worship is an intentional acknowledgment of
                our dependance on Christ. Not only does it prevent us from
                getting lost in rituals and religious activities, it naturally
                guides us by simply asking,
              </p>
              <p
                class="tracking-wide text-2xl mt-2 font-light italic text-grey-darker"
              >
                "Does this advance our mission of spreading the Gospel or
                equipping the saints?"
              </p>
            </div>
            <!--Image-->
            <div class="flex-grow col md:ml-4">
              <img
                class="w-full md:w-auto rounded-lg"
                :src="images.simpleObedience.url"
              />
            </div>
          </div>
        </div>
      </section>
      <!--A Church That Relects Its Community Section-->
      <section class="section-pattern text-blue-lightest shadow-inner">
        <div class="container mx-auto px-4 py-8 text-center lg:w-2/3">
          <h3 class="mb-8 text-2xl tracking-wide text-white">
            A Church That Reflects Its Community
          </h3>
          <p
            class="my-8 text-3xl sm:text-5xl font-light leading-normal sm:leading-tight text-blue-lightest"
          >
            There are no boundaries in a Christ-driven community. If he is over
            all and in all, then His Church is to reflect the beauty of the
            diversity of His creation.
          </p>
          <p class="text-xl font-light pt-6 text-blue-lighter">
            — We desire to represent
            <em>all</em> of Pampa, TX.
          </p>
        </div>
      </section>
      <!--Living Sent Section-->
      <section class="py-0 md:py-24">
        <div class="container">
          <div class="flex flex-col md:flex-row">
            <div class="flex-grow mb-4 col md:text-right md:mr-4">
              <img
                class="w-full md:w-auto rounded-lg"
                src="https://res.cloudinary.com/dqgcfqzpk/image/upload/c_scale,h_1200,w_892/v1531363292/redeemer-pampa/living-sent.jpg"
              />
            </div>
            <div class="flex-grow m-4 col my-8 md:my-0">
              <h3
                class="text-2xl text-center md:text-left text-grey-darker tracking-wide mb-8"
              >
                Living Sent
              </h3>
              <p
                class="italic text-grey-darkest text-right leading-normal tracking-wide"
              >
                "I am the vine; you are the branches. Whoever abides in me and I
                in him, he it is that bears much fruit, for apart from me you
                can do nothing."
              </p>
              <p class="text-blue font-bold text-sm text-right mt-3">
                - John 15:5
              </p>
              <p></p>
              <p class="text-xl mt-4 leading-normal">
                To follow Jesus is to be on mission. As we grow closer to Him
                and allow the Spirit to transform our lives, a boundless love
                for our friends, our family and the strangers among us naturally
                follows.
              </p>
              <p class="text-xl mt-4 leading-normal">
                We will intentionally live our lives as sent-out ones, on
                mission with Jesus at the grocery store, at our jobs, in our
                neighborhoods, and everywhere in between. We will adopt a
                missional lifestyle that says "go and be" and not "come and
                see."
              </p>
            </div>
          </div>
        </div>
      </section>
      <!--Contact Us Section-->
      <section
        class="py-10 px-4 bg-grey-lighter border border-t border-grey-light"
        id="contact-us"
      >
        <div class="container">
          <h3
            class="mt-4 mb-2 text-2xl text-grey-darker tracking-wide text-center"
          >
            Contact Us
          </h3>
        </div>
        <form
          name="contact"
          method="post"
          data-netlify="true"
          netlify-honeypot="trigger"
          class="w-full max-w-md mx-auto rounded-lg px-2 py-4 md:p-8"
        >
          <input type="hidden" name="form-name" value="contact" />
          <!--First/Last Name Fields-->
          <div class="flex flex-wrap -mx-3">
            <!--First Name Field-->
            <div class="w-full md:w-1/2 px-3 mb-4">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-first-name"
                >First Name</label
              >
              <input
                class="appearance-none block w-full bg-white text-grey-darker border border-grey-light rounded py-3 px-4 leading-tight"
                id="grid-first-name"
                name="firstname"
                type="text"
                placeholder
                autocomplete="given-name"
              />
            </div>
            <!--Last Name Field-->
            <div class="w-full md:w-1/2 px-3 mb-4">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-last-name"
                >Last Name</label
              >
              <input
                class="appearance-none block w-full bg-white text-grey-darker border border-grey-light rounded py-3 px-4 leading-tight"
                id="grid-last-name"
                name="lastname"
                type="text"
                placeholder
                autocomplete="family-name"
              />
            </div>
          </div>
          <!--Email Field-->
          <div class="flex flex-wrap -mx-3 mb-4">
            <div class="w-full px-3">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-email"
                >Email</label
              >
              <input
                class="appearance-none block w-full bg-white text-grey-darker border border-grey-light rounded py-3 px-4 leading-tight"
                id="grid-email"
                name="email"
                type="email"
                placeholder
                autocomplete="email"
              />
            </div>
          </div>
          <!--Message Field-->
          <div class="flex flex-wrap -mx-3 mb-4">
            <div class="w-full px-3">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-message"
                >Message</label
              >
              <textarea
                class="appearance-none block w-full bg-white text-grey-darker border border-grey-light rounded py-3 px-4 mb-2 leading-tight"
                id="grid-message"
                name="message"
                placeholder
                rows="4"
              ></textarea>
            </div>
          </div>
          <div class="flex justify-center mb-4">
            <div data-netlify-recaptcha></div>
          </div>
          <!--Send Button-->
          <button
            class="bg-blue hover:bg-blue-dark text-white font-bold w-full py-2 px-4 rounded"
            type="submit"
          >
            Send
          </button>
        </form>
      </section>
      <!--Map Section-->
      <section id="map">
        <google-map
          api-key="AIzaSyAxHjdK3i5GDppHfiNiKLp9MLqd2FpTzrk"
          :center="{
            latitude: churchInfo.latitude,
            longitude: churchInfo.longitude,
          }"
          :style="{ height: '500px' }"
        >
          <div slot="infoWindow">
            <h3 class="text-lg text-grey-darkest mb-2">
              {{ churchInfo.name }}
            </h3>
            <div class="flex items-center mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                class="w-3 h-3 text-grey-dark fill-current"
              >
                <path
                  d="M10 20S3 10.87 3 7a7 7 0 1 1 14 0c0 3.87-7 13-7 13zm0-11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
                ></path>
              </svg>
              <span class="text-grey-darkest ml-2">{{ churchAddress }}</span>
            </div>
            <div class="flex items-center mb-2">
              <i class="fa fa-phone"></i>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                class="w-3 h-3 text-grey-dark fill-current"
              >
                <path
                  d="M20 18.35V19a1 1 0 0 1-1 1h-2A17 17 0 0 1 0 3V1a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4c0 .56-.31 1.31-.7 1.7L3.16 8.84c1.52 3.6 4.4 6.48 8 8l2.12-2.12c.4-.4 1.15-.71 1.7-.71H19a1 1 0 0 1 .99 1v3.35z"
                ></path>
              </svg>
              <span class="text-grey-darkest ml-2">{{ churchInfo.phone }}</span>
            </div>
            <div class="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                class="w-3 h-3 text-grey-dark fill-current"
              >
                <path
                  d="M18 2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2h16zm-4.37 9.1L20 16v-2l-5.12-3.9L20 6V4l-10 8L0 4v2l5.12 4.1L0 14v2l6.37-4.9L10 14l3.63-2.9z"
                ></path>
              </svg>
              <a
                :href="`mail-to:${churchInfo.email}`"
                class="text-blue-dark no-underline ml-2"
                >{{ churchInfo.email }}</a
              >
            </div>
          </div>
        </google-map>
      </section>
    </div>
  </div>
</template>

<script>
import HeroSection from '../components/HeroSection';
import GoogleMap from '../components/GoogleMap';
import homeContent from '@/content/pages/home.json';

export default {
  name: 'Home',
  components: {
    HeroSection,
    GoogleMap,
  },
  data() {
    const { videoUrl, churchInfo } = homeContent;
    const { street, city, state, zip } = churchInfo.address;
    return {
      videoUrl,
      churchInfo,
      churchAddress: `${street}, ${city}, ${state} ${zip}`,
      images: {
        comeAsYouAre: {
          url: 'https://res.cloudinary.com/dqgcfqzpk/image/upload/c_scale,w_900/v1530721622/redeemer-pampa/Baptism-1.jpg',
          alt: 'Come as you are',
        },
        simpleObedience: {
          url: 'https://res.cloudinary.com/dqgcfqzpk/image/upload/w_900,ar_1:1,c_fill,g_auto,e_art:hokusai/v1632009052/redeemer-pampa/redeemerborger.jpg',
          alt: 'Simple obedience',
        },
      },
    };
  },
};
</script>

<style scoped>
.main-content {
  background-color: rgba(255, 255, 255, 0.97);
}
.section-pattern,
.section-pattern-light {
  padding-top: 6em;
  padding-bottom: 6em;
}

.section-pattern {
  background-color: #2779bd;
  background-image: url("data:image/svg+xml,%3Csvg width='84' height='84' viewBox='0 0 84 84' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233490dc' fill-opacity='0.4'%3E%3Cpath d='M84 23c-4.417 0-8-3.584-8-7.998V8h-7.002C64.58 8 61 4.42 61 0H23c0 4.417-3.584 8-7.998 8H8v7.002C8 19.42 4.42 23 0 23v38c4.417 0 8 3.584 8 7.998V76h7.002C19.42 76 23 79.58 23 84h38c0-4.417 3.584-8 7.998-8H76v-7.002C76 64.58 79.58 61 84 61V23zM59.05 83H43V66.95c5.054-.5 9-4.764 9-9.948V52h5.002c5.18 0 9.446-3.947 9.95-9H83v16.05c-5.054.5-9 4.764-9 9.948V74h-5.002c-5.18 0-9.446 3.947-9.95 9zm-34.1 0H41V66.95c-5.053-.502-9-4.768-9-9.948V52h-5.002c-5.184 0-9.447-3.946-9.95-9H1v16.05c5.053.502 9 4.768 9 9.948V74h5.002c5.184 0 9.447 3.946 9.95 9zm0-82H41v16.05c-5.054.5-9 4.764-9 9.948V32h-5.002c-5.18 0-9.446 3.947-9.95 9H1V24.95c5.054-.5 9-4.764 9-9.948V10h5.002c5.18 0 9.446-3.947 9.95-9zm34.1 0H43v16.05c5.053.502 9 4.768 9 9.948V32h5.002c5.184 0 9.447 3.946 9.95 9H83V24.95c-5.053-.502-9-4.768-9-9.948V10h-5.002c-5.184 0-9.447-3.946-9.95-9zM50 50v7.002C50 61.42 46.42 65 42 65c-4.417 0-8-3.584-8-7.998V50h-7.002C22.58 50 19 46.42 19 42c0-4.417 3.584-8 7.998-8H34v-7.002C34 22.58 37.58 19 42 19c4.417 0 8 3.584 8 7.998V34h7.002C61.42 34 65 37.58 65 42c0 4.417-3.584 8-7.998 8H50z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

.section-pattern-light {
  background-color: #eff8ff;
  background-image: url("data:image/svg+xml,%3Csvg width='84' height='84' viewBox='0 0 84 84' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23bcdefa' fill-opacity='0.43'%3E%3Cpath d='M84 23c-4.417 0-8-3.584-8-7.998V8h-7.002C64.58 8 61 4.42 61 0H23c0 4.417-3.584 8-7.998 8H8v7.002C8 19.42 4.42 23 0 23v38c4.417 0 8 3.584 8 7.998V76h7.002C19.42 76 23 79.58 23 84h38c0-4.417 3.584-8 7.998-8H76v-7.002C76 64.58 79.58 61 84 61V23zM59.05 83H43V66.95c5.054-.5 9-4.764 9-9.948V52h5.002c5.18 0 9.446-3.947 9.95-9H83v16.05c-5.054.5-9 4.764-9 9.948V74h-5.002c-5.18 0-9.446 3.947-9.95 9zm-34.1 0H41V66.95c-5.053-.502-9-4.768-9-9.948V52h-5.002c-5.184 0-9.447-3.946-9.95-9H1v16.05c5.053.502 9 4.768 9 9.948V74h5.002c5.184 0 9.447 3.946 9.95 9zm0-82H41v16.05c-5.054.5-9 4.764-9 9.948V32h-5.002c-5.18 0-9.446 3.947-9.95 9H1V24.95c5.054-.5 9-4.764 9-9.948V10h5.002c5.18 0 9.446-3.947 9.95-9zm34.1 0H43v16.05c5.053.502 9 4.768 9 9.948V32h5.002c5.184 0 9.447 3.946 9.95 9H83V24.95c-5.053-.502-9-4.768-9-9.948V10h-5.002c-5.184 0-9.447-3.946-9.95-9zM50 50v7.002C50 61.42 46.42 65 42 65c-4.417 0-8-3.584-8-7.998V50h-7.002C22.58 50 19 46.42 19 42c0-4.417 3.584-8 7.998-8H34v-7.002C34 22.58 37.58 19 42 19c4.417 0 8 3.584 8 7.998V34h7.002C61.42 34 65 37.58 65 42c0 4.417-3.584 8-7.998 8H50z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}
</style>
