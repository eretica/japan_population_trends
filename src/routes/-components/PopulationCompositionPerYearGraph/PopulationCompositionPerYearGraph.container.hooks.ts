import {
  PopulationDataWithPrefCode,
  usePopulationCompositionPerYearQueries,
} from "@/api/population/composition/perYear";
import { usePrefecturesQuery } from "@/api/prefectures";
import { useMemo } from "react";

type Props = {
  prefCodes: number[];
};

export const usePopulationCompositionPerYearGraphContainer = ({
  prefCodes,
}: Props) => {
  const prefecturesQuery = usePrefecturesQuery();

  const populationCompositionPerYearQueries =
    usePopulationCompositionPerYearQueries({
      prefCodes,
    });

  const prefectures = useMemo(() => {
    return prefecturesQuery.data?.result || [];
  }, [prefecturesQuery.data]);

  const populationCompositionPerYears = useMemo(() => {
    return (
      populationCompositionPerYearQueries
        .map((v) => v.data)
        .filter((v): v is PopulationDataWithPrefCode => v !== undefined) || []
    );
  }, [populationCompositionPerYearQueries]);

  const eitherLoaded = !!populationCompositionPerYears.length;

  return {
    prefectures,
    populationCompositionPerYears,
    eitherLoaded,
  };
};
