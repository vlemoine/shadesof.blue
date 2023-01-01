export default defineNuxtConfig ({
  ssr: false,
  devServerHandlers: [],
  app: {
    head: {
      title: "shadesof.blue",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { hid: "description", name: "description", content: "" },
        { name: "format-detection", content: "telephone=no" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "crossorigin",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Anonymous+Pro:wght@400;700&display=swap",
        },
      ],
      script: [
        {
          src: "https://kit.fontawesome.com/d58afaae54.js",
          crossorigin: "anonymous",
        },
      ],
    },
  },
  

  colorMode: {
    classSuffix: "",
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxtjs/color-mode",
    "@nuxtjs/tailwindcss",
    // https://go.nuxtjs.dev/content
    "@nuxt/content",
  ],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: "en",
    },
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
});
