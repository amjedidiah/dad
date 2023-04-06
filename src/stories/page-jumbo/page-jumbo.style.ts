import { Box, Button, styled } from "@mui/material";

export const ImageBox = styled(Box)`
  border: 1px solid ${({ theme }) => theme.palette.text.primary};

  & * {
    transform: scale(1.2);
    margin-top: 2.5rem;
  }
`;

export const PartnerButton = styled(Button)`
  background-color: ${({ theme }) => theme.palette.text.primary};
  color: ${({ theme }) => theme.palette.background.default};

  &:hover {
    background-color: ${({ theme }) => theme.palette.text.primary};
    color: ${({ theme }) => theme.palette.background.default};
  }
`;
