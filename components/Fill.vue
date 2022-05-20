<template>
  <div
    class="text-center text-2xl w-full h-full p-12"
    :class="text"
    :style="`background-color:${blue.value}`"
  >
    <slot></slot>
    <p>{{ hex }}</p>
    <p v-if="blue.alias">AKA {{ blue.alias }}</p>
    <p>From {{ blue.source }}</p>
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
