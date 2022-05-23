<template>
  <header
    class="flex py-4 px-8 h-20 border-b border-black dark:border-white items-center sticky top-0"
  >
    <NuxtLink
      to="/"
      class="flex items-center focus-within:shadow-focus focus:outline-none"
      ><Logo />
      <h1 class="ml-4 text-2xl font-bold">Shades of Blue</h1></NuxtLink
    >
    <nav class="flex ml-auto items-center gap-4">
      <NuxtLink to="/random" :class="link">Random</NuxtLink>
      <NuxtLink to="/about" :class="link">About</NuxtLink>
      <ThemeToggle />
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      link: "font-bold text-lg focus-within:shadow-focus focus:outline-none",
    };
  },
};
</script>
