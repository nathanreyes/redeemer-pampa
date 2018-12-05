<template>
  <div class="flex flex-col md:flex-row mx-2">
    <div class="md:hidden">
      <div class="w-full md:w-1/3 mb-4 md:mb-0">
        <label
          class="block uppercase tracking-wide text-grey-dark text-xs font-bold mb-3"
          for="item-select"
        >{{ selectLabel }}</label>
        <div class="relative">
          <select
            class="block appearance-none w-full bg-grey-lighter border border-grey-light text-grey-darker py-3 px-4 pr-8 rounded leading-tight"
            id="item-select"
            :value="selectedItem.path"
            @input="selectItem(items.find(item => item.path === $event.target.value))"
          >
            <option v-for="(item, i) in items" :key="i" :value="item.path">{{ item.title }}</option>
          </select>
          <div
            class="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker"
          >
            <svg
              class="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
    <!--Left Sidebar-->
    <div class="w-64 flex-no-shrink hidden md:block">
      <div
        v-for="group in groups"
        :key="group.title"
        class="mr-4 mb-4 bg-grey-lightest p-4 rounded"
      >
        <h3
          class="text-sm text-grey-dark text-center uppercase pb-2"
          v-if="group.title !== 'Default'"
        >{{ group.title }}</h3>
        <ul class="flex flex-col list-reset">
          <li v-for="item in items.filter(item => group.match(item))" :key="item.path" class="mb-2">
            <a
              href="#"
              class="inline-block border rounded text-sm no-underline py-1 px-2"
              :class="{
                'border-blue bg-blue text-white': item.path === selectedItem.path,
                'border-grey-lightest hover:border-grey-lighter hover:bg-grey-lighter text-blue': item.path !== selectedItem.path
              }"
              @click.prevent="selectItem(item)"
            >{{ item.title }}</a>
          </li>
        </ul>
      </div>
    </div>
    <!--Main Content-->
    <div class="relative">
      <transition :name="transitionName">
        <slot :item="selectedItem">
          <p
            class="text-xl pl-4 ml-2 mb-4 text-grey-darker hidden md:block border-l-2 border-blue"
          >{{ selectedItem }}</p>
          <!-- <div :key='selectedItem.title'>
            <p class='text-xl pl-4 ml-2 mb-4 text-grey-darker hidden md:block border-l-2 border-blue'>
              {{ selectedItem.title }}
            </p>
            <p class='flex-grow content bg-grey-lightest border border-grey-light shadow-sm rounded px-6 mx-2 py-4'>
              {{ selectedItem.value.description }}
            </p>
          </div>-->
        </slot>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    groups: {
      type: Array,
      default: () => [
        {
          title: 'Default',
          match: () => true,
        },
      ],
    },
    selectedItem: null,
    selectLabel: {
      type: String,
      default: 'Select to view details...',
    },
  },
  data() {
    return {
      transitionName: '',
    };
  },
  watch: {
    selectedItem(val, oldVal) {
      this.transitionName = this.getTransitionName(val, oldVal);
    },
  },
  methods: {
    selectItem(item) {
      this.$emit('update:selectedItem', item);
    },
    getTransitionName(newItem, oldItem) {
      if (
        !newItem ||
        !oldItem ||
        !this.items ||
        !this.items.length ||
        newItem === oldItem
      )
        return '';
      return this.items.indexOf(newItem) < this.items.indexOf(oldItem)
        ? 'item-prev'
        : 'item-next';
    },
  },
};
</script>

<style scoped>
.item-prev-enter-active,
.item-prev-leave-active,
.item-next-enter-active,
.item-next-leave-active {
  transition: all 0.3s ease-in-out;
}
.item-prev-enter,
.item-prev-leave-to,
.item-next-enter,
.item-next-leave-to {
  opacity: 0;
}
.item-prev-enter,
.item-next-leave-to {
  transform: translateY(-20px);
}
.item-prev-leave-to,
.item-next-enter {
  transform: translateY(20px);
}
.item-prev-leave-active,
.item-next-leave-active {
  position: absolute;
}
</style>