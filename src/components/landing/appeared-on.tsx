/** @jsxImportSource @emotion/react */
import Scrolling from "@/components/shared/scrolling";
import styles from "@/styles/appeared-on.style";

const images = [
  { key: "channels", imageLink: "/images/landing/channels.webp" },
  { key: "the-guardian", imageLink: "/images/landing/the-guardian.webp" },
  { key: "nta", imageLink: "/images/landing/nta.webp" },
];

export default function AppearedOn() {
  return (
    <section css={styles} className="load-in">
      <div className="container [&_.rfm-child:nth-of-type(1)_.scroll-image-container]:w-[81.2px] [&_.rfm-child:nth-of-type(1)_.scroll-image-container]:h-[75.6px] [&_.rfm-child:nth-of-type(2)_.scroll-image-container]:w-[261.096px] [&_.rfm-child:nth-of-type(2)_.scroll-image-container]:h-[47.6px] [&_.rfm-child:nth-of-type(3)_.scroll-image-container]:w-[136.5px] [&_.rfm-child:nth-of-type(3)_.scroll-image-container]:h-[70px] mdx:[&_.rfm-child:nth-of-type(1)_.scroll-image-container]:w-[116px] mdx:[&_.rfm-child:nth-of-type(1)_.scroll-image-container]:h-[108px] mdx:[&_.rfm-child:nth-of-type(2)_.scroll-image-container]:w-[373px] mdx:[&_.rfm-child:nth-of-type(2)_.scroll-image-container]:h-[68px] mdx:[&_.rfm-child:nth-of-type(3)_.scroll-image-container]:w-[195px] mdx:[&_.rfm-child:nth-of-type(3)_.scroll-image-container]:h-[100px]">
        <p className="theme-text">APPEARED ON</p>
        <Scrolling items={images} />
      </div>
    </section>
  );
}
