import { Interpolation, Theme, css } from "@emotion/react";

const styles: Interpolation<Theme> = ({ breakpoints }) => css`
  .form {
    display: grid;
    row-gap: 1.5rem;

    button[type="submit"] {
      margin: 1.5rem 0 28px;
    }

    @media (min-width: ${breakpoints.md}px) {
      grid-template-columns: 1fr 1fr;
      column-gap: 2.5rem;
      grid-template-rows: auto auto auto;

      .group:nth-of-type(n + 3) {
        grid-column: 1 / 3;
      }
    }
  }

  .follow-us {
    justify-content: center;
  }
`;

export default styles;
