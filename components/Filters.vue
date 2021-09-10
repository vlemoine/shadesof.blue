<template>
  <div
    id="Filters"
    class="w-full bg-opacity-90 transition-all bg-white dark:bg-black"
    :class="{
      'h-0 overflow-hidden': !open,
      'p-4': open,
    }"
  >
    <slot></slot>
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
