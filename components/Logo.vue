<template>
  <svg class="logo" xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="100 100 300 300">
  <defs>
    <clipPath id="a" transform="translate(100 100)">
      <rect width="300" height="300" fill="none"/>
    </clipPath>
    <linearGradient id="b" x2="500" y2="500" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#fff"/>
      <stop offset="1"/>
    </linearGradient>
  </defs>
  <g style="isolation:isolate">
    <g clip-path="url(#a)">
      <rect x="100" y="100" width="100" height="100" fill="#80ffff"/>
      <rect x="100" y="200" width="100" height="100" fill="aqua"/>
      <rect x="200" y="300" width="100" height="100" fill="teal"/>
      <rect x="100" y="300" width="100" height="100" fill="#80c0ff"/>
      <rect x="200" y="200" width="100" height="100" fill="#0080ff"/>
      <rect x="300" y="100" width="100" height="100" fill="#004080"/>
      <rect x="200" y="100" width="100" height="100" fill="#8080ff"/>
      <rect x="300" y="200" width="100" height="100" fill="blue"/>
      <rect x="300" y="300" width="100" height="100" fill="navy"/>
      <rect width="500" height="500" fill="url(#b)" style="mix-blend-mode:overlay"/>
    </g>
  </g>
</svg>
</template>

<script>
export default {
  name: "BLogo"
};
</script>

<style scoped>
.logo {
  height: 3rem;
}
</style>
