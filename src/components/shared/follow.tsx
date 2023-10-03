/** @jsxImportSource @emotion/react */
import { FacebookIcon, InstagramIcon, LinkedInIcon } from "@/icons";
import styles from "@/styles/follow.style";

export default function Follow() {
  return (
    <div css={styles} className="follow-us">
      <p className="text theme-text">Follow Dr. Passy</p>
      <div className="social-media-icons">
        <a href="https://www.linkedin.com/in/dr-passy-amaraegbu-44060932/">
          <span className="theme-icon-fill">
            <LinkedInIcon />
          </span>
          <span className="hidden">Link to LinkedIn profile</span>
        </a>
        <a href="https://www.facebook.com/drpassy.official">
          <span className="theme-icon-fill">
            <FacebookIcon />
          </span>
          <span className="hidden">Link to Facebook profile</span>
        </a>
        <a href="https://www.instagram.com/drpassyofficial/">
          <span className="theme-icon-fill">
            <InstagramIcon />
          </span>
          <span className="hidden">Link to Instagram profile</span>
        </a>
      </div>
    </div>
  );
}
