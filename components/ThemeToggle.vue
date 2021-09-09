<template>
  <button
    :title="`${dark ? 'Dis' : 'En'}able dark mode`"
    class="appearance-none text-2xl"
    @click="toggle"
  >
    <span :class="{ hidden: !dark }"><i class="fas fa-sun"></i></span>
    <span :class="{ hidden: dark }"><i class="fas fa-moon-stars"></i></span>
  </button>
</template>

<script>
export default {
  data() {
    return {
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
