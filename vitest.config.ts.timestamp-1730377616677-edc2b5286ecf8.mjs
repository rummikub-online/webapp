// vitest.config.ts
import { defineVitestConfig } from "file:///Users/arthaud/dev/rummikub/node_modules/@nuxt/test-utils/dist/config.mjs";
import { configDefaults } from "file:///Users/arthaud/dev/rummikub/node_modules/vitest/dist/config.js";
var vitest_config_default = defineVitestConfig({
  test: {
    exclude: [...configDefaults.exclude, "tests/*"],
    deps: {
      optimizer: {
        ssr: {
          include: []
        }
      }
    }
  }
  // any custom Vitest config you require
});
export {
  vitest_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZXN0LmNvbmZpZy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9hcnRoYXVkL2Rldi9ydW1taWt1YlwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2FydGhhdWQvZGV2L3J1bW1pa3ViL3ZpdGVzdC5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2FydGhhdWQvZGV2L3J1bW1pa3ViL3ZpdGVzdC5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVWaXRlc3RDb25maWcgfSBmcm9tIFwiQG51eHQvdGVzdC11dGlscy9jb25maWdcIjtcbmltcG9ydCB7IGNvbmZpZ0RlZmF1bHRzIH0gZnJvbSBcInZpdGVzdC9jb25maWdcIjtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lVml0ZXN0Q29uZmlnKHtcbiAgdGVzdDoge1xuICAgIGV4Y2x1ZGU6IFsuLi5jb25maWdEZWZhdWx0cy5leGNsdWRlLCBcInRlc3RzLypcIl0sXG4gICAgZGVwczoge1xuICAgICAgb3B0aW1pemVyOiB7XG4gICAgICAgIHNzcjoge1xuICAgICAgICAgIGluY2x1ZGU6IFtdLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICAvLyBhbnkgY3VzdG9tIFZpdGVzdCBjb25maWcgeW91IHJlcXVpcmVcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF1USxTQUFTLDBCQUEwQjtBQUMxUyxTQUFTLHNCQUFzQjtBQUUvQixJQUFPLHdCQUFRLG1CQUFtQjtBQUFBLEVBQ2hDLE1BQU07QUFBQSxJQUNKLFNBQVMsQ0FBQyxHQUFHLGVBQWUsU0FBUyxTQUFTO0FBQUEsSUFDOUMsTUFBTTtBQUFBLE1BQ0osV0FBVztBQUFBLFFBQ1QsS0FBSztBQUFBLFVBQ0gsU0FBUyxDQUFDO0FBQUEsUUFDWjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBO0FBRUYsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
