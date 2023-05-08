import { Global, ThemeProvider } from "@emotion/react";
import { AppProps } from "next/app";
import Head from "next/head";
import useMode from "@/hooks/use-mode";
import { ModeContext } from "@/context/mode/mode.context";
import global from "@/styles/global";

export default function MyApp({
  Component,
  pageProps,
}: AppProps) {
  const { theme, toggleMode, isDarkMode } = useMode();

  return (
    <ModeContext.Provider value={{ toggleMode, isDarkMode }}>
      <Head>
        {/* PWA primary color */}
        <meta name="theme-color" content={theme.colors.primary} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <Global styles={global} />
        <Component {...pageProps} />
      </ThemeProvider>
    </ModeContext.Provider>
  );
}

// TODO: Eventually integrate GraphQL Code Generator
