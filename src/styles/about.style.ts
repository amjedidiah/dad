import { Interpolation, Theme, css } from "@emotion/react";

const styles: Interpolation<Theme> = ({
  isDarkMode,
  colors: { white, secondGrey, black },
  breakpoints,
}) => css`
  &:nth-of-type(2n) {
    background-color: ${black};

    .Awards {
      color: ${white};
    }
  }

  &:nth-of-type(2n + 1) {
    .intro-content {
      color: ${isDarkMode ? white : black};
    }

    @media (min-width: ${breakpoints.md}px) {
      .intro-wrapper {
        grid-template-columns: auto, 1fr;
        direction: rtl;
      }

      .intro-content {
        text-align: left;
      }
    }
  }

  .intro {
    padding: 1.5rem;
    border: 1px solid ${secondGrey};
  }

  .intro-wrapper {
    display: grid;
    align-items: center;
    justify-content: space-between;
    gap: 4rem;

    @media (min-width: ${breakpoints.md}px) {
      grid-template-columns: 1fr auto;
    }
  }

  .intro-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    padding: 2rem 0;
    gap: 1rem;
    color: ${white};
  }

  .intro-title {
    font-weight: 500;
    font-size: 3rem;
    line-height: 100%;

    @media (min-width: ${breakpoints.md}px) {
      font-size: 4rem;
    }
  }

  .intro-body {
    display: grid;
    gap: 1.5rem;
    line-height: 150%;
    letter-spacing: 0.02rem;

    h4 {
      font-size: 1.25rem;
      line-height: 120%;
      font-weight: 500;
    }
  }

  .about-pic {
    width: 24rem;
    height: auto;
  }

  .Awards {
    display: flex;
    flex-wrap: wrap;
    max-width: 100%;
    overflow: hidden;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 0 1.5rem 1.5rem;
    color: ${isDarkMode ? white : black};
    gap: 1.5rem 5rem;
    font-size: 1.5rem;
    text-transform: capitalize;

    .heading {
      font-weight: 700;
      line-height: 133.333%;
    }

    .scroll-item {
      font-weight: 500;
      line-height: 100%;
    }
  }
`;

export default styles;
