<template>
  <div class="px-8">
    <header
      class="swatches__header sticky top-0 z-10 flex flex-wrap -mx-8 py-4 px-8"
    >
      <label for="name"
        >Search
        <input
          id="name"
          v-model="filters.name"
          name="name"
          type="search"
          class="text-black"
      /></label>
      <button
        class="appearance-none mx-4 border"
        @click="filters.open = !filters.open"
      >
        Options
        <i class="fas fa-filter"></i>
      </button>
      <p class="col-span-3 ml-auto total">
        Displaying <strong>{{ count }}</strong> / {{ c.length }} blues
        documented!
      </p>
      <Filters :open="filters.open">
        <div
          class="
            flex
            items-center
            border-b border-opacity-80
            dark:border-opacity-20
            py-2
            flex-wrap
          "
        >
          <strong>View options</strong>
          <div class="mx-2"></div>
          <template v-for="(f, k, i) in filters.check">
            <label :key="i" :for="k" class="px-4 flex items-center">
              <Checkbox
                :id="k"
                v-model="f.value"
                :checked="f.value"
                :name="k"
                :disabled="
                  k === 'includeGrays' ? filters.check.onlyGrays.value : false
                "
                class="mr-2"
              />
              {{ f.label }}
            </label>
          </template>
        </div>
        <div class="flex items-center py-2">
          <strong>Color family</strong>
          <div class="mx-2"></div>
          <template v-for="(f, i) in filters.families.options">
            <label
              :key="i"
              class="px-4 flex items-center cursor-pointer"
              :for="`family_${f}`"
            >
              <input
                :id="`family_${f}`"
                v-model="filters.families.selected"
                type="checkbox"
                :value="f"
                class="appearance-none rounded-full w-6 h-6 mr-2"
                :class="`filter_${f}`"
              />
              {{ f }}
            </label>
          </template>
        </div>
      </Filters>
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
          :show-labels="filters.check.showLabels.value"
        >
          <!-- {{blue.family}} -->
          <!-- {{blue.dupe}} -->
          <!-- {{blue.hsl.h}} -->
          <!-- <span v-if="blue.del">del</span> -->
        </Swatch>
      </template>
    </section>
  </div>
</template>

<script>
import Color from "color";

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
        families: {
          options: ["Cyan", "Azure", "Blue"],
          selected: ["Cyan", "Azure", "Blue"],
        },
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
        s.oob = s.hsl.h < 170 || s.hsl.h > 250;
        s.del = s.hsl.h < 160 || s.hsl.h > 260;
        s.nameDupe = sort.filter((e) => e.slug === s.slug).length > 1;
        const h = s.hsl.h;
        s.family = h <= 195 ? "Cyan" : h > 195 && h <= 225 ? "Azure" : "Blue";
      });
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
          (blue.family === "Blue" &&
            !filters.families.selected.includes("Blue")) ||
          (blue.family === "Azure" &&
            !filters.families.selected.includes("Azure")) ||
          (blue.family === "Cyan" &&
            !filters.families.selected.includes("Cyan")) ||
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
      // If returns true, it will hide the swatch from the view!
      const filters = this.filters;
      return (
        (blue.family === "Blue" &&
          !filters.families.selected.includes("Blue")) ||
        (blue.family === "Azure" &&
          !filters.families.selected.includes("Azure")) ||
        (blue.family === "Cyan" &&
          !filters.families.selected.includes("Cyan")) ||
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

.swatches__header {
  background-color: var(--bg);
}

.swatches--labeled {
  --swatch-width: 10rem;
  --swatch-aspect: 2 / 1.5;
  --swatch-aspect-pc: calc(1.5 / 2 * 100%);
}
.swatches:not(.swatches--labeled) a:hover .swatch,
.swatches:not(.swatches--labeled) a:focus .swatch {
  --transform: -20%;

  position: absolute;
  width: var(--swatch-zoom);
  height: var(--swatch-zoom);
  overflow: initial;
  top: 0;
  left: 0;
  transform: translate(var(--transform), var(--transform));
  box-shadow: 0 0 2rem -0.1rem #0008;
}

.filter_Cyan {
  background-color: #0ff;
}
.filter_Azure {
  background-color: #0080ff;
}
.filter_Blue {
  background-color: #00f;
}
</style>
