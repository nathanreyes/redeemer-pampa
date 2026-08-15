<script setup lang="ts">
/**
 * The Redeemer Pampa mark: an R whose left vertical doubles as a cross.
 *
 * Abstracted from the church's older logo — a serif R with an ornate fleury
 * cross for its stem, inside a brushed square frame. The frame, the flared
 * terminals and the beige are gone; the idea is kept: one stroke that is both
 * the letter and the cross, and a crossbar that runs through the opening of
 * the R rather than sitting clear of it.
 *
 * Draws in `currentColor`, so it inherits from whatever it sits in.
 */
</script>

<template>
  <svg viewBox="0 0 88 116" fill="none" aria-hidden="true" focusable="false">
    <!-- Cross vertical. Overshoots the letter above and below so the cross
         brackets the R rather than merely leaning on it. -->
    <rect x="16" y="0" width="18" height="116" fill="currentColor" />

    <!-- Bowl and leg. The counter is cut by the even-odd rule so the crossbar
         below can run through it. -->
    <path
      fill="currentColor"
      fill-rule="evenodd"
      d="M34 10 L56 10
         C70 10 80 18 80 37
         C80 54 72 62 58 64
         L84 94 L60 94 L44 66 L34 66 Z
         M34 24 L55 24
         C62 24 66 28 66 37
         C66 46 62 50 55 50
         L34 50 Z"
    />

    <!-- Crossbar, drawn last so it fills the counter it passes through. It
         stops short of the bowl's inner wall, leaving the opening legible. -->
    <rect x="0" y="34" width="48" height="14" fill="currentColor" />
  </svg>
</template>
