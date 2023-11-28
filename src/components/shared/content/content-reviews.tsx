import { cx } from "@emotion/css";
import { useTheme } from "@emotion/react";
import useSWR from "swr";
import ShouldRender from "@/components/shared/should-render";
import { useContext } from "react";
import { ModalContext } from "@/context/modal/modal.context";
import ContentReview, {
  IContentReview,
} from "@/components/shared/content/content-review";

export default function ContentReviews() {
  const { modalData } = useContext(ModalContext);
  const { id, type } = modalData || {};
  const { data, isLoading, error } = useSWR(
    id ? `/api/reviews/${id}/?type=${type}` : null
  );
  const { isDarkMode } = useTheme();
  const reviews: IContentReview[] = isLoading
    ? Array(3).fill({})
    : data?.data ?? [];

  if (error) return null;

  return (
    <article>
      <h4
        className={cx(
          {
            "text-white": isDarkMode,
            "text-grey1": !isDarkMode,
          },
          "text-xl font-medium leading-6 mb-6"
        )}
      >
        Reviews
      </h4>
      <ShouldRender if={!!reviews.length}>
        <ul className="grid gap-4">
          {reviews.map((review, i) => (
            <ContentReview
              key={review.id || i}
              isLoading={isLoading}
              {...review}
            />
          ))}
        </ul>
      </ShouldRender>
      <ShouldRender if={!reviews.length}>
        <p className="text-grey1">No reviews yet</p>
      </ShouldRender>
    </article>
  );
}
