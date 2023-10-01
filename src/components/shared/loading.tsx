/** @jsxImportSource @emotion/react */
import { useEffect } from "react";
import { useAnimate } from "framer-motion";
import styles from "@/styles/loading.style";

export default function ThreeDotsWave() {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(
      "span.dot-1",
      { y: ["0em", "-1em", "0em"], opacity: [1, 0, 1] },
      { ease: "easeInOut", duration: 0.75, repeat: Infinity }
    );
    animate(
      "span.dot-2",
      { y: ["0em", "-1em", "0em"], opacity: [1, 0, 1] },
      { ease: "easeInOut", duration: 0.75, repeat: Infinity, delay: 0.5 }
    );
    animate(
      "span.dot-3",
      { y: ["0em", "-1em", "0em"], opacity: [1, 0, 1] },
      { ease: "easeInOut", duration: 0.75, repeat: Infinity, delay: 1 }
    );
  }, [scope, animate]);

  return (
    <div css={styles} ref={scope}>
      <span className="dot dot-1" />
      <span className="dot dot-2" />
      <span className="dot dot-3" />
    </div>
  );
}
