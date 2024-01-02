import { useMemo } from "react";
import { IButton } from "@/components/shared/button/index.button";
import { ModalTitles } from "@/context/modal/types";
import useMobileDetect from "@/hooks/use-mobile-detect";
import { JumboButtonKeys } from "@/utils/constants";

const buttons: IButton[] = [
  {
    key: JumboButtonKeys.contact,
    value: "Contact",
    ["data-modal"]: ModalTitles.contact,
    outlined: true,
  },
  {
    key: JumboButtonKeys.partner,
    value: "Partner",
    ["data-modal"]: ModalTitles.partner,
  },
];

export default function useActionButtons() {
  const { isMobile } = useMobileDetect();
  const actionButtons = useMemo(
    () =>
      buttons.map((button) => ({
        ...button,
        onClick: () =>
          button.key === JumboButtonKeys.contact && isMobile
            ? window.open(`tel:${process.env.NEXT_PUBLIC_CONTACT_NUMBER}`)
            : button.onClick,
        className: "rounded lg",
      })),
    [isMobile]
  );

  return actionButtons;
}
