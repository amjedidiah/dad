import { Skeleton, Typography } from "@mui/material";
import { Meta, StoryFn } from "@storybook/react";
import Layout from "./layout";

const config = {
  title: "Components/Layout",
  component: Layout,
} as Meta;

const Template: StoryFn = ({ children }) => <Layout>{children}</Layout>;

export const WithSkeleton = Template.bind({});
WithSkeleton.args = {
  children: (
    <main>
      <Skeleton animation="wave" sx={{ backgroundColor: "black" }}>
        <h1>Section 1</h1>
      </Skeleton>
      <Typography variant="h2">
        <Skeleton
          animation="wave"
          sx={{ lineHeight: 5, backgroundColor: "black" }}
        />
      </Typography>
    </main>
  ),
};

export default config;
