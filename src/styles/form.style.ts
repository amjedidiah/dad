import { Interpolation, Theme, css } from "@emotion/react";

const styles: Interpolation<Theme> = ({
  isDarkMode,
  colors: { grey1, white, greyLighter, secondGrey, black },
  font,
}) => css`
  .group {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    .label {
      font-size: 1.5rem;
      font-weight: 500;
      line-height: 2rem;
      color: ${isDarkMode ? white : grey1};
      text-transform: capitalize;
    }

    .field {
      border: 1px solid ${greyLighter};
      padding: 0.5rem;
      font-size: 1rem;
      background: transparent;
      color: ${isDarkMode ? white : black};
      font-family: inherit;

      &:hover,
      &:focus,
      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus {
        outline: none;
        -webkit-box-shadow: 0 0 0 1000px ${isDarkMode ? black : white} inset;
      }

      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus {
        -webkit-text-fill-color: ${isDarkMode ? white : black};
      }

      &::-webkit-input-placeholder {
        color: ${isDarkMode ? grey1 : secondGrey};
      }
    }
  }
`;

export default styles;
