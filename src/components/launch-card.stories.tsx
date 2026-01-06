import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { LaunchCard } from "./launch-card";

const meta: Meta<typeof LaunchCard> = {
  title: "Components/LaunchCard",
  component: LaunchCard,
  parameters: {
    layout: "centered",
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockLaunch = {
  id: "1",
  mission_name: "FalconSat",
  launch_date_utc: "2006-03-24T22:30:00.000Z",
  launch_success: true,
  details: "Engine failure at 33 seconds and loss of vehicle",
  rocket: {
    rocket_name: "Falcon 1",
  },
  links: {
    mission_patch: "https://images2.imgbox.com/40/e3/GypSkayF_o.png",
    article_link:
      "https://www.space.com/2196-spacex-inaugural-falcon-1-rocket-lost-launch.html",
    wikipedia: "https://en.wikipedia.org/wiki/DemoSat",
    video_link: "https://www.youtube.com/watch?v=0a_00nJ_Y88",
  },
};

export const Successful: Story = {
  args: {
    launch: mockLaunch,
  },
};

export const Failed: Story = {
  args: {
    launch: {
      ...mockLaunch,
      launch_success: false,
      mission_name: "RatSat",
    },
  },
};

export const Unknown: Story = {
  args: {
    launch: {
      ...mockLaunch,
      launch_success: null,
      mission_name: "RazakSat",
    },
  },
};
