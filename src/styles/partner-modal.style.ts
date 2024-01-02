import { Interpolation, Theme, css } from "@emotion/react";

const styles: Interpolation<Theme> = ({
  breakpoints,
  isDarkMode,
  colors: { white, grey1 },
}) => css`
  width: 1068px;

  .container-ministries {
    column-gap: 4rem;
    row-gap: 1.5rem;
    margin-top: 19px;

    display: grid;
    align-items: center;
    overflow-x: hidden;

    @media (min-width: ${breakpoints.sm}px) {
      grid-template-columns: auto auto;
    }

    .sub-title {
      font-size: 2.25rem;
      font-weight: 500;
      line-height: 2rem;
    }

    .scroll-item {
      margin: 0 1rem;
      text-transform: capitalize;
      color: ${isDarkMode ? white : grey1};
      font-size: 1.5rem;
      line-height: 1.5rem;
      font-weight: 500;
    }
  }

  .container-partner {
    display: grid;
    gap: 4.75rem;
    align-items: center;
    grid-template-columns: calc(100% - 0rem);
    margin: 4.75rem 0;

    ${process.env.NODE_ENV === "development" &&
    css`
      @media (min-width: ${breakpoints.lg}px) {
        grid-template-columns: 596px auto;
      }
    `}

    .sub-title {
      font-size: 1.5rem;
      font-weight: 500;
      line-height: 2rem;
      margin-bottom: 1.5rem;
    }

    .child-partner-logos {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 4.125rem;
      flex: 1 0 316px;
      padding: 2rem;
      text-align: center;

      ${process.env.NODE_ENV === "development" &&
      css`
        @media (min-width: ${breakpoints.lg}px) {
          grid-column: 2 / 3;
          grid-row: 1 / 2;
        }
      `}

      .container-partner-logos {
        gap: 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;

        .child-partner-logo {
          background: ${white};
          display: inline-flex;
          align-items: center;
          justify-content: center;
          max-width: 210px;
        }
      }
    }

    .child-partner-testimonials {
      @media (min-width: ${breakpoints.lg}px) {
        grid-column: 1 / 2;
        grid-row: 1 / 2;
      }
    }
  }
`;

export default styles;
