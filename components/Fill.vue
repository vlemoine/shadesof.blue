<template>
  <div
    class="flex flex-col w-full h-full p-8 md:p-12"
    :class="text"
    :style="`background-color:${blue.value}`"
  >
    <div class="md:flex justify-between gap-4">
      <div>
        <slot></slot>
        <NuxtLink class="text-2xl block" :to="link">{{ hex }}</NuxtLink>
        <p v-if="html">
          {{ blue.value
          }}<template v-if="blue.value_alt"
            ><br />{{ blue.value_alt }}</template
          >
        </p>
      </div>
      <div class="mt-4 md:mt-0 md:text-right">
        <p>Hue {{ hue }}</p>
        <p>
          This shade is {{ beyond }}{{ brightness }}{{ gray }}{{ shade }}
        </p>
      </div>
    </div>
    <p class="mt-auto text-right">
      <template v-if="blue.alias"
        >AKA {{ blue.alias === slug ? blue.slug : blue.alias }}<br
      /></template>
      <span v-if="blue.source" class="text-sm"
        ><template v-if="!html"
          >from
          <a v-if="url" :href="blue.url" target="_blank">{{ blue.source }}</a
          ><template v-else>{{ blue.source }}</template></template
        ><template v-else>HTML color</template></span
      >
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
    disam: {
      type: Boolean,
      default: false,
    },
    slug: {
      type: String,
      default: "",
    },
  },
  head() {
    return {
      bodyAttrs: {
        style: !this.disam && `background-color:${this.blue.value}`,
        class: !this.disam && this.text,
      },
    };
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
    html() {
      return this.blue.source === "X11";
    },
    hue() {
      return Math.round(this.b.hsl().object().h);
    },
    link() {
      return this.hex.replace("#", "");
    },
    shade() {
      return this.hue <= 195
        ? "cyan"
        : this.hue > 195 && this.hue <= 225
        ? "azure"
        : "blue";
    },
    brightness() {
      const l = Math.round(this.b.hsl().object().l);
      return l < 40 ? "dark " : l > 66 ? "light " : "";
    },
    gray() {
      const hsl = this.b.hsl().object();
      return (
        hsl.s <= 22 || hsl.l <= 10 || (hsl.l > 10 && hsl.l <= 15 && hsl.s <= 50)
      ) ? 'gray ' : '';
    },
    beyond() {
      return this.hue < 170 || this.hue > 250 ? 'beyond ' : '';
    },
    url() {
      return this.blue.source !== "Pantone";
    },
  },
};
</script>
