import Content from "@/components/shared/content/content";
import { IContentItem } from "@/components/shared/content/content-item";
import ContentList from "@/components/shared/content/content-list";
import RootLayout from "@/components/shared/layout/root-layout";
import SectionHeader from "@/components/shared/section-header";
import { IContent } from "@/hooks/use-content";
import { baseUrl } from "@/utils/constants";
import { GetStaticProps, InferGetStaticPropsType } from "next";

export const getStaticProps: GetStaticProps<{
  books: IContentItem[];
  bestSellingBook: IContent;
}> = async () => {
  const booksResponse = await fetch(`${baseUrl}/api/books`);
  const bookResponse = await fetch(`${baseUrl}/api/best-selling?type=book`);

  return {
    props: {
      books: !booksResponse.ok ? null : (await booksResponse.json()).data,
      bestSellingBook: !bookResponse.ok
        ? null
        : (await bookResponse.json()).data,
    },
    revalidate: 1 * 60 * 60 * 24,
  };
};

export default function Books({
  books,
  bestSellingBook,
}: InferGetStaticPropsType<typeof getStaticProps>) {
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

          <Content item={bestSellingBook} type="book" noHeader />
        </div>
      </section>
      <ContentList list={books} type="book" />
    </RootLayout>
  );
}
