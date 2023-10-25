/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#1a1a1a",
        grey1: "#4D4D4D",
        grey2: "#808080",
        greyLighter: "#e6e6e6",
        greyLoading: "rgba(127.5,127.5,127.5,0.3)",
        secondGrey: "#999",
        success: "#399e5a",
        warning: "#edb230",
      },
      screens: {
        mdx: "834px",
        lgx: "1199px",
        laptopL: "1440px",
        xl: "1280px",
      },
      gridTemplateColumns: {
        "auto-1fr": "auto 1fr",
      },
      gridTemplateRows: {
        "auto-4": "auto auto auto auto",
      },
    },
  },
  plugins: [],
};
