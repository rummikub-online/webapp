/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans], // Adds a new `font-display` class
      },
      colors: {
        card: {
          red: "#DB2727",
          blue: "#2070B9",
          black: "#252323",
          yellow: "#3F8415",
        },
      },
    },
  },
  plugins: [],
};
