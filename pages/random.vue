<template>
  <br />
</template>

<script>
const randomArr = arr => arr[Math.floor(Math.random() * arr.length)];

export default {
  async fetch({ $content }) {
    const x11 = await $content("x11").fetch();
    const other = await $content("colors").fetch();
    const pantone = await $content("pantone").fetch();
    const tcx = await $content("pantone-tcx").fetch();
    const ntc = await $content("ntc").fetch();
    const crayola = await $content("crayola").fetch();
    const random = [
      randomArr(x11).slug,
      randomArr(other).slug,
      randomArr(ntc).slug,
      randomArr(tcx).slug,
      randomArr(pantone).slug,
      randomArr(crayola).slug
    ];
    window.location = randomArr(random);
  }
};
</script>
