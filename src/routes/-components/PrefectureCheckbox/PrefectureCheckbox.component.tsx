import { Prefecture } from "@/api/prefectures";
import styles from "./PrefectureCheckbox.component.module.scss";
import { usePrefectureCheckboxComponent } from "./PrefectureCheckbox.component.hooks.ts";
import { Checkbox } from "@/components/Checkbox";

type Props = {
  prefectures: Prefecture[];
  values: number[];
  onChange: (prefecture: number[]) => void;
};

export const PrefectureCheckboxComponent = ({
  prefectures,
  values,
  onChange,
}: Props) => {
  const { handleChange } = usePrefectureCheckboxComponent({
    values,
    onChange,
  });

  return (
    <div className={styles.container}>
      {prefectures.map((prefecture) => (
        <Checkbox
          key={prefecture.prefCode}
          id={String(prefecture.prefCode)}
          value={prefecture.prefCode}
          name={prefecture.prefName}
          checked={values.some((value) => value === prefecture.prefCode)}
          onChangeValue={handleChange}
        >
          {prefecture.prefName}
        </Checkbox>
      ))}
    </div>
  );
};
