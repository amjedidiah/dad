/** @jsxImportSource @emotion/react */
import styles from "@/styles/section-header.style";

type Props = {
  title: string;
  subtitle: string;
};

export default function SectionHeader({ title, subtitle }: Props) {
  return (
    <header className="section-header" css={styles}>
      <h2 className="title">{title}</h2>
      <p className="sub-title">{subtitle}</p>
    </header>
  );
}
