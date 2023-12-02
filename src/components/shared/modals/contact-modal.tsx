import Follow from "@/components/shared/follow";
import Form from "@/components/shared/form";
import Modal from "@/components/shared/layout/modal";
import { ModalContext } from "@/context/modal/modal.context";
import useMail from "@/hooks/use-mail";
import styles from "@/styles/contact-modal.style";
import {
  contactFormButtons,
  contactFormFields,
  contactFormPraise,
  contactFormSuccess,
} from "@/utils/constants";
import { useContext } from "react";
import { AiOutlineClose } from "react-icons/ai";

interface ModalProps {
  isDarkMode: boolean;
}
const ContactModal: React.FC<ModalProps> = ({ isDarkMode }) => {
  const { sendMail } = useMail();
  const { toggleModal } = useContext(ModalContext);

  const closeModal = () => {
    toggleModal();
  };
  const handleSubmit = async (data: any) => {
    const { error, message } = await sendMail(data);
    if (error) throw "Error sending message. Please try again later...";

    return message;
  };

  return (
    <Modal.Body styles={styles}>
      <div className="flex justify-between">
        <Modal.Title>Contact</Modal.Title>
        <AiOutlineClose
          onClick={closeModal}
          className={`
           ${!isDarkMode && "bg-black text-white w-14 h-14 cursor-pointer"}`}
        />
      </div>{" "}
      <Form
        id="contact-form"
        fields={contactFormFields}
        buttons={contactFormButtons}
        onSubmit={handleSubmit}
        praise={contactFormPraise}
        successMessage={contactFormSuccess}
      />
      <Follow />
    </Modal.Body>
  );
};
export default ContactModal;
