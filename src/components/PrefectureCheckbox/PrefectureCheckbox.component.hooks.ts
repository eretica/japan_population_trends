import { useCallback } from "react";

type Props = {
  values: number[];
  onChange: (prefecture: number[]) => void;
};

export const usePrefectureCheckboxComponent = ({ values, onChange }: Props) => {
  const handleChange = useCallback(
    (prefCode: number) => {
      if (values.includes(prefCode)) {
        onChange(values.filter((value) => value !== prefCode));
      } else {
        onChange([...values, prefCode]);
      }
    },
    [onChange, values],
  );

  return {
    handleChange,
  };
};
