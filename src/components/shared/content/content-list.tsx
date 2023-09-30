import useSWR from "swr";
import SectionHeader from "../section-header";
import useScrollTarget from "@/hooks/use-scroll-target";
import ShouldRender from "../should-render";
import ContentItem from "./content-item";

type Props = {
  type: string;
};

export default function ContentList({ type }: Props) {
  useScrollTarget();
  const { data, isLoading } = useSWR(`/api/${type}s`, {});
  const contentItems = isLoading ? Array(3).fill({}) : data?.data ?? [];

  if (!contentItems.length) return null;

  return (
    <section
      className="load-in py-6 md:py-10 grid gap-y-10"
      id={`more${type}s`}
    >
      <div className="container">
        <SectionHeader
          title={`More ${type}s`}
          subtitle={`More life-changing ${type}s`}
        />
      </div>

      <ShouldRender if={!!contentItems.length || isLoading}>
        <div className="container">
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 lgx:grid-cols-4 gap-x-2 gap-y-6">
            {contentItems.map((content: any) => (
              <ContentItem
                key={content.title}
                type={type}
                isLoading={isLoading}
                {...content}
              />
            ))}
          </ul>
        </div>
      </ShouldRender>
    </section>
  );
}
