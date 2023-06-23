/** @jsxImportSource @emotion/react */
import { ModeContext } from "@/context/mode/mode.context";
import useScrollPosition from "@/hooks/use-scroll-position";
import {
  DarkModeIcon,
  LightModeIcon,
  ScrollToTopDarkIcon,
  ScrollToTopLightIcon,
} from "@/icons";
import styles from "@/styles/mode-switch.style";
import { useContext, useMemo } from "react";
import { Link } from "react-scroll";

export default function ModeSwitch() {
  const { isDarkMode, toggleMode } = useContext(ModeContext);
  const showScrollToTop = useScrollPosition();

  const ScrollIcon = useMemo(
    () => (isDarkMode ? ScrollToTopLightIcon : ScrollToTopDarkIcon),
    [isDarkMode]
  );

  const SwitchIcon = useMemo(
    () => (isDarkMode ? LightModeIcon : DarkModeIcon),
    [isDarkMode]
  );

  return (
    <div css={styles}>
      {showScrollToTop && (
        <Link to="top" smooth>
          <button aria-label="Scroll to top">
            <ScrollIcon />
          </button>
        </Link>
      )}
      <button onClick={toggleMode} aria-label="Toggle mode">
        <SwitchIcon />
      </button>
    </div>
  );
}
