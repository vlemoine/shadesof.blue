<template>
  <main>
    <pre>{{colors}}</pre>
  </main>
</template>
<script>
// export default {}
export default {
  async asyncData ({ $content, params }) {
    // const hello = await $content('hello').fetch()
    const colors = await $content('colors', params.slug).fetch()
    return {
      // hello,
      colors
    }
  }
}
</script>
