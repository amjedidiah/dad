import { Interpolation, Theme, css } from "@emotion/react";

const globalStyles: Interpolation<Theme> = ({
  isDarkMode,
  colors: { black, white },
  font,
}) => css`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    transition: all 0.2s ease-in-out;
  }

  html,
  body {
    font-family: ${font.style.fontFamily}, sans-serif;
    background: ${isDarkMode ? black : white};
    font-size: 14px;
  }

  a {
    text-decoration: none;
  }

  .theme-bg {
    background: ${isDarkMode ? black : white};
  }

  .theme-icon svg,
  .theme-icon svg path {
    stroke: ${isDarkMode ? white : black};
  }

  .theme-icon-fill svg,
  .theme-icon-fill svg path {
    stroke: ${isDarkMode ? white : black};
    fill: ${isDarkMode ? white : black};
  }

  .theme-text {
    color: ${isDarkMode ? white : black};
  }

  @media (min-width: 768px) {
    body,
    html {
      font-size: 16px;
    }
  }
`;

export default globalStyles;
