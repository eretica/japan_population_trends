import { useMemo } from "react";
import { usePrefecturesQuery } from "@/api/prefectures";

export const usePrefectureCheckboxContainer = () => {
  const { data } = usePrefecturesQuery();

  const prefectures = useMemo(() => data?.result || [], [data]);

  return {
    prefectures,
  };
};
