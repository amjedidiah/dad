import Layout from "../layout/layout";
import PageJumbo from "./page-jumbo";

const config = {
  title: "Components/Page Jumbo",
  component: PageJumbo,
};

export const Default = () => <PageJumbo />;

export const WithLayout = () => (
  <Layout>
    <PageJumbo />
  </Layout>
);

export default config;
