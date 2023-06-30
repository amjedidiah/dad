import { useEffect } from "react";
import { useAnimate } from "framer-motion";
import { roles } from "@/components/landing/jumbo/constants";
import { StarIcon } from "@/icons";

export default function ScrollingRoles() {
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
    <div ref={scope} className="roles-container">
      {Array.from({ length: 3 }).map((_, i) => (
        <ul key={i} className={`roles roles-${i + 1}`}>
          {roles.map((role) => (
            <li key={role} className="role-item">
              <StarIcon /> {role}
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
