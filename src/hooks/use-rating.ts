import { useMagic } from "@/context/magic.context";
import { IContentData } from "@/context/rating/rating.context";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { useSWRConfig } from "swr";
import { selectActiveUserId } from "@/redux/slices/user.slice";
import { useAppSelector } from "./types";

export type ReviewData = {
  imageUrl?: string;
  name: string;
  email: string;
  content: string;
};

export default function useRating() {
  const [rating, setRating] = useState(0);
  const [isRating, setIsRating] = useState(false);
  const { mutate } = useSWRConfig();
  const { magicLogin } = useMagic();
  const issuer = useAppSelector(selectActiveUserId);

  const handleReview = useCallback(
    async (contentData: IContentData, review: ReviewData) => {
      setIsRating(true);
      await magicLogin(review);

      const response = await fetch("/api/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          issuer,
          ...contentData,
          rating,
          content: review.content,
        }),
      });
      const result = response.json();
      const { error, message } = await result;

      toast[error ? "error" : "success"](message);
      await mutate(`/api/best-selling?type=${contentData.type}`);

      return result;
    },
    [issuer, magicLogin, mutate, rating]
  );

  return {
    rating,
    setRating,
    handleReview,
    isRating,
  };
}
