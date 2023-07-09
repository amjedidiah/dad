/** @jsxImportSource @emotion/react */
import { useContext, useMemo, FC } from "react";
import Image from "next/image";
import Link from "next/link";
import BouncingArrow from "@/components/landing/jumbo/bouncing-arrow";
import {
  JumboButtonKeys,
  Roles,
  jumboButtons,
} from "@/components/landing/jumbo/constants";
import Scrolling from "@/components/shared/scrolling";
import ButtonGroup from "@/components/shared/button-group";
import { ModalContext } from "@/context/modal/modal.context";
import useMobileDetect from "@/hooks/use-mobile-detect";
import { LinkIcon, StarIcon } from "@/icons";
import styles from "@/styles/jumbo.style";
import { Features, features } from "@/utils/features.utils";

export type IRolesItems = {
  key: keyof typeof Roles;
  Component: FC;
};

export default function Jumbo() {
  const { toggleModal } = useContext(ModalContext);
  const { isMobile } = useMobileDetect();

  const updatedJumboButtons = useMemo(
    () =>
      jumboButtons.map((button) => {
        return {
          ...button,
          onClick: () => {
            if (button.key === JumboButtonKeys.contact) {
              if (isMobile || !features[Features.Mail].status)
                return window.open(
                  `tel:${process.env.NEXT_PUBLIC_CONTACT_NUMBER}`
                );
            }

            return toggleModal(button["data-modal"]);
          },
          className: "rounded lg",
        };
      }),
    [toggleModal, isMobile]
  );

  const rolesItems = useMemo(
    () =>
      Object.keys(Roles).map((key) => ({
        key,
        Component: StarIcon,
      })),
    []
  ) as IRolesItems[];

  return (
    <section css={styles}>
      <div className="container">
        <article className="top">
          <div>
            <h1 className="title">
              Looking for <span className="highlight">solution</span> to
              <span className="highlight"> long standing issues?</span>
            </h1>

            <ButtonGroup buttons={updatedJumboButtons} />
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
          <Scrolling items={rolesItems} speed={100} />
        </footer>
      </div>
    </section>
  );
}
