/** @jsxImportSource @emotion/react */
import { Fragment } from "react";
import Head from "next/head";
import Modal from "@/components/shared/modal";
import ModeSwitch from "@/components/shared/mode-switch";
import useMode from "@/hooks/use-mode";
import styles from "@/styles/layout.style";
import { IComponentWithChildren } from "@/utils/types";

type Props = {
  title: string;
  description: string;
};

export default function Layout({
  children,
  title,
  description,
}: IComponentWithChildren & Props) {
  const { theme } = useMode();

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
        <div id="top" />
        {children}
        <ModeSwitch />
      </main>
      <Modal />
    </Fragment>
  );
}
