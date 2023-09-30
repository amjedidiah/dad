import { Fragment, PropsWithChildren, useContext } from "react";
import Head from "next/head";
import { useTheme } from "@emotion/react";
import Header from "@/components/shared/layout/header";
import Modal from "@/components/shared/layout/modal";
import ModeSwitch from "@/components/shared/layout/mode-switch";
import { ModalContext } from "@/context/modal/modal.context";
import Footer from "@/components/shared/layout/footer";
import { CldOgImage } from "next-cloudinary";

type Props = {
  title: string;
  description?: string;
  noHeader?: boolean;
  ogImage?: string;
};

export default function RootLayout({
  children,
  title,
  description = "Dr Passy Amaraegbu is a father, psychologist and pastor specializing in solving long standing issues in the lives of people",
  noHeader = false,
  ogImage = "v1694259792/dr-passy-og-image_v2xnww.png",
}: PropsWithChildren & Props) {
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
      <CldOgImage src={ogImage} alt="og" />

      {!noHeader && <Header />}
      <main className="flex-1">
        <div id="top" />
        {children}
        <ModeSwitch />
      </main>
      <Footer />
      {modalTitle && <Modal />}
    </Fragment>
  );
}
