<script setup lang="ts">
import { usePlayer } from '~/stores/player';

const player = usePlayer();

const pct = computed(() =>
  player.total ? Math.min(100, (player.elapsed / player.total) * 100) : 0,
);

const scrub = (event: Event) => {
  const value = Number((event.target as HTMLInputElement).value);
  player.seek((value / 100) * player.total);
};
</script>

<template>
  <Transition
    enter-active-class="transition-transform duration-300 ease-out"
    enter-from-class="translate-y-full"
    leave-active-class="transition-transform duration-200 ease-in"
    leave-to-class="translate-y-full"
  >
    <div
      v-if="player.current"
      class="fixed inset-x-0 bottom-0 z-50 bg-earth-900 text-sky-100"
      role="region"
      aria-label="Sermon player"
    >
      <!-- Progress runs edge to edge along the top, reading as a horizon. -->
      <div class="relative h-1 w-full bg-sky-100/15">
        <div class="h-full bg-wheat-500 transition-[width] duration-200" :style="{ width: `${pct}%` }"></div>
        <label class="sr-only" for="player-scrub">Seek</label>
        <input
          id="player-scrub"
          type="range"
          min="0"
          max="100"
          step="0.1"
          :value="pct"
          class="absolute inset-x-0 -top-2 h-5 w-full cursor-pointer opacity-0"
          @input="scrub"
        />
      </div>

      <div class="mx-auto flex max-w-[110rem] items-center gap-4 px-5 py-3 sm:px-8">
        <button
          class="flex size-11 shrink-0 items-center justify-center border border-sky-100/25 text-sky-100 transition-colors hover:border-wheat-500 hover:text-wheat-500"
          :aria-label="player.playing ? 'Pause' : 'Play'"
          @click="player.toggle()"
        >
          <svg v-if="player.waiting" class="size-5 animate-spin" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="2" opacity=".25" />
            <path d="M18 10a8 8 0 0 0-8-8" stroke="currentColor" stroke-width="2" />
          </svg>
          <svg v-else-if="player.playing" class="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <rect x="4" y="3" width="4" height="14" /><rect x="12" y="3" width="4" height="14" />
          </svg>
          <svg v-else class="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M5 3l12 7-12 7z" />
          </svg>
        </button>

        <div class="min-w-0 flex-1">
          <p class="truncate text-sm font-semibold text-sky-100">{{ player.current.title }}</p>
          <p class="eyebrow truncate text-earth-400">
            {{ player.current.leader }}
            <span v-if="player.current.series"> · {{ player.current.series }}</span>
          </p>
        </div>

        <p v-if="player.failed" class="eyebrow shrink-0 text-wheat-500">Couldn’t play</p>
        <p v-else class="eyebrow hidden shrink-0 tabular-nums text-earth-400 sm:block">
          {{ formatTime(player.elapsed) }} / {{ formatTime(player.total) }}
        </p>

        <div class="flex shrink-0 items-center gap-1">
          <button
            class="hidden size-9 items-center justify-center text-earth-400 hover:text-sky-100 sm:flex"
            aria-label="Back 15 seconds"
            @click="player.nudge(-15)"
          >
            <svg class="size-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M10 4V1L5 5l5 4V6a5 5 0 1 1-5 5H3a7 7 0 1 0 7-7z" />
            </svg>
          </button>
          <button
            class="hidden size-9 items-center justify-center text-earth-400 hover:text-sky-100 sm:flex"
            aria-label="Forward 30 seconds"
            @click="player.nudge(30)"
          >
            <svg class="size-4 -scale-x-100" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M10 4V1L5 5l5 4V6a5 5 0 1 1-5 5H3a7 7 0 1 0 7-7z" />
            </svg>
          </button>
          <button
            class="flex size-9 items-center justify-center text-earth-400 hover:text-sky-100"
            aria-label="Close player"
            @click="player.close()"
          >
            <svg class="size-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M2.3 1.2 18.8 17.7l-1.1 1.1L1.2 2.3zM18.8 2.3 2.3 18.8l-1.1-1.1L17.7 1.2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>
