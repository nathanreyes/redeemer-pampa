<script setup lang="ts">
/**
 * The Redeemer Pampa mark: an R whose left vertical doubles as a cross.
 *
 * Abstracted from the church's older logo, which set a serif R with an ornate
 * fleury cross for its stem inside a brushed square frame. Everything
 * decorative is stripped — the frame, the flared terminals, the beige — and
 * what remains is the idea itself: one stroke that is both the letter and the
 * cross, drawn to match the condensed display face.
 *
 * The crossbar also rhymes with the horizon rule used throughout the site, so
 * the mark carries no rules of its own; it would double the motif.
 *
 * Draws in `currentColor`, so it inherits from whatever it sits in.
 */
</script>

<template>
  <svg viewBox="0 0 86 116" fill="none" aria-hidden="true" focusable="false">
    <!-- Cross vertical, overshooting the letter top and bottom -->
    <rect x="16" y="0" width="18" height="116" fill="currentColor" />
    <!-- Crossbar, set at the shoulder just clear of the bowl -->
    <rect x="0" y="16" width="52" height="15" fill="currentColor" />
    <!-- Bowl and leg, with the counter cut by the even-odd rule -->
    <path
      fill="currentColor"
      fill-rule="evenodd"
      d="M34 36 L58 36
         C70 36 78 42 78 55
         C78 66 71 72 60 74
         L84 100 L60 100 L42 76 L34 76 Z
         M34 48 L57 48
         C63 48 66 50 66 55
         C66 60 63 62 57 62
         L34 62 Z"
    />
  </svg>
</template>
