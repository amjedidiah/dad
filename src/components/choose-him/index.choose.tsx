/** @jsxImportSource @emotion/react */
//file imports
import { Grid } from "@/components/choose-him/constants";
import styles from "@/styles/choose.style";

export default function ChooseHim() {
  return (
    <article className="container main-container" css={styles}>
      <section>
        <div className="choose-header">
          <h2 className="theme-text">Why Choose Him</h2>
          <p className="theme-text">
            We have the best expertise person liquet nisi suspendisse at gravida{" "}
          </p>
        </div>
        <div className="choose-grid">
          {Grid.map(([Icon, header, item], index) => (
            <div key={index} className={`single-choose-grid`}>
              <div className="icon">
                <Icon />
              </div>
              <h3 className="theme-text">{header}</h3>
              <p className="theme-text"> {item}</p>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
