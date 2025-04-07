import type { Meta } from "@storybook/react";
import { Checkbox } from "./";
import { action } from "@storybook/addon-actions";

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
};

export default meta;

export const Default = () => (
  <Checkbox
    checked
    value={"i am checkbox"}
    onChangeValue={action("onChangeValue")}
  />
);

export const UnChecked = () => (
  <Checkbox
    value={"i am checkbox"}
    checked={false}
    onChangeValue={action("onChangeValue")}
  />
);

export const WithChildren = () => (
  <Checkbox
    value={"i am checkbox"}
    checked={false}
    onChangeValue={action("onChangeValue")}
  >
    I am checkbox
  </Checkbox>
);
