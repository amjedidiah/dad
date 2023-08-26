import { useContext, useMemo } from "react";
import { IButton } from "@/components/shared/button/index.button";
import { ModalContext } from "@/context/modal/modal.context";
import { ModalTitles } from "@/context/modal/types";
import useMobileDetect from "@/hooks/use-mobile-detect";
import { JumboButtonKeys } from "@/utils/constants";

const buttons: IButton[] = [
  {
    key: JumboButtonKeys.contact,
    value: "Contact",
    ["data-modal"]: ModalTitles.contact,
    outlined: true,
    className: "action-button",
  },
  {
    key: JumboButtonKeys.partner,
    value: "Partner",
    ["data-modal"]: ModalTitles.partner,
    className: "action-button",
  },
];

export default function useActionButtons(props?: IButton) {
  const { toggleModal } = useContext(ModalContext);
  const { isMobile } = useMobileDetect();
  const actionButtons = useMemo(
    () =>
      buttons.map((button) => ({
        ...button,
        ...props,
        onClick: () =>
          button.key === JumboButtonKeys.contact && isMobile
            ? window.open(`tel:${process.env.NEXT_PUBLIC_CONTACT_NUMBER}`)
            : toggleModal(button["data-modal"]),
        className: "rounded lg",
      })),
    [isMobile, props, toggleModal]
  );

  return actionButtons;
}
