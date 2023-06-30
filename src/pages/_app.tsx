import { AppProps } from "next/app";
import { Global, ThemeProvider } from "@emotion/react";
import { Analytics } from "@vercel/analytics/react";
import { ModalContext } from "@/context/modal/modal.context";
import { ModeContext } from "@/context/mode/mode.context";
import useModal from "@/hooks/use-modal";
import useMode from "@/hooks/use-mode";
import global from "@/styles/global.style";

export default function MyApp({ Component, pageProps }: AppProps) {
  const { theme, ...rest } = useMode();
  const modalContextValue = useModal();

  if (!theme) return <div>Loading...</div>;

  return (
    <ModeContext.Provider value={{ theme, ...rest }}>
      <ThemeProvider theme={theme}>
        <ModalContext.Provider value={modalContextValue}>
          <Global styles={global} />
          <Component {...pageProps} />
          <Analytics />
        </ModalContext.Provider>
      </ThemeProvider>
    </ModeContext.Provider>
  );
}

// TODO: Eventually integrate GraphQL Code Generator
