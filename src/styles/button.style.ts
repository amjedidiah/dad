import { Interpolation, Theme, css } from "@emotion/react";

const styles: Interpolation<Theme> = ({
  isDarkMode,
  colors: { black, white },
  breakpoints,
}) => css`
  display: flex;
  padding: 0.5rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  background: ${isDarkMode ? white : black};
  color: ${isDarkMode ? black : white};
  border: 1px solid ${isDarkMode ? white : black};
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
  }

  .text {
    font-size: 1rem;
  }

  .icon svg,
  .icon svg path {
    stroke: ${isDarkMode ? black : white};
  }

  &.rounded {
    border-radius: 0.5rem;
  }

  &.bold {
    font-weight: 500;
  }

  &.full {
    width: 100%;
  }

  &.lg {
    padding: 1rem 2rem;
    @media (min-width: ${breakpoints.md}px) {
      padding: 1rem 3rem;
    }

    .text {
      font-size: 1.2rem;
      line-height: 133%;

      @media (min-width: ${breakpoints.md}px) {
        font-size: 1.5rem;
      }
    }
  }

  &.outline {
    background: transparent;
    color: ${isDarkMode ? white : black};
    border-color: ${isDarkMode ? white : black};

    .icon svg,
    .icon svg path {
      stroke: ${isDarkMode ? white : black};
    }
  }
`;

export default styles;
