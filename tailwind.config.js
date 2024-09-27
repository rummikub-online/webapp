/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: [
    "./index.html",
    "./components/**/*.{js,ts,jsx,tsx,vue}",
    "./pages/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans], // Adds a new `font-display` class
      },
      colors: {
        body: {
          text: "#000000",
          bg: "#F9F9F9",
        },
        separator: "#E2E2E2",
        card: {
          bg: "#FFFFFF",
          "overlay-locked": "#EEEEEE",
          "text-red": "#DB2727",
          "text-blue": "#2070B9",
          "text-black": "#252323",
          "text-yellow": "#3F8415",
        },
        button: {
          bg: "#FFFFFF",
          "text-success": "#3F8415",
          "text-danger": "#AA0505",
        },
      },
    },
  },
  plugins: [],
};
