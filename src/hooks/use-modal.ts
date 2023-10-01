import { useCallback, useEffect, useMemo, useState } from "react";
import ContactModal from "@/components/shared/modals/contact-modal";
import PartnerModal from "@/components/shared/modals/partner-modal";
import { IModalContext, ModalTitles } from "@/context/modal/types";
import RateModal from "@/components/shared/modals/rate-modal";
import ReviewModal from "@/components/shared/modals/review-modal";
import LoginModal from "@/components/shared/modals/login-modal";
import ContentModal from "@/components/shared/modals/content-modal";

export default function useModal(): IModalContext {
  const [modalTitle, setModalTitle] = useState<IModalContext["modalTitle"]>();
  const [modalData, setModalData] = useState<IModalContext["modalData"]>(null);

  const ModalComponent = useMemo(() => {
    if (!modalTitle) return null;

    return (
      {
        [ModalTitles.contact]: ContactModal,
        [ModalTitles.partner]: PartnerModal,
        [ModalTitles.rate]: RateModal,
        [ModalTitles.review]: ReviewModal,
        [ModalTitles.login]: LoginModal,
        [ModalTitles.content]: ContentModal,
      }[modalTitle] || null
    );
  }, [modalTitle]);

  const toggleModal = useCallback(
    (title: IModalContext["modalTitle"], data?: any) => {
      setModalTitle((prevTitle) => (prevTitle === title ? undefined : title));
      if (data) setModalData(data);
    },
    []
  );

  useEffect(() => {
    if (!modalTitle) setModalData(null);
  }, [modalTitle]);

  return {
    modalTitle,
    ModalComponent,
    toggleModal,
    modalData,
  };
}
