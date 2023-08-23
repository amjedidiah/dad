import { Interpolation, Theme, css } from "@emotion/react";

const styles: Interpolation<Theme> = ({ breakpoints, isDarkMode }) => css`
  &[open] {
    width: 100%;
    height: 100%;
    background: ${isDarkMode
      ? "rgba(255, 255, 255, 0.05)"
      : "rgba(26, 26, 26, 0.2)"};
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;

    .modal-body {
      max-width: 100%;
      margin: 0 auto;
      padding: 1.5rem clamp(2rem, 4.76%, 4.5rem);
      max-height: 90vh;
      overflow-y: scroll;

      &.full {
        width: 100%;
      }
    }

    .modal-title {
      font-weight: 700;
      font-size: 3rem;
      line-height: 117%;
      margin-bottom: 2.5rem;
    }
  }
`;

export default styles;
