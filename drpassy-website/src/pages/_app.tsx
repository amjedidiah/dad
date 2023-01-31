import createEmotionCache from "@/lib/createEmotioncache";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppProps } from "next/app";
import Head from "next/head";
import useMode, { ModeContext } from "@/hooks/use-mode";

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyAppProps) {
  const { theme, toggleMode } = useMode();

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        {/* PWA primary color */}
        <meta name="theme-color" content={theme.palette.primary.main} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ModeContext.Provider value={{ toggleMode }}>
        <ThemeProvider theme={theme}>
          <CssBaseline enableColorScheme />
          <Component {...pageProps} />
        </ThemeProvider>
      </ModeContext.Provider>
    </CacheProvider>
  );
}
