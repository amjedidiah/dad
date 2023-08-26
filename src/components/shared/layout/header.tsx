/** @jsxImportSource @emotion/react */
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cx } from "@emotion/css";
import Button, { IButton } from "@/components/shared/button/index.button";
import ButtonGroup from "@/components/shared/button/button-group";
import useActionButtons from "@/hooks/use-action-buttons";
import useStickyHeader from "@/hooks/use-sticky-header";
import styles from "@/styles/header.style";

const navItems = ["about", "books", "podcasts", "testimonies", "blog", "cart"];

export default function Header() {
  const isHeaderSticky = useStickyHeader();
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const headerButtons = useActionButtons({
    className: "action-button",
  } as IButton);

  const toggleNavbar = () => setIsNavbarOpen((prev) => !prev);

  return (
    <header id="header" css={styles} className={cx({ sticky: isHeaderSticky })}>
      <div className="container">
        <Link href="/" className="logo-container">
          <div className="logo-container__logo">
            <Image
              src="/images/512x512.png"
              alt="logo"
              className="logo-container__logo"
              fill
            />
          </div>
          <p className="logo-container__title">Dr Passy Amaraegbu</p>
        </Link>
        <Button
          key="header-toggle"
          className={cx("header-toggle rounded", { open: isNavbarOpen })}
          onClick={toggleNavbar}
          noIcon
        />
        <nav className={cx("nav", { show: isNavbarOpen })}>
          <ul className="nav__list">
            {navItems.map((item) => (
              <li key={item} className="nav__list-item">
                <Link href={`/${item}`} className="nav__list-item-link">
                  {item}
                </Link>
              </li>
            ))}
          </ul>

          <div className="button-container">
            <ButtonGroup
              className="action-buttons-container"
              buttons={headerButtons}
            />
          </div>
        </nav>
      </div>
    </header>
  );
}