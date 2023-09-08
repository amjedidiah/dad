import Modal from "@/components/shared/layout/modal";
import Rating from "@/components/shared/rating";
import { ModalTitles } from "@/context/modal/types";
import { IButton } from "@/components/shared/button/index.button";
import { useCallback, useContext, useMemo, useState } from "react";
import { ModalContext } from "@/context/modal/modal.context";
import ButtonGroup from "@/components/shared/button/button-group";
import { useTheme } from "@emotion/react";
import { cx } from "@emotion/css";

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

export default function RateModal() {
  const { isDarkMode } = useTheme();
  const { toggleModal } = useContext(ModalContext);
  const [rating, setRating] = useState(0);

  const handleReview = useCallback(() => console.log({ rating }), [rating]);

  const reviewButtons = useMemo(
    () =>
      buttons.map((button) => ({
        ...button,
        onClick:
          button.key === "review"
            ? () => toggleModal(button["data-modal"])
            : handleReview,
      })),
    [handleReview, toggleModal]
  ) as IButton[];

  return (
    <Modal.Body>
      <div className="flex flex-col items-center py-14 px-2">
        <div className="flex flex-col items-center gap-4">
          <h4 className="theme-text text-5xl font-bold">Rate</h4>
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
}
