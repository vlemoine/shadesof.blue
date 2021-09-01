<template>
  <br/>
</template>

<script>
const randomArr = arr => arr[Math.floor(Math.random() * arr.length)];

export default {
  async fetch() {
    const origin = window.location.origin;
    this._x11 = await fetch(`${origin}/_content/colors`).then(res =>
      res.json()
    );
    this._ntc = await fetch(`${origin}/_content/ntc`).then(res => res.json());
    this._tcx = await fetch(`${origin}/_content/pantone-tcx`).then(res =>
      res.json()
    );
    this._pantone = await fetch(`${origin}/_content/pantone`).then(res =>
      res.json()
    );
    this.random = [
      randomArr(this._x11).slug,
      randomArr(this._ntc).slug,
      randomArr(this._tcx).slug,
      randomArr(this._pantone).slug
    ];
    window.location = randomArr(this.random);
  }
};
</script>
