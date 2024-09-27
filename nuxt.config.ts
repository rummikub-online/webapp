import svgLoader from "vite-svg-loader";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  vite: {
    plugins: [
      svgLoader({
        defaultImport: "component",
        svgoConfig: {
          multipass: true,
          plugins: [
            {
              name: "preset-default",
              params: {
                overrides: {
                  // @see https://github.com/svg/svgo/issues/1128
                  removeViewBox: false,
                },
              },
            },
          ],
        },
      }),
    ],
    optimizeDeps: {
      include: ["jsdoc-type-pratt-parser"],
    },
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/test-utils/module",
    "@nuxtjs/storybook",
  ],
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
