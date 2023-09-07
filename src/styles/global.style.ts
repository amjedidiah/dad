import { Interpolation, Theme, css } from "@emotion/react";

const globalStyles: Interpolation<Theme> = ({
  isDarkMode,
  colors: { black, white },
  font,
}) => css`
  @keyframes slide-fade-in {
    from {
      opacity: 0.3;
      transform: translateY(2rem);
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    .load-in > * {
      view-timeline-name: --item-timeline;
      animation: slide-fade-in both 0.5s ease-in-out;
      animation-timeline: --item-timeline;
      animation-range: cover 0% cover 50%;
    }
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    transition: all 0.15s ease-in-out;
  }

  html,
  body {
    font-family: ${font.style.fontFamily}, sans-serif;
    background: ${isDarkMode ? black : white};
    font-size: 14px;
  }

  a {
    text-decoration: none;

    &:hover {
      transform: scaleY(1.05);
    }
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
