<script setup lang="ts">
import content from '~~/content/pages/home.json';
import latest from '~~/content/sermons/latest.json';
import { usePlayer, type Track } from '~/stores/player';

const { churchInfo, bannerMessage } = content;

const player = usePlayer();

const latestTrack: Track = {
  id: latest.guid || latest.audioUrl,
  title: latest.title,
  leader: latest.leader,
  series: latest.series,
  date: latest.date,
  audioUrl: latest.audioUrl,
  duration: latest.duration,
};

const isLatest = computed(() => player.current?.id === latestTrack.id);
const latestDate = new Date(latest.date).toLocaleDateString('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
});

// Photography is used boldly but rarely: full-bleed bands, each acting as the
// land beneath a horizon rule. Wide crops, because this is a landscape.
const land = {
  prayer: {
    wide: photo('v1749519927/group-prayer-edit.jpg', { ar: '21:9', w: 2400 }),
    narrow: photo('v1749519927/group-prayer-edit.jpg', { ar: '4:3', w: 1000 }),
    alt: 'The congregation of Redeemer Pampa gathered in prayer',
  },
  sent: {
    wide: photo('v1749519928/living-sent.jpg', { ar: '21:9', w: 2400 }),
    narrow: photo('v1749519928/living-sent.jpg', { ar: '4:3', w: 1000 }),
    alt: 'Volunteers of all ages packing grocery bags to give away',
  },
};

const values = [
  {
    n: 'I',
    id: 'come-as-you-are',
    title: 'Come As You Are',
    quote: 'I believe; help my unbelief!',
    ref: 'Mark 9:24',
    body: [
      "God doesn't want a self-perfecting version of ourselves. It is our vulnerable, repentant hearts that bring us closer to Him through His Spirit. With His power, we can cultivate a boldness to beat back sin.",
    ],
  },
  {
    n: 'II',
    id: 'simple-obedience',
    title: 'Simple Obedience',
    quote: 'Be still and know that I am God.',
    ref: 'Psalm 46:10',
    body: [
      'Simple living and worship is an intentional acknowledgment of our dependence on Christ. Not only does it prevent us from getting lost in rituals and religious activities, it naturally guides us by simply asking,',
      'Does this advance our mission of spreading the Gospel or equipping the saints?',
    ],
  },
  {
    n: 'III',
    id: 'living-sent',
    title: 'Living Sent',
    quote:
      'I am the vine; you are the branches. Whoever abides in me and I in him, he it is that bears much fruit, for apart from me you can do nothing.',
    ref: 'John 15:5',
    body: [
      'To follow Jesus is to be on mission. As we grow closer to Him and allow the Spirit to transform our lives, a boundless love for our friends, our family and the strangers among us naturally follows.',
      'We will intentionally live our lives as sent-out ones, on mission with Jesus at the grocery store, at our jobs, in our neighborhoods, and everywhere in between.',
    ],
  },
];

// The headline is set over this one, so it has to be a photograph with somewhere
// for the type to land: the barn wall fills the upper left, and the baptism
// itself sits low and right. Uncropped, and anchored to the top — the band is
// wider than the frame, so the little that comes off the bottom is all that can
// go without taking her face with it. A 4:3 crop loses her entirely.
//
// No lift here. This one came off a real camera and is properly exposed, so the
// house treatment already leaves it enough range to carry type; lifting it as
// well washes the wall and the shirts out to milk.
const banner = {
  wide: photo('v1786853843/clint-baptism_x5ygc2.jpg', { w: 2400 }),
  // 3:4 rather than the phone's own 9:16: the two of them stand far enough
  // apart that a narrower crop keeps him and loses her.
  narrow: photo('v1786853843/clint-baptism_x5ygc2.jpg', { ar: '3:4', w: 900 }),
  alt: 'A baptism in the barn, the congregation looking on',
};

const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${churchInfo.latitude},${churchInfo.longitude}`;

// Split the banner message so it can be set as stacked display lines.
const headlineLines = ['Nothing', 'outweighs', 'the redeeming', 'work of Jesus', 'on the cross'];
</script>

<template>
  <div>
    <!-- ================= BANNER ================= -->
    <!-- The headline is set on the photograph. The picture is already a duotone
         of the two ground colours, so a scrim weighted to the top reads as the
         same dark field the type sits in, and the baptism surfaces below the
         last line where the scrim thins out. The band is sized so the type
         takes the upper three-fifths and the photograph keeps the rest. -->
    <section class="relative isolate flex min-h-[calc(100svh-3.5rem)] flex-col overflow-hidden bg-earth-900">
      <div class="photo absolute inset-0 -z-10">
        <picture>
          <source :srcset="banner.wide" media="(min-width: 640px)" />
          <img
            :src="banner.narrow"
            :alt="banner.alt"
            width="2400"
            height="1597"
            fetchpriority="high"
            decoding="async"
            class="size-full object-cover object-top"
          />
        </picture>
        <!-- Lightest across the middle, where the baptism is, and heavier at
             the two ends where the small type sits. Tuned to this photograph:
             on a flatter one the same numbers turn the band into a black
             rectangle. -->
        <div class="absolute inset-0 bg-gradient-to-b from-earth-900/70 via-earth-900/45 via-45% to-earth-900/70"></div>
      </div>

      <div class="mx-auto flex w-full max-w-[110rem] flex-1 flex-col px-5 pb-10 pt-12 sm:px-8 sm:pb-14 sm:pt-16">
        <p class="eyebrow rise text-wheat-500" style="animation-delay: 40ms">
          Redeemer Network · Pampa, Texas · Since 2011
        </p>

        <h1 class="mt-6 text-banner text-sky-100 sm:mt-8">
          <span class="sr-only">{{ bannerMessage }}</span>
          <span
            v-for="(line, i) in headlineLines"
            :key="line"
            class="rise block whitespace-nowrap"
            :style="{ animationDelay: `${120 + i * 80}ms` }"
            aria-hidden="true"
          >{{ line }}</span>
        </h1>

        <!-- Pushed to the foot of the band, so the picture is left to itself
             between the last line of the headline and this. Everything here
             sits to the right from `sm` up: she is in the lower left of the
             photograph, and this row was landing on her face. -->
        <div
          class="rise mt-auto flex flex-col gap-4 pt-16 sm:items-end sm:text-right"
          style="animation-delay: 560ms"
        >
          <p class="text-lede font-light text-sky-200">
            {{ churchInfo.serviceTime }} at {{ churchInfo.address.street }}.
          </p>
          <div class="flex flex-wrap items-baseline gap-x-8 gap-y-3 text-sky-100 sm:justify-end">
            <!-- Starts the newest sermon in place rather than sending people to
                 the archive to find it. -->
            <button
              class="eyebrow inline-flex items-center gap-2.5 border-b-2 border-wheat-500 pb-1 hover:text-wheat-300"
              @click="player.play(latestTrack)"
            >
              <svg class="size-3" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <template v-if="isLatest && player.playing">
                  <rect x="4" y="3" width="4" height="14" />
                  <rect x="12" y="3" width="4" height="14" />
                </template>
                <path v-else d="M5 3l12 7-12 7z" />
              </svg>
              {{ isLatest && player.playing ? 'Playing latest' : 'Play latest sermon' }}
            </button>
            <NuxtLink to="/sermons" class="eyebrow border-b-2 border-sky-100/25 pb-1 hover:border-wheat-500">
              All sermons
            </NuxtLink>
            <NuxtLink to="/connect" class="eyebrow border-b-2 border-sky-100/25 pb-1 hover:border-wheat-500">
              Plan a visit
            </NuxtLink>
            <NuxtLink to="/connect#podcast" class="eyebrow border-b-2 border-sky-100/25 pb-1 hover:border-wheat-500">
              Men’s podcast
            </NuxtLink>
          </div>

          <p class="text-sm text-sky-400">
            {{ latest.title }} · {{ latest.leader }} · {{ latestDate }}
            <span v-if="latest.duration"> · {{ formatTime(latest.duration) }}</span>
          </p>
        </div>
      </div>
    </section>

    <!-- ================= VALUES ================= -->
    <div class="mx-auto max-w-[110rem] px-5 sm:px-8">
      <section
        v-for="value in values"
        :id="value.id"
        :key="value.id"
        class="grid gap-x-12 gap-y-6 py-16 sm:py-24 lg:grid-cols-12"
      >
        <!-- Roman numeral in the margin: these are the church's stated values,
             in order, so the numbering carries real information. -->
        <p class="display self-start text-earth-300 lg:col-span-1 text-2xl">{{ value.n }}</p>

        <h2 class="text-section text-earth-900 lg:col-span-4">{{ value.title }}</h2>

        <div class="lg:col-span-7">
          <blockquote class="scripture pl-5">
            <p class="text-lede text-earth-700">{{ value.quote }}</p>
            <cite class="eyebrow mt-3 block not-italic text-wheat-600">{{ value.ref }}</cite>
          </blockquote>
          <p
            v-for="para in value.body"
            :key="para"
            class="measure mt-6 text-earth-600"
          >
            {{ para }}
          </p>
        </div>
      </section>

      <div class="horizon text-earth-900/25"></div>
    </div>

    <!-- ============ GENEROSITY (dark band) ============ -->
    <section class="bg-earth-900 py-24 text-sky-100 sm:py-32">
      <div class="mx-auto max-w-[110rem] px-5 sm:px-8">
        <p class="eyebrow text-wheat-500">Worship Through Generosity</p>
        <p class="mt-8 max-w-[22ch] text-huge">
          Generosity is paramount in our sanctification as followers of Christ.
        </p>
        <p class="measure mt-10 font-light text-sky-300">
          Christ is eternally gracious to us as His adopted sons and daughters.
          We believe in the practice of grace together as a family.
        </p>
      </div>
    </section>

    <!-- ============ LAND: sent ============ -->
    <figure class="photo">
      <picture>
        <source :srcset="land.sent.wide" media="(min-width: 640px)" />
        <img
          :src="land.sent.narrow"
          :alt="land.sent.alt"
          width="2400"
          height="1029"
          loading="lazy"
          decoding="async"
          class="aspect-4/3 w-full object-cover sm:aspect-[21/9]"
        />
      </picture>
    </figure>

    <!-- ============ COMMUNITY ============ -->
    <section class="mx-auto max-w-[110rem] px-5 py-24 sm:px-8 sm:py-32">
      <p class="eyebrow text-earth-400">A Church That Reflects Its Community</p>
      <p class="mt-8 max-w-[20ch] text-huge text-earth-900">
        There are no boundaries in a Christ-driven community.
      </p>
      <p class="measure mt-10 text-earth-600">
        If he is over all and in all, then His Church is to reflect the beauty of
        the diversity of His creation. We desire to represent
        <em class="text-wheat-600 not-italic">all</em> of Pampa, Texas.
      </p>
    </section>

    <!-- ============ LAND: prayer ============ -->
    <figure class="photo">
      <picture>
        <source :srcset="land.prayer.wide" media="(min-width: 640px)" />
        <img
          :src="land.prayer.narrow"
          :alt="land.prayer.alt"
          width="2400"
          height="1029"
          loading="lazy"
          decoding="async"
          class="aspect-4/3 w-full object-cover sm:aspect-[21/9]"
        />
      </picture>
    </figure>

    <!-- ============ VISIT ============ -->
    <section id="visit" class="mx-auto max-w-[110rem] px-5 py-24 sm:px-8 sm:py-32">
      <h2 class="text-section text-earth-900">Visit us</h2>
      <div class="horizon mt-8 text-earth-900/25"></div>

      <dl class="mt-10 grid gap-10 sm:grid-cols-3">
        <div>
          <dt class="eyebrow text-earth-400">Gatherings</dt>
          <dd class="mt-3 text-lede font-light text-earth-800">{{ churchInfo.serviceTime }}</dd>
        </div>
        <div>
          <dt class="eyebrow text-earth-400">Where</dt>
          <dd class="mt-3 text-lede font-light text-earth-800">
            {{ churchInfo.address.street }}<br />
            {{ churchInfo.address.city }}, {{ churchInfo.address.state }}
            {{ churchInfo.address.zip }}
          </dd>
          <a
            :href="directionsUrl"
            target="_blank"
            rel="noopener"
            class="eyebrow mt-4 inline-block border-b-2 border-wheat-500 pb-1 hover:text-wheat-600"
          >
            Get directions
          </a>
        </div>
        <div>
          <dt class="eyebrow text-earth-400">Get in touch</dt>
          <dd class="mt-3 text-lede font-light text-earth-800">
            <a :href="`tel:${churchInfo.phone}`" class="hover:text-wheat-600">{{ churchInfo.phone }}</a><br />
            <a :href="`mailto:${churchInfo.email}`" class="break-words hover:text-wheat-600">
              {{ churchInfo.email }}
            </a>
          </dd>
        </div>
      </dl>
    </section>
  </div>
</template>
