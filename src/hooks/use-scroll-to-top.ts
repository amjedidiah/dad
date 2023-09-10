import { useCallback, useMemo, useState } from "react";
import useScroll from "@/hooks/use-scroll";

export default function useScrollToTop() {
  const [scrollPositionPercentage, setScrollPositionPercentage] = useState(0);

  /**
   * Calculates the scroll distance and updates the scroll position state.
   */
  const calculateScrollDistance = useCallback(() => {
    const scrollTop = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const documentHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight
    );
    const totalScrollableDistance = documentHeight - windowHeight;

    const newScrollPositionPercentage = Math.floor(
      (scrollTop / totalScrollableDistance) * 100
    );

    setScrollPositionPercentage(newScrollPositionPercentage);
  }, []);

  /**
   * Determines if the "Scroll to Top" button should be shown based on scroll position and document height.
   */
  const showScrollToTop = useMemo(() => {
    if (!process.browser) return false;

    const deviceHeight = document.documentElement.clientHeight;
    const documentHeight = document.body.scrollHeight;
    const ratioThreshold = 2;
    const scrollPositionThreshold = 80;

    return (
      documentHeight / deviceHeight > ratioThreshold &&
      scrollPositionPercentage > scrollPositionThreshold
    );
  }, [scrollPositionPercentage]);

  /**
   * Function to be called on scroll, which triggers the scroll position calculation.
   */
  const handleScroll = useCallback(
    () => requestAnimationFrame(calculateScrollDistance),
    [calculateScrollDistance]
  );

  // Attach scroll listener using custom hook
  useScroll(handleScroll, true);

  return showScrollToTop;
}
