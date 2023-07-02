import font from "@/utils/font.util";

const initTheme = {
  breakpoints: {
    mobile: 0,
    mobileS: 320,
    mobileM: 375,
    mobileL: 425,
    sm: 640,
    md: 768,
    mdx: 1199,
    lg: 1024,
    xl: 1280,
    laptopL: 1440,
    "2xl": 1536,
    "4k": 2560,
  },
  colors: {
    primary: "#724e91",
    secondary: "#9c27b0",
    error: "#660000",
    warning: "#edb230",
    success: "#399e5a",
    black: "#1a1a1a",
    white: "#ffffff",
    grey2: "#808080",
  },
  font,
};

export const lightTheme = {
  ...initTheme,
  colors: {
    ...initTheme.colors,
    background: "#ffffff",
    text: "#999999",
  },
};

export const darkTheme = {
  ...initTheme,
  colors: {
    ...initTheme.colors,
    background: "#000000",
    text: "#ffffff",
  },
};
