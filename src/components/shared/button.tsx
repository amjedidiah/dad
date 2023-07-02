/** @jsxImportSource @emotion/react */
import { cx } from "@emotion/css";
import { ModalTitles } from "@/context/modal/types";
import { LinkIcon } from "@/icons";
import styles from "@/styles/button.style";

export type IButton = {
  key: string;
  outlined?: boolean;
  ["data-modal"]?: ModalTitles;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  value,
  outlined,
  className,
  ...rest
}: IButton) {
  return (
    <button
      css={styles}
      className={cx({ outline: outlined }, className)}
      {...rest}
    >
      <span className="text">{value}</span>
      <span className="icon">
        <LinkIcon />
      </span>
    </button>
  );
}
