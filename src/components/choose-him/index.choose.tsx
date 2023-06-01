/** @jsxImportSource @emotion/react */
import Image from "next/image";
import Link from "next/link";
//file imports
import { Grid } from "./constants";
import styles from "@/styles/choose.style";

export default function ChooseHim() {
  return (
    <article className="container" css={styles}>
      <section>
        <div className="choose-header">
          <h2>Why Choose Him</h2>
          <p>
            We have the best expertise person liquet nisi suspendisse at gravida{" "}
          </p>
        </div>
        <div className="choose-grid">
          {Grid.map(([Icon, header, item], index) => (
            <div key={index} className={`single-choose-grid`}>
              <div className="icon">
                <Icon />
              </div>
              <h3>{header}</h3>
              <p> {item}</p>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
