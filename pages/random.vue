<template>
  <br />
</template>

<script>
const randomArr = arr => arr[Math.floor(Math.random() * arr.length)];

export default {
  async fetch() {
    const origin = window.location.origin;
    const x11 = await fetch(`${origin}/_content/x11`).then(res => res.json());
    const other = await fetch(`${origin}/_content/colors`).then(res =>
      res.json()
    );
    const ntc = await fetch(`${origin}/_content/ntc`).then(res => res.json());
    const tcx = await fetch(`${origin}/_content/pantone-tcx`).then(res =>
      res.json()
    );
    const pantone = await fetch(`${origin}/_content/pantone`).then(res =>
      res.json()
    );
    const random = [
      randomArr(x11).slug,
      randomArr(other).slug,
      randomArr(ntc).slug,
      randomArr(tcx).slug,
      randomArr(pantone).slug
    ];
    window.location = randomArr(random);
  }
};
</script>
