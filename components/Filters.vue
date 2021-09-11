<template>
  <div
    id="Filters"
    class="px-4 w-full bg-opacity-90 transition-all bg-white dark:bg-black"
    :class="{
      'h-0 overflow-hidden': !open,
      'mt-4 py-2': open,
    }"
    :aria-hidden="!open"
  >
    <template v-if="open">
      <slot></slot>
    </template>
    
  </div>
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
