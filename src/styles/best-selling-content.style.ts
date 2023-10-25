import { Interpolation, Theme, css } from "@emotion/react";

const styles: Interpolation<Theme> = ({ breakpoints }) => css`
  .content-button-group {
    button {
      display: flex;
      padding: 0.75rem 1.5rem;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      width: 100%;

      @media (min-width: ${breakpoints.lg}px) {
        padding: 1rem 2rem;
        width: auto;
      }
    }
  }
`;

export default styles;
