import { Button, styled } from "@mui/material";

export const ModeButton = styled(Button)`
  padding: 1.25rem;
  border-radius: 50%;
  box-shadow: ${({ theme }) => theme.shadows[1]};
  color: ${({ theme }) => theme.palette.primary.main};
  background-color: ${({ theme }) => theme.palette.primary.contrastText};
  position: fixed;
  bottom: 2.5rem;
  right: 2.5rem;

  &:hover {
    background-color: ${({ theme }) => theme.palette.primary.contrastText};
  }

  &.is-dark-mode,
  &.is-dark-mode:hover {
    color: ${({ theme }) => theme.palette.background.default};
    background-color: ${({ theme }) => theme.palette.grey[700]};
  }
`;

export const ModeButtonGroup = styled("div")`
  position: fixed;
  bottom: 2.5rem;
  right: 2.5rem;

  & button {
    position: static;

    &:first-of-type {
      margin-right: 1rem;
    }
  }
`;
