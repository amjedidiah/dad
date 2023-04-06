import createEmotionCache from "@/lib/create-emotion-cache";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppProps } from "next/app";
import Head from "next/head";
import useMode from "@/hooks/use-mode/use-mode";
import { ModeContext } from "@/context/mode/mode.context";
import Layout from "@/stories/layout/layout";

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyAppProps) {
  const { theme, toggleMode, isDarkMode } = useMode();

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        {/* PWA primary color */}
        <meta name="theme-color" content={theme.palette.primary.main} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ModeContext.Provider value={{ toggleMode, isDarkMode }}>
        <ThemeProvider theme={theme}>
          <CssBaseline enableColorScheme />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </ModeContext.Provider>
    </CacheProvider>
  );
}
