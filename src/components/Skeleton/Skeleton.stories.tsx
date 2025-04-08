import type { Meta } from "@storybook/react";
import { Skeleton } from "./";

const meta: Meta<typeof Skeleton> = {
  component: Skeleton,
};

export default meta;

export const Default = () => {
  return <Skeleton width={200} height={100} />;
};
