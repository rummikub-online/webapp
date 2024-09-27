/** @type {import('dependency-cruiser').IConfiguration} */

module.exports = {
  extends: "./base.cjs",
  options: {
    reporterOptions: {
      ddot: {
        theme: {
          graph: {
            rankdir: "TD",
          },
        },
      },
    },
  },
};
