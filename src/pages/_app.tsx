import { AppProps } from "next/app";
import { useMemo } from "react";
import { Global, ThemeProvider } from "@emotion/react";
import { Analytics } from "@vercel/analytics/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ModalContext } from "@/context/modal/modal.context";
import useModal from "@/hooks/use-modal";
import useMode from "@/hooks/use-mode";
import global from "@/styles/global.style";

export default function MyApp({ Component, pageProps }: AppProps) {
  const theme = useMode();
  const modalContextValue = useModal();
  const toastTheme = useMemo(
    () => (theme.isDarkMode ? "dark" : "light"),
    [theme.isDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <Global styles={global} />
      <ModalContext.Provider value={modalContextValue}>
        <Component {...pageProps} />
        <ToastContainer theme={toastTheme} />
      </ModalContext.Provider>
      <Analytics />
    </ThemeProvider>
  );
}

// TODO: Eventually integrate GraphQL Code Generator
