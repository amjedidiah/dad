import { ModeContextType } from "@/hooks/use-mode";
import { aeonik, inter } from "./font.util";

export const getDesignTokens = (mode: ModeContextType["mode"]) => ({
  typography: {
    fontFamily: inter.style.fontFamily,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        html, body {
          min-height: 100vh;
        },
        h1, h2, h3, h4, h5, h6 {
          font-family: ${aeonik.style.fontFamily};
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
