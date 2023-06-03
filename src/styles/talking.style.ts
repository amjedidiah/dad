import { Interpolation, Theme, css } from "@emotion/react";

const styles: Interpolation<Theme> = ({
  isDarkMode,
  colors: { white, grey2, black, lightGrey },
  breakpoints,
}) => css`
  .talking-header {
    display: flex;
    align-items: end;
    gap:10px;
    padding: 30px 0;
    margin-bottom: 20px;
    margin-top: 20px;
    h2 {
      font-size: 64px;
      font-weight: 500;
      max-width: 206px;
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
      color: ${isDarkMode ? black: '#808080 '}
    }
  }
  .twitter-grid{
    display: flex;
    justify-content: space-between;
  }
  .twitter-grid-card{
    box-sizing: border-box;
    width: 322px;
    height: 344px;
    border: 1px solid #FFFFFF;
    border-radius: 16px;
    flex: none;
    order: 0;
    flex-grow: 0;
    background:${isDarkMode ? '#000000' : black}
  }

`;

export default styles;
