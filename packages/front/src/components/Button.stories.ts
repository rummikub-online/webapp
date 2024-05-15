import { userEvent, within } from "@storybook/test";
import Button from "./Button.vue";

import { action } from "@storybook/addon-actions";

export default {
  component: Button,
  title: "Button",
  tags: ["autodocs"],
  argTypes: {
    click: {
      action: "click",
    },
    type: {
      options: ["primary", "secondary", "danger", "success"],
      control: { type: "inline-radio" },
    },
    text: {
      control: "text",
    },
    prefix: {
      options: ["Nothing", "Text"],
      mapping: {
        Nothing: null,
        Icon: "Prefix",
      },
    },
    suffix: {
      options: ["Nothing", "Text"],
      mapping: {
        Nothing: null,
        Icon: "Suffix",
      },
    },
  },
  args: {
    type: "primary",
    text: "Button",
  },
  excludeStories: /.*Data$/,
};

export const actionsData = {
  onClick: action("click"),
};

export const Primary = {
  args: {
    type: "primary",
    text: "Button",
  },
};
export const Secondary = {
  args: {
    type: "secondary",
    text: "Button",
  },
};
export const Danger = {
  args: {
    type: "danger",
    text: "Button",
  },
};

export const Success = {
  args: {
    type: "success",
    text: "Button",
  },
};

export const ClickExample = {
  play: async ({ canvasElement }: any) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("button"));
  },
};
