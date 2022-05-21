<template>
  <div
    class="flex flex-col text-center w-full h-full p-12"
    :class="text"
    :style="`background-color:${blue.value}`"
  >
    <slot></slot>
    <p class="text-2xl">{{ hex }}</p>
    <p class="mt-auto">
      <template v-if="blue.alias"
      >AKA {{ blue.alias }}<br/></template>
      <span class="text-sm">from {{ blue.source }}</span>
    </p>
  </div>
</template>

<script>
import Color from "color";
export default {
  props: {
    blue: {
      type: String,
      required: true,
    },
  },
  computed: {
    text() {
      const c = Color(this.blue.value);
      return `text-${c.isLight() ? "black" : "white"}`;
    },
    hex() {
      const b = Color(this.blue.value);
      return b.hex();
    }
  }
};
</script>
