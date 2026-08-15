<script setup lang="ts">
import content from '~~/content/pages/home.json';

const { churchInfo, bannerMessage } = content;

// Alternating sections: the IMAGE side alternates, the text stays left-aligned
// throughout. The old site alternated the text too, which left a whole
// paragraph of body copy ragged-left and hard to read.
const sections = [
  {
    id: 'come-as-you-are',
    title: 'Come As You Are',
    quote: 'I believe; help my unbelief!',
    reference: 'Mark 9:24',
    body: [
      "God doesn't want a self-perfecting version of ourselves. It is our vulnerable, repentant hearts that bring us closer to Him through His Spirit. With His power, we can cultivate a boldness to beat back sin.",
    ],
    image: {
      src: 'https://res.cloudinary.com/do3iknsvm/image/upload/q_auto,f_auto,w_900,ar_4:3,c_fill,g_auto/v1776817270/dan-clara.jpg',
      alt: 'Members of Redeemer Pampa gathered outdoors around a baptism',
    },
  },
  {
    id: 'simple-obedience',
    title: 'Simple Obedience',
    quote: 'Be still and know that I am God.',
    reference: 'Psalm 46:10',
    body: [
      'Simple living and worship is an intentional acknowledgment of our dependence on Christ. Not only does it prevent us from getting lost in rituals and religious activities, it naturally guides us by simply asking,',
      'Does this advance our mission of spreading the Gospel or equipping the saints?',
    ],
    image: {
      src: 'https://res.cloudinary.com/do3iknsvm/image/upload/q_auto,f_auto,w_900,ar_4:3,c_fill,g_auto/v1749519929/redeemerborger.jpg',
      alt: 'The congregation standing together in prayer during a service',
    },
  },
  {
    id: 'living-sent',
    title: 'Living Sent',
    quote:
      'I am the vine; you are the branches. Whoever abides in me and I in him, he it is that bears much fruit, for apart from me you can do nothing.',
    reference: 'John 15:5',
    body: [
      'To follow Jesus is to be on mission. As we grow closer to Him and allow the Spirit to transform our lives, a boundless love for our friends, our family and the strangers among us naturally follows.',
      'We will intentionally live our lives as sent-out ones, on mission with Jesus at the grocery store, at our jobs, in our neighborhoods, and everywhere in between.',
    ],
    image: {
      src: 'https://res.cloudinary.com/do3iknsvm/image/upload/q_auto,f_auto,w_900,ar_4:3,c_fill,g_auto/v1749519928/living-sent.jpg',
      alt: 'Volunteers of all ages packing grocery bags to give away',
    },
  },
];

// Plain Google Maps URL — no API key, no SDK, works on every device.
const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${churchInfo.latitude},${churchInfo.longitude}`;

const hero =
  'https://res.cloudinary.com/do3iknsvm/image/upload/q_auto,f_auto,c_scale,w_1800/v1749519927/group-prayer-edit.jpg';
const heroSmall =
  'https://res.cloudinary.com/do3iknsvm/image/upload/q_auto,f_auto,c_scale,w_900/v1749519927/group-prayer-edit.jpg';
</script>

<template>
  <div>
    <!-- Hero. A real <img> rather than a CSS background, so it can carry
         srcset and be preloaded as the LCP element. -->
    <section class="relative isolate">
      <img
        :src="hero"
        :srcset="`${heroSmall} 900w, ${hero} 1800w`"
        sizes="100vw"
        width="1800"
        height="1200"
        alt="The congregation gathered in prayer"
        fetchpriority="high"
        decoding="async"
        class="absolute inset-0 -z-10 size-full object-cover object-top"
      />
      <div class="absolute inset-0 -z-10 bg-ink-900/65"></div>

      <div class="mx-auto flex min-h-[32rem] max-w-6xl flex-col justify-center px-5 py-24 sm:min-h-[38rem]">
        <p class="text-sm font-semibold uppercase tracking-[0.2em] text-brand-200">
          An Acts 29 church in Pampa, Texas
        </p>
        <h1 class="mt-6 max-w-3xl font-display text-display font-medium text-white">
          {{ bannerMessage }}
        </h1>
        <p class="mt-8 text-lede text-brand-100">{{ churchInfo.serviceTime }}</p>

        <div class="mt-10 flex flex-wrap gap-3">
          <NuxtLink
            to="/sermons"
            class="rounded-md bg-white px-5 py-3 text-sm font-semibold text-brand-900 transition hover:bg-brand-50"
          >
            Listen to a sermon
          </NuxtLink>
          <NuxtLink
            to="/connect"
            class="rounded-md border border-white/40 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Plan a visit
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Alternating content sections -->
    <div class="mx-auto max-w-6xl px-5">
      <section
        v-for="(section, i) in sections"
        :id="section.id"
        :key="section.id"
        class="grid items-center gap-10 border-b border-ink-100 py-20 md:grid-cols-2 md:gap-16"
      >
        <div :class="i % 2 === 1 ? 'md:order-2' : ''">
          <img
            :src="section.image.src"
            :alt="section.image.alt"
            width="900"
            height="675"
            loading="lazy"
            decoding="async"
            class="aspect-[4/3] w-full rounded-lg object-cover"
          />
        </div>

        <div :class="i % 2 === 1 ? 'md:order-1' : ''">
          <h2 class="text-title font-medium">{{ section.title }}</h2>
          <blockquote class="mt-6 border-l-2 border-brand-500 pl-5">
            <p class="font-display text-lg italic text-ink-600">“{{ section.quote }}”</p>
            <cite class="mt-2 block text-sm font-semibold not-italic text-brand-700">
              {{ section.reference }}
            </cite>
          </blockquote>
          <p
            v-for="para in section.body"
            :key="para"
            class="prose-measure mt-5 text-ink-600"
          >
            {{ para }}
          </p>
        </div>
      </section>
    </div>

    <!-- Visit / contact. The old site had a Netlify Forms contact form and an
         embedded Google map; neither survives the move off Netlify, and the map
         cost an API key plus an SDK on every page. Direct details and a
         directions link do the same job with no third party involved. -->
    <section id="visit" class="border-b border-ink-100 bg-ink-50 py-20">
      <div class="mx-auto max-w-6xl px-5">
        <h2 class="text-title font-medium">Visit us</h2>
        <div class="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 class="font-sans text-sm font-semibold uppercase tracking-wider text-brand-700">
              Gatherings
            </h3>
            <p class="mt-3 text-ink-600">{{ churchInfo.serviceTime }}</p>
          </div>

          <div>
            <h3 class="font-sans text-sm font-semibold uppercase tracking-wider text-brand-700">
              Where
            </h3>
            <p class="mt-3 text-ink-600">
              {{ churchInfo.address.street }}<br />
              {{ churchInfo.address.city }}, {{ churchInfo.address.state }}
              {{ churchInfo.address.zip }}
            </p>
            <a
              :href="directionsUrl"
              target="_blank"
              rel="noopener"
              class="mt-3 inline-block text-sm font-semibold text-brand-700 underline"
            >
              Get directions
            </a>
          </div>

          <div>
            <h3 class="font-sans text-sm font-semibold uppercase tracking-wider text-brand-700">
              Get in touch
            </h3>
            <p class="mt-3 text-ink-600">
              <a :href="`tel:${churchInfo.phone}`" class="hover:text-brand-700">
                {{ churchInfo.phone }}
              </a>
            </p>
            <p class="mt-1 break-words text-ink-600">
              <a :href="`mailto:${churchInfo.email}`" class="hover:text-brand-700">
                {{ churchInfo.email }}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Pull quote. Flat field, no tiled SVG pattern. -->
    <section class="bg-brand-900 py-24">
      <div class="mx-auto max-w-4xl px-5 text-center">
        <p class="text-sm font-semibold uppercase tracking-[0.2em] text-brand-200">
          A church that reflects its community
        </p>
        <p class="mt-8 font-display text-title font-light leading-tight text-white">
          There are no boundaries in a Christ-driven community. If he is over all
          and in all, then His Church is to reflect the beauty of the diversity of
          His creation.
        </p>
        <p class="mt-8 text-brand-200">
          We desire to represent <em>all</em> of Pampa, Texas.
        </p>
      </div>
    </section>
  </div>
</template>
