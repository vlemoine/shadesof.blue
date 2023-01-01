<template>
  <main class="main h-full">
    <Header />
    <!-- <Nuxt /> -->
    <slot />
  </main>
</template>

<style lang="scss">
:root {
  --bg: hsl(180, 20%, 95%);
}
html {
  background-color: var(--bg);
  color: hsl(0, 0%, 5%);
  font-family: "Anonymous Pro", monospace;
  &.dark {
    --bg: hsl(220, 20%, 10%);
    
    color: #fff;
  }
}
</style>
