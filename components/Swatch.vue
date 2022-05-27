<template>
  <NuxtLink
    :to="hex"
    class="relative hover:z-20 focus:z-20"
    :class="{
      'focus-within:shadow-focus focus:outline-none': showLabels,
    }"
  >
    <div
      class="swatch p-2 relative"
      :class="text"
      :style="`background-color: ${blue.value};`"
    >
      <div class="markers absolute top-1 right-1 opacity-50 flex flex-col">
        <i v-if="blue.gray" class="fas fa-adjust mb-1"></i>
        <i v-if="blue.oob" class="far fa-rainbow"></i>
      </div>
      <slot />
      <div class="labels" :class="{ 'opacity-0': !showLabels }">
        <h2 class="pr-3 font-bold">{{ blue.title }}</h2>
        <template
          v-if="
            (blue.source === 'Pantone' || blue.source === 'Sherwin-Williams') &&
            blue.alias
          "
        >
          <span>{{ blue.alias }}</span
          ><br />
        </template>
        <span>{{ blue.hex }}</span>
      </div>
    </div>
  </NuxtLink>
</template>

<script>
import Color from "color";
export default {
  props: {
    blue: {
      type: Object,
      required: true,
    },
    showLabels: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    color() {
      return Color(this.blue.value);
    },
    text() {
      return this.color.isLight() ? "text-black" : "text-white";
    },
    hex() {
      return this.color.hex().replace("#", "");
    },
  },
};
</script>

<style>
.swatch {
  aspect-ratio: var(--swatch-aspect);
  overflow: hidden;
}
.swatch .labels {
  height: 0;
}

a:hover .swatch .labels,
a:focus .swatch .labels {
  opacity: 1;
  height: auto;
}
</style>
