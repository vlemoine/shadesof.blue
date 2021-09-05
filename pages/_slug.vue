<template>
  <section class="px-8">
    <template v-if="color">
      <pre>{{ color.slug }}</pre>
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
      let lib = [...x11, ...other, ...pantone, ...tcx, ...ntc, ...crayola];
      lib = lib.filter(e => e.slug === params.slug);
      color = lib[0];
    }
    return {
      about,
      color
    };
  }
};
</script>

<style scoped>
pre {
  color: #fff;
  background-color: #333;
}
</style>
