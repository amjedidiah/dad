import { Fragment, PropsWithChildren, useContext } from "react";
import Head from "next/head";
import { useTheme } from "@emotion/react";
import Header from "@/components/shared/layout/header";
import Modal from "@/components/shared/layout/modal";
import ModeSwitch from "@/components/shared/layout/mode-switch";
import { ModalContext } from "@/context/modal/modal.context";
import Footer from "@/components/shared/layout/footer";
import { CldOgImage } from "next-cloudinary";
import useChatBot from "@/hooks/use-chat-bot";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "chat-bot": {
        platform_id: string;
        user_id: string;
        chatbot_id: string;
        children: Element;
      };
    }
  }
}

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
  ogImage = "v1696133851/1280x800-screenshot_j4iup4",
}: PropsWithChildren & Props) {
  const theme = useTheme();
  const { modalTitle } = useContext(ModalContext);
  useChatBot();

  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        {/* PWA primary color */}
        <meta name="theme-color" content={theme?.colors.primary} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={description} />
        <link rel="icon" href="/images/icons/manifest-icon-512.webp" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="apple-touch-icon" href="/images/icons/apple-icon-180.webp" />
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

      <chat-bot
        platform_id="4ab2c356-1b29-4e73-b4ce-e89486920581"
        user_id="e60a612c-d975-4ddf-a34a-84868b125f9e"
        chatbot_id="a304ee03-617d-44c2-ab72-cd1f4ae39a3e"
      >
        <a href="https://www.chatsimple.ai/?utm_source=widget&utm_medium=referral">
          [chatbot]
        </a>
      </chat-bot>
    </Fragment>
  );
}
