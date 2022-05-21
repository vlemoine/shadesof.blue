<template>
  <section>
    <h1 class="hidden">{{ query }}</h1>
    <template v-if="blues.length > 0">
      <div class="h-full flex flex-col">
        <div v-if="disam" class="h-12 flex items-center justify-center">
          <p class="px-4 md:text-xl text-center">
            There are {{ blues.length }} colors with the name
            <strong class="whitespace-nowrap">{{ query }}</strong
            >.
          </p>
        </div>
        <div class="flex h-full">
          <Fill
            v-for="(blue, i) in blues"
            :key="i"
            :blue="blue"
            :disam="disam"
            :slug="slug"
            ><p v-if="!disam" class="text-5xl font-bold">{{ query }}</p></Fill
          >
        </div>
      </div>
    </template>
    <template v-else-if="isBlue">
      <Fill :blue="mysteryBlue"><p>Unknown shade of blue!</p></Fill>
    </template>
    <p v-else-if="!about">That's not a shade of blue!</p>
    <nuxt-content :document="about" />
  </section>
</template>

<script>
import Color from "color";
import colorString from "color-string";

const toHex = (blue) => Color(blue).hex();
export default {
  async asyncData({ $content, params }) {
    const slug = params.slug;
    let about;
    let blues;
    let query;
    let isBlue = false;
    let mysteryBlue = {};
    if (slug === "about") {
      about = await $content("about").fetch();
    } else {
      const x11 = await $content("x11").fetch();
      const other = await $content("colors").fetch();
      const pantone = await $content("pantone").fetch();
      const tcx = await $content("pantone-tcx").fetch();
      const ntc = await $content("ntc").fetch();
      const crayola = await $content("crayola").fetch();
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
        ...sw,
      ];
      blues = lib.filter(
        (e) =>
          e.slug === slug ||
          e.alias === slug ||
          toHex(e.value).replace("#", "").toLowerCase() === slug.toLowerCase()
      );
      query = blues.length > 0 ? blues[blues.length - 1]?.title : "???";

      const hex = slug.length === 6 ? colorString.get("#" + slug) : null;
      if (hex) {
        const m = Math.round(Color(colorString.to.hex(hex.value)).hsl().object().h);
        isBlue = m > 169 && m < 251;
        if (isBlue) {
          mysteryBlue = {
            value: colorString.to.hex(hex.value),
            source: null
          }
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
    text() {
      const c = Color(this.blues.value);
      return `text-${c.isLight() ? "black" : "white"}`;
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
section {
  height: calc(100vh - 5rem);
}
</style>
