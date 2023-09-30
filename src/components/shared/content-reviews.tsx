import { cx } from "@emotion/css";
import { useTheme } from "@emotion/react";
import useSWR from "swr";
import ShouldRender from "@/components/shared/should-render";
import { CldImage } from "next-cloudinary";
import Rating from "@/components/shared/rating";

type ContentReview = {
  rating: number;
  review: string;
  user_image_url: string;
  user_name: string;
  id: number;
};

type Props = {
  id: number;
  type: string;
};

export default function ContentReviews({ id, type }: Props) {
  const { data, isLoading, error } = useSWR(
    id ? `/api/reviews/${id}/?type=${type}` : null
  );
  const { isDarkMode } = useTheme();
  const reviews = isLoading ? Array(3).fill({}) : data?.data ?? [];

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
          {reviews.map(
            ({
              rating,
              review,
              user_image_url: imageUrl,
              user_name: name,
              id: reviewId,
            }: ContentReview) => (
              <li key={reviewId} className="flex gap-4">
                <ShouldRender if={isLoading}>
                  <div className="w-14 h-14 rounded-full overflow-hidden relative bg-greyLoading animate-pulse" />
                </ShouldRender>
                <ShouldRender if={!isLoading}>
                  <div className="w-14 h-14 rounded-full overflow-hidden relative">
                    <CldImage
                      src={imageUrl?.split("upload/")[1]}
                      alt={name}
                      fill
                    />
                  </div>
                </ShouldRender>
                <div className="flex-1 grid gap-1">
                  <div className="flex items-center gap-4">
                    <ShouldRender if={isLoading}>
                      <div className="h-6 w-24 animate-pulse bg-greyLoading" />
                    </ShouldRender>
                    <ShouldRender if={!isLoading}>
                      <p
                        className={`${isDarkMode} ? "text-white" : "text-grey1" text-base font-medium tracking-[0.02rem]`}
                      >
                        {name}
                      </p>
                    </ShouldRender>
                    <Rating value={rating || undefined} />
                  </div>

                  <ShouldRender if={isLoading}>
                    <div className="h-12 w-full animate-pulse bg-greyLoading" />
                  </ShouldRender>
                  <ShouldRender if={!isLoading}>
                    <p
                      className={`${isDarkMode} ? "text-greyLighter" : "text-grey2" text-base tracking-[0.02rem]`}
                    >
                      {review}
                    </p>
                  </ShouldRender>
                </div>
              </li>
            )
          )}
        </ul>
      </ShouldRender>
      <ShouldRender if={!reviews.length}>
        <p className="text-grey1">No reviews yet</p>
      </ShouldRender>
    </article>
  );
}
