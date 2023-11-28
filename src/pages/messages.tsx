import Content from "@/components/shared/content/content";
import { IContentItem } from "@/components/shared/content/content-item";
import ContentList from "@/components/shared/content/content-list";
import RootLayout from "@/components/shared/layout/root-layout";
import SectionHeader from "@/components/shared/section-header";
import { IContent } from "@/hooks/use-content";
import { baseUrl } from "@/utils/constants";
import { GetStaticProps, InferGetStaticPropsType } from "next";

export const getStaticProps: GetStaticProps<{
  messages: IContentItem[];
  mostRecentMessage: IContent;
}> = async () => {
  const messagesResponse = await fetch(`${baseUrl}/api/messages`);
  const messageResponse = await fetch(
    `${baseUrl}/api/best-selling?type=message`
  );

  return {
    props: {
      messages: !messagesResponse.ok
        ? null
        : (await messagesResponse.json()).data,
      mostRecentMessage: !messageResponse.ok
        ? null
        : (await messageResponse.json()).data,
    },
    revalidate: 1 * 60 * 60 * 24,
  };
};

export default function Messages({
  messages,
  mostRecentMessage,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <RootLayout
      title="Messages - Dr Passy Amaraegbu | Living a life of purity, power and prosperity"
      description="Life-changing messages by Dr Passy Amaraegbu"
    >
      <section className="load-in py-5">
        <div className="container">
          <SectionHeader
            title="Messages"
            subtitle="Life-changing messages"
            pageTitle
          />

          <Content item={mostRecentMessage} type="message" noHeader />
        </div>
      </section>
      <ContentList list={messages} type="message" />
    </RootLayout>
  );
}
