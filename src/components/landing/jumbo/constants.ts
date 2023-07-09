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
    required: {
      value: true,
      message: "Email is required",
    },
    pattern:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
  },
  {
    type: "textarea",
    id: ContactFormInputIds.Message,
    name: "message",
    placeholder: "Type your message here",
    rows: 7,
    ["aria-label"]: "message",
    required: {
      value: true,
      message: "A message is required",
    },
    minLength: {
      value: 10,
      message: "More context is required for this message",
    },
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

export const contactFormPraise = `You did good, 💪🏾. You can proceed to send your message`;

export const contactFormSuccess = `Your message has been sent to Dr. Passy. He will get back to you as soon as possible`;