<template>
  <main class="main">
    <Header />
    <Nuxt />
  </main>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  components: { Header }
}
</script>

<style lang="scss">
html {
  background-color: #eee;
  color: #111;
  font-family: "Anonymous Pro", monospace;
  &.dark {
    background-color: #111;
    color: #fff;
  }
}
</style>
