import { Interpolation, Theme, css } from "@emotion/react";

const styles: Interpolation<Theme> = ({
  isDarkMode,
  colors: { greyLighter, secondGrey, white, black },
  breakpoints,
}) => css`
  .swiper {
    overflow-y: visible;
  }

  .swiper-pagination {
    bottom: -26px;
    width: 100%;
  }

  .swiper-pagination-bullet {
    background: ${isDarkMode ? white : black};
    width: 2rem;
    height: 0.25rem;
    border-radius: 0;

    @media (min-width: ${breakpoints.md}px) {
      width: 3rem;
      height: 0.5rem;
    }
  }

  .testimonial {
    display: flex;
    width: 100%;
    max-width: 382px;
    padding: 3rem 1rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2.5rem;
    border: 1px solid ${secondGrey};
    background: ${isDarkMode ? black : white};

    @media (min-width: ${breakpoints.md}px) {
      gap: 6.875rem;
    }

    .description {
      text-align: center;
      line-height: 160%;
      letter-spacing: 0.4px;

      @media (min-width: ${breakpoints.md}px) {
        font-size: 1.25rem;
      }
    }

    .author {
      display: flex;
      align-items: center;
      gap: 1rem;

      .image {
        width: 3.5rem;
        height: 3.5rem;
        border-radius: 50%;
        position: relative;
        border: 1px solid ${greyLighter};
        overflow: hidden;

        @media (min-width: ${breakpoints.md}px) {
          width: 4.5rem;
          height: 4.5rem;
        }
      }

      .name {
        font-weight: 500;
        line-height: 120%;
        margin-bottom: 0.25rem;

        @media (min-width: ${breakpoints.md}px) {
          font-size: 1.25rem;
        }
      }

      .title {
        color: ${isDarkMode ? white : secondGrey};
        font-weight: 500;
        line-height: 112.5%;
      }
    }
  }
`;

export default styles;
