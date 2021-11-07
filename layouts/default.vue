<template>
  <main class="main">
    <b-header></b-header>
    <Nuxt />
  </main>
</template>

<style lang="scss">
html {
  background-color: hsl(180, 20%, 95%);
  color: hsl(0, 0%, 5%);
  font-family: "Anonymous Pro", monospace;
  &.dark {
    background-color: hsl(220, 20%, 10%);
    color: #fff;
  }
}
</style>
