import svgLoader from "vite-svg-loader";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  vite: {
    plugins: [svgLoader()],
  },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/test-utils/module", "@pinia/nuxt"],
  compatibilityDate: "2024-08-24",
  nitro: {
    experimental: {
      websocket: true,
    },
  },
  typescript: {
    tsConfig: {
      compilerOptions: {
        paths: {
          "@": ["."],
          "@/*": ["./*"],
        },
      },
    },
  },
});
