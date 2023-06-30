/** @jsxImportSource @emotion/react */
import { cx } from "@emotion/css";
import { ModalTitles } from "@/context/modal/types";
import { LinkIcon } from "@/icons";
import styles from "@/styles/button.style";

export type ButtonProps = {
  key: string;
  outlined?: boolean;
  ["data-modal"]?: ModalTitles;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ value, outlined, ...rest }: ButtonProps) {
  return (
    <button css={styles} className={cx({ outline: outlined })} {...rest}>
      <span className="text">{value}</span>
      <span className="icon">
        <LinkIcon />
      </span>
    </button>
  );
}
