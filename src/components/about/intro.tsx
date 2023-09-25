/** @jsxImportSource @emotion/react */
import Image, { StaticImageData } from "next/image";
import Button, { ButtonProps } from "@/components/shared/button";
import purity from "../../../public/images/purity.png";
import { AudiomackIcon, SpotifyIcon, YoutubeMusicIcon } from "@/icons";
import styles from "../../styles/about.style";
import Scrolling from "../shared/scrolling";
import { StreamTitles } from "./constants";
import { FC, useMemo } from "react";

export type IStreamsItems = {
  key: keyof typeof StreamTitles;
  Component: FC;
};

export default function Intro(props: {
  title: string;
  para1: string;
  para2: string;
  intro: string;
  showAwards: boolean;
  image: StaticImageData;
}) {
  const { title, para1, para2, showAwards, intro, image } = props;

  const streamTitles = useMemo(
    () =>
      Object.keys(StreamTitles).map((key) => ({
        key,
        Component:
          {
            [StreamTitles.Audiomack]: AudiomackIcon,
            [StreamTitles.Spotify]: SpotifyIcon,
          }[key] || YoutubeMusicIcon,
      })),
    []
  ) as IStreamsItems[];
  return (
    <section css={styles}>
      <div className="intro">
        <div className={intro}>
          <div className="intro-content">
            <h4>{title}</h4>
            <h6>Summary</h6>
            <div>
              <p>{para1}</p>
              <br />
              <p>{para2}</p>
            </div>
            <Button
              className="rounded lg"
              outlined={true}
              value="Learn More"
              key="Learn more"
            />
          </div>
          <Image
            className="about-pic"
            src={image}
            alt="drpassy"
            // width={400}
            // height={600}
          />
        </div>
        {showAwards && (
          <div className="Awards">
            <h5>Awards/Associations</h5>
            <Scrolling items={streamTitles} />
          </div>
        )}
      </div>
    </section>
  );
}
