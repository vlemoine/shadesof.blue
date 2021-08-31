<template>
  <header class="flex py-4 px-8">
      <NuxtLink to="/" class="flex items-center"
        ><Logo />
        <h1 class="ml-4 text-2xl font-bold">Shades of Blue</h1></NuxtLink
      >
      <nav class="flex ml-auto items-center">
        <NuxtLink :to="random" class="font-bold text-lg">Random</NuxtLink>
        <NuxtLink to="about" class="font-bold text-lg">About</NuxtLink>
      </nav>
    </header>
</template>

<script>
import Logo from "~/components/Logo.vue";

const randomArr = arr => arr[Math.floor(Math.random() * arr.length)];

export default {
  name: "Header",
  components: { Logo },
  data() {
    return {
      random: "cyan"
    };
  },
  async fetch() {
    const origin = window.location.origin;
    this._x11 = await fetch(`${origin}/_content/colors`).then(res =>
      res.json()
    );
    this._ntc = await fetch(`${origin}/_content/ntc`).then(res => res.json());
    this._tcx = await fetch(`${origin}/_content/pantone-tcx`).then(res =>
      res.json()
    );
    this._pantone = await fetch(`${origin}/_content/pantone`).then(res => res.json());
    this.random = [
      randomArr(this._x11).slug,
      randomArr(this._ntc).slug,
      randomArr(this._tcx).slug,
      randomArr(this._pantone).slug
    ];
    this.random = randomArr(this.random);
  }
};
</script>

<style>
header {
  align-items: center;
}
</style>
