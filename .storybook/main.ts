import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(tsx)"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  staticDirs: ["../public"],
  async viteFinal(config) {
    return mergeConfig(config, {
      base: "/storybook/",
    });
  },
};

export default config;
