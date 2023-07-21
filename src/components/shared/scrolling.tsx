/** @jsxImportSource @emotion/react */
import Marquee from "react-fast-marquee";
import styles from "@/styles/scrolling.style";

type Props = {
  items: Array<{
    key: string;
    Component?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  }>;
  speed?: number;
  delay?: number;
};

export default function Scrolling({ items, speed = 75, delay = 0 }: Props) {
  return (
    <ul css={styles}>
      <Marquee pauseOnHover speed={speed} delay={delay}>
        {items.map(({ key, Component }) => (
          <li key={key} className="scroll-item">
            {Component && <Component />} {key}
          </li>
        ))}
      </Marquee>
    </ul>
  );
}
