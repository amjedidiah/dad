import { Interpolation, Theme, css } from "@emotion/react";

const styles: Interpolation<Theme> = ({
  isDarkMode,
  colors: { black, white, secondGrey },
  breakpoints,
}) => css`
  display: flex;
  align-items: flex-end;
  gap: 2rem;
  flex-wrap: wrap;

  .title {
    width: fit-content;
    max-width: 21.75rem;
    color: ${isDarkMode ? white : black};
    font-size: 3rem;
    font-weight: 500;
    line-height: 100%;

    @media (min-width: ${breakpoints.md}px) {
      font-size: 4rem;
    }

    &.page-title {
      font-weight: 700;
      line-height: 93.75%;
      font-size: 4rem;
      max-width: unset;

      @media (min-width: ${breakpoints.md}px) {
        font-size: 8rem;
      }
    }
  }

  .extra-title {
    font-weight: 700;
    line-height: 104%;
    letter-spacing: 0.12rem;
    font-size: 3rem;
    color: ${isDarkMode ? black : white};
    text-shadow: ${!isDarkMode
      ? `-1px 1px 2px #000,
            1px 1px 2px #000,
            1px -1px 0 #000;
  -1px -1px 0 #000`
      : ` -1px 1px 2px #fff,
            1px 1px 2px #fff,
  1px -1px 0 #fff;
  -1px -1px 0 #fff`};

    @media (min-width: ${breakpoints.md}px) {
      font-size: 6rem;
    }
  }

  .sub-title {
    width: fit-content;
    max-width: 21.75rem;
    color: ${isDarkMode ? white : secondGrey};
    font-size: 1.25rem;
    line-height: 120%;
    letter-spacing: 0.4px;
    position: relative;
    top: -5px;
  }
`;

export default styles;
