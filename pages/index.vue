<template>
  <div class="px-8">
    <div
      class="swatches__header sticky top-0 z-10 flex flex-wrap -mx-8 py-4 px-8"
    >
      <label for="name"
        >Filter
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
        <div class="flex items-center py-1 gap-3">
          <strong>Color family</strong>
          <div class="mx-2"></div>
          <template v-for="(f, i) in filters.families.options">
            <label
              :key="i"
              :class="[
                classes.pill,
                filters.families.selected.includes(f)
                  ? classes.pillSelected
                  : '',
              ]"
              :for="`family_${f}`"
            >
              <input
                :id="`family_${f}`"
                v-model="filters.families.selected"
                type="checkbox"
                :value="f"
                class="appearance-none rounded-full w-6 h-6 mr-2 filter"
                :class="`filter--${f}`"
              />
              {{ f }}
            </label>
          </template>
          <div
            class="border-r h-6 border-opacity-80 dark:border-opacity-20"
          ></div>
          <button
            :class="[
              classes.pill,
              filters.gray !== 0 ? classes.pillSelected : '',
            ]"
            @click="toggleGray()"
          >
            <span
              class="rounded-full w-6 h-6 mr-2 bg-gray-300 dark:bg-gray-500 inline-flex items-center justify-center"
              ><i class="fas fa-adjust"></i
            ></span>
            {{ filters.gray === 2 ? "Only grays" : "Grays" }}
          </button>
          <label
            for="oob"
            class="px-4 flex items-center"
            :class="[classes.pill, filters.oob ? classes.pillSelected : '']"
          >
            <input
              id="oob"
              v-model="filters.oob"
              type="checkbox"
              class="appearance-none"
            />
            <span
              class="rounded-full w-6 h-6 mr-2 inline-flex items-center justify-center filter--oob"
              ><i class="fas fa-rainbow"></i
            ></span>
            Out of bounds
          </label>
        </div>
        <div class="flex items-center py-2 flex-wrap">
          <strong>View options</strong>
          <div class="mx-2"></div>
          <template v-for="(f, k, i) in filters.check">
            <label :key="i" :for="k" class="px-4 flex items-center">
              <Checkbox
                :id="k"
                v-model="f.value"
                :checked="f.value"
                :name="k"
                class="mr-2"
              />
              {{ f.label }}
            </label>
          </template>
        </div>
      </Filters>
    </div>
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
  showLabels: { label: "Show labels", value: false },
};

const filterLogic = (blue, filters) => {
  // If returns true, it will hide the swatch from the view!
  return (
    (filters.families.selected.length !== 0 &&
      ((blue.family === "Blue" &&
        !filters.families.selected.includes("Blue")) ||
        (blue.family === "Azure" &&
          !filters.families.selected.includes("Azure")) ||
        (blue.family === "Cyan" &&
          !filters.families.selected.includes("Cyan")))) ||
    (blue.hex.toLowerCase().search(filters.name.toLowerCase()) === -1 &&
      blue.alias.toLowerCase().search(filters.name.toLowerCase()) === -1 &&
      blue.title.toLowerCase().search(filters.name.toLowerCase()) === -1) ||
    (blue.gray && !filters.gray) ||
    (!blue.gray && filters.gray === 2) ||
    (blue.oob && !filters.oob)
  );
};

export default {
  async asyncData({ $content }) {
    const x11 = await $content("x11").fetch();
    const other = await $content("colors").fetch();
    const pantone = await $content("pantone").fetch();
    const tcx = await $content("pantone-tcx").fetch();
    const ntc = await $content("ntc").fetch();
    const crayola = await $content("crayola").fetch();
    const wn = await $content("wn").fetch();
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
      ...wn,
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
          selected: [],
        },
        gray: 0, // 0 hide 1 show 2 only
        oob: false,
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
      classes: {
        pill: "px-2 py-1 flex items-center cursor-pointer rounded-full border border-gray-300 dark:border-gray-700",
        pillSelected: "bg-gray-300 dark:bg-gray-700 font-bold",
      },
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
      return sort;
    },
    count() {
      const filters = this.filters;
      const c = [...this.c].filter((blue) => filterLogic(blue, filters));
      return this.c.length - c.length;
    },
  },
  methods: {
    filter(blue) {
      const filters = this.filters;
      return filterLogic(blue, filters);
    },
    toggleGray() {
      const filters = this.filters;
      filters.gray === 2 ? (filters.gray = 0) : filters.gray++;
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
.filter--Cyan {
  background-color: hsl(180, 100%, 50%);
  background-image: linear-gradient(to right, hsl(170, 100%, 50%), hsl(180, 100%, 50%), hsl(195, 100%, 50%));
}
.filter--Azure {
  background-color: hsl(210, 100%, 50%);
  background-image: linear-gradient(to right, hsl(196, 100%, 50%), hsl(210, 100%, 50%), hsl(225, 100%, 50%));
}
.filter--Blue {
  background-color: hsl(240, 100%, 50%);
  background-image: linear-gradient(to right, hsl(226, 100%, 50%), hsl(240, 100%, 50%), hsl(250, 100%, 50%));
}
.filter--oob {
  background-image: linear-gradient(to right, hsl(165, 100%, 75%), hsl(255, 100%, 75%))
}
.dark .filter--oob {
  background-image: linear-gradient(to right, hsl(165, 100%, 50%), hsl(255, 100%, 50%))
}
</style>
