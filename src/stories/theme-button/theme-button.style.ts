import { Box, Button, styled } from "@mui/material";

export const ModeButton = styled(Button)`
  min-width: unset;
  padding: 0.5rem;
  border-radius: 50%;
  box-shadow: ${({ theme }) => theme.shadows[1]};
  border: 1px solid ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.primary.main};
  background-color: ${({ theme }) => theme.palette.primary.contrastText};
  position: fixed;
  bottom: 1rem;
  right: 1rem;

  &.switch {
    top: 1rem;
    bottom: unset;
  }

  &:hover {
    background-color: ${({ theme }) => theme.palette.primary.contrastText};
  }

  &.is-dark-mode,
  &.is-dark-mode:hover {
    color: ${({ theme }) => theme.palette.background.default};
    background-color: ${({ theme }) => theme.palette.grey[700]};
  }

  @media screen and (min-width: ${({ theme }) =>
      theme.breakpoints.values.laptopL}px) {
    right: calc(
      (100% - ${({ theme }) => theme.breakpoints.values.laptopL}px) / 2 + 1rem
    );
  }
`;

export const ModeButtonGroup = styled(Box)`
  position: fixed;
  height: 100%;
  width: fit-content;
  top: 0;
  max-width: ${({ theme }) => theme.breakpoints.values.laptopL}px;

  @media screen and (min-width: ${({ theme }) =>
      theme.breakpoints.values.laptopL}px) {
    right: calc(
      (100% - ${({ theme }) => theme.breakpoints.values.laptopL}px) / 2
    );
  }
`;
