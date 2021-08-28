<template>
  <section class="section">
    <pre v-if="color">{{ color.slug }}</pre>
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
      color = await $content("colors", params.slug)
        .fetch()
        .then(r => r)
        .catch(e => e);
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
