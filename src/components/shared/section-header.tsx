/** @jsxImportSource @emotion/react */
import styles from "@/styles/section-header.style";
import { cx } from "@emotion/css";

type Props = {
  title: string;
  extraTitle?: string;
  subtitle?: string;
  pageTitle?: boolean;
};

export default function SectionHeader({
  title,
  extraTitle,
  subtitle,
  pageTitle = false,
}: Props) {
  return (
    <header className="section-header" css={styles}>
      <h2
        className={cx(
          {
            "page-title": pageTitle,
            "me-4": !!extraTitle,
          },
          "title"
        )}
      >
        {title}
      </h2>
      {extraTitle && <h2 className="extra-title">{extraTitle}</h2>}

      <p className="sub-title">{subtitle}</p>
    </header>
  );
}
