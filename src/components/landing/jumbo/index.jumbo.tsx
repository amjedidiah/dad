/** @jsxImportSource @emotion/react */
import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { Link as ScrollLink } from "react-scroll";
import BouncingArrow from "@/components/landing/jumbo/bouncing-arrow";
import ButtonGroup from "@/components/shared/button/button-group";
import Scrolling from "@/components/shared/scrolling";
import useActionButtons from "@/hooks/use-action-buttons";
import { LinkIcon, StarIcon } from "@/icons";
import styles from "@/styles/jumbo.style";
import { Roles } from "@/utils/constants";

export type IRolesItems = {
  key: keyof typeof Roles;
  Component: FC;
};

const rolesItems = Object.keys(Roles).map((key) => ({
  key,
  Component: StarIcon,
})) as IRolesItems[];

export default function Jumbo() {
  const jumboButtons = useActionButtons();

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
              src="/images/icons/manifest-icon-512.png"
              alt="drpassy"
              width={500}
              height={500}
            />
          </div>
        </article>
        <article className="explore">
          <ScrollLink to="why-choose-him" smooth offset={-100}>
            <span className="theme-text">Explore</span>
            <BouncingArrow />
          </ScrollLink>
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
          <Scrolling items={rolesItems} />
        </footer>
      </div>
    </section>
  );
}
