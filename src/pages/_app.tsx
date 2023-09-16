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
import { Provider } from "react-redux";
import store, { persistor } from "@/redux/store";
import { fetchLocationData } from "@/redux/slices/location.slice";
import { PersistGate } from "redux-persist/integration/react";
import { MagicProvider } from "@/context/magic.context";

store.dispatch(fetchLocationData());

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

      <SWRConfig
        value={{
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => res.json()),
          revalidateOnFocus: false,
        }}
      >
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <MagicProvider
              publishableAPIKey={
                process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY as string
              }
            >
              <ModalContext.Provider value={modalContextValue}>
                <Component {...pageProps} />
              </ModalContext.Provider>
            </MagicProvider>
          </PersistGate>
        </Provider>
      </SWRConfig>
      <ToastContainer bodyStyle={{ zIndex: 1000001 }} theme={toastTheme} />
      <Analytics />
    </ThemeProvider>
  );
}

// TODO: Eventually integrate GraphQL Code Generator
