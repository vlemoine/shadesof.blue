<template>
  <div class="p-8">
    <p class="total">{{ c.length }} blues documented!</p>
    <header class="swatches__header flex">
      <label for="name"
        >Search
        <input
          id="name"
          v-model="filters.name"
          name="name"
          type="text"
          class="text-black"
      /></label>
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
        <label
          >Show labels
          <input v-model="filters.showLabels" type="checkbox" />
        </label>
      </div>
    </header>
    <section
      class="swatches grid"
      :class="{
        'swatches--labeled': filters.showLabels
      }"
    >
      <template v-for="(blue, i) in c">
        <NuxtLink
          :key="`${blue.slug}${blue.source}${i}`"
          :to="blue.slug"
          class="relative"
          :class="{
            hidden: filter(blue)
          }"
        >
          <Swatch :blue="blue" class="relative">
            <!-- <span v-if="blue.del">del</span> -->
            <div
              class="markers absolute top-1 right-1 opacity-50 flex flex-col"
            >
              <i v-if="blue.gray" class="fas fa-adjust mb-1"></i>
              <i v-if="blue.oob" class="far fa-rainbow"></i>
            </div>
            <div
              v-if="labels"
              class="labels"
              :class="{ 'opacity-0': !filters.showLabels }"
            >
              <h2 class="pr-3 font-bold">{{ blue.title }}</h2>
              <template v-if="blue.source === 'Pantone' && blue.alias">
                <span>{{ blue.alias }}</span
                ><br />
              </template>
              <span>{{ blue.hex }}</span>
            </div>
          </Swatch>
        </NuxtLink>
      </template>
    </section>
  </div>
</template>

<script>
import Color from "color";
import Swatch from "~/components/Swatch.vue";

export default {
  components: { Swatch },
  async asyncData({ $content }) {
    const x11 = await $content("x11").fetch();
    const other = await $content("colors").fetch();
    const pantone = await $content("pantone").fetch();
    const tcx = await $content("pantone-tcx").fetch();
    const ntc = await $content("ntc").fetch();
    const crayola = await $content("crayola").fetch();
    return {
      x11,
      other,
      pantone,
      tcx,
      ntc,
      crayola
    };
  },
  data() {
    return {
      labels: true,
      details: true,
      filters: {
        showLabels: false,
        includeGrays: true,
        onlyGrays: false,
        includeOobs: true,
        palettes: {
          x11: true,
          other: true,
          pantone: true,
          tcx: true,
          crayola: true,
          ntc: true
        },
        name: ""
      }
    };
  },
  computed: {
    c() {
      let sort = [
        ...this.x11,
        ...this.other,
        ...this.pantone,
        ...this.tcx,
        ...this.ntc,
        ...this.crayola
      ];
      sort.forEach(s => {
        const b = Color(s.value);
        const hsl = b.hsl().object();
        s.alias = s.alias || "";
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
        s.oob = s.hsl.h < 170 || s.hsl.h > 240;
        s.del = s.hsl.h < 150 || s.hsl.h > 260;
      });
      sort = sort.sort((a, b) => b.hsl.l - a.hsl.l);
      sort = sort.sort((a, b) => a.hsl.s - b.hsl.s);
      sort = sort.sort((a, b) => a.hsl.h - b.hsl.h);
      return sort;
    }
  },
  methods: {
    filter(blue) {
      const filters = this.filters;
      return (
        (blue.hex.toLowerCase().search(filters.name.toLowerCase()) === -1 &&
        blue.alias.toLowerCase().search(filters.name.toLowerCase()) === -1 &&
          blue.title.toLowerCase().search(filters.name.toLowerCase()) === -1) ||
        (blue.gray && !filters.includeGrays && !filters.onlyGrays) ||
        (!blue.gray && filters.onlyGrays) ||
        (blue.oob && !filters.includeOobs)
      );
    }
  }
};
</script>

<style>
:root {
  --swatch-width: 5rem;
  --swatch-aspect: 1;
  --swatch-zoom: calc(var(--swatch-width) * 1.8);
}
.swatches {
  grid-template-columns: repeat(auto-fill, minmax(var(--swatch-width), 1fr));
}
.swatch {
  aspect-ratio: var(--swatch-aspect) / 1;
  overflow: hidden;
}
.swatches--labeled {
  --swatch-width: 10rem;
  --swatch-aspect: 2;
}
.swatches:not(.swatches--labeled) .swatch:hover,
.swatches:not(.swatches--labeled) .swatch:focus {
  --transform: -20%;

  position: absolute;
  width: var(--swatch-zoom);
  height: var(--swatch-zoom);
  overflow: initial;
  z-index: 2;
  top: 0;
  left: 0;
  transform: translate(var(--transform), var(--transform));
  box-shadow: 0 0 2rem -0.1rem #0008;
}
.swatch:hover .labels,
.swatch:focus .labels {
  opacity: 1;
}
</style>
