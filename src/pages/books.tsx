import Content from "@/components/shared/content/content";
import ContentList from "@/components/shared/content/content-list";
import RootLayout from "@/components/shared/layout/root-layout";
import SectionHeader from "@/components/shared/section-header";

export default function Books() {
  return (
    <RootLayout
      title="Books - Dr Passy Amaraegbu | Living a life of purity, power and prosperity"
      description="Life-changing books by Dr Passy Amaraegbu"
    >
      <section className="load-in py-5">
        <div className="container">
          <SectionHeader
            title="Books"
            subtitle="Life-changing books"
            pageTitle
          />

          <Content type="book" noHeader />
        </div>
      </section>
      <ContentList type="book" />
    </RootLayout>
  );
}
