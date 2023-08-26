export enum Features {
  Follow = "follow",
  Ministries = "ministries",
  Testimonials = "testimonials",
  Donate = "donate",
  WhyChooseHim = "why-choose-him",
}

export const features = {
  [Features.Follow]: {
    title: Features.Follow,
    status: false,
    reason: "configure social media handles",
  },
  [Features.Ministries]: {
    title: Features.Ministries,
    status: false,
    reason: "fill in ministries with real values",
  },
  [Features.Testimonials]: {
    title: Features.Testimonials,
    status: false,
    reason: "fill in testimonials with real values",
  },
  [Features.Donate]: {
    title: Features.Donate,
    status: false,
    reason:
      "configure the following production env vars: NEXT_PUBLIC_FLUTTERWAVE_DONATION_LINK, NEXT_PUBLIC_PAYSTACK_DONATION_LINK, and NEXT_PUBLIC_PAYSTACK_DONATION_LINK_REDIRECT in Flutterwave and Paystack dashboards",
  },
  [Features.WhyChooseHim]: {
    title: Features.WhyChooseHim,
    status: false,
    reason: "replace lorem content",
  },
};
