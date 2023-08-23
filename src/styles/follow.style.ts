import { Interpolation, Theme, css } from "@emotion/react";

const styles: Interpolation<Theme> = ({ isDarkMode, colors }) => css`
  display: flex;
  align-items: center;
  gap: 1rem;

  .text {
    color: ${isDarkMode ? colors.greyLighter : colors.secondGrey};
    line-height: 1rem;
  }

  .social-media-icons {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

export default styles;
