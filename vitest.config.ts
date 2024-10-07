import { defineVitestConfig } from "@nuxt/test-utils/config";
import { configDefaults } from "vitest/config";

export default defineVitestConfig({
  test: {
    exclude: [...configDefaults.exclude, "tests/*"],
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
