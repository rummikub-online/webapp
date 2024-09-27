/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  extends: "./base.cjs",
  options: {
    reporterOptions: {
      archi: {
        theme: {
          graph: {
            rankdir: "TD",
          },
        },
      },
    },
  },
};
