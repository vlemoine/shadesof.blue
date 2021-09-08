<template>
  <div id="Filters">
    <button class="appearance-none" @click="open = true">
        Filters
        <i class="fas fa-filter ml-1"></i>
      </button>
<div
      class="
        filters
        fixed
        top-0
        right-0
        h-screen
        z-10
        bg-black
        shadow-xl
        bg-opacity-90
        transition-all
      "
      :class="{
        'overflow-hidden w-0': !open,
        'p-4 w-1/3': open,
      }"
    >
      <div class="flex items-center mb-4">
        <h2 class="text-xl font-bold">Filters</h2>
        <button
          class="apperance-none ml-auto text-2xl"
          @click="open = false"
        >
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
      open: false
    }
  }
}
</script>