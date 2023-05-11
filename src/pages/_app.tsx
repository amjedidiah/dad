import { Global, ThemeProvider } from "@emotion/react";
import { AppProps } from "next/app";
import Head from "next/head";
import useMode from "@/hooks/use-mode";
import { ModeContext } from "@/context/mode/mode.context";
import global from "@/styles/global.style";
import Layout from "@/components/layout";

export default function MyApp({ Component, pageProps }: AppProps) {
  const { theme, toggleMode, isDarkMode } = useMode();

  if (!theme) return <div>Loading...</div>;

  return (
    <ModeContext.Provider value={{ toggleMode, isDarkMode, theme }}>
      <Head>
        {/* PWA primary color */}
        <meta name="theme-color" content={theme.colors.primary} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/512x512.ico" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <ThemeProvider theme={theme}>
        <Layout>
          <Global styles={global} />
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </ModeContext.Provider>
  );
}

// TODO: Eventually integrate GraphQL Code Generator
