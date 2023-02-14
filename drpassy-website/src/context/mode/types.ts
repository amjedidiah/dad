export type Mode = "light" | "dark";

export type ModeContextType = {
  toggleMode: () => void;
  isDarkMode: boolean;
};
