<script setup lang="ts">
/**
 * The Redeemer Pampa mark: an R whose left vertical doubles as a cross.
 *
 * Abstracted from the church's older logo — a serif R with an ornate fleury
 * cross for its stem, inside a brushed square frame. The frame, the flared
 * terminals and the beige are gone; the idea is kept.
 *
 * Two alignments hold it together: the crossbar sits flush with the top of the
 * bowl, so bar and loop read as one continuous horizontal stroke crossing the
 * stem; and the stem and the leg stop on a single shared baseline.
 *
 * Draws in `currentColor`, so it inherits from whatever it sits in.
 */
</script>

<template>
  <svg viewBox="0 0 88 110" fill="none" aria-hidden="true" focusable="false">
    <!-- Cross vertical, rising clear of the letter and landing on the baseline -->
    <rect x="16" y="0" width="18" height="110" fill="currentColor" />

    <!-- Crossbar. Stops at the stem's right edge, where the bowl takes over —
         together they form one unbroken horizontal. -->
    <rect x="0" y="26" width="34" height="14" fill="currentColor" />

    <!-- Bowl and leg. Counter cut by the even-odd rule. -->
    <path
      fill="currentColor"
      fill-rule="evenodd"
      d="M34 26 L56 26
         C70 26 80 34 80 53
         C80 70 72 78 58 80
         L84 110 L60 110 L44 82 L34 82 Z
         M34 40 L55 40
         C62 40 66 44 66 53
         C66 62 62 66 55 66
         L34 66 Z"
    />
  </svg>
</template>
