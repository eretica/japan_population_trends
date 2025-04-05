import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { Checkbox } from "./Checkbox.tsx";
import { useState } from "react";
import { describe } from "vitest";

describe("Checkbox", () => {
  const setup = ({ initialChecked }: { initialChecked: boolean }) => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const onChangeValue = vi.fn();

    const Wrapper = () => {
      const [checked, setChecked] = useState(initialChecked);

      type Fruit = "apple" | "orange";

      return (
        <Checkbox
          id="test-checkbox"
          name="test-name"
          value={"apple" as Fruit}
          checked={checked}
          onChangeValue={(v) => {
            // 型が聞いていることをチェック
            onChangeValue(v satisfies Fruit);
          }}
          onChange={(value) => {
            onChange(value);
            setChecked(!checked);
          }}
        >
          テストラベル
        </Checkbox>
      );
    };

    const utils = render(<Wrapper />);

    return { ...utils, user, onChange, onChangeValue };
  };

  it("ラベルが正しく表示されること", () => {
    setup({ initialChecked: false });
    expect(screen.getByText("テストラベル")).toBeInTheDocument();
  });

  it("初期状態でチェックされていないこと", () => {
    setup({ initialChecked: false });
    expect(screen.getByLabelText("テストラベル")).not.toBeChecked();
  });

  it("初期状態でチェックされていること", () => {
    setup({ initialChecked: true });
    expect(screen.getByLabelText("テストラベル")).toBeChecked();
  });

  it("クリックするとonChangeValueが呼ばれること", async () => {
    const { user, onChangeValue } = setup({ initialChecked: false });
    await user.click(screen.getByLabelText("テストラベル"));
    expect(onChangeValue).toBeCalledWith("apple");
  });
});
