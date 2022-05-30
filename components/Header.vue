<template>
  <header
    class="bg [ py-4 px-4 md:px-8 h-20 ] [ flex items-center ] [ border-b border-black dark:border-white ] [ sticky top-0 z-10 ]"
  >
    <NuxtLink
      to="/"
      class="flex items-center focus-within:shadow-focus focus:outline-none"
      ><Logo />
      <h1 class="ml-4 text-2xl font-bold md:block" :class="{ hidden: menu }">Shades of Blue</h1></NuxtLink
    >
    <nav
      class="
        bg ml-auto
        [ pl-4 md:pl-0 ]
        [ md:flex items-center gap-4 ]
      "
      :class="{ hidden: !menu, flex: menu}"
    >
      <NuxtLink to="/random" :class="link">Random</NuxtLink>
      <NuxtLink to="/about" :class="link">About</NuxtLink>
      <ThemeToggle />
    </nav>
    <button
      class="md:hidden text-2xl [ focus-within:shadow-focus focus:outline-none ] p-1 rounded-full ml-auto"
      @click="menu = !menu"
    >
      <span :class="{hidden: menu}"><i class="fa-solid fa-bars"></i></span>
      <span :class="{hidden: !menu}"><i class="fa-solid fa-xmark"></i></span>
    </button>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      menu: false,
      link: "font-bold text-lg focus-within:shadow-focus focus:outline-none",
    };
  },
};
</script>

<style scoped>
.bg {
  background-color: var(--bg);
}
</style>
