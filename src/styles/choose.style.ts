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
    .single-choose-grid {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      gap: 4px;
      width: 326px;
      height: 272px;
    }
    .icon {
      background: ${lightGrey};
      width: 96px;
      border-radius: 8px;
      padding: 20px 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .choose-header {
    display: flex;
    align-items: end;
    gap: 10px;
    padding: 30px 0;
    margin-bottom: 20px;
    h2 {
      font-size: 64px;
      font-weight: 500;
      max-width: 347px;
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

      color: #808080;
    }
  }
`;

export default styles;
