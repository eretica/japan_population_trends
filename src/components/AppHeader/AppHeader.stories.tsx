import type { Meta } from "@storybook/react";
import { AppHeader } from "./";

const meta: Meta<typeof AppHeader> = {
  component: AppHeader,
};

export default meta;

export const Default = () => <AppHeader />;
