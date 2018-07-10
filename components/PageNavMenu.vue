<template>
  <div
    class='hidden md:flex justify-center text-sm items-center pt-6'
    >
    <transition
      name='menu'
      appear
      >
      <ul
        class='list-reset flex'>
        <li
          v-for='menuItem in menuItems'
          :key='menuItem.title'
          class='breadcrumb'>
          <a
            href='#'
            :class='menuItemClass'
            v-scroll-to='menuItem.url'>
            {{ menuItem.title }}
          </a>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    menuItems: Array,
  },
  data() {
    return {
      menuItemClass:
        'mx-4 no-underline font-semibold tracking-wide text-blue-dark',
    };
  },
};
</script>

<style scoped>
.breadcrumb:not(:first-child)::before {
  color: '#dadada';
  content: '\0002f';
}

.menu-enter-active,
.menu-leave-active {
  transition: all 0.3s ease-in-out;
  transition-delay: 0.2s;
}

.menu-enter,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>