export enum Features {
  Ministries = "ministries",
  Testimonials = "testimonials",
  Donate = "donate",
  CldOGImage = "og-images",
  CldImage = "cld-images",
  Cart = "cart",
  DB = "db",
}

export const features = {
  [Features.Ministries]: {
    title: Features.Ministries,
    status: false,
    reason: "fill in ministries with real values",
  },
  [Features.Testimonials]: {
    title: Features.Testimonials,
    status: false,
    reason:
      "fill in testimonials with real values: two men, one from abroad and nigeria, same for women",
  },
  [Features.Donate]: {
    title: Features.Donate,
    status: false,
    reason: [
      "configure the following production env vars: NEXT_PUBLIC_FLUTTERWAVE_DONATION_LINK, NEXT_PUBLIC_PAYSTACK_DONATION_LINK, and NEXT_PUBLIC_PAYSTACK_DONATION_LINK_REDIRECT in Flutterwave and Paystack dashboards",
      "stripe checkout for non africans",
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
  [Features.Cart]: {
    title: Features.Cart,
    status: false,
    reason: "Get cart checkout to work",
  },
  [Features.DB]: {
    title: Features.DB,
    status: false,
    reason: "Swap DATABASE_URL env variable in production for a different one",
  },
};
