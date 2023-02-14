import { Meta, StoryFn } from "@storybook/react";
import ThemeSwitch from "./theme-switch";
import ModeDecorator from "storybook/decorators/mode.decorator";

const config = {
  title: "Components/ThemeSwitch",
  component: ThemeSwitch,
  decorators: [ModeDecorator],
} as Meta;

const Template: StoryFn = (args) => <ThemeSwitch {...args} />;

export const LightModeSwitch = Template.bind({});
LightModeSwitch.args = {
  mode: "light",
};

export const DarkModeSwitch = Template.bind({});
DarkModeSwitch.args = {
  mode: "dark",
};

export default config;
