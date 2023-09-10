import { AppProps } from "next/app";
import { useMemo } from "react";
import { Global, ThemeProvider } from "@emotion/react";
import { Analytics } from "@vercel/analytics/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SWRConfig } from "swr";
import { ModalContext } from "@/context/modal/modal.context";
import useModal from "@/hooks/use-modal";
import useMode from "@/hooks/use-mode";
import "@/styles/global.css";
import global from "@/styles/global.style";
import useRating from "@/hooks/use-rating";
import RatingContext from "@/context/rating/rating.context";

export default function MyApp({ Component, pageProps }: AppProps) {
  const theme = useMode();
  const modalContextValue = useModal();
  const ratingContextValue = useRating();
  const toastTheme = useMemo(
    () => (theme.isDarkMode ? "dark" : "light"),
    [theme.isDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <Global styles={global} />
      <RatingContext.Provider value={ratingContextValue}>
        <ModalContext.Provider value={modalContextValue}>
          <SWRConfig
            value={{
              fetcher: (resource, init) =>
                fetch(resource, init).then((res) => res.json()),
              revalidateOnFocus: false,
            }}
          >
            <Component {...pageProps} />
          </SWRConfig>
          <ToastContainer theme={toastTheme} />
        </ModalContext.Provider>
      </RatingContext.Provider>
      <Analytics />
    </ThemeProvider>
  );
}

// TODO: Eventually integrate GraphQL Code Generator
