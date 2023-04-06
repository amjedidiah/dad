import "@/styles/global-stories.css";
import ThemeDecorator from "./decorators/theme.decorator";

export const parameters = {
  backgrounds: {
    default: "dark",
    values: [
      {
        name: "dark",
        value: "#000",
      },
      {
        name: "light",
        value: "#fff",
      },
    ],
  },
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [ThemeDecorator];
