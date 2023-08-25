import Jumbo from "@/components/landing/jumbo/index.jumbo";
import Header from "@/components/shared/header";
import Layout from "@/components/shared/layout";
import useVerifyPaystackPayment from "@/hooks/use-verify-paystack-payment";

export default function Home() {
  useVerifyPaystackPayment();

  return (
    <Layout
      title="Dr Passy Amaraegbu | Living a life of purity, power and prosperity"
      description="Dr Passy Amaraegbu is a father, psychologist and pastor specializing in solving long standing issues in the lives of people"
      noHeader
    >
      <Jumbo />
      <Header />
      <div id="why-choose-him" />
    </Layout>
  );
}
