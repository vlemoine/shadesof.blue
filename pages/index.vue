<template>
  <div class="px-4 lg:px-8 pb-4 lg:pb-8">
    <div
      class="swatches__header | py-4 [ sticky top-0 z-10 ] [ flex flex-wrap gap-4 justify-center ] [ -mx-4 px-4 ] [ lg:-mx-8 lg:px-8 ]"
    >
      <div class="flex gap-3 [ w-full | lg:w-auto ]">
        <label for="name" class="flex items-center gap-3 [ w-full | lg:w-auto ]"
          ><i class="fa-duotone fa-filters"></i> Filter
          <input
            id="name"
            v-model="filters.name"
            name="name"
            type="search"
            class="rounded-full dark:bg-gray-800 [ text-black dark:text-white ] [ w-full lg:w-auto ] [ px-4 py-1 ] [ focus-within:shadow-focus focus:outline-none ] [ border border-gray-900 dark:border-gray-600 ]"
        /></label>
        <button
          class="pl-3 pr-3"
          :class="[
            classes.pill,
            filters.open ? classes.pillSelected : 'bg-white dark:bg-black',
          ]"
          @click="filters.open = !filters.open"
        >
          Options
        </button>
      </div>
      <p class="total | lg:ml-auto text-center">
        Displaying <strong>{{ count }}</strong> / {{ c.length }} blues
        documented!
      </p>
      <Filters :open="filters.open">
        <div class="py-1 flex items-center gap-3">
          <strong class="whitespace-nowrap">Color family</strong>
          <div class="flex gap-2 items-center">
            <div class="flex flex-wrap gap-3">
              <template v-for="(f, i) in filters.families.options">
                <label
                  :key="i"
                  class="color-checkbox"
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
                    class="appearance-none rounded-full w-6 h-6 mr-2 filter focus:outline-none"
                    :class="`filter--${f}`"
                  />
                  {{ f }}
                </label>
              </template>
            </div>
            <div
              class="hidden md:block border-r h-6 border-opacity-80 dark:border-opacity-20"
            ></div>
            <div class="flex flex-wrap gap-3">
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
          </div>
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
        <!-- {{blue.hsv}} -->
          <!-- s {{ Math.round(blue.hsv.s) }}<br /> -->
          <!-- w {{ Math.round(blue.hwb.w) }}<br />
          b {{ Math.round(blue.hwb.b) }}<br /> -->
          <!-- w+b {{ Math.round(blue.hwb.b + blue.hwb.w) }} -->
          <!-- {{blue.dupe}} -->
          <!-- <span v-if="blue.del">del</span> -->
        </Swatch>
      </template>
    </section>
  </div>
</template>

<script>
import Color from "color";
import isGray from "../scripts/gray.js";

const Panel = {
  showLabels: { label: "Show labels", value: false },
};

const filterLogic = (blue, filters) => {
  // If returns true, it will hide the swatch from the view!
  const query = filters.name.toLowerCase();
  const gray = query.search("gray") !== -1;
  const grey = query.search("grey") !== -1;
  let _gray = query;
  if (gray) {
    _gray = query.replace("gray", "grey");
  } else if (grey) {
    _gray = query.replace("grey", "gray");
  }
  const _blue =
    blue.family === "Blue" && !filters.families.selected.includes("Blue");
  const _azure =
    blue.family === "Azure" && !filters.families.selected.includes("Azure");
  const _cyan =
    blue.family === "Cyan" && !filters.families.selected.includes("Cyan");
  const _hex = blue.hex.toLowerCase();
  const _alias = blue.alias.toLowerCase();
  const _title = blue.title.toLowerCase();
  const search =
    _hex.search(query) === -1 &&
    _alias.search(query) === -1 &&
    _title.search(query) === -1 &&
    _hex.search(_gray) === -1 &&
    _alias.search(_gray) === -1 &&
    _title.search(_gray) === -1;
  return (
    (filters.families.selected.length !== 0 && (_blue || _azure || _cyan)) ||
    search ||
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
    const xkcd = await $content("xkcd").fetch();
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
      ...xkcd,
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
        pill: "px-2 py-1 flex items-center cursor-pointer rounded-full border border-gray-900 dark:border-gray-600 focus-within:shadow-focus focus:outline-none",
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
        s.hsv = b.hsv().object();
        s.hwb = b.hwb().object(); // debug
        s.gray = isGray(s.value);
        const hue = s.hsv.h;
        s.oob = hue < 170 || hue > 250;
        s.del = hue < 160 || hue > 260;
        s.nameDupe = sort.filter((e) => e.slug === s.slug).length > 1;
        s.family =
          hue <= 195 ? "Cyan" : hue > 195 && hue <= 225 ? "Azure" : "Blue";
      });
      sort = sort.sort((a, b) => Math.round(b.hsv.v) - Math.round(a.hsv.v));
      sort = sort.sort((a, b) => Math.round(a.hsv.s) - Math.round(b.hsv.s));
      sort = sort.sort((a, b) => Math.round(a.hsv.h) - Math.round(b.hsv.h));
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
  --focus-ring: hsl(210deg 100% 50% / 0.33);
  --swatch-width: 5rem;
  --swatch-aspect: 1 / 1;
  --swatch-multiply: 1.5;
  --swatch-zoom: calc(var(--swatch-width) * var(--swatch-multiply));
}
@media (min-width: 1024px) {
  :root {
    --swatch-multiply: 1.8;
  }
}
.dark {
  --focus-ring: hsl(210deg 100% 50% / 0.67);
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
}

.swatches:not(.swatches--labeled) a:hover .swatch,
.swatches:not(.swatches--labeled) a:focus .swatch {
  --transform: -10%;

  position: absolute;
  width: var(--swatch-zoom);
  height: var(--swatch-zoom);
  overflow: initial;
  top: 0;
  left: 0;
  transform: translate(var(--transform), var(--transform));
  box-shadow: 0 0 2rem -0.1rem #0008;
}
@media (min-width: 1024px) {
  .swatches:not(.swatches--labeled) a:hover .swatch,
  .swatches:not(.swatches--labeled) a:focus .swatch {
    --transform: -20%;
  }
}

.filter--Cyan {
  background-color: hsl(180deg 100% 50%);
  background-image: linear-gradient(
    to right,
    hsl(170deg 100% 50%),
    hsl(180deg 100% 50%),
    hsl(195deg 100% 50%)
  );
}
.filter--Azure {
  background-color: hsl(210deg 100% 50%);
  background-image: linear-gradient(
    to right,
    hsl(196deg 100% 50%),
    hsl(210deg 100% 50%),
    hsl(225deg 100% 50%)
  );
}
.filter--Blue {
  background-color: hsl(240deg 100% 50%);
  background-image: linear-gradient(
    to right,
    hsl(226deg 100% 50%),
    hsl(240deg 100% 50%),
    hsl(250deg 100% 50%)
  );
}
.filter--oob {
  background-image: linear-gradient(
    to right,
    hsl(165deg 100% 75%),
    hsl(255deg 100% 75%)
  );
}
.dark .filter--oob {
  background-image: linear-gradient(
    to right,
    hsl(165deg 100% 50%),
    hsl(255deg 100% 50%)
  );
}
.square {
  aspect-ratio: 1 / 1;
}
</style>
