import { Interpolation, Theme, css } from "@emotion/react";

const styles: Interpolation<Theme> = ({ colors: { black, white } }) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 0.25rem;

  position: relative;
  top: 0.5rem;

  span {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: ${black};
    display: inline-flex;
    border: 0.05rem solid ${white};
  }
`;

export default styles;
