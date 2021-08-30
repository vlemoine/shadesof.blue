<template>
  <section class="swatches grid p-4">
    <template v-for="(blue, i) in c">
      <Swatch
        :key="blue.hex"
        :blue="blue"
        :style="
          blue.hsl.h > 240 || blue.hsl.h < 180 ? 'border:1px solid red' : ''
        "
        name
      >
        <span v-if="false">{{i}}</span>
        <span>{{ blue.hex }}</span><br>
        <!-- <span>{{ Math.round(blue.hsl.h) }}</span> -->
      </Swatch>
    </template>
  </section>
</template>

<script>
import Color from "color";
import Swatch from "~/components/Swatch.vue";

export default {
  components: { Swatch },
  async asyncData({ $content, params }) {
    const x11 = await $content("colors", params.slug).fetch();
    const pantone = await $content("pantone", params.slug).fetch();
    return {
      x11,
      pantone
    };
  },
  computed: {
    c() {
      // let x = this.x11.slice(0);
      // let p = this.pantone.slice();
      let sort = this.x11.concat(this.pantone);
      sort.forEach(s => {
        const b = Color(s.value);
        const hsl = b.hsl().object();
        s.hex = b.hex();
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
