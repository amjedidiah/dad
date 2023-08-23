import { useCallback, useMemo, useState } from "react";
import ContactModal from "@/components/landing/jumbo/contact-modal";
import PartnerModal from "@/components/landing/jumbo/partner-modal";
import { IModalContext, ModalTitles } from "@/context/modal/types";

export default function useModal(): IModalContext {
  const [modalTitle, setModalTitle] = useState<IModalContext["modalTitle"]>();

  const ModalComponent = useMemo(() => {
    if (!modalTitle) return null;

    return (
      {
        [ModalTitles.contact]: ContactModal,
        [ModalTitles.partner]: PartnerModal,
      }[modalTitle] || null
    );
  }, [modalTitle]);

  const toggleModal = useCallback((title: IModalContext["modalTitle"]) => {
    setModalTitle((prevTitle) => (prevTitle === title ? undefined : title));
  }, []);

  return {
    modalTitle,
    ModalComponent,
    toggleModal,
  };
}
