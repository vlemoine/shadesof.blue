<template>
  <section>
    <template v-for="blue in colors">
      <!-- <pre :key="blue.slug">{{ blue }}</pre> -->
      <Swatch :key="blue.slug" :blue="blue" />
    </template>
    <!-- <pre>{{ colors }}</pre> -->
  </section>
</template>

<script>
import Swatch from "~/components/Swatch.vue";

export default {
  components: { Swatch },
  async asyncData ({ $content, params }) {
    const colors = await $content('colors', params.slug).fetch()
    return {
      colors
    }
  }
}
</script>
