import { PrefectureCheckboxComponent } from "./PrefectureCheckbox.component.tsx";
import { usePrefectureCheckbox } from "./PrefectureCheckbox.hooks.ts";

type Props = {
  values: number[];
  onChange: (prefecture: number[]) => void;
};

export const PrefectureCheckbox = ({ values, onChange }: Props) => {
  const { isLoading, prefectures } = usePrefectureCheckbox();

  // todo あとでSkeletonとか表示するかも
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <PrefectureCheckboxComponent
      prefectures={prefectures}
      values={values}
      onChange={onChange}
    />
  );
};
