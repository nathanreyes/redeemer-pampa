<template>
  <div class='bg-blue py-8'>
    <div class='container mx-auto text-white'>
      <div class='w-full'>
        <div class='flex justify-between my-8'>
          <div
            v-for='menu in menus'
            :key='menu.header'
            :class='colClass'>
            <span
              :class='headingClass'>
              {{ menu.header }}
            </span>
            <a
              v-for='submenu in menu.submenus'
              :key='submenu.title'
              :class='subheadingClass'
              :href='submenu.url'>
              {{ submenu.title }}
            </a>
          </div>
        </div>
        <div class='flex justify-center text-blue-light pt-6 border-t border-blue-light'>
          Copyright © 2018 Redeemer Pampa. All rights reserved.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menus: [
        {
          header: 'Services & Staff',
          submenus: [
            {
              title: 'Subheading 1',
              url: '/services#subheading1',
            },
            {
              title: 'Subheading 2',
              url: '/services#subheading2',
            },
          ],
        },
        {
          header: 'Gospel Communities',
          submenus: [
            {
              title: 'Subheading 1',
              url: '/gospel-communities#subheading1',
            },
            {
              title: 'Subheading 2',
              url: '/gospel-communities#subheading2',
            },
          ],
        },
        {
          header: 'Contact',
          submenus: [
            {
              title: 'Subheading 1',
              url: '/contact#subheading1',
            },
            {
              title: 'Subheading 2',
              url: '/contact#subheading2',
            },
          ],
        },
        {
          header: 'Giving',
          submenus: [
            {
              title: 'Subheading 1',
              url: '/contact#subheading1',
            },
            {
              title: 'Subheading 2',
              url: '/contact#subheading2',
            },
          ],
        },
      ],
      colClass: 'flex flex-col col',
      headingClass: 'text-xl text-blue-lightest font-light mb-4',
      subheadingClass: 'link font-semibold mb-2 text-white',
    };
  },
};
</script>

<style>
.col {
  flex-basis: 200px;
}
</style>