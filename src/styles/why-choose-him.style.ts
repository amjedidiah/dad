import { Interpolation, Theme, css } from "@emotion/react";

const styles: Interpolation<Theme> = ({
  isDarkMode,
  colors: { black, white, grey1, grey2, greyLighter },
  breakpoints,
}) =>
  css`
    padding: 4.5rem 0;

    .container {
      display: flex;
      flex-direction: column;
      gap: 3rem;

      @media (min-width: ${breakpoints.md}px) {
        gap: 6rem;
      }
    }

    .selling-point-list {
      list-style: none;
      display: grid;
      gap: 2.5rem;

      @media (min-width: ${breakpoints.md}px) {
        display: flex;
        justify-content: space-between;
      }
    }

    .selling-point-item {
      display: grid;
      gap: 1.5rem;

      .selling-point-icon {
        width: 4rem;
        height: 4rem;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        border-radius: 0.5rem;
        background: ${isDarkMode ? grey1 : greyLighter};

        @media (min-width: ${breakpoints.md}px) {
          width: 6rem;
          height: 6rem;
        }
      }

      .selling-point-title {
        color: ${isDarkMode ? white : black};
        font-size: 1.75rem;
        font-weight: 500;
        line-height: 100%;
        flex-grow: 1;

        @media (min-width: ${breakpoints.md}px) {
          font-size: 2rem;
        }
      }

      .selling-point-description {
        color: ${isDarkMode ? white : grey2};
        line-height: 150%;
        letter-spacing: 0.32px;
      }
    }
  `;

export default styles;
