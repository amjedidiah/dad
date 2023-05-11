import { Interpolation, Theme, css } from "@emotion/react";

const styles: Interpolation<Theme> = ({ breakpoints }) => css`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  @media (min-width: ${breakpoints.md}px) {
    gap: 2rem;
  }
`;

export default styles;
