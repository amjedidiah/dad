import { useTheme } from "@emotion/react";
import ShouldRender from "@/components/shared/should-render";
import { CldImage } from "next-cloudinary";
import Rating from "@/components/shared/rating";

export type IContentReview = {
  rating: number;
  review: string;
  user_image_url: string;
  user_name: string;
  id: number;
};

type Props = IContentReview & { isLoading: boolean };

export default function ContentReview({
  rating,
  review: content,
  user_image_url: imageUrl,
  user_name: name,
  isLoading,
}: Props) {
  const { isDarkMode } = useTheme();

  return (
    <li className="flex gap-4">
      <ShouldRender if={isLoading}>
        <div className="w-14 h-14 rounded-full overflow-hidden relative bg-greyLoading animate-pulse" />
      </ShouldRender>
      <ShouldRender if={!isLoading}>
        <div className="w-14 h-14 rounded-full overflow-hidden relative bg-grey1">
          {imageUrl && (
            <CldImage src={imageUrl?.split("upload/")[1]} alt={name} fill />
          )}
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
          <Rating value={rating} />
        </div>

        <ShouldRender if={isLoading}>
          <div className="h-12 w-full animate-pulse bg-greyLoading" />
        </ShouldRender>
        <ShouldRender if={!isLoading}>
          <p
            className={`${isDarkMode} ? "text-greyLighter" : "text-grey2" text-base tracking-[0.02rem]`}
          >
            {content}
          </p>
        </ShouldRender>
      </div>
    </li>
  );
}
