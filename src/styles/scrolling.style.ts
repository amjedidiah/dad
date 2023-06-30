import { Interpolation, Theme, css } from "@emotion/react";

const styles: Interpolation<Theme> = () => css`
  flex: 1;
  overflow-x: hidden;
  min-width: 350px;
  display: flex;
  flex-direction: column;
  position: relative;

  .roles {
    display: flex;
    list-style: none;
    justify-content: space-between;
    gap: clamp(3rem, 12%, 12rem);

    &.roles-1,
    &.roles-3 {
      position: absolute;
    }
  }
`;

export default styles;
