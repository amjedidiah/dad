import Form from "@/components/shared/form";
import Modal from "@/components/shared/layout/modal";
import { ModalContext } from "@/context/modal/modal.context";
import RatingContext from "@/context/rating/rating.context";
import {
  reviewFormButtons,
  reviewFormFields,
  reviewFormPraise,
  reviewFormSuccess,
} from "@/utils/constants";
import { useContext } from "react";
import { AiOutlineClose } from "react-icons/ai";

interface ModalProps {
  isDarkMode: boolean;
}
const ReviewModal: React.FC<ModalProps> = ({ isDarkMode }) => {
  const { handleReview } = useContext(RatingContext);
  const { toggleModal } = useContext(ModalContext);

  const closeModal = () => {
    toggleModal();
  };
  const handleSubmit = async (data: any) => {
    const { error, message } = await handleReview(data);
    if (error) throw message;

    return message;
  };

  return (
    <Modal.Body className="w-[808px] [&_.form]:flex [&_.form]:flex-col [&_.form]:md:grid [&_.form]:gap-y-6 [&_.form]:md:grid-cols-2 [&_.form]:md:gap-x-10 [&_.form]:md:grid-rows-auto-4 [&_.form]:md:auto-rows-fr [&_.group:nth-of-type(n+3)]:col-start-1 [&_.group:nth-of-type(n+3)]:col-end-3 [&_.group>input]:h-14 [&_#uploadWidget]:h-14 [&_button]:h-14 [&_.group>input]:md:h-16 [&_#uploadWidget]:md:h-16 [&_button]:md:h-16">
      <div className="flex justify-between">
        <Modal.Title>Review</Modal.Title>
        <AiOutlineClose
          onClick={closeModal}
          className={`
           ${!isDarkMode && "bg-black text-white w-14 h-14 cursor-pointer"}`}
        />
      </div>{" "}
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
