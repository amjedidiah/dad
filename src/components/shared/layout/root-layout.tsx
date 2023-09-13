/** @jsxImportSource @emotion/react */
import { Fragment, useContext } from "react";
import Head from "next/head";
import { useTheme } from "@emotion/react";
import Header from "@/components/shared/layout/header";
import Modal from "@/components/shared/layout/modal";
import ModeSwitch from "@/components/shared/layout/mode-switch";
import styles from "@/styles/layout.style";
import { IComponentWithChildren } from "@/utils/types";
import { ModalContext } from "@/context/modal/modal.context";

type Props = {
  title: string;
  description: string;
  noHeader?: boolean;
};

export default function RootLayout({
  children,
  title,
  description,
  noHeader = false,
}: IComponentWithChildren & Props) {
  const theme = useTheme();
  const { modalTitle } = useContext(ModalContext);

  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        {/* PWA primary color */}
        <meta name="theme-color" content={theme?.colors.primary} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={description} />
        <link rel="icon" href="/images/512x512.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <main css={styles}>
        {!noHeader && <Header />}
        <div id="top" />
        {children}
        <ModeSwitch />
      </main>
      {modalTitle && <Modal />}
    </Fragment>
  );
}
