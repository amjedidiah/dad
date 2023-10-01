import { useEffect } from "react";
import { useAnimate } from "framer-motion";
import { ExploreIcon } from "@/icons";

export default function BouncingArrow() {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(
      "svg",
      { y: [10, -10, 0] },
      { ease: "easeInOut", duration: 1, repeat: Infinity }
    );
  }, [scope, animate]);

  return (
    <span className="theme-icon-fill" ref={scope}>
      <ExploreIcon />
    </span>
  );
}
