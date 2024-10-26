/** @type {import("tailwindcss").Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: [
    "./index.html",
    "./components/**/*.{js,ts,jsx,tsx,vue}",
    "./pages/**/*.{js,ts,jsx,tsx,vue}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans] // Adds a new `font-display` class
      },
      colors: {
        body: {
          text: "#000000",
          "text-disabled": "#868686",
          bg: "#F3F3F3"
        },
        separator: "#E2E2E2",
        card: {
          bg: "#FFFFFF",
          border: "#E5E5E5",
          create: "#A0A0A0",
          "bg-overlay-locked": "#EEEEEE",
          "text-overlay-locked": "#6A6A6A",
          "text-red": "#DB2727",
          "text-blue": "#2070B9",
          "text-black": "#252323",
          "text-yellow": "#3F8415"
        },
        button: {
          bg: "#FFFFFF",
          "bg-disabled": "#FAFAFA",
          "text-disabled": "#868686",
          "text-success": "#3F8415",
          "text-danger": "#AA0505"
        }
      },
      aspectRatio: {
        auto: "auto",
        square: "1 / 1",
        video: "16 / 9"
      },
      container: {
        center: "true"
      }
    }
  },
  plugins: []
};
