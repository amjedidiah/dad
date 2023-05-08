const defaultTheme = {
  breakpoints: {
    mobile: 0,
    mobileS: 320,
    mobileM: 375,
    mobileL: 425,
    mobileXL: 576,
    tablet: 768,
    tabletL: 992,
    laptop: 1024,
    laptopM: 1200,
    laptopL: 1440,
    desktop: 1600,
    desktopL: 1920,
    desktopXL: 2560,
  },
  colors: {
    primary: "#724e91",
    secondary: "#9c27b0",
    error: "#660000",
    warning: "#edb230",
    success: "#399e5a",
  },
};

export const lightTheme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    background: "#ffffff",
    text: "#000000",
  },
};

export const darkTheme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    background: "#000000",
    text: "#ffffff",
  },
};
