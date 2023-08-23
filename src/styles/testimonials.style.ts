import { Interpolation, Theme, css } from "@emotion/react";

const styles: Interpolation<Theme> = ({
  isDarkMode,
  colors: { greyLighter, secondGrey, white, black },
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
    width: 3rem;
    height: 0.5rem;
    border-radius: 0;
  }

  .testimonial {
    display: flex;
    width: 100%;
    max-width: 382px;
    padding: 3rem 1rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 6.875rem;
    border: 1px solid ${secondGrey};
    background: ${isDarkMode ? black : white};

    .description {
      text-align: center;
      font-size: 1.25rem;
      line-height: 160%;
      letter-spacing: 0.4px;
    }

    .author {
      display: flex;
      align-items: center;
      gap: 1rem;

      .image {
        width: 4.5rem;
        height: 4.5rem;
        border-radius: 50%;
        position: relative;
        border: 1px solid ${greyLighter};
        overflow: hidden;
      }

      .name {
        font-size: 1.25rem;
        font-weight: 500;
        line-height: 120%;
        margin-bottom: 0.25rem;
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
