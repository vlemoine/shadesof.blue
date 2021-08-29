<template>
  <div class="swatch p-2" :style="`background-color: ${blue.value};color: ${color}`">{{
    blue.title
  }}
  <slot />
  </div>
</template>

<script>
import Color from 'color';

export default {
  name: 'Swatch',
  props: {
    blue: {
      type: Object,
      required: true
    }
  },
  computed: {
    color() {
      const c = Color(this.blue.value)
      return c.isLight() ? '#111' : '#fff'
    }
  }
}
</script>
