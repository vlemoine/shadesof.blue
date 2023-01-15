<template>
  <button :class="[cls, active ? activeCls : '']" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script>
const classes = `
  pl-3 pr-3 px-2 py-1
  flex items-center
  cursor-pointer
  rounded-full
  border border-gray-900 dark:border-gray-600
  focus-within:shadow-focus focus:outline-none
  bg-white dark:bg-black
`;
const activeClasses = "bg-gray-300 dark:bg-gray-700 font-bold";
export default {
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      cls: classes,
      activeCls: activeClasses,
    };
  },
};
</script>
