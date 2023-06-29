import { Interpolation, Theme, css } from "@emotion/react";

const styles: Interpolation<Theme> = ({ breakpoints }) => css`
  &[open] {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    .modal-body {
      width: 808px;
      margin: 0 auto;
      padding: 3rem 5rem;
    }

    .modal-title {
      font-weight: 700;
      font-size: 3rem;
      line-height: 117%;
      margin-bottom: 5rem;
    }
  }
`;

export default styles;
