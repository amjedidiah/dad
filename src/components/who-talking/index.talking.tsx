/** @jsxImportSource @emotion/react */

import styles from "@/styles/talking.style";
import Image from "next/image";
import { LogoNames } from "./constants";

const TalkingSection = () => {
  return (
    <article className="" css={styles}>
      <section className="container">
        <div className="talking-header">
          <h2 className="theme-text">Who’s Talking</h2>
          <p className="theme-text">
            We have the best expertise person liquet nisi suspendisse at gravida{" "}
          </p>
        </div>
        <div className="twitter-grid">
          {Array.from({ length: 4 }).map((_, i) => (
            <ul key={i} className={`twitter-grid-card`}></ul>
          ))}
        </div>
      </section>
    </article>
  );
};

export default TalkingSection;
