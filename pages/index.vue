<template>
  <section class="swatches grid p-4">
    <!-- <pre>{{c}}</pre> -->
    <template v-for="blue in c">
      <!-- <pre :key="blue.slug">{{ blue }}</pre> -->
      <Swatch :key="blue.slug" :blue="blue">
        <!-- <pre>{{ blue.hsl.l }}</pre> -->
        <!-- <pre>{{ blue.hsl.h }}</pre> -->
        <!-- <pre>{{ blue.hsl.s }}</pre> -->
        <!-- <pre :key="blue.slug">{{blue.luminosity}}</pre> -->
      </Swatch>
    </template>
    <!-- <pre>{{ colors }}</pre> -->
  </section>
</template>

<script>
import Color from "color";
import Swatch from "~/components/Swatch.vue";

export default {
  components: { Swatch },
  async asyncData({ $content, params }) {
    const colors = await $content("colors", params.slug).fetch();
    return {
      colors
    };
  },
  computed: {
    c() {
      let sort = this.colors.slice(0);
      sort.forEach(s => {
        const b = Color(s.value);
        const hsl = b.hsl().object();
        s.luminosity = b.luminosity();
        s.hsl = hsl;
      });
      sort = sort.sort((a, b) => b.hsl.l - a.hsl.l);
      sort = sort.sort((a, b) => a.hsl.s - b.hsl.s);
      sort = sort.sort((a, b) => a.hsl.h - b.hsl.h);
      return sort;
    }
  }
};
</script>

<style scoped>
.swatches {
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
}
.swatch {
  aspect-ratio: 2/1;
}
</style>
