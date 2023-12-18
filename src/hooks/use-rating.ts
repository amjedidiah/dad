import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { useSWRConfig } from "swr";
import { ModalContext } from "@/context/modal/modal.context";

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
  const { toggleModal, modalData: contentData } = useContext(ModalContext);

  const handleReview = async (review: ReviewData) => {
    try {
      setIsRating(true);

      const { error, message } = await fetch("/api/reviews/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...contentData,
          rating,
          content: review.content,
        }),
      }).then((res) => res.json());
      if (error) throw message;

      await mutate(`/api/best-selling?type=${contentData.type}`);

      toast.success(message);
      toggleModal();

      return { error: false };
    } catch (error) {
      const errorMessage = error?.message || error;
      if (!review.content) {
        console.error(error);
        toast.error(errorMessage);
      }
      return { error: true, message: errorMessage };
    } finally {
      setIsRating(false);
    }
  };

  return {
    rating,
    setRating,
    handleReview,
    isRating,
  };
}
