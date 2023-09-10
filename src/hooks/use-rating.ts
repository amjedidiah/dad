import { useCallback, useState } from "react";

export default function useRating() {
  // const [contentId, setContentId] = useState("");
  // const [contentType, setContentType] = useState("");
  const [rating, setRating] = useState(0);
  // const [reviewer, setReviewer] = useState(undefined);

  const handleReview = useCallback(() => console.log({ rating }), [rating]);

  return {
    rating,
    setRating,
    handleReview,
  };
}
