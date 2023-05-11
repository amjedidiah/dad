/** @jsxImportSource @emotion/react */
import { LinkIcon } from "@/icons";
import styles from "@/styles/button.style";
import { cx } from "@emotion/css";

export type ButtonProps = {
  value: string;
  outlined?: boolean;
};

export default function Button({ value, outlined }: ButtonProps) {
  return (
    <button css={styles} className={cx({ outline: outlined })}>
      <span className="text">{value}</span>
      <span className="icon">
        <LinkIcon />
      </span>
    </button>
  );
}
