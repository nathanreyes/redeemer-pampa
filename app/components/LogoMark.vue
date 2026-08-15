<script setup lang="ts">
/**
 * The Redeemer Pampa mark: a grotesque R standing on the horizon rule that
 * divides every section of this site. Modernised from the old serif R, and
 * redrawn to match the condensed display face rather than the body serif.
 *
 * Draws in `currentColor`, so it inherits from whatever it sits in.
 *
 * `horizon` is optional because the header's own rule already acts as a
 * horizon — doubling the motif there reads as noise.
 */
withDefaults(defineProps<{ horizon?: boolean }>(), { horizon: true });

// Single source of truth for the letterform, shared by both variants.
const R =
  'M0 0L40 0C56 0 66 9 66 24C66 37 58 45 45 47L70 88L48 88L26 51L16 51L16 88L0 88Z' +
  'M16 14L38 14C46 14 50 18 50 24C50 30 46 35 38 35L16 35Z';
</script>

<template>
  <svg
    v-if="horizon"
    viewBox="0 0 70 112"
    fill="none"
    aria-hidden="true"
    focusable="false"
  >
    <path :d="R" fill="currentColor" fill-rule="evenodd" />
    <rect y="96" width="70" height="7" fill="currentColor" />
    <rect y="108" width="70" height="3" fill="currentColor" />
  </svg>

  <svg v-else viewBox="-4 -4 78 96" fill="none" aria-hidden="true" focusable="false">
    <path :d="R" fill="currentColor" fill-rule="evenodd" />
  </svg>
</template>
