/** @jsxImportSource @emotion/react */
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cx } from "@emotion/css";
import Button from "@/components/shared/button/index.button";
import ButtonGroup from "@/components/shared/button/button-group";
import useActionButtons from "@/hooks/use-action-buttons";
import useStickyHeader from "@/hooks/use-sticky-header";
import { CartIcon } from "@/icons";
import styles from "@/styles/header.style";
import { useAppSelector } from "@/hooks/types";
import { selectCartItemsCount } from "@/redux/slices/cart.slice";
import { useTheme } from "@emotion/react";

const navItems = ["about", "books", "messages", "testimonies", "blog", "cart"];

export default function Header() {
  const isHeaderSticky = useStickyHeader();
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const headerButtons = useActionButtons();
  const cartItemsCount = useAppSelector(selectCartItemsCount);
  const { isDarkMode } = useTheme();

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
              sizes="100px"
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
                <Link
                  href={
                    item !== "testimonies"
                      ? `/${item}`
                      : {
                          pathname: "/",
                          query: {
                            target: item,
                          },
                        }
                  }
                  className="nav__list-item-link"
                >
                  {item}
                  {item === "cart" && (
                    <div className="flex items-center relative -top-1 ">
                      <span>
                        <CartIcon />
                      </span>
                      <span
                        className={cx(
                          {
                            "bg-black text-white": !isDarkMode,
                            "bg-white text-black": isDarkMode,
                          },
                          "absolute flex items-center justify-center -mt-4 -left-3 p-1 rounded-full w-4 h-4"
                        )}
                      >
                        {cartItemsCount}
                      </span>
                    </div>
                  )}
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
