import "@emotion/react";
import { ModeTheme } from "@/hooks/use-mode";

declare module "@emotion/react" {
  export interface Theme extends ModeTheme {}
}
