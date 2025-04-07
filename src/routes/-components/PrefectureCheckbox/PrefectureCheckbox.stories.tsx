import type { Meta } from "@storybook/react";
import { PrefectureCheckboxComponent } from "./PrefectureCheckbox.component";
import { useState } from "react";
import { action } from "@storybook/addon-actions";

const meta: Meta<typeof PrefectureCheckboxComponent> = {
  component: PrefectureCheckboxComponent,
};

export default meta;

export const Default = () => {
  const [prefCodes, setPrefCodes] = useState<number[]>([2, 3]);

  return (
    <PrefectureCheckboxComponent
      prefectures={[
        { prefCode: 1, prefName: "北海道" },
        { prefCode: 2, prefName: "青森県" },
        { prefCode: 3, prefName: "岩手県" },
      ]}
      values={prefCodes}
      onChange={(v) => {
        action("onChangeValue")(v);
        setPrefCodes(v);
      }}
    />
  );
};
