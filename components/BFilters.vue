<template>
  <div id="Filters">
    <button class="appearance-none" @click="open = !open">
      Options
      <i class="fas fa-filter"></i>
    </button>
    <div
      class="
        fixed
        top-0
        right-0
        shadow-xl
        h-screen
        z-10
        bg-opacity-90
        transition-all
        bg-white
        dark:bg-black
      "
      :class="{
        'w-0 overflow-hidden': !open,
        'w-1/3 p-4': open,
      }"
    >
      <div class="flex items-center mb-4">
        <h2 class="text-xl font-bold">Options</h2>
        <button class="apperance-none ml-auto text-2xl" @click="open = false">
          <i class="fal fa-times"></i>
        </button>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      open: false,
    };
  },
};
</script>
