/** @jsxImportSource @emotion/react */
import useScrollPosition from "@/hooks/use-scroll-position";
import {
  DarkModeIcon,
  LightModeIcon,
  ScrollToTopDarkIcon,
  ScrollToTopLightIcon,
} from "@/icons";
import styles from "@/styles/mode-switch.style";
import { useTheme } from "@emotion/react";
import { useMemo } from "react";
import { Link } from "react-scroll";

export default function ModeSwitch() {
  const showScrollToTop = useScrollPosition();
  const { isDarkMode, toggleMode } = useTheme();

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
