<template>
  <main>
    <h1>{{ title }}</h1>
    <div
      class="swatch"
      :style="`background-color: ${value}`"
    ></div>
  </main>
</template>

<style scoped>
.swatch {
  width: 100px;
  height: 100px;
}
</style>
