import { useCallback, useMemo, useState } from "react";
import ContactModal from "@/components/landing/jumbo/contact-modal";
import { IModalContext, ModalTitles } from "@/context/modal/types";

export default function useModal(): IModalContext {
  const [modalTitle, setModalTitle] = useState<IModalContext["modalTitle"]>();

  const ModalComponent = useMemo(() => {
    if (!modalTitle) return null;

    return (
      {
        [ModalTitles.contact]: ContactModal,
      }[modalTitle] || null
    );
  }, [modalTitle]);

  const toggleModal = useCallback(
    (title: IModalContext["modalTitle"]) => {
      setModalTitle((prevTitle) => (prevTitle === title ? undefined : title));
    },
    [setModalTitle]
  );

  return {
    modalTitle,
    ModalComponent,
    toggleModal,
  };
}
