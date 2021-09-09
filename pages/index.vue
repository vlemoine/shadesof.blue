<template>
  <div class="px-8">
    <header class="swatches__header flex -mx-8 pt-4 px-8 pb-8">
      <label for="name"
        >Search
        <input
          id="name"
          v-model="filters.name"
          name="name"
          type="search"
          class="text-black"
      /></label>
      <Filters>
        <template v-for="(f, k, i) in filters.check">
          <div
            :key="i"
            class="
              p-4
              border-b border-opacity-80
              dark:border-opacity-20
              flex
              items-center
            "
          >
            <label :for="k">{{ f.label }}</label>
            <Checkbox
              :id="k"
              v-model="f.value"
              :checked="f.value"
              :name="k"
              :disabled="
                k === 'includeGrays' ? filters.check.onlyGrays.value : false
              "
            />
          </div>
        </template>
      </Filters>
      <p class="col-span-3 ml-auto total">
        Displaying <strong>{{ count }}</strong> / {{ c.length }} blues
        documented!
      </p>
    </header>
    <section
      class="swatches grid"
      :class="{
        'swatches--labeled': filters.check.showLabels.value,
      }"
    >
      <template v-for="(blue, i) in c">
        <Swatch
          :key="`${blue.slug}${blue.source}${i}`"
          :blue="blue"
          :class="{
            hidden: filter(blue),
          }"
        >
          <!-- {{blue.dupe}} -->
          <!-- {{blue.hsl.h}} -->
          <!-- <span v-if="blue.del">del</span> -->
          <div class="markers absolute top-1 right-1 opacity-50 flex flex-col">
            <i v-if="blue.gray" class="fas fa-adjust mb-1"></i>
            <i v-if="blue.oob" class="far fa-rainbow"></i>
          </div>
          <div
            v-if="labels"
            class="labels"
            :class="{ 'opacity-0': !filters.check.showLabels.value }"
          >
            <h2 class="pr-3 font-bold">{{ blue.title }}</h2>
            <template
              v-if="
                (blue.source === 'Pantone' ||
                  blue.source === 'Sherwin-Williams') &&
                blue.alias
              "
            >
              <span>{{ blue.alias }}</span
              ><br />
            </template>
            <span>{{ blue.hex }}</span>
          </div>
        </Swatch>
      </template>
    </section>
  </div>
</template>

<script>
import Color from "color";

// eslint-disable-next-line prefer-const
const Panel = {
  includeGrays: { label: "Show grays", value: true },
  onlyGrays: { label: "Show only grays", value: false },
  includeOobs: { label: "Show out of bounds", value: true },
  showLabels: { label: "Show labels", value: false },
};

export default {
  async asyncData({ $content }) {
    const x11 = await $content("x11").fetch();
    const other = await $content("colors").fetch();
    const pantone = await $content("pantone").fetch();
    const tcx = await $content("pantone-tcx").fetch();
    const ntc = await $content("ntc").fetch();
    const crayola = await $content("crayola").fetch();
    const swBlue = await $content("sw/blue").fetch();
    const swPurple = await $content("sw/purple").fetch();
    const swPastel = await $content("sw/pastel").fetch();
    const swHistoric = await $content("sw/historic").fetch();
    const swTimeless = await $content("sw/timeless").fetch();
    const swNeutral = await $content("sw/neutral").fetch();
    const sw = [
      ...swBlue,
      ...swPurple,
      ...swPastel,
      ...swHistoric,
      ...swTimeless,
      ...swNeutral,
    ];
    const blues = [
      ...x11,
      ...other,
      ...pantone,
      ...tcx,
      ...ntc,
      ...crayola,
      ...sw,
    ];
    return {
      blues,
    };
  },
  data() {
    return {
      details: true,
      filters: {
        open: false,
        check: Panel,
        libraries: {
          crayola: true,
          ntc: true,
          other: true,
          pantone: true,
          sw: true,
          tcx: true,
          x11: true,
        },
        name: "",
      },
      labels: true,
      libraries: [
        "Crayola",
        "Name that Color",
        "Other",
        "Pantone Coated",
        "Pantone TCX",
        "Sherwin-Williams",
        "HTML/Web/X11",
      ],
    };
  },
  computed: {
    c() {
      let sort = [...this.blues];
      sort.forEach((s) => {
        const b = Color(s.value);
        s.alias = s.alias || "";
        s.hex = b.hex();
        s.hsl = {};
        ["h", "s", "l"].forEach((v) => {
          s.hsl[v] = Math.round(b.hsl().object()[v]);
        });
        s.gray =
          s.hsl.s <= 22 ||
          s.hsl.l <= 10 ||
          (s.hsl.l > 10 && s.hsl.l <= 15 && s.hsl.s <= 50);
        s.oob = s.hsl.h < 170 || s.hsl.h > 240;
        s.del = s.hsl.h < 150 || s.hsl.h > 260;
        s.nameDupe = sort.filter((e) => e.slug === s.slug).length > 1;
      });
      // sort.forEach((s) => {
      //   s.colorDupe = [];
      //   sort.forEach(e => {if (e.hex === s.hex && e.slug !== s.slug) s.colorDupe.push(e.slug)})
      // });
      sort = sort.sort((a, b) => b.hsl.l - a.hsl.l);
      sort = sort.sort((a, b) => a.hsl.s - b.hsl.s);
      sort = sort.sort((a, b) => a.hsl.h - b.hsl.h);
      // sort = sort.sort((a, b) => a.slug > b.slug ? 1 : b.slug > a.slug ? -1 : 0);
      return sort;
    },
    count() {
      const filters = this.filters;
      const c = [...this.c].filter(
        (blue) =>
          (blue.hex.toLowerCase().search(filters.name.toLowerCase()) === -1 &&
            blue.alias.toLowerCase().search(filters.name.toLowerCase()) ===
              -1 &&
            blue.title.toLowerCase().search(filters.name.toLowerCase()) ===
              -1) ||
          (blue.gray &&
            !filters.check.includeGrays.value &&
            !filters.check.onlyGrays.value) ||
          (!blue.gray && filters.check.onlyGrays.value) ||
          (blue.oob && !filters.check.includeOobs.value)
      );
      return this.c.length - c.length;
    },
  },
  methods: {
    filter(blue) {
      const filters = this.filters;
      return (
        (blue.hex.toLowerCase().search(filters.name.toLowerCase()) === -1 &&
          blue.alias.toLowerCase().search(filters.name.toLowerCase()) === -1 &&
          blue.title.toLowerCase().search(filters.name.toLowerCase()) === -1) ||
        (blue.gray &&
          !filters.check.includeGrays.value &&
          !filters.check.onlyGrays.value) ||
        (!blue.gray && filters.check.onlyGrays.value) ||
        (blue.oob && !filters.check.includeOobs.value)
      );
    },
  },
};
</script>

<style>
:root {
  --swatch-width: 5rem;
  --swatch-aspect: 1 / 1;
  --swatch-aspect-pc: calc(var(--swatch-aspect) * 100%);
  --swatch-zoom: calc(var(--swatch-width) * 1.8);
}
.swatches {
  grid-template-columns: repeat(auto-fill, minmax(var(--swatch-width), 1fr));
}
.swatch {
  aspect-ratio: var(--swatch-aspect);
  overflow: hidden;
}
.swatch .labels {
  height: 0;
}
@supports not (aspect-ratio: 1 / 1) {
.swatch::before {
  float: left;
  padding-top: var(--swatch-aspect-pc);
  content: '';
}
.swatch::after {
  display: block;
  content: '';
  clear: both;
}
}
.swatches--labeled {
  --swatch-width: 10rem;
  --swatch-aspect: 2 / 1.5;
  --swatch-aspect-pc: calc(1.5 / 2 * 100%);
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
  height: auto;
}
</style>
