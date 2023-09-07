/** @jsxImportSource @emotion/react */
import { Fragment } from "react";
import { cx } from "@emotion/css";
import Loading from "@/components/shared/loading";
import { ModalTitles } from "@/context/modal/types";
import { LinkIcon } from "@/icons";
import styles from "@/styles/button.style";

export type IButton = {
  key: string;
  outlined?: boolean;
  ["data-modal"]?: ModalTitles;
  isLoading?: boolean;
  notGrow?: boolean;
  noIcon?: boolean;
  Icon?: React.FC;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  value,
  outlined,
  className,
  isLoading,
  notGrow,
  noIcon,
  Icon,
  ...rest
}: IButton) {
  return (
    <button
      css={styles}
      className={cx({ outlined, expand: !notGrow }, className)}
      {...rest}
    >
      {!isLoading ? (
        <Fragment>
          <span className="text">{value}</span>
          {!noIcon && !Icon && (
            <span className="icon">
              <LinkIcon />
            </span>
          )}
          {Icon && (
            <span className="icon">
              <Icon />
            </span>
          )}
        </Fragment>
      ) : (
        <Loading />
      )}
    </button>
  );
}
