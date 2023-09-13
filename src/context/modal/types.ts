import { FC } from "react";

export type IModalContext = {
  modalTitle?: ModalTitles;
  ModalComponent: FC | null;
  toggleModal: (title?: ModalTitles, data?: any) => void;
  modalData: any;
};

export enum ModalTitles {
  contact = "contact",
  partner = "partner",
  rate = "rate",
  review = "review",
}
