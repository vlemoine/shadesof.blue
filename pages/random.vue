<template>
  <br />
</template>

<script>
const randomArr = (arr) => arr[Math.floor(Math.random() * arr.length)];

export default {
  async asyncData({ $content }) {
    const x11 = await $content("x11").fetch();
    const other = await $content("colors").fetch();
    const pantone = await $content("pantone").fetch();
    const tcx = await $content("pantone-tcx").fetch();
    const ntc = await $content("ntc").fetch();
    const wn = await $content("wn").fetch();
    const xkcd = await $content("xkcd").fetch();
    const crayola = await $content("crayola").fetch();
    const swBlue = await $content("sw/blue").fetch();
    const swPurple = await $content("sw/purple").fetch();
    const swPastel = await $content("sw/pastel").fetch();
    const swHistoric = await $content("sw/historic").fetch();
    const swTimeless = await $content("sw/timeless").fetch();
    const swNeutral = await $content("sw/neutral").fetch();
    const sw = [
      ...swBlue,
      ...swPurple,
      ...swPastel,
      ...swHistoric,
      ...swTimeless,
      ...swNeutral,
    ];
    const lib = [
      ...x11,
      ...other,
      ...pantone,
      ...tcx,
      ...ntc,
      ...crayola,
      ...wn,
      ...xkcd,
      ...sw,
    ];
    return { lib };
  },
  mounted() {
    this.$router.replace({
      path: `/${randomArr(this.lib).slug}`,
    });
  },
};
</script>
