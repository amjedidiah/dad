import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useTheme } from "@emotion/react";

type Props = {
  value: number;
};

export default function Rating({ value }: Props) {
  const {
    colors: { gold },
  } = useTheme();

  return (
    <div className="flex items-center gap-4">
      <p className="theme-text">Rating:</p>
      <div className="flex gap-2">
        {Array(5)
          .fill(0)
          .map((_, index) => {
            if (!value)
              return (
                <span
                  key={`star-${index + 1}`}
                  className="bg-greyLoading animate-pulse rounded w-6 h-6"
                />
              );

            const starNumber = index + 1;
            const isFilled = value >= starNumber;

            return (
              <span key={`${index}-star-${starNumber}`}>
                {isFilled ? (
                  <AiFillStar style={{ color: gold }} />
                ) : (
                  <AiOutlineStar style={{ color: gold }} />
                )}
              </span>
            );
          })}
      </div>
    </div>
  );
}
