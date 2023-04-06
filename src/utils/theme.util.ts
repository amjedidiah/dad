import { Mode } from "@/context/mode/types";
import { aeonik, inter } from "@/utils/font.util";
import { ThemeOptions } from "@mui/material";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: false;
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true;
    mobileS: true;
    mobileM: true;
    mobileL: true;
    mobileXL: true;
    tablet: true;
    tabletL: true;
    laptop: true;
    laptopM: true;
    laptopL: true;
    desktop: true;
    desktopL: true;
    desktopXL: true;
  }
}

export const getDesignTokens = (mode: Mode): ThemeOptions => ({
  typography: {
    fontFamily: inter.style.fontFamily,
  },
  breakpoints: {
    values: {
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
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        } 
        html, body, #__next {
          height: 100%;
        }
        h1, h2, h3, h4, h5, h6 {
          font-family: ${aeonik.style.fontFamily}, sans-serif;
        }
        a {
          text-decoration: none;
          color: #724e91;
          font-weight: 700;
        }
        .huge {
          display: inline-block;
          font-size: 1.3em;
          font-weight: 700;
          color: #724e91;
          text-shadow: 0 0 1px #724e91;

          @media screen and (min-width: 600px) {
            font-size: 2em;
          }
        }`,
    },
  },
  palette: {
    mode,
    primary: {
      main: "#724e91",
    },
    secondary: {
      main: "#9c27b0",
    },
    error: {
      main: "#660000",
    },
    warning: {
      main: "#edb230",
    },
    success: {
      main: "#399e5a",
    },
    ...(mode === "light"
      ? {
          text: {
            primary: "#000000",
          },
        }
      : {
          text: {
            primary: "#ffffff",
          },
          background: {
            default: "#000000",
          },
        }),
  },
});
