import { createContext } from "react";
import { IModalContext } from "@/context/modal/types";

export const ModalContext = createContext<IModalContext>({
  modalTitle: undefined,
  ModalComponent: null,
  toggleModal: () => {},
  modalData: null,
});
