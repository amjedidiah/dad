import { FC } from "react";

export type IModalContext = {
  modalTitle?: ModalTitles;
  ModalComponent: FC | null;
  toggleModal: (title?: ModalTitles) => void;
};

export enum ModalTitles {
  contact = "contact",
}
