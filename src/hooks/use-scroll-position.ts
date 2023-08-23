import { useCallback, useEffect, useMemo, useState } from "react";

export default function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0);

  const getDocHeight = useCallback(() => {
    return Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight
    );
  }, []);

  const calculateScrollDistance = useCallback(() => {
    const scrollTop = window.pageYOffset; // how much the user has scrolled by
    const winHeight = window.innerHeight;
    const docHeight = getDocHeight();

    const totalDocScrollLength = docHeight - winHeight;
    const newScrollPosition = Math.floor(
      (scrollTop / totalDocScrollLength) * 100
    );

    setScrollPosition(newScrollPosition);
  }, [getDocHeight]);

  const listenToScrollEvent = useCallback(() => {
    const calculateFunc = () =>
      requestAnimationFrame(() => calculateScrollDistance());

    document.addEventListener("scroll", calculateFunc);
    return () => document.removeEventListener("scroll", calculateFunc);
  }, [calculateScrollDistance]);

  const showScrollToTop = useMemo(() => {
    if (!process.browser) return false;

    const deviceHeight = document.documentElement.clientHeight;
    const documentHeight = document.body.scrollHeight;
    const ratio = documentHeight / deviceHeight;

    return ratio > 2 && scrollPosition > 80;
  }, [scrollPosition]);

  useEffect(() => listenToScrollEvent(), [listenToScrollEvent]);

  return showScrollToTop;
}
