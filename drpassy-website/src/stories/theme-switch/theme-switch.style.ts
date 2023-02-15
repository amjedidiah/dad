import { Button, styled } from "@mui/material";

export const ModeButton = styled(Button)`
  padding: 20px;
  border-radius: 50%;
  box-shadow: ${({ theme }) => theme.shadows[1]};
  color: ${({ theme }) => theme.palette.primary.main};
  background-color: ${({ theme }) => theme.palette.primary.contrastText};
  position: fixed;
  bottom: 50px;
  right: 50px;

  &:hover {
    background-color: ${({ theme }) => theme.palette.primary.contrastText};
  }

  &.is-dark-mode,
  &.is-dark-mode:hover {
    color: ${({ theme }) => theme.palette.text.primary};
    background-color: ${({ theme }) => theme.palette.grey[700]};
  }
`;
