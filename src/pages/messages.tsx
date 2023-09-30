import Content from "@/components/shared/content/content";
import ContentList from "@/components/shared/content/content-list";
import RootLayout from "@/components/shared/layout/root-layout";
import SectionHeader from "@/components/shared/section-header";

export default function Books() {
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

          <Content type="message" noHeader />
        </div>
      </section>
      <ContentList type="message" />
    </RootLayout>
  );
}
