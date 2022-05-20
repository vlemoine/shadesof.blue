<template>
  <section
    :class="disam ? '' : 'p-12'"
    :style="disam ? '' : `background-color:${color.value}`"
  >
    <h1 class="hidden">{{ query }}</h1>
    <template v-if="color">
      <template v-if="!disam">
        <Fill :color="color"/>
        <div class="text-center text-2xl" :class="text">
          <span class="text-5xl font-bold">
            {{ color.title }}
          </span>
          <p>{{ toHex(color.value) }}</p>
          <p v-if="color.alias">AKA {{ color.alias }}</p>
          <p>From {{ color.source }}</p>
          
        </div>
      </template>
      <div v-else class="h-full flex flex-col">
        <div class="h-12 flex items-center justify-center">
          <p>
            There are {{ color.length }} colors with the name
            <strong>{{ query }}</strong
            >.
          </p>
        </div>
        <div class="flex h-full">
          <Fill v-for="(color, i) in color"
            :key="i" :color="color" />
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
    let color;
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
      let lib = [
        ...x11,
        ...other,
        ...pantone,
        ...tcx,
        ...ntc,
        ...crayola,
        ...sw,
      ];
      lib = lib.filter(
        (e) => e.slug === params.slug || e.alias === params.slug
      );
      color = lib.length === 1 ? lib[0] : lib;
      query =
        color?.title?.search("/") === -1
          ? color.title
          : lib[lib.length - 1].title;
    }
    return {
      about,
      color,
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
      return Array.isArray(this.color);
    },
    text() {
      const c = Color(this.color.value);
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
pre {
  color: #fff;
  background-color: #333;
}
section {
  height: calc(100vh - 5rem);
}
.swatch {
  aspect-ratio: 1/1;
}
</style>
