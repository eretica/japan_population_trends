import { get } from "@/api/client";
import { useQueries, UseQueryOptions } from "@tanstack/react-query";
import { POPULATION } from "./PopulationCompositionPerYear.types";

export type PopulationCompositionPerYear = {
  boundaryYear: number;
  data: POPULATION[];
};

export type PopulationCompositionPerYearResponse = {
  message: string;
  result: PopulationCompositionPerYear;
};

export type PopulationDataWithPrefCode = {
  message: string;
  result: { prefCode: number } & PopulationCompositionPerYear;
};

// APIが単体で取得しかできないため、useQueriesを使用して擬似的に複数取得できるようにしている
export const usePopulationCompositionPerYear = (prefCodes: number[]) => {
  return useQueries<
    UseQueryOptions<
      PopulationCompositionPerYearResponse,
      Error,
      PopulationDataWithPrefCode
    >[]
  >({
    queries: prefCodes.map((prefCode) => ({
      queryKey: ["population/composition/perYear", prefCode],
      queryFn: () =>
        get<PopulationCompositionPerYearResponse>(
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
    })),
  });
};
