import { ModalContext } from "@/context/modal/modal.context";
import { ModalTitles } from "@/context/modal/types";
import { userLogout } from "@/redux/slices/user.slice";
import { useAppDispatch } from "@/redux/util";
import { useContext } from "react";

export default function useLogout() {
  const dispatch = useAppDispatch();
  const { toggleModal } = useContext(ModalContext);

  const handleLogout = async (modalTite?: ModalTitles) => {
    await dispatch(userLogout()).then(({ error }: any) => {
      if (error) throw error;
    });

    if (modalTite) toggleModal(ModalTitles.login, modalTite);
  };

  return handleLogout;
}
