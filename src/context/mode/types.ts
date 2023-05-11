import { lightTheme } from "@/utils/theme.util";
import { Theme } from "@emotion/react";

export type Mode = "light" | "dark";

export type ModeTheme = typeof lightTheme & {
  isDarkMode?: boolean;
};

export type ModeContextType = {
  toggleMode: () => void;
  isDarkMode: boolean;
  theme?: Theme;
};
