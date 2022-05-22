module.exports = {
  content: [
    "./components/**/*.{vue,js}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  darkMode: "class", // or 'media' or 'class'
  variants: {
    extend: {
      backgroundColor: ["checked"],
      borderColor: ["checked"],
      borderWidth: ["checked"],
      opacity: ["disabled"],
      zIndex: ["hover", "focus"]
    },
  },
  plugins: [],
};
