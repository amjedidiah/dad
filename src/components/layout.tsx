/** @jsxImportSource @emotion/react */
import styles from "@/styles/layout.style";
import { IComponentWithChildren } from "@/utils/types";

export default function Layout({ children }: IComponentWithChildren) {
  return <main css={styles}>{children}</main>;
}
