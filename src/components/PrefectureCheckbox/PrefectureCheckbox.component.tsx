import { Prefecture } from "@/api/prefectures";
import styles from "./PrefectureCheckbox.module.scss";
import { usePrefectureCheckboxComponent } from "@/components/PrefectureCheckbox/PrefectureCheckbox.component.hooks.ts";

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
        <div key={prefecture.prefCode}>
          <input
            type="checkbox"
            id={String(prefecture.prefCode)}
            name={prefecture.prefName}
            checked={values.some((value) => value === prefecture.prefCode)}
            onChange={() => {
              handleChange(prefecture.prefCode);
            }}
          />
          <label htmlFor={String(prefecture.prefCode)}>
            {prefecture.prefName}
          </label>
        </div>
      ))}
    </div>
  );
};
