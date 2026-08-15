<script setup lang="ts">
/**
 * The Redeemer Pampa mark, redrawn from the church's original logo: a serif R
 * whose left stem is a cross with pointed fleury terminals, inside a square
 * frame.
 *
 * Same composition as the original — the brush texture, the spatter, the
 * drop shadows and the beige are gone, and every stroke is a solid fill.
 *
 * The crossbar's right arm ends inside the bowl's counter with clear space
 * around it, as in the original. Reaching further merges it into the bowl and
 * the arrowhead disappears.
 *
 * Draws in `currentColor`, so it inherits from whatever it sits in.
 */
withDefaults(defineProps<{ framed?: boolean }>(), { framed: true });
</script>

<template>
  <svg
    :viewBox="framed ? '0 0 200 200' : '26 20 158 154'"
    fill="none"
    aria-hidden="true"
    focusable="false"
  >
    <rect
      v-if="framed"
      x="10"
      y="10"
      width="180"
      height="180"
      rx="20"
      fill="none"
      stroke="currentColor"
      stroke-width="9"
    />

    <!-- Serif R: bowl, counter and the flared leg -->
    <path
      fill="currentColor"
      fill-rule="evenodd"
      d="M81 31 L110 31 C138 31 156 44 156 65 C156 85 141 97 118 99
         L162 152 C166 158 171 161 178 162 L178 168 L144 168 L112 107 L81 107 Z
         M81 45 L108 45 C126 45 134 53 134 65 C134 78 126 85 108 85 L81 85 Z"
    />

    <!-- Cross vertical, pointed top and bottom -->
    <path
      fill="currentColor"
      d="M72 24 L86 41 L81 41 L81 145 L86 145 L72 162 L58 145 L63 145 L63 41 L58 41 Z"
    />

    <!-- Crossbar, arrowheads left and right -->
    <path
      fill="currentColor"
      d="M30 62 L46 49 L46 55 L106 55 L106 49 L122 62 L106 75 L106 69 L46 69 L46 75 Z"
    />
  </svg>
</template>
