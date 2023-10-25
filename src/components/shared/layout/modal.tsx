/** @jsxImportSource @emotion/react */
import { useContext, forwardRef, PropsWithChildren } from "react";
import { cx } from "@emotion/css";
import { Interpolation, Theme } from "@emotion/react";
import { ModalContext } from "@/context/modal/modal.context";
import styles from "@/styles/modal.style";
import RatingContext from "@/context/rating/rating.context";
import useRating from "@/hooks/use-rating";

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
  return (
    <section
      css={styles}
      className={cx({ full }, `modal-body theme-bg ${className}`)}
      onClick={(e) => e.stopPropagation()}
      ref={ref}
    >
      {children}
    </section>
  );
});

Modal.Title = function ModalTitle({ children }: PropsWithChildren) {
  return <h2 className="theme-text modal-title">{children}</h2>;
};
