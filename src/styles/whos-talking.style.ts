import { Interpolation, Theme, css } from "@emotion/react";

const styles: Interpolation<Theme> = css`
  padding: 4.5rem 0 0;

  .container {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
  }
`;

export default styles;
