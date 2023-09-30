import { AboutContents } from "@/components/about/constants";
import Intro from "@/components/about/intro";
import RootLayout from "@/components/shared/layout/root-layout";
import SectionHeader from "@/components/shared/section-header";

export default function About() {
  return (
    <RootLayout title="About Dr Passy Amaraegbu | Living a life of purity, power and prosperity">
      <section className="load-in pt-5">
        <div className="container">
          <SectionHeader
            title="About"
            extraTitle="Dr Passy Amaraegbu"
            pageTitle
          />
        </div>
      </section>
      {AboutContents.map((content) => (
        <Intro key={content.title} {...content} />
      ))}
    </RootLayout>
  );
}
