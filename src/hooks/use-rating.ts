import { IContentData } from "@/context/rating/rating.context";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { useSWRConfig } from "swr";

export type ReviewData = {
  image?: string;
  name: string;
  email: string;
  content: string;
};

export default function useRating() {
  const [rating, setRating] = useState(0);
  const [isRating, setIsRating] = useState(false);
  const { mutate } = useSWRConfig();

  const handleReview = useCallback(
    async (contentData: IContentData, review?: ReviewData) => {
      setIsRating(true);
      const hasReview = !!review;
      const data = { rating, ...review, hasReview, ...contentData };

      const response = await fetch("/api/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = response.json();
      const { error, message } = await result;

      toast[error ? "error" : "success"](message);
      await mutate(`/api/best-selling?type=${contentData.type}`);

      return result;
    },
    [mutate, rating]
  );

  return {
    rating,
    setRating,
    handleReview,
    isRating,
  };
}
