<template>
  <header class="flex py-4 px-8">
      <NuxtLink to="/" class="flex items-center"
        ><Logo />
        <h1 class="ml-4 text-2xl font-bold">Shades of Blue</h1></NuxtLink
      >
      <nav class="flex ml-auto items-center gap-4">
        <NuxtLink to="/random" class="font-bold text-lg">Random</NuxtLink>
        <NuxtLink to="/about" class="font-bold text-lg">About</NuxtLink>
        <ThemeToggle />
      </nav>
    </header>
</template>

<style>
header {
  align-items: center;
}
</style>
