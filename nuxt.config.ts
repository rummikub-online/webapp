import svgLoader from "vite-svg-loader";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: false },
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
                  removeViewBox: false
                }
              }
            }
          ]
        }
      })
    ],
    optimizeDeps: {
      include: ["jsdoc-type-pratt-parser"]
    }
  },
  modules: [
    "@nuxt/test-utils/module",
    "@nuxtjs/storybook",
    "@nuxtjs/i18n",
    "@nuxt/ui"
  ],
  compatibilityDate: "2024-08-24",
  nitro: {
    experimental: {
      websocket: true
    }
  },
  typescript: {
    typeCheck: true,
    tsConfig: {
      compilerOptions: {
        paths: {
          "@": ["."],
          "@/*": ["./*"]
        }
      }
    }
  },

  i18n: {
    locales: [
      {
        code: "fr",
        file: "fr.ts"
      }
    ],
    lazy: true,
    langDir: "lang",
    defaultLocale: "fr",
    strategy: "no_prefix",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "rummikub.lang",
      alwaysRedirect: true
    },
    compilation: {
      strictMessage: false,
      escapeHtml: false
    }
  },

  colorMode: {
    preference: "light"
  }
});
