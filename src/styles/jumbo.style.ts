import { Interpolation, Theme, css } from "@emotion/react";

const styles: Interpolation<Theme> = ({
  isDarkMode,
  colors: { white, grey2, black },
  breakpoints,
}) => css`
  padding: 75px 0;

  .top {
    display: grid;
    align-items: center;

    @media (min-width: ${breakpoints.lgx}px) {
      grid-template-columns: 3fr 450px;
    }

    .image-container {
      display: none;
      border-radius: 50%;
      border: 10px solid ${isDarkMode ? grey2 : black};
      overflow: hidden;

      @media (min-width: ${breakpoints.lgx}px) {
        display: block;
      }

      img {
        margin-top: 3rem;
        position: relative;
        left: -2%;
      }
    }
  }

  .title {
    font-weight: 700;
    font-size: 4rem;
    line-height: 114%;
    color: ${grey2};
    margin-bottom: 2.5rem;

    .highlight {
      color: ${isDarkMode ? white : black};
    }

    @media (min-width: ${breakpoints.md}px) {
      font-size: 5.5rem;
      margin-bottom: 4rem;
      max-width: 794px;
    }
  }

  .explore {
    text-align: center;
    margin: 4rem 0;
    cursor: pointer;

    a {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      width: fit-content;
      margin: 0 auto;
    }

    .theme-text {
      display: block;
      font-weight: 500;
      line-height: 175%;
    }

    @media (min-width: ${breakpoints.md}px) {
      max-width: 447px;
    }
  }

  .footer {
    display: flex;
    align-items: center;
    gap: clamp(3rem, 12%, 12rem);
    flex-wrap: wrap;
    font-weight: 700;
    overflow: hidden;

    .name-container {
      font-size: 1.5rem;
      line-height: 117%;

      .about-link {
        display: flex;
        align-items: center;
        margin-bottom: 1rem;
        gap: 0.8rem;

        .about-name {
          color: ${isDarkMode ? white : black};
        }
      }

      .about-title {
        color: ${grey2};
      }
    }

    .scroll-item {
      margin: 0 clamp(1.5rem, 6%, 6rem);
      text-transform: uppercase;
      color: ${grey2};
      font-size: 2.25rem;
      line-height: 133%;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  }
`;

export default styles;
