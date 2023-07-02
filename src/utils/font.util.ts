import localFont from "next/font/local";

const neueMontreal = localFont({
  src: [
    {
      path: "../../public/fonts/neue-montreal/NeueMontreal-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/neue-montreal/NeueMontreal-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/neue-montreal/NeueMontreal-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  fallback: ["sans-serif"],
});

export default neueMontreal;
