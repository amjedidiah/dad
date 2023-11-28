import Rating from "@/components/shared/rating";
import Price from "@/components/shared/price";
import ButtonGroup from "@/components/shared/button/button-group";
import { cx } from "@emotion/css";
import ShouldRender from "@/components/shared/should-render";
import Image from "next/image";
import { IContentData } from "@/context/rating/rating.context";
import useContentItem from "@/hooks/use-content-item";

export type IContentItem = {
  price?: number;
  average_rating?: number;
  title: string;
  id: number;
  audio_url?: string;
  back_cover?: string;
  front_cover: string;
  duration?: string;
  recorded_at?: string;
};

export default function ContentItem({
  title,
  type,
  id,
  audio_url,
  ...rest
}: IContentItem & Pick<IContentData, "type">) {
  const { isBook, typeButtons } = useContentItem({ type, id, audio_url });

  return (
    <li key={title}>
      <div className="grid gap-6 border border-secondGrey p-4">
        <div
          className={cx(
            {
              "h-[2.94in] mdx:h-[4.2in]": isBook,
              "h-[1.96in] mdx:h-[2.8in]": !isBook,
            },
            "w-[1.96in] mdx:w-[2.8in] relative group rounded mx-auto"
          )}
        >
          <Image
            src={rest.front_cover}
            alt="front cover"
            className={cx({ "group-hover:hidden": isBook })}
            fill
            sizes="100%"
          />
          <ShouldRender if={isBook && !!rest.back_cover}>
            <Image
              src={rest.back_cover as string}
              alt="back cover"
              className="hidden group-hover:block"
              fill
              sizes="100%"
            />
          </ShouldRender>
        </div>
        <div className="flex flex-wrap items-center justify-between font-medium theme-text gap-4">
          <div className="grid gap-2 w-full">
            <p className="text-2xl leading-8">{title}</p>
            <ShouldRender if={isBook}>
              {rest.average_rating ?? <Rating value={rest.average_rating} />}
            </ShouldRender>
            <ShouldRender if={!isBook}>
              <p className="flex flex-wrap justify-between items-center">
                {rest.recorded_at && (
                  <span>
                    {new Date(rest.recorded_at).toLocaleDateString("en-NG", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                )}
                <span>{rest.duration}</span>
              </p>
            </ShouldRender>
          </div>
          {rest.price && (
            <p className="leading-5">
              <Price value={rest.price} />
            </p>
          )}
        </div>
        <ButtonGroup
          className="flex-wrap [&.flex-wrap]:gap-4 [&_button]:flex-1 [&_button]:h-full"
          buttons={typeButtons}
        />
      </div>
    </li>
  );
}
