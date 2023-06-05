/** @jsxImportSource @emotion/react */
import ButtonGroup from "@/components/button-group";
import { jumboButtons } from "./constants";
import styles from "@/styles/jumbo.style";
import Link from "next/link";
import { LinkIcon } from "@/icons";
import BouncingArrow from "./bouncing-arrow";
import ScrollingRoles from "./scrolling-roles";
import Image from "next/image";

export default function Jumbo() {
  return (
    <section css={styles}>
      <div className="container">
        <article className="top">
          <div>
            <h1 className="title">
              Looking for <span className="highlight">solution</span> to
              <span className="highlight"> long standing issues?</span>
            </h1>

            <ButtonGroup buttons={jumboButtons} />
          </div>
          <div className="image-container">
            <Image
              src="/images/512x512.png"
              alt="drpassy"
              width={400}
              height={400}
            />
          </div>
        </article>
        <article className="explore">
          <span className="theme-text">Explore</span>
          <br />
          <BouncingArrow />
        </article>
        <footer className="footer">
          <div className="name-container">
            <Link href="/about" className="about-link">
              <span className="about-name"> Dr. Passy Amaraegbu</span>
              <span className="theme-icon">
                <LinkIcon />
              </span>
            </Link>
            <p className="about-title">(D. Min, Ph.D)</p>
          </div>
          <ScrollingRoles />
        </footer>
      </div>
    </section>
  );
}
