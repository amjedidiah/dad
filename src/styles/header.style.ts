import { Interpolation, Theme, css } from "@emotion/react";

const styles: Interpolation<Theme> = ({
  isDarkMode,
  colors: { white, grey1, grey2, black },
  breakpoints,
}) => css`
  height: 8.5rem;
  background: ${isDarkMode ? black : white};

  &.sticky {
    position: sticky;
    top: 0;
    left: 0;
    z-index: 2;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.08);
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }

  .logo-container {
    display: inline-flex;
    align-items: center;
    gap: 1rem;

    .logo-container__logo {
      height: 4rem;
      width: 4rem;
      position: relative;
      border-radius: 50%;
      overflow: hidden;
    }

    .logo-container__title {
      color: ${isDarkMode ? white : grey1};
      font-weight: 500;
      line-height: 200%;
    }
  }

  .header-toggle {
    position: relative;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;

    &:before,
    &:after {
      position: absolute;
      top: 1.2rem;
      left: 0.75rem;
      content: "";
      width: 1.5rem;
      height: 2px;
      background: ${isDarkMode ? black : white};
      transform: none;
    }

    &:after {
      top: 1.5rem;
      width: 1.25rem;
    }

    @media (min-width: ${breakpoints.xl}px) {
      display: none;
    }

    &.open {
      z-index: 2;
      position: fixed;
      top: 2.75rem;
      right: clamp(2rem, 4.76%, 4.5rem);

      &:before {
        left: 0.75rem;
        top: 1.45rem;
        transform: rotate(45deg);
      }

      &:after {
        left: 0.625rem;
        top: 1.5rem;
        transform: rotate(-45deg);
        width: 1.5rem;
      }
    }
  }

  .nav {
    display: flex;

    position: fixed;
    left: 0;
    top: -100%;
    height: 100%;
    width: 100%;
    background: ${isDarkMode ? black : white};
    z-index: 1;
    opacity: 0;

    @media (min-width: ${breakpoints.xl}px) {
      position: unset;
      height: unset;
      width: unset;
      opacity: unset;
    }

    .nav__list {
      list-style: none;
      display: inline-flex;
      flex-direction: row;
      align-items: center;
      gap: 2rem;

      .nav__list-item {
        padding: 0.5rem;
        opacity: 0;
        transition: opacity 0s;

        @media (min-width: ${breakpoints.xl}px) {
          opacity: unset;
        }

        .nav__list-item-link {
          color: ${isDarkMode ? white : grey2};
          font-weight: 500;
          line-height: 200%;
          text-decoration: none;
          text-transform: capitalize;
          opacity: 0.75;
          position: relative;

          &:after {
            position: absolute;
            left: 0;
            bottom: -0.25rem;
            content: "";
            height: 2px;
            width: 0%;
            background: ${isDarkMode ? white : grey2};
          }

          &:hover {
            opacity: 1;

            &:after {
              width: 100%;
            }
          }
        }
      }
    }

    .action-buttons-container {
      gap: 1.5rem;
      margin-left: 2rem;

      &.show {
        display: inline-flex;
      }

      button {
        padding: 0.5rem 2rem;
        gap: 0.5rem;

        .text {
          font-size: 1rem;
          font-weight: 500;
        }
      }
    }

    @media (max-width: ${breakpoints.xl - 2}px) {
      &.show {
        top: 0;
        opacity: 1;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        gap: 2rem 5em;
        padding: 0 clamp(2rem, 4.76%, 4.5rem);

        .nav__list {
          flex-direction: column;
          align-items: flex-start;
          gap: 0.2rem;

          .nav__list-item {
            padding: 0;
            font-size: 200%;
            opacity: unset;

            .nav__list-item-link,
            .nav__list-item-link:visited,
            .nav__list-item-link:hover {
              line-height: 150%;
            }
          }
        }

        .button-container {
          min-width: 146px;

          .action-buttons-container {
            flex-direction: column;
            align-items: flex-start;
            margin-left: 0;
            gap: 0.75rem;
          }
        }
      }
    }
  }
`;

export default styles;
