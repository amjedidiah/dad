/** @jsxImportSource @emotion/react */
import { useContext, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@emotion/react";
import useSWR from "swr";
import ButtonGroup from "@/components/shared/button/button-group";
import { IButton } from "@/components/shared/button/index.button";
import Rating from "@/components/shared/rating";
import SectionHeader from "@/components/shared/section-header";
import ShouldRender from "@/components/shared/should-render";
import { ModalContext } from "@/context/modal/modal.context";
import { ModalTitles } from "@/context/modal/types";
import { CartIcon } from "@/icons";
import styles from "@/styles/best-selling-content.style";
import { useRouter } from "next/router";
import { IContentData } from "@/context/rating/rating.context";

type Props = {
  type: IContentData["type"];
};

export default function BestSellingContent({ type }: Props) {
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const { toggleModal } = useContext(ModalContext);
  const headerTitle =
    type === "book" ? "His Best Selling Book" : "His Best Selling Album";
  const typeButtons = useMemo(() => {
    const buttons = [
      {
        key: `see more ${type}s`,
        value: `See More ${type}s`,
        className: "rounded",
        outlined: true,
        onClick: () => router.push(`/${type}s`),
      },
    ] as IButton[];

    if (type === "book")
      buttons.push({
        key: "add to cart",
        value: "Add To Cart",
        className: "rounded",
        Icon: CartIcon,
      } as IButton);

    return buttons;
  }, [type, router]);
  const { data, isLoading } = useSWR(`/api/${type}s/best-selling?type=book`);

  if (!isLoading && !data?.data) return null;
  const book = data?.data ?? {};

  const formattedPrice =
    book.price &&
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(book.price);

  return (
    <section css={styles} className="load-in py-[4.5rem]">
      <div className="container flex flex-col gap-10 md:gap-[5.2rem]">
        <SectionHeader
          title={headerTitle}
          subtitle={`The ${type} that has changed the most lives`}
        />

        <article className="grid mdx:grid-cols-auto-1fr gap-12 mdx:gap-6">
          <div className="flex flex-col gap-2 lgx:px-10">
            <div className="flex flex-1 justify-center items-center">
              <div className="w-[2.45in] mdx:w-[3.5in] h-[3.675in] mdx:h-[5.25in] relative group">
                <ShouldRender if={isLoading}>
                  <div className="w-full h-full animate-pulse bg-greyLoading rounded" />
                </ShouldRender>
                <ShouldRender if={!isLoading}>
                  <Image
                    src={book.front_cover}
                    alt="front cover"
                    className="group-hover:hidden"
                    fill
                    sizes="100%"
                  />
                  <Image
                    src={book.back_cover}
                    alt="back cover"
                    className="hidden group-hover:block"
                    fill
                    sizes="100%"
                  />
                </ShouldRender>
              </div>
            </div>
          </div>
          <div
            className={`flex flex-col justify-between ${
              isDarkMode ? "text-greyLighter" : "text-grey2"
            } gap-2`}
          >
            <header className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-4">
                <p className="theme-text">Rating:</p>
                <Rating value={book.average_rating} />
              </div>
              <Link
                href={{
                  pathname: `/books/${book.slug}`,
                  query: {
                    target: "book-reviews",
                  },
                }}
              >
                <span className="theme-text text-xl leading-6 font-medium underline">
                  View Reviews
                </span>
              </Link>
            </header>
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div>
                {book.title ? (
                  <h3 className="theme-text text-[2.5rem] font-medium leading-[140%]">
                    {book.title}
                  </h3>
                ) : (
                  <div className="h-14 w-full animate-pulse bg-greyLoading rounded" />
                )}
                <p className="mt-2 text-xl leading-6 flex flex-wrap gap-[10px]">
                  <span
                    className={`${
                      isDarkMode ? "text-white" : "text-grey1"
                    } font-medium`}
                  >
                    Published By:
                  </span>{" "}
                  {book.publisher ? (
                    <span>{book.publisher}</span>
                  ) : (
                    <span className="h-5 w-60 flex-1 animate-pulse bg-greyLoading rounded" />
                  )}
                </p>
              </div>
              <div className="w-full sm:w-auto flex sm:flex-col items-center justify-between sm:justify-center gap-2">
                {formattedPrice ? (
                  <p
                    className={`text-xl font-medium leading-6 py-2 px-8 ${
                      isDarkMode ? "bg-white text-black" : "bg-black text-white"
                    } `}
                  >
                    {formattedPrice}
                  </p>
                ) : (
                  <div className="h-14 w-32 animate-pulse bg-greyLoading rounded" />
                )}
                <p className="text-base flex gap-1 justify-center">
                  &#40;
                  {book.copies_sold ? (
                    <span>{book.copies_sold}</span>
                  ) : (
                    <span className="h-5 w-5 flex-1 animate-pulse bg-greyLoading rounded" />
                  )}
                  <span>Copies Sold</span>&#41;
                </p>
              </div>
            </div>
            <div className="grid gap-1 mt-3">
              <p className="mt-2 text-xl leading-6 flex flex-wrap gap-[10px]">
                <span
                  className={`${
                    isDarkMode ? "text-white" : "text-grey1"
                  } font-medium`}
                >
                  Foreword By:
                </span>{" "}
                {book.foreword_author_title ? (
                  <span>
                    {book.foreword_author_title} - {book.foreword_author_name}
                  </span>
                ) : (
                  <span className="h-5 flex-1 animate-pulse bg-greyLoading rounded" />
                )}
              </p>
              {book.foreword_content ? (
                <div
                  dangerouslySetInnerHTML={{ __html: book.foreword_content }}
                />
              ) : (
                <div className="h-14 w-full animate-pulse bg-greyLoading rounded" />
              )}
            </div>

            <footer>
              <div className="flex flex-wrap gap-3 items-center justify-between mb-10">
                <p className="mt-2 text-xl leading-6 flex gap-[10px]">
                  <span
                    className={`${
                      isDarkMode ? "text-white" : "text-grey1"
                    } font-medium`}
                  >
                    Publish Date:
                  </span>{" "}
                  {book.publish_date ? (
                    <span>
                      {new Date(book.publish_date).toLocaleDateString("en-NG", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  ) : (
                    <span className="h-5 w-32 flex-1 animate-pulse bg-greyLoading rounded" />
                  )}
                </p>
                <p className="theme-text text-xl leading-6 font-medium underline cursor-pointer">
                  <span
                    onClick={() =>
                      toggleModal(ModalTitles.rate, { type, id: book.id })
                    }
                  >
                    Rate this {type}
                  </span>
                </p>
              </div>

              <ButtonGroup
                className="content-button-group justify-between"
                buttons={typeButtons}
              />
            </footer>
          </div>
        </article>
      </div>
    </section>
  );
}
