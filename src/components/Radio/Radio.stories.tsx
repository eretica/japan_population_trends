import type { Meta } from "@storybook/react";
import { Radio } from "./";
import { action } from "@storybook/addon-actions";

const meta: Meta<typeof Radio> = {
  component: Radio,
};

export default meta;

export const Default = () => (
  <Radio value={"i am radio"} checked onChangeValue={action("onChangeValue")} />
);

export const UnChecked = () => (
  <Radio
    value={"i am radio"}
    checked={false}
    onChangeValue={action("onChangeValue")}
  />
);

export const WithChildren = () => (
  <Radio
    value={"i am radio"}
    checked={false}
    onChangeValue={action("onChangeValue")}
  >
    I am radio
  </Radio>
);
