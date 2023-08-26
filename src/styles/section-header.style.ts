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
