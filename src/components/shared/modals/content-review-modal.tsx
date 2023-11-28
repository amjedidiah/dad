import Modal from "@/components/shared/layout/modal";
import ContentReviews from "@/components/shared/content/content-reviews";

export default function ContentReviewModal() {
  return (
    <Modal.Body className="max-w-3xl">
      <ContentReviews />
    </Modal.Body>
  );
}
