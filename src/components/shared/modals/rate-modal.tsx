import Modal from "@/components/shared/layout/modal";
import Rating from "@/components/shared/rating";
import { ModalTitles } from "@/context/modal/types";
import { IButton } from "@/components/shared/button/index.button";
import { useContext, useMemo } from "react";
import ButtonGroup from "@/components/shared/button/button-group";
import { cx } from "@emotion/css";
import RatingContext from "@/context/rating/rating.context";
import { selectActiveUser } from "@/redux/slices/user.slice";
import { useAppSelector } from "@/redux/util";
import { AiOutlineClose } from "react-icons/ai";
import { ModalContext } from "@/context/modal/modal.context";

const buttons: IButton[] = [
  {
    key: "review",
    value: "Give a review",
    ["data-modal"]: ModalTitles.review,
    outlined: true,
  },
  {
    key: "rate",
    value: "Rate now",
  },
];

interface ModalProps {
  isDarkMode: boolean;
}
const RateModal: React.FC<ModalProps> = ({ isDarkMode }) => {
  const { rating, setRating, handleReview, isRating } =
    useContext(RatingContext);
  const userData = useAppSelector(selectActiveUser);
  const { toggleModal } = useContext(ModalContext);

  const closeModal = () => {
    toggleModal();
  };

  const reviewButtons = useMemo(
    () =>
      buttons.map((button) => ({
        ...button,
        onClick:
          button.key === "review"
            ? button.onClick
            : async () => {
                if (!userData?.email) return;
                await handleReview({
                  name: userData.name as string,
                  email: userData.email as string,
                  content: "",
                });
              },
        disabled:
          rating === 0 ||
          isRating ||
          (button.key === "rate" && !userData?.email),
        isLoading: button.key === "rate" && isRating,
      })),
    [rating, isRating, userData?.name, userData?.email, handleReview]
  ) as IButton[];

  return (
    <Modal.Body>
      <div className="items-center py-14 px-2">
        <div className="items-center gap-4">
          <div className="flex justify-between">
            <Modal.Title>Rate</Modal.Title>
            <AiOutlineClose
              onClick={closeModal}
              className={`
           ${!isDarkMode && "bg-black text-white w-14 h-14 cursor-pointer"}`}
            />
          </div>{" "}
          <p
            className={cx(
              {
                "text-grey2": !isDarkMode,
                "text-greyLighter": isDarkMode,
              },
              "text-2xl font-medium"
            )}
          >
            Your opinion matters to us
          </p>
        </div>

        <div className="[&_svg]:w-[4rem] [&_svg]:h-[4rem] mt-7 mb-14 md:[&_svg]:w-[5.5rem] md:[&_svg]:h-[5.5rem] md:mt-12 md:mb-20">
          <Rating value={rating} onRating={setRating} isActive />
        </div>

        <div className="[&>div]:gap-10 [&_button]:rounded-[2rem] [&_button]:px-2 [&_button]:py-4 [&_button]:w-56 md:[&_button]:w-[303px]">
          <ButtonGroup
            className="action-buttons-container"
            buttons={reviewButtons}
          />
        </div>
      </div>
    </Modal.Body>
  );
};
export default RateModal;
