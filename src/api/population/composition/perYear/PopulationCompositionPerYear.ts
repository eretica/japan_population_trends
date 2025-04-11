import { get } from "@/api/client";
import { useQueries, UseQueryOptions } from "@tanstack/react-query";
import { Population } from "./PopulationCompositionPerYear.types";

export type PopulationCompositionPerYear = {
  boundaryYear: number;
  data: Population[];
};

export type PopulationCompositionPerYearActualResponse = {
  message: string | null;
  result: PopulationCompositionPerYear;
};

// レスポンスにprefCodeを含めた型
export type PopulationCompositionPerYearResponse = {
  message: string | null;
  result: { prefCode: number } & PopulationCompositionPerYear;
};

type Props = {
  prefCodes: number[];
};

// APIが単体で取得しかできないため、useQueriesを使用して擬似的に複数取得できるようにしている
export const usePopulationCompositionPerYearQueries = ({
  prefCodes,
}: Props) => {
  return useQueries<
    UseQueryOptions<
      PopulationCompositionPerYearActualResponse,
      Error,
      PopulationCompositionPerYearResponse
    >[]
  >({
    queries: prefCodes.map((prefCode) => ({
      queryKey: ["population/composition/perYear", prefCode],
      queryFn: () =>
        get<PopulationCompositionPerYearActualResponse>(
          "/api/v1/population/composition/perYear",
          { prefCode },
        ),
      select: (data) => ({
        ...data,
        result: {
          ...data.result,
          prefCode,
        },
      }),
      // いつ叩いても変わらない値なので無限にキャッシュする
      staleTime: Infinity,
      cacheTime: Infinity,
    })),
  });
};
