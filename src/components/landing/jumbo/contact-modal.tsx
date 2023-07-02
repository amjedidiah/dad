import Follow from "@/components/shared/follow";
import Form from "@/components/shared/form/index.form";
import Modal from "@/components/shared/modal";
import styles from "@/styles/contact-modal.style";
import {
  contactFormButtons,
  contactFormFields,
} from "@/components/landing/jumbo/constants";

export default function ContactModal() {
  return (
    <Modal.Body styles={styles}>
      <Modal.Title>Contact</Modal.Title>
      <Form fields={contactFormFields} buttons={contactFormButtons} />
      <Follow />
    </Modal.Body>
  );
}
