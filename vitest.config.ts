import { defineVitestConfig } from "@nuxt/test-utils/config";

export default defineVitestConfig({
  test: {
    deps: {
      optimizer: {
        ssr: {
          include: [],
        },
      },
    },
  },
  // any custom Vitest config you require
});
