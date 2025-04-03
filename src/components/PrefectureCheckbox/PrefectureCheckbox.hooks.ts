import { useMemo } from "react";
import { usePrefecturesQuery } from "@/api/prefectures";

export const usePrefectureCheckbox = () => {
  const { data, isLoading } = usePrefecturesQuery();

  const prefectures = useMemo(() => data?.result || [], [data]);

  return {
    isLoading,
    prefectures,
  };
};
