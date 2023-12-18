/** @jsxImportSource @emotion/react */
import { useContext, forwardRef, PropsWithChildren } from "react";
import { cx } from "@emotion/css";
import { Interpolation, Theme, useTheme } from "@emotion/react";
import { ModalContext } from "@/context/modal/modal.context";
import styles from "@/styles/modal.style";
import RatingContext from "@/context/rating/rating.context";
import useRating from "@/hooks/use-rating";
import { AiOutlineClose } from "react-icons/ai";

export default function Modal() {
  const { ModalComponent, toggleModal } = useContext(ModalContext);
  const ratingContextValue = useRating();

  if (!ModalComponent) return null;

  return (
    <dialog css={styles} open={true} onClick={() => toggleModal()}>
      <RatingContext.Provider value={ratingContextValue}>
        <ModalComponent />
      </RatingContext.Provider>
    </dialog>
  );
}

type IModalBody = {
  full?: boolean;
  styles?: Interpolation<Theme>;
} & PropsWithChildren &
  React.HTMLAttributes<HTMLDivElement>;

Modal.Body = forwardRef<HTMLDivElement, IModalBody>(function ModalBody(
  { children, full, styles, className },
  ref: any
) {
  const { toggleModal } = useContext(ModalContext);
  const { isDarkMode } = useTheme();

  return (
    <section
      css={styles}
      className={cx({ full }, `relative modal-body theme-bg ${className}`)}
      onClick={(e) => e.stopPropagation()}
      ref={ref}
    >
      <span
        className={cx("absolute right-0 top-0 p-4 cursor-pointer text-xl", {
          "text-black bg-secondGrey": !isDarkMode,
          "text-white bg-grey1": isDarkMode,
        })}
        onClick={() => toggleModal()}
      >
        <AiOutlineClose />
      </span>
      {children}
    </section>
  );
});

Modal.Title = function ModalTitle({ children }: PropsWithChildren) {
  return <h2 className="theme-text modal-title">{children}</h2>;
};
