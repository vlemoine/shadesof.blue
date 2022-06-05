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
      backgroundColor: ["checked", "focus-within"],
      borderColor: ["checked", "focus-within"],
      borderWidth: ["checked", "focus-within"],
      boxShadow: ["focus-within"],
      opacity: ["disabled"],
      outline: ["focus"],
      zIndex: ["hover", "focus"],
    },
  },
  theme: {
    boxShadow: {
      focus: " 0 0 0 0.25rem var(--focus-ring)",
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
