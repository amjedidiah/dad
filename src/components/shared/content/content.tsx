/** @jsxImportSource @emotion/react */
import Image from "next/image";
import { useTheme } from "@emotion/react";
import ButtonGroup from "@/components/shared/button/button-group";
import Rating from "@/components/shared/rating";
import SectionHeader from "@/components/shared/section-header";
import ShouldRender from "@/components/shared/should-render";
import { ModalTitles } from "@/context/modal/types";
import styles from "@/styles/best-selling-content.style";
import { IContentData } from "@/context/rating/rating.context";
import { cx } from "@emotion/css";
import Price from "@/components/shared/price";
import useContent, { IContent } from "@/hooks/use-content";

type Props = {
  type: IContentData["type"];
  hideReviewButton?: boolean;
  noHeader?: boolean;
  item?: IContent;
};

export default function Content({
  type,
  hideReviewButton = false,
  noHeader = false,
  item,
}: Props) {
  const {
    isLoading,
    isBook,
    content,
    headerTitle,
    headerSubtitle,
    typeButtons,
    toggleModal,
  } = useContent(type, item);
  const { isDarkMode } = useTheme();

  if (!isLoading && !content) return null;

  return (
    <section css={styles} className="load-in py-[4.5rem]">
      <div className="container flex flex-col gap-10 md:gap-[5.2rem]">
        {!noHeader && (
          <SectionHeader title={headerTitle} subtitle={headerSubtitle} />
        )}

        <article className="grid mdx:grid-cols-auto-1fr gap-12 mdx:gap-6">
          <div className="flex flex-col gap-2 lgx:px-10">
            <div className="flex flex-1 justify-center items-center">
              <div
                className={cx(
                  {
                    "h-[3.675in] mdx:h-[5.25in]": isBook,
                    "h-[2.45in] mdx:h-[3.5in]": !isBook,
                  },
                  "w-[2.45in] mdx:w-[3.5in] relative group rounded"
                )}
              >
                <ShouldRender if={isLoading}>
                  <div className="w-full h-full animate-pulse bg-greyLoading rounded" />
                </ShouldRender>
                {content && (
                  <Image
                    src={content.front_cover}
                    alt="front cover"
                    className={cx({ "group-hover:hidden": isBook })}
                    fill
                    sizes="100%"
                  />
                )}
                {content?.back_cover && (
                  <Image
                    src={content.back_cover}
                    alt="back cover"
                    className="hidden group-hover:block"
                    fill
                    sizes="100%"
                  />
                )}
              </div>
            </div>
          </div>
          <div
            className={`flex flex-col justify-between ${
              isDarkMode ? "text-greyLighter" : "text-grey2"
            } gap-2`}
          >
            <ShouldRender if={isBook}>
              <header className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-4">
                  <p className="theme-text">Rating:</p>
                  <Rating value={content?.average_rating} />
                </div>
                {!hideReviewButton && content?.id && (
                  <span
                    className="theme-text text-xl leading-6 font-medium underline cursor-pointer"
                    onClick={() =>
                      toggleModal(ModalTitles.contentReview, {
                        id: content?.id,
                        type,
                      })
                    }
                  >
                    View Reviews
                  </span>
                )}
              </header>
            </ShouldRender>
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div>
                {content?.title ? (
                  <h3 className="theme-text text-[2.5rem] font-medium leading-[140%]">
                    {content.title}
                  </h3>
                ) : (
                  <div className="h-14 w-full animate-pulse bg-greyLoading rounded" />
                )}
                <ShouldRender if={isBook}>
                  <p className="mt-2 text-xl leading-6 flex flex-wrap gap-[10px]">
                    <span
                      className={`${
                        isDarkMode ? "text-white" : "text-grey1"
                      } font-medium`}
                    >
                      Published By:
                    </span>{" "}
                    {content?.publisher ? (
                      <span>{content.publisher}</span>
                    ) : (
                      <span className="h-5 w-60 flex-1 animate-pulse bg-greyLoading rounded" />
                    )}
                  </p>
                </ShouldRender>
              </div>
              <div className="w-full sm:w-auto flex sm:flex-col items-center justify-between sm:justify-center gap-2">
                <ShouldRender if={isBook}>
                  {content?.price ? (
                    <p
                      className={`text-xl font-medium leading-6 py-2 px-8 ${
                        isDarkMode
                          ? "bg-white text-black"
                          : "bg-black text-white"
                      } `}
                    >
                      <Price value={content.price} />
                    </p>
                  ) : (
                    <div className="h-14 w-32 animate-pulse bg-greyLoading rounded" />
                  )}
                </ShouldRender>
                <ShouldRender if={isBook}>
                  <p className="text-base flex gap-1 justify-center">
                    &#40;
                    {content?.copies_sold ? (
                      <span>{content.copies_sold}</span>
                    ) : (
                      <span className="h-5 w-5 flex-1 animate-pulse bg-greyLoading rounded" />
                    )}
                    <span>Copies Sold</span>&#41;
                  </p>
                </ShouldRender>
                <ShouldRender if={!isBook}>
                  <p className="mt-2 text-xl leading-6 flex flex-wrap gap-[10px]">
                    <span
                      className={`${
                        isDarkMode ? "text-white" : "text-grey1"
                      } font-medium`}
                    >
                      Duration:
                    </span>{" "}
                    {content?.duration ? (
                      <span>{content.duration}</span>
                    ) : (
                      <span className="h-5 w-60 flex-1 animate-pulse bg-greyLoading rounded" />
                    )}
                  </p>
                </ShouldRender>
              </div>
            </div>
            <div className="grid gap-1 mt-3">
              <p className="mt-2 text-xl leading-6 flex flex-wrap gap-[10px]">
                <span
                  className={`${
                    isDarkMode ? "text-white" : "text-grey1"
                  } font-medium`}
                >
                  {isBook ? "Foreword By" : "Summary"}:
                </span>{" "}
                <ShouldRender if={isBook}>
                  {content?.foreword_author_title ? (
                    <span>
                      {content.foreword_author_title} -{" "}
                      {content.foreword_author_name}
                    </span>
                  ) : (
                    <span className="h-5 flex-1 animate-pulse bg-greyLoading rounded" />
                  )}
                </ShouldRender>
              </p>
              <ShouldRender if={isBook}>
                {content?.foreword_content ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: content.foreword_content,
                    }}
                  />
                ) : (
                  <div className="h-14 w-full animate-pulse bg-greyLoading rounded" />
                )}
              </ShouldRender>
              <ShouldRender if={!isBook}>
                {content?.summary ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: content.summary,
                    }}
                  />
                ) : (
                  <div className="h-14 w-full animate-pulse bg-greyLoading rounded" />
                )}
              </ShouldRender>
            </div>

            <footer>
              <div className="flex flex-wrap gap-3 items-center justify-between mb-10">
                <p className="mt-2 text-xl leading-6 flex gap-[10px]">
                  <span
                    className={`${
                      isDarkMode ? "text-white" : "text-grey1"
                    } font-medium`}
                  >
                    {isBook ? "Publish" : "Recorded"} Date:
                  </span>{" "}
                  <ShouldRender if={isBook}>
                    {content?.publish_date ? (
                      <span>
                        {new Date(content.publish_date).toLocaleDateString(
                          "en-NG",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </span>
                    ) : (
                      <span className="h-5 w-32 flex-1 animate-pulse bg-greyLoading rounded" />
                    )}
                  </ShouldRender>
                  <ShouldRender if={!isBook}>
                    {content?.recorded_at ? (
                      <span>
                        {new Date(content.recorded_at).toLocaleDateString(
                          "en-NG",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </span>
                    ) : (
                      <span className="h-5 w-32 flex-1 animate-pulse bg-greyLoading rounded" />
                    )}
                  </ShouldRender>
                </p>
                <ShouldRender if={isBook && Boolean(content?.id)}>
                  <p className="theme-text text-xl leading-6 font-medium underline cursor-pointer">
                    <span
                      onClick={() =>
                        toggleModal(ModalTitles.rate, { type, id: content?.id })
                      }
                    >
                      Rate this {type}
                    </span>
                  </p>
                </ShouldRender>
              </div>

              <ButtonGroup
                className="content-button-group justify-between flex-1"
                buttons={typeButtons}
              />
            </footer>
          </div>
        </article>
      </div>
    </section>
  );
}
