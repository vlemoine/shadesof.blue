<template>
  <button
    :title="`${dark ? 'Dis' : 'En'}able dark mode`"
    class="text-2xl focus-within:shadow-focus focus:outline-none p-1 rounded-full"
    @click="toggle"
  >
    <span class="square grid place-center" :class="{ hidden: !dark }"><i class="fa-duotone fa-sun"></i></span>
    <span class="square grid place-center" :class="{ hidden: dark }"><i class="fa-duotone fa-moon-stars"></i></span>
  </button>
</template>

<script>
export default {
  data() {
    return {
      // icons have to be in a span so fontawesome can render properly
      dark: false,
    };
  },
  mounted() {
    const ls = localStorage.getItem("colorScheme");
    if (ls) document.documentElement.classList.toggle("dark", ls === "dark");
    this.dark = ls
      ? ls === "dark"
      : document.documentElement.classList.contains("dark");
  },
  methods: {
    toggle() {
      document.documentElement.classList.toggle("dark");
      this.dark = document.documentElement.classList.contains("dark");
      localStorage.setItem("colorScheme", this.dark ? "dark" : "light");
    },
  },
};
</script>
