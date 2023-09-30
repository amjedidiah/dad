import Modal from "@/components/shared/layout/modal";
import Content from "@/components/shared/content/content";

export default function ContentModal() {
  return (
    <Modal.Body>
      <Content type="book" contentId={1} showReview noHeader />
    </Modal.Body>
  );
}
