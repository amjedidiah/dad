import { Dispatch, SetStateAction, createContext } from "react";

// type Reviewer = {
//   name: string;
//   imageUrl: string;
//   review: string;
// };

export type IRatingContext = {
  rating: number;
  setRating: Dispatch<SetStateAction<number>>;
  handleReview: () => void;
};

export default createContext<IRatingContext>({
  rating: 0,
  setRating: () => {},
  handleReview: () => {},
});
