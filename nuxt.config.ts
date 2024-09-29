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
    "@nuxtjs/i18n",
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

  i18n: {
    locales: [
      {
        code: "fr",
        file: "fr.ts",
      },
    ],
    lazy: true,
    langDir: "lang",
    defaultLocale: "fr",
    strategy: "no_prefix",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "rummikub.lang",
      alwaysRedirect: true,
    },
    compilation: {
      strictMessage: false,
      escapeHtml: false,
    },
  },
});
