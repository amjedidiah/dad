import { Mode, ModeContextType } from "@/context/mode/types";
import { darkTheme, lightTheme } from "@/utils/theme.util";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function useMode(): ModeContextType {
  const [mode, setMode] = useState<Mode | null>();
  const isDarkMode = useMemo(() => mode === "dark", [mode]);

  const toggleMode = useCallback(() => {
    const newMode = !isDarkMode ? "dark" : "light";
    setMode(newMode);
  }, [isDarkMode]);

  const theme = useMemo(() => {
    const initTheme = isDarkMode ? darkTheme : lightTheme;
    return { ...initTheme, isDarkMode } as ModeContextType["theme"];
  }, [isDarkMode]);

  useEffect(() => {
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const deviceMode = prefersDarkMode ? "dark" : "light";
    setMode(deviceMode);
  }, []);

  return { theme, toggleMode, isDarkMode };
}
