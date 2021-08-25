<template>
  <div class="swatch" :style="`background-color: ${blue.value}`">{{
    blue.title
  }}</div>
</template>

<script>
export default {
  name: 'Swatch',
  props: {
    blue: {
      type: Object,
      required: true
    }
  }
}
</script>
