import { darkTheme, lightTheme } from "@/utils/theme.util";
import { useCallback, useEffect, useMemo, useState } from "react";

export type ModeTheme = typeof lightTheme & {
  isDarkMode: boolean;
  toggleMode: () => void;
};

export default function useMode(): ModeTheme {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const toggleMode = useCallback(
    () => setIsDarkMode((prevMode) => !prevMode),
    []
  );

  const theme = useMemo(
    () => (isDarkMode ? darkTheme : lightTheme),
    [isDarkMode]
  );

  useEffect(() => {
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setIsDarkMode(prefersDarkMode);
  }, []);

  return { ...theme, toggleMode, isDarkMode };
}
