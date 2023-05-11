import { Interpolation, Theme, css } from "@emotion/react";

const styles: Interpolation<Theme> = ({ breakpoints }) => css`
  .container {
    width: 100%;
    max-width: 1376px;
    margin: 0 auto;
    padding: 0 clamp(2rem, 4.76%, 4.5rem);

    @media (min-width: ${breakpoints.laptopL}px) {
      padding: 0;
    }
  }
`;

export default styles;
