/** @jsxImportSource @emotion/react */
import Image, { StaticImageData } from "next/image";
import styles from "@/styles/about.style";
import Scrolling, { ScrollingProps } from "@/components/shared/scrolling";

type Props = {
  image: StaticImageData;
  title: string;
  info: string;
  awards?: ScrollingProps["items"];
};

export default function Intro({ image, title, info, awards }: Props) {
  return (
    <section className="load-in py-12" css={styles}>
      <div className="container">
        <div className="intro">
          <div className="intro-wrapper">
            <div className="intro-content">
              <h3 className="intro-title">{title}</h3>
              <div
                className="intro-body"
                dangerouslySetInnerHTML={{
                  __html: info,
                }}
              />
            </div>
            <Image className="about-pic" src={image} alt="drpassy" />
          </div>
          {awards && (
            <div className="Awards">
              <h5 className="heading">Awards / Associations</h5>
              <Scrolling items={awards} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
