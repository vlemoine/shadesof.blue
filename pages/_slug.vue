<template>
  <section>
    <h1 v-if="!about" class="hidden">{{ query }}</h1>
    <template v-if="!about && blues.length > 0">
      <div class="swatch-fill h-full flex flex-col">
        <div v-if="disam" class="h-12 flex items-center justify-center">
          <p class="px-4 md:text-xl text-center">
            There are {{ blues.length }} colors with the {{ disamValue }}
            <strong class="whitespace-nowrap">{{ query }}</strong
            >.
          </p>
        </div>
        <div
          class="h-full"
          :class="{
            'flex flex-col md:flex-row': blues.length < 4,
            'grid grid-cols-2': blues.length > 3,
          }"
        >
          <Fill
            v-for="(blue, i) in blues"
            :key="i"
            :blue="blue"
            :disam="disam"
            :slug="slug"
            :class="{
              'col-span-2': blues.length % 2 === 1 && i == blues.length - 1,
            }"
            ><NuxtLink
              v-if="!disam"
              class="query text-5xl font-bold underline focus-within:shadow-focus focus:outline-none"
              :to="link"
              >{{ query }}</NuxtLink
            ></Fill
          >
        </div>
      </div>
    </template>
    <template v-else-if="isBlue">
      <Fill :blue="mysteryBlue"><p>Unknown shade of blue!</p></Fill>
    </template>
    <p v-else-if="!about">That's not a shade of blue!</p>
    <template v-else-if="about">
      <nuxt-content
        class="mx-auto mt-8 pb-8 prose dark:prose-invert"
        :document="about"
      />
    </template>
  </section>
</template>

<script>
import Color from "color";
import colorString from "color-string";

const toHex = (blue) => Color(blue).hex();
const name = (slug, blues) => {
  const name = [];
  blues.forEach((b) => {
    // cyan debacle
    if (slug === "cyan" && b.alias === "cyan") {
      name.push("cyan");
    } else {
      name.push(b.slug);
    }
  });
  return [...new Set(name)];
};
export default {
  async asyncData({ $content, params }) {
    const slug = params.slug.toLowerCase();
    let about;
    let blues;
    let query;
    let isBlue = false;
    let mysteryBlue = {};
    if (slug === "about") {
      about = await $content("about").fetch();
      query = "About";
    } else {
      const x11 = await $content("x11").fetch();
      const other = await $content("colors").fetch();
      const pantone = await $content("pantone").fetch();
      const tcx = await $content("pantone-tcx").fetch();
      const ntc = await $content("ntc").fetch();
      const crayola = await $content("crayola").fetch();
      const wn = await $content("wn").fetch();
      const xkcd = await $content("xkcd").fetch();
      const swBlue = await $content("sw/blue").fetch();
      const swPurple = await $content("sw/purple").fetch();
      const swPastel = await $content("sw/pastel").fetch();
      const swHistoric = await $content("sw/historic").fetch();
      const swTimeless = await $content("sw/timeless").fetch();
      const swNeutral = await $content("sw/neutral").fetch();
      const sw = [
        ...swBlue,
        ...swPurple,
        ...swPastel,
        ...swHistoric,
        ...swTimeless,
        ...swNeutral,
      ];
      const lib = [
        ...x11,
        ...other,
        ...pantone,
        ...tcx,
        ...ntc,
        ...crayola,
        ...wn,
        ...xkcd,
        ...sw,
      ];
      blues = lib.filter(
        (e) =>
          e.slug === slug ||
          e.alias?.toLowerCase() === slug ||
          toHex(e.value).replace("#", "").toLowerCase() === slug
      );
      // What is the query?
      const q = name(slug, blues).length === 1;
      query =
        blues.length > 0
          ? q
            ? blues[blues.length - 1]?.title
            : `#${slug.toUpperCase()}`
          : "???";
      // Handle unidentified blue hex colors
      const hex = slug.length === 6 ? colorString.get("#" + slug) : null;
      if (hex) {
        const m = Math.round(
          Color(colorString.to.hex(hex.value)).hsl().object().h
        );
        isBlue = m > 169 && m < 251;
        if (isBlue) {
          mysteryBlue = {
            value: colorString.to.hex(hex.value),
            source: null,
          };
        }
      }
    }
    return {
      about,
      blues,
      query,
      slug,
      isBlue,
      mysteryBlue,
    };
  },
  head() {
    return {
      title: this.about
        ? "About shadesof.blue"
        : `${this.query} 🔹 shadesof.blue`,
    };
  },
  computed: {
    disam() {
      return this.blues.length > 1;
    },
    disamValue() {
      return name(this.slug, this.blues).length === 1 ? "name" : "value";
    },
    text() {
      return `text-${Color(this.blues.value).isLight() ? "black" : "white"}`;
    },
    link() {
      return this.query.toLowerCase().replaceAll(" ", "-").replaceAll("/", "-");
    },
  },
  methods: {
    toHex(blue) {
      return toHex(blue);
    },
  },
};
</script>

<style scoped>
.swatch-fill {
  height: calc(100vh - 5rem);
}

</style>
