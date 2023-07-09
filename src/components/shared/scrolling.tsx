/** @jsxImportSource @emotion/react */
import Marquee from "react-fast-marquee";
import { IRolesItems } from "@/components/landing/jumbo/index.jumbo";
import styles from "@/styles/scrolling.style";

type Props = {
  items: IRolesItems[];
  speed?: number;
  delay?: number;
};

export default function Scrolling({ items, speed = 50, delay = 0 }: Props) {
  return (
    <ul css={styles}>
      <Marquee autoFill pauseOnHover speed={speed} delay={delay}>
        {items.map(({ key, Component }) => (
          <li key={key} className="role-item">
            <Component /> {key}
          </li>
        ))}
      </Marquee>
    </ul>
  );
}
