import { IButton } from "@/components/shared/button/index.button";
import { IFormField } from "@/components/shared/form";
import { TestimonialProps } from "@/components/shared/testimonials/testimonial-item";
import { ModalTitles } from "@/context/modal/types";

export enum JumboButtonKeys {
  contact = "contact",
  partner = "partner",
}

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

export enum ReviewFormInputIds {
  Name = "name",
  Image = "image",
  Email = "email",
  Content = "content",
}

export const contactFormFields = [
  {
    type: "text",
    id: ContactFormInputIds.Name,
    name: ContactFormInputIds.Name,
    placeholder: "Type your name here",
    ["aria-label"]: "name",
    minLength: 3,
  },
  {
    type: "email",
    id: ContactFormInputIds.Email,
    name: ContactFormInputIds.Email,
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
    name: ContactFormInputIds.Message,
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

export const reviewFormFields = [
  {
    type: "text",
    id: ReviewFormInputIds.Name,
    name: ReviewFormInputIds.Name,
    placeholder: "Type your name here",
    ["aria-label"]: "name",
    required: {
      value: true,
      message: "Name is required",
    },
    minLength: {
      value: 3,
      message: "Name must be at least 3 characters",
    },
  },
  {
    type: "file",
    id: ReviewFormInputIds.Image,
    name: ReviewFormInputIds.Image,
    accept: "image/png, image/jpeg",
    ["aria-label"]: "Upload Photo",
    options: {
      maxFileSize: 1024 * 1024 * 2,
      clientAllowedFormats: ["png", "jpeg", "jpg"],
      multiple: false,
      helperMessage: "Max size is 2MB of either jpg, jpeg or png image",
    },
  },
  {
    type: "email",
    id: ReviewFormInputIds.Email,
    name: ReviewFormInputIds.Email,
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
    id: ReviewFormInputIds.Content,
    name: ReviewFormInputIds.Content,
    placeholder: "Type your review here",
    rows: 7,
    ["aria-label"]: "review",
    required: {
      value: true,
      message: "A review is required",
    },
    minLength: {
      value: 10,
      message: "More context is required for this review",
    },
  },
] as IFormField<{
  [key in ReviewFormInputIds]: string;
}>[];

export const contactFormButtons = [
  {
    key: "contact-modal-form",
    className: "bold full",
    type: "submit",
    value: "Send",
  },
] as IButton[];

export const reviewFormButtons = [
  {
    key: "review-modal-form-back",
    className: "bold full",
    type: "button",
    value: "Back",
    outlined: true,
    noIcon: true,
    ["data-modal"]: ModalTitles.rate,
  },
  {
    key: "review-modal-form",
    className: "bold full",
    type: "submit",
    value: "Submit",
  },
] as IButton[];

export const contactFormPraise = `You did good, 💪🏾. You can proceed to send your message`;

export const reviewFormPraise = `You did good, 💪🏾. You can proceed to submit your review`;

export const contactFormSuccess = `Your message has been sent to Dr. Passy. He will get back to you as soon as possible`;

export const reviewFormSuccess = `Your review has been recorded. You will get feedback once it has been approved or denied`;

export const ministries = [
  { key: "Successful family" },
  { key: "faith clinic" },
  { key: "morning glory" },
];

export const testimonials: TestimonialProps[] = [
  {
    name: "Old Lady 1",
    title: "Co-Founder: Skillup Buzz",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates!",
    image: "/images/old-lady.png",
  },
  {
    name: "Old Lady 2",
    title: "Co-Founder: Skillup Buzz",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates!",
    image: "/images/old-lady.png",
  },
  {
    name: "Old Lady 3",
    title: "Co-Founder: Skillup Buzz",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates!",
    image: "/images/old-lady.png",
  },
  {
    name: "Old Lady 4",
    title: "Co-Founder: Skillup Buzz",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptate",
    image: "/images/old-lady.png",
  },
];
