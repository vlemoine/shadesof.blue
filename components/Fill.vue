<template>
  <div
    class="text-center text-2xl w-full h-full p-12"
    :class="text"
    :style="`background-color:${color.value}`"
  >
    <p>{{ hex }}</p>
    <p v-if="color.alias">AKA {{ color.alias }}</p>
    <p>From {{ color.source }}</p>
  </div>
</template>

<script>
import Color from "color";
export default {
  props: {
    color: {
      type: String,
      required: true,
    },
  },
  computed: {
    text() {
      const c = Color(this.color.value);
      return `text-${c.isLight() ? "black" : "white"}`;
    },
    hex() {
      const b = Color(this.color.value);
      return b.hex();
    }
  }
};
</script>
