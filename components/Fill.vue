<template>
  <div
    class="flex flex-col w-full h-full p-12"
    :class="text"
    :style="`background-color:${blue.value}`"
  >
    <div class="flex justify-between">
      <div>
        <slot></slot>
        <p class="text-2xl">{{ hex }}</p>
      </div>
      <div class="text-right">
        <p>Hue {{ hue }}</p>
        <p>This blue is <template v-if="oob">beyond </template>{{ shade }}</p>
        <p v-if="isGray">This blue is gray</p>
      </div>
    </div>
    <p class="mt-auto text-right">
      <template v-if="blue.alias">AKA {{ blue.alias }}<br /></template>
      <span class="text-sm">from {{ blue.source }}</span>
    </p>
  </div>
</template>

<script>
import Color from "color";
export default {
  props: {
    blue: {
      type: Object,
      required: true,
    },
  },
  computed: {
    b() {
      return Color(this.blue.value);
    },
    text() {
      const c = Color(this.blue.value);
      return `text-${c.isLight() ? "black" : "white"}`;
    },
    hex() {
      return this.b.hex();
    },
    hue() {
      return Math.round(this.b.hsl().object().h);
    },
    shade() {
      return this.hue <= 195
        ? "cyan"
        : this.hue > 195 && this.hue <= 225
        ? "azure"
        : "blue";
    },
    isGray() {
      const hsl = this.b.hsl().object();
      return (
        hsl.s <= 22 || hsl.l <= 10 || (hsl.l > 10 && hsl.l <= 15 && hsl.s <= 50)
      );
    },
    oob() {
      return this.hue < 170 || this.hue > 250;
    }
  },
};
</script>
