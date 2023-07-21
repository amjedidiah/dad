export enum Features {
  Follow = "follow",
  Testimonials = "testimonials",
}

export const features = {
  [Features.Follow]: {
    title: Features.Follow,
    status: false,
    reason: "configure social media handles",
  },
  [Features.Testimonials]: {
    title: Features.Testimonials,
    status: false,
    reason: "fill in testimonials",
  },
};
