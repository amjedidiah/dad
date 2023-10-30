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
import { wrapper } from "@/redux/store";
import { fetchLocationData } from "@/redux/slices/location.slice";
import { MagicProvider } from "@/context/magic.context";

function MyApp({ Component, pageProps }: AppProps) {
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
        <ModalContext.Provider value={modalContextValue}>
          <MagicProvider>
            <Component {...pageProps} />
          </MagicProvider>
        </ModalContext.Provider>
      </SWRConfig>
      <ToastContainer bodyStyle={{ zIndex: 1000001 }} theme={toastTheme} />
      <Analytics />
    </ThemeProvider>
  );
}

MyApp.getInitialProps = wrapper.getInitialAppProps(
  (store) =>
    async ({ Component, ctx }) => {
      await store.dispatch(fetchLocationData());

      const pageProps = {
        ...(Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {}),
      };

      return { pageProps };
    }
);

export default wrapper.withRedux(MyApp);
