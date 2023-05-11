import { createContext } from "react";
import { ModeContextType } from "./types";

export const ModeContext = createContext<ModeContextType>({
  toggleMode: () => {},
  isDarkMode: false,
  theme: undefined,
});
