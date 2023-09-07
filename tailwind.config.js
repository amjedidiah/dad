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
      },
      screens: {
        mdx: "834px",
        lgx: "1199px",
      },
      gridTemplateColumns: {
        "auto-1fr": "auto 1fr",
      },
    },
  },
  plugins: [],
};
