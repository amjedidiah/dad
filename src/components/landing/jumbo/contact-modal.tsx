import {
  contactFormButtons,
  contactFormFields,
  contactFormPraise,
  contactFormSuccess,
} from "@/components/landing/jumbo/constants";
import Follow from "@/components/shared/follow";
import Form from "@/components/shared/form/index.form";
import Modal from "@/components/shared/modal";
import useMail from "@/hooks/use-mail";
import styles from "@/styles/contact-modal.style";

export default function ContactModal() {
  const { sendMail } = useMail();
  const handleSubmit = async (data: any) => {
    const { error, message } = await sendMail(data);
    if (error) {
      console.error(error);
      throw message;
    }

    return message;
  };

  return (
    <Modal.Body styles={styles}>
      <Modal.Title>Contact</Modal.Title>
      <Form
        fields={contactFormFields}
        buttons={contactFormButtons}
        onSubmit={handleSubmit}
        praise={contactFormPraise}
        successMessage={contactFormSuccess}
      />
      <Follow />
    </Modal.Body>
  );
}
