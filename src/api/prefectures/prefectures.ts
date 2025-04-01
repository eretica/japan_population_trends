import { get } from "@/api/client";
import { useQuery } from "@tanstack/react-query";

export type Prefecture = {
  prefCode: number;
  prefName: string;
};

export type PrefecturesResponse = {
  message: string;
  result: Prefecture[];
};

export const usePrefectures = () => {
  return useQuery<PrefecturesResponse>({
    queryKey: ["prefectures"],
    queryFn: () => get("/api/v1/prefectures"),
  });
};
