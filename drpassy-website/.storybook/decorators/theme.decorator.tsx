import { CssBaseline, ThemeProvider } from "@mui/material";
import useMode from "@/hooks/use-mode/use-mode";
import React from "react";

export default function ThemeDecorator(Story: any, context: any) {
  const { theme } = useMode("dark", true);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Story />
    </ThemeProvider>
  );
}
