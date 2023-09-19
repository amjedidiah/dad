import { ReviewData } from "@/hooks/use-rating";
import { Dispatch, SetStateAction, createContext } from "react";

export type IContentData = {
  id: number;
  type: "book" | "message";
};

export type IRatingContext = {
  rating: number;
  setRating: Dispatch<SetStateAction<number>>;
  handleReview: (contentData: IContentData, review: ReviewData) => Promise<any>;
  isRating: boolean;
};

export default createContext<IRatingContext>({
  rating: 0,
  setRating: () => {},
  handleReview: () => Promise.resolve(),
  isRating: false,
});
