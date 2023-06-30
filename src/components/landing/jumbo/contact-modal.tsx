import Button from "@/components/shared/button";
import Follow from "@/components/shared/follow";
import Form from "@/components/shared/form/index.form";
import Modal from "@/components/shared/modal";
import styles from "@/styles/contact-modal.style";

export default function ContactModal() {
  return (
    <Modal.Body styles={styles}>
      <Modal.Title>Contact</Modal.Title>
      <Form>
        <Form.Group>
          <Form.Label htmlFor="name">Name</Form.Label>
          <Form.Field
            type="text"
            id="name"
            name="name"
            placeholder="Type your name here"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Field
            type="email"
            id="email"
            name="email"
            placeholder="Type your email here"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="message">Message</Form.Label>
          <Form.Field
            type="textarea"
            id="message"
            name="message"
            placeholder="Type your message here"
            rows={7}
          />
        </Form.Group>
        <Form.Group>
          <Button
            key="contact-modal-form"
            className="bold full"
            type="submit"
            value="Send"
          />
        </Form.Group>
      </Form>
      <Follow />
    </Modal.Body>
  );
}
