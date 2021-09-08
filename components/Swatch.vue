<template>
  <NuxtLink :to="blue.slug" class="relative">
    <div
      class="swatch p-2 relative"
      :style="`background-color: ${blue.value};color: ${color}`"
    >
      <strong v-if="name">{{ blue.title }}</strong>
      <div><slot /></div>
    </div>
  </NuxtLink>
</template>

<script>
import Color from "color";

export default {
  // name: "Swatch",
  props: {
    blue: {
      type: Object,
      required: true,
    },
    name: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    color() {
      const c = Color(this.blue.value);
      return c.isLight() ? "#111" : "#fff";
    },
  },
};
</script>
