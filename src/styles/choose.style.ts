import { Interpolation, Theme, css } from "@emotion/react";

const styles: Interpolation<Theme> = ({
  isDarkMode,
  colors: { white, grey2, black, lightGrey },
  breakpoints,
}) => css`
  .choose-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 15px;
    grid-row-gap: 8px;
    justify-content: space-between;
    width: 100%;
    padding: 20px 0px;
    .single-choose-grid {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      gap: 4px;
      height: 272px;
    }
    .icon {
      background: ${isDarkMode ? grey2 : lightGrey};
      width: 96px;
      border-radius: 8px;
      padding: 20px 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    p {
      width: 344px;
    }
    @media (max-width: ${breakpoints.lg}px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: ${breakpoints.sm}px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }
  .choose-header {
    display: flex;
    align-items: end;
    gap: 10px;
    padding: 20px 0;
    margin-bottom: 20px;
    margin-top: 20px;
    @media (max-width: ${breakpoints.sm}px) {
      flex-direction: column;
    }
    h2 {
      font-size: 64px;
      font-weight: 500;
      width: 347px;
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
`;

export default styles;
