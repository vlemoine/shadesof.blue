<template>
  <section class="section">
    <pre>{{ color.slug }}</pre>
    <nuxt-content :document="about" />
  </section>
</template>

<script>
export default {
  async asyncData ({ $content, params }) {
    const color = await $content('colors', params.slug).fetch()
    const about = await $content('about').fetch()
    return {
      about,
      color
    }
  }
}
</script>

<style scoped>
pre {
  color: #fff;
  background-color: #333;
}
</style>