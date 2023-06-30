import { ButtonProps } from "@/components/shared/button";
import { ModalTitles } from "@/context/modal/types";

export enum JumboButtonKeys {
  contact = "contact",
  partner = "partner",
}

export const jumboButtons: ButtonProps[] = [
  {
    key: JumboButtonKeys.contact,
    value: "Contact",
    ["data-modal"]: ModalTitles.contact,
    outlined: true,
  },
  {
    key: JumboButtonKeys.partner,
    value: "Partner",
  },
];

export const roles = ["Father", "Psychologist", "Pastor"];
