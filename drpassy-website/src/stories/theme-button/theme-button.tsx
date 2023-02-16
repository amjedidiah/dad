import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import StraightIcon from "@mui/icons-material/Straight";
import { useContext, useMemo } from "react";
import cls from "classnames";
import { ModeButton } from "./theme-button.style";
import { ModeContext } from "@/context/mode/mode.context";

type ThemeButtonProps = {
  isSwitch?: boolean;
};

export default function ThemeButton({ isSwitch }: ThemeButtonProps) {
  const { isDarkMode, toggleMode } = useContext(ModeContext);

  const IconToShow = useMemo(() => {
    if (isSwitch) return isDarkMode ? DarkModeIcon : LightModeIcon;

    return StraightIcon;
  }, [isDarkMode, isSwitch]);

  const handleOnClick = useMemo(
    () => (isSwitch ? toggleMode : () => {}),
    [toggleMode, isSwitch]
  );

  return (
    <ModeButton
      className={cls({ "is-dark-mode": isDarkMode })}
      onClick={handleOnClick}
    >
      <IconToShow />
    </ModeButton>
  );
}
