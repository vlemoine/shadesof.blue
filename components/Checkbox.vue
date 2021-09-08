<template>
  <input
    type="checkbox"
    class="
      ml-auto
      appearance-none
      bg-white
      dark:bg-gray-900
      border
      border-gray-500
      w-6
      h-6
      rounded
      checked:border-0
      checked:bg-blue-600
      dark:checked:bg-blue-600
      disabled:opacity-50
    "
    v-bind="$attrs"
    :checked="checked"
    :data-toggle="toggle"
    @change="$emit('input', $event.target.checked)"
  />
</template>

<script>
export default {
  props: {
    checked: {
      type: Boolean,
      required: true,
    },
    toggle: {
      type: Boolean,
      default: false
    }
  },
};
</script>

<style lang="scss" scoped>
[type="checkbox"]:checked {
  background-position: center;
  background-repeat: no-repeat;
  background-size: 67% 67%;
  background-image: url('data:image/svg+xml;utf8,<svg fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg>');
}
</style>
