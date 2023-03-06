import useScrollPosition from "@/hooks/use-scroll-position/use-scroll-position";
import { Box } from "@mui/material";
import { Fragment } from "react";
import { Link } from "react-scroll";
import ThemeButton from "../theme-button/theme-button";
import { ModeButtonGroup } from "../theme-button/theme-button.style";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { showGoToTop } = useScrollPosition();

  return (
    <Fragment>
      <Box id="top" />
      {children}
      <ModeButtonGroup>
        {showGoToTop && (
          <Link to="top" smooth>
            <ThemeButton />
          </Link>
        )}
        <ThemeButton isSwitch />
      </ModeButtonGroup>
    </Fragment>
  );
}
