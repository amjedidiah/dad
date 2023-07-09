export enum Features {
  Follow = "follow",
  Mail = "mail",
}

export const features = {
  [Features.Follow]: {
    title: Features.Follow,
    status: false,
  },
  [Features.Mail]: {
    title: Features.Mail,
    status: false,
  },
};
