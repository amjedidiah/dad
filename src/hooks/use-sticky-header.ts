import { useCallback, useState } from "react";
import useScroll from "@/hooks/use-scroll";

export default function useStickyHeader() {
  // When header gets to the top of the screen, make it sticky
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);

  // Callback to handle scroll event
  const handleScroll = useCallback(() => {
    // Get scroll position of header
    const header = document.getElementById("header");
    if (!header) return;

    const headerPosition = header.getBoundingClientRect().top;

    // If header is at the top of the screen, make it sticky
    setIsHeaderSticky(headerPosition <= 0);
  }, []);

  // Attach scroll listener using custom hook
  useScroll(handleScroll, true);

  return isHeaderSticky;
}
