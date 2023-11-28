import SectionHeader from "@/components/shared/section-header";
import useScrollTarget from "@/hooks/use-scroll-target";
import ContentItem, {
  IContentItem,
} from "@/components/shared/content/content-item";
import { IContentData } from "@/context/rating/rating.context";

type Props = {
  list: IContentItem[];
  type: IContentData["type"];
};

export default function ContentList({ list: contentItems, type }: Props) {
  useScrollTarget();

  if (!contentItems) return null;
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

      <div className="container">
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 lgx:grid-cols-4 gap-x-2 gap-y-6">
          {contentItems.map((content, i) => (
            <ContentItem key={content.title || i} type={type} {...content} />
          ))}
        </ul>
      </div>
    </section>
  );
}
