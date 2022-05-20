<template>
  <section
  >
    <h1 class="hidden">{{ query }}</h1>
    <template v-if="blues">
      <div class="h-full flex flex-col">
        <div v-if="disam" class="h-12 flex items-center justify-center">
          <p>
            There are {{ blues.length }} colors with the name
            <strong>{{ query }}</strong
            >.
          </p>
        </div>
        <div class="flex h-full">
          <Fill v-for="(blue, i) in blues"
            :key="i" :blue="blue"><p v-if="!disam">{{query}}</p></Fill>
        </div>
      </div>
    </template>
    <p v-else-if="!about">That's not a shade of blue!</p>
    <nuxt-content :document="about" />
  </section>
</template>

<script>
import Color from "color";
export default {
  async asyncData({ $content, params }) {
    let about;
    let blues;
    let query;
    if (params.slug === "about") {
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
        (e) => e.slug === params.slug || e.alias === params.slug
      );
      query = blues[blues.length - 1].title;
    }
    return {
      about,
      blues,
      query,
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
      const b = Color(blue);
      return b.hex();
    },
  },
};
</script>

<style scoped>
section {
  height: calc(100vh - 5rem);
}
</style>
