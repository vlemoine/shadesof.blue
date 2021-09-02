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
      const x11 = await $content("x11", params.slug)
        .fetch()
        .then(r => r)
        .catch(e => {
          return false;
        });
      const other = await $content("colors", params.slug)
        .fetch()
        .then(r => r)
        .catch(e => {
          return false;
        });
      const pantone = await $content("pantone", params.slug)
        .fetch()
        .then(r => r)
        .catch(e => {
          return false;
        });
      const tcx = await $content("pantone-tcx", params.slug)
        .fetch()
        .then(r => r)
        .catch(e => {
          return false;
        });
      const ntc = await $content("ntc", params.slug)
        .fetch()
        .then(r => r)
        .catch(e => {
          return false;
        });
      const crayola = await $content("crayola", params.slug)
        .fetch()
        .then(r => r)
        .catch(e => {
          return false;
        });
      color = x11 || pantone || tcx || ntc || other || crayola;
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
