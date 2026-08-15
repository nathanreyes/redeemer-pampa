<script setup lang="ts">
/**
 * The giving form is embedded directly from Amplify (formerly easyTithe).
 *
 * Two things about the URL matter. It points at giving.myamplify.io rather
 * than the old easytithe.com link: that link 302s here anyway, but its first
 * hop sends `X-Frame-Options: sameorigin`, which a browser refuses to frame
 * even though the final page allows it. And the final page sends
 * `frame-ancestors https:` with no X-Frame-Options, so it permits embedding
 * from any HTTPS origin — no snippet from their admin portal is needed.
 *
 * The link-out stays regardless. Payment iframes are the single most likely
 * thing to be blocked by a visitor's extensions or privacy settings, and
 * giving should never be a dead end.
 */
const givingUrl = 'https://giving.myamplify.io/app/giving/rede225179';

useHead({ title: 'Giving — Redeemer Pampa' });
</script>

<template>
  <div class="mx-auto max-w-[110rem] px-5 pb-32 pt-12 sm:px-8 sm:pt-20">
    <p class="eyebrow text-earth-400">Giving</p>
    <h1 id="motivation" class="mt-6 text-colossal text-earth-900">Motivation</h1>

    <div class="horizon mt-14 text-earth-900"></div>

    <section class="grid gap-x-12 gap-y-6 py-14 lg:grid-cols-12">
      <p class="eyebrow text-earth-400 lg:col-span-3">Why we give</p>
      <div class="lg:col-span-9">
        <p class="measure text-earth-600">
          We desire to be generous as a church family — in our time, resources,
          talents, energy, relationships, and in our finances. We want to be
          reminded that all of life is worship.
        </p>
        <p class="measure mt-5 text-earth-600">
          We don’t want you to give out of compulsion or guilt but instead to
          give generously, cheerfully as an act of worship and in light of God’s
          abundant generosity (II Corinthians 9:7). Giving stirs our affections
          for and trust in Jesus as our provider.
        </p>
      </div>
    </section>

    <div class="horizon text-earth-900/25"></div>

    <section class="grid gap-x-12 gap-y-6 py-14 lg:grid-cols-12">
      <h2 id="methods" class="text-section text-earth-900 lg:col-span-3">Methods</h2>
      <div class="lg:col-span-9">
        <ol class="measure space-y-6 text-earth-600">
          <li class="flex gap-5">
            <span class="display shrink-0 text-2xl text-earth-300">I</span>
            <span>
              There is a basket at the back of the worship area at Redeemer
              Pampa where you can leave your offering or tithe.
            </span>
          </li>
          <li class="flex gap-5">
            <span class="display shrink-0 text-2xl text-earth-300">II</span>
            <span>You can give online, using the form below.</span>
          </li>
        </ol>
      </div>
    </section>

    <!-- ============ GIVE ONLINE ============ -->
    <section id="give-online" class="pt-6">
      <div class="horizon text-earth-900"></div>

      <div class="flex flex-wrap items-baseline justify-between gap-4 pt-8">
        <h2 class="text-section text-earth-900">Give online</h2>
        <a
          :href="givingUrl"
          target="_blank"
          rel="noopener"
          class="eyebrow border-b-2 border-wheat-500 pb-1 hover:text-wheat-600"
        >
          Open in a new tab →
        </a>
      </div>

      <p class="measure mt-4 text-sm text-earth-400">
        Giving is handled by Amplify. If the form below doesn’t appear, some
        browsers and privacy extensions block embedded payment forms — use the
        link above and it will open directly.
      </p>

      <div class="mt-8 border border-earth-900/15 bg-white">
        <iframe
          :src="givingUrl"
          title="Give to Redeemer Pampa"
          class="h-[52rem] w-full"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  </div>
</template>
