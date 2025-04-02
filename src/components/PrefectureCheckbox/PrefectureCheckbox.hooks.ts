import { useMemo } from "react";
import { usePrefectures } from "@/api/prefectures";

export const usePrefectureCheckbox = () => {
  const { data, isLoading } = usePrefectures();

  const prefectures = useMemo(() => data?.result || [], [data]);

  return {
    isLoading,
    prefectures,
  };
};
