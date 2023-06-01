/** @jsxImportSource @emotion/react */
import Image from "next/image";
import Link from "next/link";
//file import
import styles from "@/styles/navbar.style";
import { Links,jumboButtons } from "./constants";
import ButtonGroup from "../button-group";
export default function Navbar() {
  return (
    <div css={styles}>
      <section className="container">
        <div className="nav-container">
          <div className="picture-container">
            <div className="image-container">
              <Image
                src="/images/512x512.png"
                alt="drpassy"
                width={70}
                height={70}
              />
            </div>
            <p className="link">Dr. Passy Amaraegbu</p>
          </div>

          <nav className="">
            {Links.map(([name, link], index) => (
              <Link href={`${link}`} key={index}>
                <span className="link">{name}</span>
              </Link>
            ))}
          </nav>
          <div className="button-group">
            <ButtonGroup buttons={jumboButtons}/>
          </div>
        </div>
      </section>
    </div>
  );
}
