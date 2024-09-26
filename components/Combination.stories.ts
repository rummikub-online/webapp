import { action } from "@storybook/addon-actions";
import Combination from "./Combination.vue";

export default {
  component: Combination,
  title: "Combination",
  tags: ["autodocs"],
  args: {
    disabled: false,
  },
  argTypes: {
    moved: {
      action: "moved",
    },
    added: {
      action: "added",
    },
    removed: {
      action: "removed",
    },
    combination: {},
  },
  excludeStories: /.*Data$/,
};

export const actionsData = {
  onMoved: action("moved"),
  onAdded: action("added"),
  onRemoved: action("removed"),
};

export const Suite = {
  args: {
    combination: {
      type: "suite",
      cards: [
        {
          color: "red",
          number: 11,
        },
        {
          color: "red",
          number: 12,
        },
        {
          color: "red",
          number: 13,
        },
      ],
    },
  },
};
export const Serie = {
  args: {
    combination: {
      type: "serie",
      cards: [
        {
          color: "red",
          number: 11,
        },
        {
          color: "blue",
          number: 11,
        },
        {
          color: "yellow",
          number: 11,
        },
      ],
    },
  },
};
export const Invalid = {
  args: {
    combination: {
      type: "invalid",
      cards: [
        {
          color: "red",
          number: 12,
        },
        {
          color: "red",
          number: 13,
        },
      ],
    },
  },
};

export const Disabled = {
  args: {
    disabled: true,
    combination: {
      type: "serie",
      cards: [
        {
          color: "red",
          number: 11,
        },
        {
          color: "blue",
          number: 11,
        },
        {
          color: "yellow",
          number: 11,
        },
      ],
    },
  },
};
