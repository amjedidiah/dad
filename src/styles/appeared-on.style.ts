import { Interpolation, Theme, css } from "@emotion/react";

const styles: Interpolation<Theme> = ({ breakpoints }) => css`
  padding: 4.5rem 0 2.5rem;

  .container {
    display: flex;
    align-items: center;
    gap: clamp(3rem, 12%, 12rem);
    flex-wrap: wrap;
    font-weight: 700;
    overflow: hidden;
  }

  .theme-text {
    font-size: 2rem;
    font-weight: 500;
    line-height: 120%;

    @media (min-width: ${breakpoints.md}px) {
      font-size: 2.5rem;
    }
  }

  .child {
    display: flex;
    align-items: center;

    &:nth-of-type(1) .scroll-image-container {
      width: 100px;
      height: 92px;

      @media (min-width: ${breakpoints.md}px) {
        width: 116px;
        height: 106px;
      }
    }
    &:nth-of-type(2) .scroll-image-container {
      width: 322px;
      height: 59px;

      @media (min-width: ${breakpoints.md}px) {
        width: 373px;
        height: 68px;
      }
    }
    &:nth-of-type(3) .scroll-image-container {
      width: 169px;
      height: 87px;

      @media (min-width: ${breakpoints.md}px) {
        width: 195px;
        height: 100px;
      }
    }
  }

  .scroll-item {
    margin: 0 clamp(1.5rem, 7%, 7rem);
  }
`;

export default styles;
