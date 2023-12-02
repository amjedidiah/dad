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
import { AiOutlineClose } from "react-icons/ai";

interface ModalProps {
  isDarkMode: boolean;
}
const LoginModal: React.FC<ModalProps> = ({ isDarkMode }) => {
  const { toggleModal, modalData: modalTitle } = useContext(ModalContext);
  const handleSubmit = () => toggleModal(modalTitle);

  const closeModal = () => {
    toggleModal();
  };

  return (
    <Modal.Body className="w-[808px] [&_form]:grid [&_form]:gap-x-6 [&_[type=submit]]:mt-6 [&_[type=submit]]:mb-7">
      <div className="flex justify-between">
        <Modal.Title>Login</Modal.Title>
        <AiOutlineClose
          onClick={closeModal}
          className={`
           ${!isDarkMode && "bg-black text-white w-14 h-14 cursor-pointer"}`}
        />
      </div>{" "}
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
