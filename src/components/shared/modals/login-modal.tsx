import Form from "@/components/shared/form";
import Modal from "@/components/shared/layout/modal";
import { useMagic } from "@/context/magic.context";
import { ModalContext } from "@/context/modal/modal.context";
import { UserData } from "@/redux/slices/user.slice";
import {
  loginFormButtons,
  loginFormFields,
  loginFormPraise,
  loginFormSuccess,
} from "@/utils/constants";
import { useContext } from "react";

export default function LoginModal() {
  const { magicLogin } = useMagic();
  const { toggleModal, modalData: modalTitle } = useContext(ModalContext);
  const handleSubmit = async (data: any) => {
    try {
      await magicLogin(data as UserData);
      toggleModal(modalTitle);
    } catch (error) {
      const errorMessage = error?.message || error;
      throw errorMessage;
    }
  };

  return (
    <Modal.Body className="w-[808px] [&_form]:grid [&_form]:gap-x-6 [&_[type=submit]]:mt-6 [&_[type=submit]]:mb-7">
      <Modal.Title>Login</Modal.Title>
      <Form
        fields={loginFormFields}
        buttons={loginFormButtons}
        onSubmit={handleSubmit}
        praise={loginFormPraise}
        successMessage={loginFormSuccess}
      />
    </Modal.Body>
  );
}
