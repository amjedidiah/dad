import AppearedOn from "@/components/landing/appeared-on";
import BestSellingContent from "@/components/shared/best-selling-content";
import Jumbo from "@/components/landing/jumbo/index.jumbo";
import Testimonies from "@/components/landing/testimonies";
import WhyChooseHim from "@/components/landing/why-choose-him";
import Header from "@/components/shared/layout/header";
import RootLayout from "@/components/shared/layout/root-layout";
import useVerifyPaystackPayment from "@/hooks/use-verify-paystack-payment";
import useScrollTarget from "@/hooks/use-scroll-target";

export default function Home() {
  useScrollTarget();
  useVerifyPaystackPayment();

  return (
    <RootLayout
      title="Dr Passy Amaraegbu | Living a life of purity, power and prosperity"
      description="Dr Passy Amaraegbu is a father, psychologist and pastor specializing in solving long standing issues in the lives of people"
      noHeader
    >
      <Jumbo />
      <Header />
      <WhyChooseHim />
      <Testimonies />
      <AppearedOn />
      <BestSellingContent type="book" />
    </RootLayout>
  );
}
