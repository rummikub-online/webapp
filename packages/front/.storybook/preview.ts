import { Preview } from "@storybook/vue3";
import "../src/assets/main.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        {
          name: "light",
          value: "#F9F9F9",
        },
      ],
    },
  },
};

export default preview;
