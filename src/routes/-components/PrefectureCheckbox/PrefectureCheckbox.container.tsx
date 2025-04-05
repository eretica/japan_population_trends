import { PrefectureCheckboxComponent } from "./PrefectureCheckbox.component.tsx";
import { usePrefectureCheckboxContainer } from "./PrefectureCheckbox.container.hooks.ts";
import { Skeleton } from "@/components/Skeleton/Skeleton.tsx";

type Props = {
  values: number[];
  onChange: (prefecture: number[]) => void;
};

export const PrefectureCheckboxContainer = ({ values, onChange }: Props) => {
  const { prefectures } = usePrefectureCheckboxContainer();

  return (
    <PrefectureCheckboxComponent
      prefectures={prefectures}
      values={values}
      onChange={onChange}
    />
  );
};
