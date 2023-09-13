import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useTheme } from "@emotion/react";
import { MouseEventHandler, useCallback } from "react";
import { cx } from "@emotion/css";

type Props = {
  value: number;
  isActive?: boolean;
  onRating?: (rating: number) => void;
};

export default function Rating({ value, isActive, onRating }: Props) {
  const {
    colors: { gold },
  } = useTheme();

  const handleRating: MouseEventHandler<HTMLSpanElement> = useCallback(
    (e) => {
      if (!isActive) return;

      const rating = Number(e.currentTarget.dataset.value);
      onRating?.(rating);
    },
    [isActive, onRating]
  );

  return (
    <div className="flex gap-2">
      {Array(5)
        .fill(0)
        .map((_, index) => {
          if (value === undefined)
            return (
              <span
                key={`star-${index + 1}`}
                className="bg-greyLoading animate-pulse rounded w-6 h-6"
              />
            );

          const starNumber = index + 1;
          const isFilled = value >= starNumber;

          return (
            <span
              key={`${index}-star-${starNumber}`}
              onClick={handleRating}
              data-value={starNumber}
              className={cx({ "cursor-pointer": isActive })}
            >
              {isFilled ? (
                <AiFillStar style={{ color: gold }} />
              ) : (
                <AiOutlineStar style={{ color: gold }} />
              )}
            </span>
          );
        })}
    </div>
  );
}
