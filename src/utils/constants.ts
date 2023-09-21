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

export enum FormInputIds {
  Name = "name",
  Email = "email",
  Image = "imageUrl",
  Content = "content",
}

const fieldObjects = {
  name: {
    type: "text",
    id: FormInputIds.Name,
    name: FormInputIds.Name,
    placeholder: "Type your name here...",
    ["aria-label"]: FormInputIds.Name,
    required: {
      value: true,
      message: "Name is required",
    } as any,
    minLength: {
      value: 3,
      message: "Name must be at least 3 characters",
    } as any,
  },
  email: {
    type: "email",
    id: FormInputIds.Email,
    name: FormInputIds.Email,
    placeholder: "Type your email here...",
    ["aria-label"]: FormInputIds.Email,
    required: {
      value: true,
      message: "Email is required",
    } as any,
    pattern:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i as any,
  },
  textarea: {
    type: "textarea",
    id: FormInputIds.Content,
    name: FormInputIds.Content,
    placeholder: "Type your content here...",
    ["aria-label"]: FormInputIds.Content,
    required: {
      value: true,
      message: "Content is required",
    },
    minLength: {
      value: 10,
      message: "Content is to short",
    },
    rows: 7,
  },
  file: {
    type: "file",
    id: FormInputIds.Image,
    name: FormInputIds.Image,
    accept: "image/png, image/jpeg",
    ["aria-label"]: "Upload Photo",
    options: {
      maxFileSize: 1024 * 1024 * 2,
      clientAllowedFormats: ["png", "jpeg", "jpg"],
      multiple: false,
      helperMessage: "Max size is 2MB of either jpg, jpeg or png image",
    },
  },
};

export const contactFormFields = [
  fieldObjects.name,
  fieldObjects.email,
  {
    ...fieldObjects.textarea,
    placeholder: "Type your message here...",
    ["aria-label"]: "message",
    required: {
      ...fieldObjects.textarea.required,
      message: "Message is required",
    },
    minLength: {
      ...fieldObjects.textarea.minLength,
      message: "Message is to short",
    },
  },
] as IFormField<{
  [key in FormInputIds]: string;
}>[];

export const reviewFormFields = [
  fieldObjects.name,
  fieldObjects.file,
  fieldObjects.email,
  {
    ...fieldObjects.textarea,
    placeholder: "Type your review here...",
    ["aria-label"]: "review",
    required: {
      ...fieldObjects.textarea.required,
      message: "A review is required",
    },
    minLength: {
      ...fieldObjects.textarea.minLength,
      message: "Review is too short",
    },
  },
] as IFormField<{
  [key in FormInputIds]: string;
}>[];

export const footerFormFields = [
  { ...fieldObjects.email, ["aria-label"]: undefined },
] as IFormField<{
  [key in FormInputIds]: string;
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
    key: "review-modal-form",
    className: "bold full",
    type: "submit",
    value: "Submit",
  },
  {
    key: "review-modal-form-back",
    className: "bold full",
    type: "button",
    value: "Back",
    outlined: true,
    noIcon: true,
    ["data-modal"]: ModalTitles.rate,
  },
] as IButton[];

export const footerFormButtons = [
  {
    key: "footer-form",
    className: "bold full",
    type: "submit",
    value: "Subscribe",
  },
] as IButton[];

export const contactFormPraise = `You did good, 💪🏾. You can proceed to send your message`;

export const reviewFormPraise = `You did good, 💪🏾. You can proceed to submit your review`;

export const footerFormPraise = `You did good, 💪🏾. You can hit the subscribe button`;

export const contactFormSuccess = `Your message has been sent to Dr. Passy. He will get back to you as soon as possible`;

export const reviewFormSuccess = `Your review has been recorded. You will get feedback once it has been approved or denied`;

export const footerFormSuccess = `You have been subscribed to receive life changing articles once every week from Dr. Passy`;

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
