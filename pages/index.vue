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
              <template v-for="(f, i) in filters.families.options" :key="i">
                <label
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
          <template v-for="(f, k, i) in filters.check" :key="i">
            <label :for="k" class="px-4 flex items-center">
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
      <template v-for="(blue, i) in c" :key="`${blue.slug}${blue.source}${i}`">
        <Swatch
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