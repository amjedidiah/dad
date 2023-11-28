import Modal from "@/components/shared/layout/modal";
import Content from "@/components/shared/content/content";
import ContentReviews from "@/components/shared/content/content-reviews";
import { useContext } from "react";
import { ModalContext } from "@/context/modal/modal.context";

export default function ContentModal() {
  const { modalData } = useContext(ModalContext);
  return (
    <Modal.Body>
      <Content type="book" hideReviewButton noHeader />

      {modalData?.type === "book" && <ContentReviews />}
    </Modal.Body>
  );
}
