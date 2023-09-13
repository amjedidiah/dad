import { IContentData } from "@/context/rating/rating.context";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

export type ReviewData = {
  image?: string;
  name: string;
  email: string;
  content: string;
};

export default function useRating() {
  const [rating, setRating] = useState(0);

  const handleReview = useCallback(
    async (contentData: IContentData, review?: ReviewData) => {
      const hasReview = !!review;
      const data = { rating, ...review, hasReview, ...contentData };

      const response = await fetch("/api/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      setRating(0);

      if (!hasReview) {
        const { error, message } = await response.json();
        toast[error ? "error" : "success"](message);
        return;
      }

      return response.json();
    },
    [rating]
  );

  return {
    rating,
    setRating,
    handleReview,
  };
}
