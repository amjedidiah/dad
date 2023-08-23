import { AppProps } from "next/app";
import { Global, ThemeProvider } from "@emotion/react";
import { Analytics } from "@vercel/analytics/react";
import { ModalContext } from "@/context/modal/modal.context";
import useModal from "@/hooks/use-modal";
import useMode from "@/hooks/use-mode";
import global from "@/styles/global.style";

export default function MyApp({ Component, pageProps }: AppProps) {
  const theme = useMode();
  const modalContextValue = useModal();

  return (
    <ThemeProvider theme={theme}>
      <Global styles={global} />
      <ModalContext.Provider value={modalContextValue}>
        <Component {...pageProps} />
      </ModalContext.Provider>
      <Analytics />
    </ThemeProvider>
  );
}

// TODO: Eventually integrate GraphQL Code Generator
