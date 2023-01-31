import { getDesignTokens } from "@/utils/theme.util";
import { createTheme, useMediaQuery } from "@mui/material";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

export type ModeContextType = {
  toggleMode: () => void;
  mode?: "dark" | "light";
};

export const ModeContext = createContext<ModeContextType>({
  toggleMode: () => {},
});

export default function useMode() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState<ModeContextType["mode"]>();

  useEffect(() => {
    const initMode = prefersDarkMode ? "dark" : "light";
    setMode(initMode);
  }, [prefersDarkMode]);

  const toggleMode = useCallback(
    () => setMode((prevMode) => (prevMode === "light" ? "dark" : "light")),
    []
  );

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return { theme, toggleMode };
}
