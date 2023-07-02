import {
  contactFormButtons,
  contactFormFields,
  contactFormPraise,
  contactFormSuccess,
} from "@/components/landing/jumbo/constants";
import Follow from "@/components/shared/follow";
import Form from "@/components/shared/form/index.form";
import Modal from "@/components/shared/modal";
import styles from "@/styles/contact-modal.style";

export default function ContactModal() {
  return (
    <Modal.Body styles={styles}>
      <Modal.Title>Contact</Modal.Title>
      <Form
        fields={contactFormFields}
        buttons={contactFormButtons}
        onSubmit={console.log}
        praise={contactFormPraise}
        successMessage={contactFormSuccess}
      />
      <Follow />
    </Modal.Body>
  );
}
