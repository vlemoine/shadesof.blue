<template>
  <section class="swatches grid p-8">
    <header class="swatches__header flex">
      <p>{{ c.length }} blues documented!</p>
      <div id="filters" class="filters ml-auto">
        <label
          >Show grays
          <input
            v-model="filters.includeGrays"
            :disabled="filters.onlyGrays"
            type="checkbox"
          />
        </label>
        <label
          >Only grays
          <input v-model="filters.onlyGrays" type="checkbox" />
        </label>
        <label
          >Show out of bounds
          <input v-model="filters.includeOobs" type="checkbox" />
        </label>
      </div>
    </header>

    <template v-for="blue in c">
      <div
        :key="blue.hex"
        class="relative"
        :class="{
          hidden:
            (blue.gray && !filters.includeGrays && !filters.onlyGrays) ||
            (!blue.gray && filters.onlyGrays)
        }"
      >
        <Swatch
          :blue="blue"
          class="relative"
        >
          <div class="markers absolute top-1 right-1 opacity-50 flex flex-col">
            <i v-if="blue.gray" class="fas fa-adjust mb-1"></i>
            <i v-if="blue.oob" class="fas fa-rainbow"></i>
          </div>

          <div v-if="labels" class="labels">
            <h2 class="pr-3 font-bold">{{ blue.title }}</h2>
            <span>{{ blue.hex }}</span
            ><br />
            <span>h {{ Math.round(blue.hsl.h) }}</span>
            <!-- <span>{{ blue.hsl.s }}</span> -->
            <template v-if="details">
              <br />
              <span>s {{ Math.round(blue.hsl.s) }}</span
              ><br />
              <span>l {{ Math.round(blue.hsl.l) }}</span>
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
      details: true,
      filters: {
        includeGrays: true,
        onlyGrays: false,
        includeOobs: true
      }
    };
  },
  computed: {
    c() {
      let sort = this.x11.concat(this.pantone);
      sort = sort.concat(this.tcx);
      sort.forEach(s => {
        const b = Color(s.value);
        const hsl = b.hsl().object();
        s.hex = b.hex();
        s.luminosity = b.luminosity();
        s.hsl = {};
        s.hsl.h = Math.round(hsl.h);
        s.hsl.s = Math.round(hsl.s);
        s.hsl.l = Math.round(hsl.l);
        s.gray =
          s.hsl.s <= 22 ||
          s.hsl.l <= 10 ||
          (s.hsl.l > 10 && s.hsl.l <= 15 && s.hsl.s <= 50);
        s.oob = s.hsl.h < 180 || s.hsl.h > 240;
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
.swatches__header {
  grid-column: 1/-1;
}
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
  width: 9rem;
  height: 9rem;
  overflow: initial;
  z-index: 2;
  left: -1.5rem;
  top: -1.5rem;
  box-shadow: 0 0 2rem -0.1rem #0008;
}
.swatch:hover .labels,
.swatch:focus .labels {
  opacity: 1;
}
</style>
