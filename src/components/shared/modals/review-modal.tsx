import Form from "@/components/shared/form";
import Modal from "@/components/shared/layout/modal";
import RatingContext from "@/context/rating/rating.context";
import {
  reviewFormButtons,
  reviewFormFields,
  reviewFormPraise,
  reviewFormSuccess,
} from "@/utils/constants";
import { useContext } from "react";

const ReviewModal = () => {
  const { handleReview } = useContext(RatingContext);

  const handleSubmit = async (data: any) => {
    const { error, message } = await handleReview(data);
    if (error) throw message;

    return message;
  };

  return (
    <Modal.Body className="w-[808px] [&_.form]:flex [&_.form]:flex-col [&_.form]:md:grid [&_.form]:gap-y-6 [&_.form]:md:grid-cols-2 [&_.form]:md:gap-x-10 [&_.form]:md:grid-rows-auto-4 [&_.form]:md:auto-rows-fr [&_.group:nth-of-type(n+3)]:col-start-1 [&_.group:nth-of-type(n+3)]:col-end-3 [&_.group>input]:h-14 [&_#uploadWidget]:h-14 [&_button]:h-14 [&_.group>input]:md:h-16 [&_#uploadWidget]:md:h-16 [&_button]:md:h-16">
      <Modal.Title>Review</Modal.Title>
      <Form
        id="review-form"
        fields={reviewFormFields}
        buttons={reviewFormButtons}
        onSubmit={handleSubmit}
        praise={reviewFormPraise}
        successMessage={reviewFormSuccess}
      />
    </Modal.Body>
  );
};
export default ReviewModal;
