<template>
  <section class="swatches grid p-8">
    <template v-for="(blue, i) in c">
      <div :key="blue.hex" class="relative" >
        <Swatch
          :blue="blue"
          :style="
            `
          ${
            blue.hsl.h > 240 || blue.hsl.h < 180
              ? 'box-shadow:inset 0 0 0 5px red;'
              : ''
          }
          ${
            (blue.hsl.s <= 25.2 || blue.hsl.l <= 15)
              ? 'box-shadow: inset 0 0 0 5px orange;'
              : ''
          }
          ${
            false && blue.hsl.s > 20 && blue.hsl.s < 31
              ? 'box-shadow: inset 0 0 0 5px purple;'
              : ''
          }
        `
          "
        >
          <span v-if="false">{{ i }}</span>
          <div v-if="labels" class="labels">
            <strong>{{ blue.title }}</strong><br>
            <span>{{ blue.hex }}</span
            ><br />
            <span>{{ Math.round(blue.hsl.h) }}</span>
            <span>{{ blue.hsl.s }}</span>
            <template v-if="details">
              <br />
              <span>{{ Math.round(blue.hsl.s) }}</span
              ><br />
              <span>{{ Math.round(blue.hsl.l) }}</span>
            </template>
          </div>
        </Swatch>
      </div>
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
    const tcx = await $content("pantone-tcx", params.slug).fetch();
    return {
      x11,
      pantone,
      tcx
    };
  },
  data() {
    return {
      labels: true,
      details: true
    };
  },
  computed: {
    c() {
      // let x = this.x11.slice(0);
      // let p = this.pantone.slice();
      let sort = this.x11.concat(this.pantone);
      sort = sort.concat(this.tcx)
      sort.forEach(s => {
        const b = Color(s.value);
        const hsl = b.hsl().object();
        s.hex = b.hex();
        s.luminosity = b.luminosity();
        s.hsl = hsl;
      });
      // sort = sort.sort((a, b) => a.hsl.h - b.hsl.h);
      // sort = sort.sort((a, b) => a.hsl.s - b.hsl.s);
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
  grid-template-columns: repeat(auto-fill, minmax(5rem, 1fr));
}
.swatch {
  aspect-ratio: 1/1;
  overflow: hidden;
}
.swatch .labels {
  opacity: 0;
}
.swatch:hover,
.swatch:focus {
  position: absolute;
  width: 8rem;
  height: 8rem;
  overflow: initial;
  z-index: 2;
  left: -1rem;
  top: -1rem;
  box-shadow: 0 0 2rem -.1rem #0008;
}
.swatch:hover .labels,
.swatch:focus .labels {
  opacity: 1;
}
</style>
