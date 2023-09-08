import { useCallback, useMemo, useState } from "react";
import ContactModal from "@/components/shared/modals/contact-modal";
import PartnerModal from "@/components/shared/modals/partner-modal";
import { IModalContext, ModalTitles } from "@/context/modal/types";
import RateModal from "@/components/shared/modals/rate-modal";

export default function useModal(): IModalContext {
  const [modalTitle, setModalTitle] = useState<IModalContext["modalTitle"]>();

  const ModalComponent = useMemo(() => {
    if (!modalTitle) return null;

    return (
      {
        [ModalTitles.contact]: ContactModal,
        [ModalTitles.partner]: PartnerModal,
        [ModalTitles.rate]: RateModal,
        [ModalTitles.review]: null,
      }[modalTitle] || null
    );
  }, [modalTitle]);

  const toggleModal = useCallback(
    (title: IModalContext["modalTitle"]) =>
      setModalTitle((prevTitle) => (prevTitle === title ? undefined : title)),
    []
  );

  return {
    modalTitle,
    ModalComponent,
    toggleModal,
  };
}
