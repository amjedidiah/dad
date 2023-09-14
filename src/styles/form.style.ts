import { Interpolation, Theme, css } from "@emotion/react";

const styles: Interpolation<Theme> = ({
  isDarkMode,
  colors: {
    grey1,
    white,
    greyLighter,
    secondGrey,
    black,
    warning,
    success,
    error,
    primary,
  },
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

      .asterisk {
        color: ${warning};
        margin-left: 0.25rem;
      }
    }

    .field {
      border: 1px solid ${greyLighter};
    }

    .field,
    .field-tel {
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

      &[aria-invalid="true"] {
        border-color: ${warning};
      }
    }

    .field-tel input {
      padding: 0 0.5rem;
      background: transparent;

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
  .helper {
    font-size: 0.75rem;
    &.error {
      color: ${error};
      font-size: 0.85rem;
      font-weight: bold;
    }
    &.success {
      color: ${success};
      font-size: 0.85rem;
      font-weight: bold;
    }
    &.warning {
      color: ${warning};
    }
    &.praise {
      color: ${primary};
      font-size: 0.85rem;
      font-weight: bold;
    }
  }
`;

export default styles;
