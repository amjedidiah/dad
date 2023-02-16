import { Link } from "react-scroll";
import { Meta, StoryFn } from "@storybook/react";
import ThemeButton from "./theme-button";
import ModeDecorator from "storybook/decorators/mode.decorator";
import { ModeButtonGroup } from "./theme-button.style";

const config = {
  title: "Components/ThemeButton",
  component: ThemeButton,
  decorators: [ModeDecorator],
} as Meta;

// Switch
const SwitchTemplate: StoryFn = (args) => <ThemeButton isSwitch {...args} />;

export const LightModeSwitch = SwitchTemplate.bind({});
LightModeSwitch.args = {
  mode: "light",
};

export const DarkModeSwitch = SwitchTemplate.bind({});
DarkModeSwitch.args = {
  mode: "dark",
};


// Scroll
const ScrollTemplate: StoryFn = (args) => (
  <Link to="top" smooth>
    <ThemeButton {...args} />
  </Link>
);

export const LightModeScrollToTop = ScrollTemplate.bind({});
LightModeScrollToTop.args = {
  mode: "light",
};

export const DarkModeScrollToTop = ScrollTemplate.bind({});
DarkModeScrollToTop.args = {
  mode: "dark",
};


// Group
const ThemeButtonGroup: StoryFn = (args) => (
  <ModeButtonGroup>
    <Link to="top" smooth>
      <ThemeButton {...args} />
    </Link>
    <ThemeButton isSwitch {...args} />
  </ModeButtonGroup>
);

export const LightModeThemeButtonGroup = ThemeButtonGroup.bind({});
LightModeThemeButtonGroup.args = {
  mode: "light",
};

export const DarkModeThemeButtonGroup = ThemeButtonGroup.bind({});
DarkModeThemeButtonGroup.args = {
  mode: "dark",
};

export default config;
