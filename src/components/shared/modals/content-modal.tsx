import Modal from "@/components/shared/layout/modal";
import Content from "@/components/shared/content";

export default function ContentModal() {
  return (
    <Modal.Body>
      <Content type="book" contentId={1} showReview />
    </Modal.Body>
  );
}
