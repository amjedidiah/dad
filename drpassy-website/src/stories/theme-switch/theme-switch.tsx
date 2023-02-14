import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useContext, useMemo } from "react";
import cls from "classnames";
import { ModeButton } from "./theme-switch.style";
import { ModeContext } from "@/context/mode/mode.context";

export default function ThemeSwitch() {
  const context = useContext(ModeContext);

  const IconToShow = useMemo(
    () => (context.isDarkMode ? DarkModeIcon : LightModeIcon),
    [context.isDarkMode]
  );

  return (
    <ModeButton
      className={cls({ "is-dark-mode": context.isDarkMode })}
      onClick={context.toggleMode}
    >
      <IconToShow />
    </ModeButton>
  );
}
