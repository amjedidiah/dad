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
import { Provider } from "react-redux";
import useUserFetch from "@/hooks/use-user-fetch";
import useFetchIPDetails from "@/hooks/use-fetch-ip-details";

export default function MyApp({ Component, ...rest }: AppProps) {
  const theme = useMode();
  const modalContextValue = useModal();
  const toastTheme = useMemo(
    () => (theme.isDarkMode ? "dark" : "light"),
    [theme.isDarkMode]
  );
  const { store, props } = wrapper.useWrappedStore(rest);
  useUserFetch(store);
  useFetchIPDetails(store);

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
          <ModalContext.Provider value={modalContextValue}>
            <Component {...props.pageProps} />
          </ModalContext.Provider>
        </Provider>
      </SWRConfig>
      <ToastContainer bodyStyle={{ zIndex: 1000001 }} theme={toastTheme} />
      <Analytics />
    </ThemeProvider>
  );
}
