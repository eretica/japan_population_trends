import { PrefectureCheckboxComponent } from "./PrefectureCheckbox.component.tsx";
import { Prefecture } from "@/api/prefectures";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { useState } from "react";

describe("PrefectureCheckboxComponent", () => {
  const setup = ({
    prefectures,
    initialValues,
  }: {
    prefectures: Prefecture[];
    initialValues: number[];
  }) => {
    const user = userEvent.setup();

    const onChange = vi.fn();

    const Wrapper = () => {
      const [values, setValues] = useState<number[]>(initialValues);

      return (
        <PrefectureCheckboxComponent
          prefectures={prefectures}
          values={values}
          onChange={(value) => {
            onChange(value);
            setValues(value);
          }}
        />
      );
    };

    const utils = render(<Wrapper />);

    return { ...utils, user, onChange };
  };

  it("prefecturesに渡した値が描画されること", () => {
    setup({
      prefectures: [
        { prefCode: 1, prefName: "北海道" },
        { prefCode: 2, prefName: "青森県" },
      ],
      initialValues: [],
    });

    expect(screen.getByText("北海道")).toBeInTheDocument();
    expect(screen.getByText("青森県")).toBeInTheDocument();
  });

  it("initialValuesに渡した都道府県がチェックされていること", () => {
    setup({
      prefectures: [
        { prefCode: 1, prefName: "北海道" },
        { prefCode: 2, prefName: "青森県" },
      ],
      initialValues: [1],
    });

    expect(screen.getByLabelText("北海道")).toBeChecked();
    expect(screen.getByLabelText("青森県")).not.toBeChecked();
  });

  it("未指定の都道府県をクリックするとvaluesに追加されること", async () => {
    const { onChange, user } = setup({
      prefectures: [
        { prefCode: 1, prefName: "北海道" },
        { prefCode: 2, prefName: "青森県" },
      ],
      initialValues: [1],
    });

    await user.click(screen.getByLabelText("青森県"));

    expect(onChange).toHaveBeenCalledWith([1, 2]);
  });

  it("指定済みの都道府県をクリックするとvaluesから削除されること", async () => {
    const { onChange, user } = setup({
      prefectures: [
        { prefCode: 1, prefName: "北海道" },
        { prefCode: 2, prefName: "青森県" },
      ],
      initialValues: [1],
    });

    await user.click(screen.getByLabelText("北海道"));

    expect(onChange).toBeCalledWith([]);
  });
});
