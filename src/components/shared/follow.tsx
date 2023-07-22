/** @jsxImportSource @emotion/react */
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
} from "@/icons";
import styles from "@/styles/follow.style";

export default function Follow() {
  return (
    <div css={styles} className="follow-us">
      <p className="text theme-text">Follow Dr. Passy</p>
      <div className="social-media-icons">
        <span className="theme-icon-fill">
          <LinkedInIcon />
        </span>
        <span className="theme-icon-fill">
          <TwitterIcon />
        </span>
        <span className="theme-icon-fill">
          <FacebookIcon />
        </span>
        <span className="theme-icon-fill">
          <InstagramIcon />
        </span>
      </div>
    </div>
  );
}
