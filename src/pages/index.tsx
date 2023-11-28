import AppearedOn from "@/components/landing/appeared-on";
import Content from "@/components/shared/content/content";
import Jumbo from "@/components/landing/jumbo/index.jumbo";
import Testimonies from "@/components/landing/testimonies";
import WhyChooseHim from "@/components/landing/why-choose-him";
import Header from "@/components/shared/layout/header";
import RootLayout from "@/components/shared/layout/root-layout";
import useVerifyPaystackPayment from "@/hooks/use-verify-paystack-payment";
import useScrollTarget from "@/hooks/use-scroll-target";
import { baseUrl, isDev } from "@/utils/constants";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { IContent } from "@/hooks/use-content";

export const getStaticProps: GetStaticProps<{
  bestSellingBook: IContent;
  mostRecentMessage: IContent;
}> = async () => {
  const bookResponse = await fetch(`${baseUrl}/api/best-selling?type=book`);
  const messageResponse = await fetch(
    `${baseUrl}/api/best-selling?type=message`
  );

  return {
    props: {
      bestSellingBook: !bookResponse.ok
        ? null
        : (await bookResponse.json()).data,
      mostRecentMessage: !messageResponse.ok
        ? null
        : (await messageResponse.json()).data,
    },
  };
};

export default function Home({
  bestSellingBook,
  mostRecentMessage,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  useScrollTarget();
  useVerifyPaystackPayment();

  return (
    <RootLayout
      title="Dr Passy Amaraegbu | Living a life of purity, power and prosperity"
      noHeader
    >
      <Jumbo />
      <Header />
      <WhyChooseHim />
      {isDev && <Testimonies />}
      <AppearedOn />
      <Content item={bestSellingBook} type="book" />
      <Content item={mostRecentMessage} type="message" />
    </RootLayout>
  );
}
