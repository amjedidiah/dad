/** @jsxImportSource @emotion/react */
import Scrolling from "@/components/shared/scrolling";
import styles from "@/styles/appeared-on.style";

const images = [
  { key: "channels", imageLink: "/images/channels.png" },
  { key: "the-guardian", imageLink: "/images/the-guardian.png" },
  { key: "nta", imageLink: "/images/nta.png" },
];

export default function AppearedOn() {
  return (
    <section css={styles} className="load-in">
      <div className="container">
        <p className="theme-text">APPEARED ON</p>
        <Scrolling items={images} />
      </div>
    </section>
  );
}
