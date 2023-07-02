/** @jsxImportSource @emotion/react */
import { useEffect } from "react";
import { useAnimate } from "framer-motion";
import { IRolesItems } from "@/components/landing/jumbo/index.jumbo";
import styles from "@/styles/scrolling.style";

type Props = {
  items: IRolesItems[];
};

export default function Scrolling({ items }: Props) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(
      "ul.roles-1",
      { x: ["0em", "-65em", "65em", "0em"], opacity: [1, 0, 0, 1] },
      { ease: "easeInOut", duration: 15, repeat: Infinity, delay: 2 }
    );
    animate(
      "ul.roles-2",
      { x: ["65em", "0em", "-65em", "65em"], opacity: [0, 1, 0, 0] },
      { ease: "easeInOut", duration: 15, repeat: Infinity, delay: 2 }
    );
    animate(
      "ul.roles-3",
      { x: ["65em", "65em", "0em", "-65em"], opacity: [0, 0, 1, 1] },
      { ease: "easeInOut", duration: 15, repeat: Infinity, delay: 2 }
    );
  }, [scope, animate]);

  return (
    <div css={styles} ref={scope}>
      {items.map((_, i) => (
        <ul key={i} className={`roles roles-${i + 1}`}>
          {items.map(({ key, Component }) => (
            <li key={key} className="role-item">
              <Component /> {key}
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
