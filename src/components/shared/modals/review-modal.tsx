import Form from "@/components/shared/form";
import Modal from "@/components/shared/layout/modal";
import {
  reviewFormButtons,
  reviewFormFields,
  reviewFormPraise,
  reviewFormSuccess,
} from "@/utils/constants";

export default function ReviewModal() {
  const handleSubmit = (data: any) => console.log({ data });

  return (
    <Modal.Body className="w-[808px] [&_.form]:flex [&_.form]:flex-col [&_.form]:md:grid [&_.form]:gap-y-6 [&_button[type=button]]:md:mt-5 [&_.form]:md:grid-cols-2 [&_.form]:md:gap-x-10 [&_.form]:md:grid-rows-auto-3 [&_.form]:md:auto-rows-fr [&_.group:nth-of-type(n+3)]:col-start-1 [&_.group:nth-of-type(n+3)]:col-end-3 [&_.group:nth-of-type(1)>input]:h-12">
      <Modal.Title>Review</Modal.Title>
      <Form
        fields={reviewFormFields}
        buttons={reviewFormButtons}
        onSubmit={handleSubmit}
        praise={reviewFormPraise}
        successMessage={reviewFormSuccess}
      />
    </Modal.Body>
  );
}
