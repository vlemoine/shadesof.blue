<template>
  <div
    :id="id"
    data-component="Fill"
    class="flex flex-col w-full h-full p-8 md:p-12"
    :class="text"
    :style="`background-color:${blue.value}`"
  >
    <div class="md:flex flex-wrap justify-between gap-4">
      <div class="flex flex-col gap-3">
        <slot></slot>
        <div class="items-center flex flex-wrap gap-3">
          <span class="text-3xl">{{ hex }}</span>
          <NuxtLink
            :class="button"
            :to="link"
            :title="`Permalink to ${blue.title} ${hex}`"
          >
            <span class="hidden">{{ blue.title }}</span
            ><i class="fa-solid fa-link"></i
          ></NuxtLink>
          <button
            :class="button"
            :title="`Copy ${blue.title} value ${hex}`"
            @click="copy()"
          >
            <i class="fa-solid fa-clipboard"></i>
          </button>
        </div>
        <p v-if="html">
          {{ blue.value
          }}<template v-if="blue.value_alt"
            ><br />{{ blue.value_alt }}</template
          >
        </p>
        <p class="my-4">{{ blue.description }}</p>
      </div>
      <div class="mt-4 md:mt-0 md:text-right ml-auto">
        <p>Hue {{ hue }}</p>
        <p>This shade is {{ beyond }}{{ brightness }}{{ gray }}{{ shade }}</p>
      </div>
    </div>
    <p class="mt-auto text-right">
      <template v-if="blue.alias"
        >AKA {{ blue.alias === slug ? blue.slug : blue.alias }}<br
      /></template>
      <span v-if="blue.source" class="text-sm"
        ><template v-if="!html"
          >from
          <a
            v-if="url"
            :href="blue.url"
            target="_blank"
            class="focus-within:shadow-focus focus:outline-none"
            ><span class="underline">{{ blue.source }}</span
            ><i class="ml-1 fa fa-arrow-up-right-from-square"></i></a
          ><template v-else>{{ blue.source }}</template></template
        ><template v-else>HTML color</template></span
      >
    </p>
  </div>
</template>

<script>
import Color from "color";
import isGray from "../scripts/gray.js";

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
  computed: {
    b() {
      return Color(this.blue.value);
    },
    id() {
      return (
        this.blue.title.toLowerCase() + "_" + this.b.hex().replace("#", "")
      );
    },
    text() {
      return `text-${this.b.isLight() ? "black" : "white"}`;
    },
    hex() {
      return this.b.hex();
    },
    html() {
      return this.blue.source === "X11";
    },
    hue() {
      return Math.round(this.hsv.h);
    },
    link() {
      return this.hex.replace("#", "/");
    },
    shade() {
      return this.hue <= 195
        ? "cyan"
        : this.hue > 195 && this.hue <= 225
        ? "azure"
        : "blue";
    },
    gray() {
      return isGray(this.hex) ? "gray " : "";
    },
    hwb() {
      return this.b.hwb().object();
    },
    hsv() {
      return this.b.hsv().object();
    },
    brightness() {
      const w = this.hwb.w;
      const b = this.hwb.b;
      return w > 50 ? "light " : b > 50 ? "dark " : ""
    },
    beyond() {
      return this.hue < 170 || this.hue > 250 ? "beyond " : "";
    },
    url() {
      return this.blue.source !== "Pantone" && this.blue.url;
    },
    button() {
      const c = this.b.isLight();
      let cls =
        "square grid place-content-center text-base p-2 rounded-full h-9 focus-within:shadow-focus focus:outline-none ";
      cls += c ? "bg-gray-900 text-white" : "bg-gray-100 text-black";
      return cls;
    },
    focusColor() {
      return this.b.negate();
    },
  },
  mounted() {
    document
      .getElementById(this.id)
      .style.setProperty("--focus-ring", this.focusColor);
  },
  methods: {
    copy() {
      navigator.clipboard.writeText(this.hex).then(
        function () {
          // console.log("clipboard successfully set");
        },
        function () {
          // console.log("clipboard write failed");
        }
      );
    },
  },
};
</script>