import { Interpolation, Theme, css } from "@emotion/react";

const styles: Interpolation<Theme> = ({
  isDarkMode,
  colors: { white, grey2, black, lightGrey },
  breakpoints,
}) => css`
  .appeared-on {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 40px 0px;
    margin-top: 10px;
    h2 {
      font-size: 40px;
      font-weight: 500;
    }
    div {
      display: flex;
      width: 70%;
      justify-content: space-between;
    }
  }
`;

export default styles;
