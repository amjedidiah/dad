import { IButton } from "@/components/shared/button";
import { IFormField } from "@/components/shared/form/index.form";
import { ModalTitles } from "@/context/modal/types";

export enum JumboButtonKeys {
  contact = "contact",
  partner = "partner",
}

export const jumboButtons: IButton[] = [
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

export enum Roles {
  Father = "Father",
  Psychologist = "Psychologist",
  Pastor = "Pastor",
}

export enum ContactFormInputIds {
  Name = "name",
  Email = "email",
  Message = "message",
}

export const contactFormFields = [
  {
    type: "text",
    id: ContactFormInputIds.Name,
    name: "name",
    placeholder: "Type your name here",
    ["aria-label"]: "name",
  },
  {
    type: "email",
    id: ContactFormInputIds.Email,
    name: "email",
    placeholder: "Type your email here",
    ["aria-label"]: "email",
    required: true,
  },
  {
    type: "textarea",
    id: ContactFormInputIds.Message,
    name: "message",
    placeholder: "Type your message here",
    rows: 7,
    ["aria-label"]: "message",
  },
] as IFormField<{
  [key in ContactFormInputIds]: string;
}>[];

export const contactFormButtons = [
  {
    key: "contact-modal-form",
    className: "bold full",
    type: "submit",
    value: "Send",
  },
] as IButton[];
