/** @jsxImportSource @emotion/react */
import styles from "@/styles/layout.style";
import { IComponentWithChildren } from "@/utils/types";
import ModeSwitch from "@/components/shared/mode-switch";

export default function Layout({ children }: IComponentWithChildren) {
  return (
    <main css={styles}>
      <div id="top" />
      {children}
      <ModeSwitch />
    </main>
  );
}
