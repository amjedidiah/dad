import { Interpolation, Theme, css } from "@emotion/react";

const styles: Interpolation<Theme> = ({
  isDarkMode,
  colors: { white, grey2, black, lightGrey },
  breakpoints,
}) => css`
  .talking-header {
    display: flex;
    align-items: end;
    gap: 10px;
    padding: 30px 0;
    margin-bottom: 20px;
    margin-top: 20px;
    @media (max-width: ${breakpoints.sm}px) {
        flex-direction: column;
    }
    h2 {
      font-size: 64px;
      font-weight: 500;
      width: 206px;
      @media (max-width: ${breakpoints.sm}px) {
        font-size: 40px;
        width: 100%;
        }
    }
    p {
      font-weight: 400;
      font-size: 20px;
      width: 348px;
      font-style: normal;
      font-weight: 400;
      font-size: 20px;
      line-height: 24px;
      letter-spacing: 0.02em;
      color: ${isDarkMode ? black : "#808080 "};
      @media (max-width: ${breakpoints.sm}px) {
        font-size: 18px;
        width: 100%;
        }
    }
  }
  .twitter-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 15px;
    grid-row-gap: 8px;
    justify-content: space-between;
    @media (max-width: ${breakpoints.lg}px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: ${breakpoints.sm}px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }
  .twitter-grid-card {
    box-sizing: border-box;
    width: 322px;
    height: 344px;
    border: 1px solid #ffffff;
    border-radius: 16px;
    flex: none;
    order: 0;
    flex-grow: 0;
    background: ${isDarkMode ? "#000000" : black};
  }
`;

export default styles;
