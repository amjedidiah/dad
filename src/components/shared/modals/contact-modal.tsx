import Follow from "@/components/shared/follow";
import Form from "@/components/shared/form";
import Modal from "@/components/shared/layout/modal";
import useMail from "@/hooks/use-mail";
import styles from "@/styles/contact-modal.style";
import {
  contactFormButtons,
  contactFormFields,
  contactFormPraise,
  contactFormSuccess,
} from "@/utils/constants";

const ContactModal = () => {
  const { sendMail } = useMail();

  const handleSubmit = async (data: any) => {
    const { error, message } = await sendMail(data);
    if (error) throw "Error sending message. Please try again later...";

    return message;
  };

  return (
    <Modal.Body styles={styles}>
      <Modal.Title>Contact</Modal.Title>
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
