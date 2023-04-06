import { ModeContext } from "@/context/mode/mode.context";
import useMode from "@/hooks/use-mode/use-mode";
import React from "react";

export default function ModeDecorator(Story: any, context: any) {
  const { toggleMode, isDarkMode } = useMode(context.args.mode, true);

  return (
    <div>
      <ModeContext.Provider value={{ toggleMode, isDarkMode }}>
        <Story />
      </ModeContext.Provider>
    </div>
  );
}
