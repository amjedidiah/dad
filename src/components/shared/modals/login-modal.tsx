import Form from "@/components/shared/form";
import Modal from "@/components/shared/layout/modal";
import { ModalContext } from "@/context/modal/modal.context";
import {
  loginFormButtons,
  loginFormFields,
  loginFormPraise,
  loginFormSuccess,
} from "@/utils/constants";
import { useContext } from "react";

const LoginModal = () => {
  const { toggleModal, modalData: modalTitle } = useContext(ModalContext);
  const handleSubmit = () => toggleModal(modalTitle);

  return (
    <Modal.Body className="w-[808px] [&_form]:grid [&_form]:gap-x-6 [&_[type=submit]]:mt-6 [&_[type=submit]]:mb-7">
      <Modal.Title>Login</Modal.Title>
      <Form
        id="login-form"
        fields={loginFormFields}
        buttons={loginFormButtons}
        onSubmit={handleSubmit}
        praise={loginFormPraise}
        successMessage={loginFormSuccess}
      />
    </Modal.Body>
  );
};
export default LoginModal;
