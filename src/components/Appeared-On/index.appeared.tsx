/** @jsxImportSource @emotion/react */

import styles from "@/styles/talking.style";
import Image from "next/image";
import { LogoNames } from "@/components/Appeared-On/constants";

const AppearedOn = () => {
  return (
    <article className="" css={styles}>
      <section className="container">
        <div className="appeared-on">
          <h2>APPEARED ON</h2>
          <div>
            {LogoNames.map(([name, width], index) => (
              <Image
                src={`/images/${name}.png`}
                alt="drpassy"
                width={width}
                height={100}
                key={index}
              />
            ))}
          </div>
        </div>
      </section>
    </article>
  );
};

export default AppearedOn;
