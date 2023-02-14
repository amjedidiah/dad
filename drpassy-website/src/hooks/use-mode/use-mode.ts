import { Mode } from "@/context/mode/types";
import { getDesignTokens } from "@/utils/theme.util";
import { createTheme, Theme, useMediaQuery } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function useMode(initMode?: Mode, isStorybook?: boolean) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState(initMode || "light");

  useEffect(() => {
    if (isStorybook) return;
    const deviceMode = prefersDarkMode ? "dark" : "light";
    setMode(deviceMode);
  }, [isStorybook, prefersDarkMode]);

  const theme: Theme = useMemo(
    () => createTheme(getDesignTokens(mode)),
    [mode]
  );

  const toggleMode = useCallback(() => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
  }, [mode]);

  const isDarkMode = useMemo(() => mode === "dark", [mode]);

  return { theme, toggleMode, isDarkMode };
}
