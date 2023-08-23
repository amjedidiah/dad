/** @jsxImportSource @emotion/react */
import { useContext } from "react";
import { cx } from "@emotion/css";
import { Interpolation, Theme } from "@emotion/react";
import { ModalContext } from "@/context/modal/modal.context";
import styles from "@/styles/modal.style";
import { IComponentWithChildren } from "@/utils/types";

export default function Modal() {
  const { ModalComponent, toggleModal } = useContext(ModalContext);

  if (!ModalComponent) return null;

  return (
    <dialog css={styles} open={true} onClick={() => toggleModal()}>
      <ModalComponent />
    </dialog>
  );
}

type IModalBody = {
  full?: boolean;
  styles?: Interpolation<Theme>;
};

Modal.Body = function ModalBody({
  children,
  full,
  styles,
}: IComponentWithChildren & IModalBody) {
  return (
    <section
      css={styles}
      className={cx({ full }, "modal-body theme-bg")}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </section>
  );
};

Modal.Title = function ModalTitle({ children }: IComponentWithChildren) {
  return <h2 className="theme-text modal-title">{children}</h2>;
};
