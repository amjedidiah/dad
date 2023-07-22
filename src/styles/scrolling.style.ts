import { Interpolation, Theme, css } from "@emotion/react";

const styles: Interpolation<Theme> = () => css`
  flex: 1;
  min-width: 450px;
  display: flex;
  list-style: none;
  justify-content: space-between;
`;

export default styles;
