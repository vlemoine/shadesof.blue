<template>
  <main class="main">
    <header class="flex p-4">
      <Logo />
      <h1 class="ml-4 text-2xl font-bold">Shades of Blue</h1>
    </header>
    
    <Nuxt/>
  </main>
</template>

<script>
import Logo from "~/components/Logo.vue";

export default {
  components: { Logo },
}
</script>

<style lang="scss">
  html {
    background-color: #eee;
    color: #111;
    font-family: 'Anonymous Pro', monospace;
    &.dark {
      background-color: #111;
      color: #fff;
    }
  }
  header {
    align-items: center;
  }
</style>
