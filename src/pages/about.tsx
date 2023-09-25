import { StreamTitles, AboutContent } from "@/components/about/constants";
import Layout from "@/components/shared/layout";
import PageTitle from "@/components/shared/page-title";
import Intro from "@/components/about/intro";

export default function About() {
  const selectedId = 21331;
  return (
    <Layout
      title="Dr Passy Amaraegbu | Living a life of purity, power and prosperity"
      description="Dr Passy Amaraegbu is a father, psychologist and pastor specializing in solving long standing issues in the lives of people"
    >
      <PageTitle />
      {AboutContent.map((content) => (
        <Intro
          key={content.id}
          title={content.title}
          para1={content.para1}
          para2={content.para2}
          intro={content.cName}
          showAwards={content.id === selectedId}
          image={content.image}
        />
      ))}
    </Layout>
  );
}
