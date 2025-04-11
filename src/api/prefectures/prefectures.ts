import { get } from "@/api/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export type Prefecture = {
  prefCode: number;
  prefName: string;
};

export type PrefecturesResponse = {
  message: string | null;
  result: Prefecture[];
};

export const usePrefecturesQuery = () => {
  return useSuspenseQuery<PrefecturesResponse>({
    queryKey: ["prefectures"],
    queryFn: () => get("/api/v1/prefectures"),
    // いつ叩いても変わらない値なので無限にキャッシュする
    staleTime: Infinity,
  });
};
