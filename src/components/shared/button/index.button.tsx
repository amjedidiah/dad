/** @jsxImportSource @emotion/react */
import { Fragment, forwardRef, useContext, useMemo } from "react";
import { cx } from "@emotion/css";
import Loading from "@/components/shared/loading";
import { ModalTitles } from "@/context/modal/types";
import { LinkIcon } from "@/icons";
import styles from "@/styles/button.style";
import { ModalContext } from "@/context/modal/modal.context";

export type IButton = {
  key: string;
  outlined?: boolean;
  ["data-modal"]?: ModalTitles;
  isLoading?: boolean;
  notGrow?: boolean;
  noIcon?: boolean;
  Icon?: React.FC;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default forwardRef<HTMLButtonElement, IButton>(function Button(
  { value, outlined, className, isLoading, notGrow, noIcon, Icon, ...rest },
  ref
) {
  const { toggleModal } = useContext(ModalContext);
  rest.onClick = useMemo(() => {
    if (rest["data-modal"]) return () => toggleModal(rest["data-modal"]);
    return rest.onClick;
  }, [rest, toggleModal]);

  return (
    <button
      css={styles}
      className={cx({ outlined, expand: !notGrow }, className)}
      ref={ref}
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
});
