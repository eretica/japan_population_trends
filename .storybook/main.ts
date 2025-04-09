import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(tsx)"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  staticDirs: ["../public"],
  managerHead: (head, { configType }) => {
    if (configType !== "PRODUCTION") {
      return head;
    }

    return `
      ${head}
      <base href="/storybook/">
    `;
  },
  async viteFinal(config, { configType }) {
    if (configType !== "PRODUCTION") {
      return config;
    }

    return mergeConfig(config, {
      base: "/storybook/",
    });
  },
};

export default config;
