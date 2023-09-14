export enum Features {
  Follow = "follow",
  Ministries = "ministries",
  Testimonials = "testimonials",
  Donate = "donate",
  WhyChooseHim = "why-choose-him",
  CldOGImage = "og-images",
  CldImage = "cld-images",
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
    reasons: [
      "configure the following production env vars: NEXT_PUBLIC_FLUTTERWAVE_DONATION_LINK, NEXT_PUBLIC_PAYSTACK_DONATION_LINK, and NEXT_PUBLIC_PAYSTACK_DONATION_LINK_REDIRECT in Flutterwave and Paystack dashboards",
      "set stripe or paystack & flutterwave donation based on user's location",
    ],
  },
  [Features.CldOGImage]: {
    title: Features.CldOGImage,
    status: false,
    reason:
      "have ebere design og images for each of the pages and upload them to cloudinary, then confirm them here: https://www.opengraph.xyz/",
  },
  [Features.CldImage]: {
    title: Features.CldImage,
    status: false,
    reason:
      "move all images to cloudinary update Image to CldImage component using this article: https://cloudinary.com/guides/front-end-development/integrating-cloudinary-with-next-js",
  },
};
