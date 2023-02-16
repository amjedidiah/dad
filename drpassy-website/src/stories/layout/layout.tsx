import { Fragment } from "react";
import ThemeSwitch from "../theme-switch/theme-switch";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Fragment>
      {children}
      <ThemeSwitch />
    </Fragment>
  );
}
