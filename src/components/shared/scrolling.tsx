/** @jsxImportSource @emotion/react */
import Image from "next/image";
import Marquee from "react-fast-marquee";
import styles from "@/styles/scrolling.style";

export type ScrollingProps = {
  items: Array<{
    key: string;
    Component?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    imageLink?: string;
  }>;
  speed?: number;
  delay?: number;
};

export default function Scrolling({
  items,
  speed = 75,
  delay = 0,
}: ScrollingProps) {
  return (
    <ul css={styles}>
      <Marquee pauseOnHover speed={speed} delay={delay}>
        {items.map(({ key, Component, imageLink }) => (
          <li key={key} className="scroll-item">
            {Component && <Component />} {!imageLink && key}
            {imageLink && (
              <div className="scroll-image-container">
                <Image src={imageLink} alt={key} fill sizes="100%" />
              </div>
            )}
          </li>
        ))}
      </Marquee>
    </ul>
  );
}
