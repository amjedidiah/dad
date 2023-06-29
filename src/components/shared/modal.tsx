/** @jsxImportSource @emotion/react */
import { useContext } from "react";
import { ModalContext } from "@/context/modal/modal.context";
import styles from "@/styles/modal.style";
import { IComponentWithChildren } from "@/utils/types";

export default function Modal() {
  const { ModalComponent, toggleModal } = useContext(ModalContext);

  if (!ModalComponent) return null;

  return (
    <dialog css={styles} open={true} onClick={() => toggleModal()}>
      <section className="modal-body theme-bg">
        <ModalComponent />
      </section>
    </dialog>
  );
}

Modal.Title = function ModalTitle({ children }: IComponentWithChildren) {
  return <h2 className="theme-text modal-title">{children}</h2>;
};
