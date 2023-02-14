import { Inter } from "@next/font/google";
import localFont from "@next/font/local";

export const inter = Inter({ subsets: ["latin"], fallback: ["sans-serif"] });
export const aeonik = localFont({
  src: [
    {
      path: "../../public/fonts/aeonik/aeonik-light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/aeonik/aeonik-light-italic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../public/fonts/aeonik/aeonik-regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/aeonik/aeonik-regular-italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/aeonik/aeonik-bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/aeonik/aeonik-bold-italic.otf",
      weight: "700",
      style: "italic",
    },
  ],
  fallback: ["sans-serif"],
});
