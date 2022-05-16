<template>
  <section class="px-9">
    <template v-if="color">
      <template v-if="!Array.isArray(color)">
        <pre>{{ color.slug }}</pre>
      </template>
      <pre>{{ color }}</pre>
    </template>
    <p v-else-if="!about">That's not a shade of blue!</p>
    <nuxt-content :document="about" />
  </section>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    let about;
    let color;
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
      lib = lib.filter((e) => e.slug === params.slug);
      color = lib.length === 1 ? lib[0] : lib;
    }
    return {
      about,
      color,
    };
  },
};
</script>

<style scoped>
pre {
  color: #fff;
  background-color: #333;
}
</style>
