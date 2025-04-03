import {
  PopulationDataWithPrefCode,
  usePopulationCompositionPerYearQueries,
} from "@/api/population/composition/perYear";
import { PopulationCompositionPerYearGraphComponent } from "@/components/PopulationCompositionPerYearGraph/PopulationCompositionPerYearGraph.component.tsx";
import { usePrefecturesQuery } from "@/api/prefectures";
import { usePopulationCompositionPerYearGraph } from "./PopulationCompositionPerYearGraph.component.hooks";
import { useMemo } from "react";

type Props = {
  prefCodes: number[];
};

export const PopulationCompositionPerYearGraph = ({ prefCodes }: Props) => {
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

  const { normalizedPopulationCompositionPerYears, prefectureNameByPrefCode } =
    usePopulationCompositionPerYearGraph({
      prefCodes,
      prefectures,
      populationCompositionPerYears,
    });

  return (
    <PopulationCompositionPerYearGraphComponent
      data={normalizedPopulationCompositionPerYears}
      prefCodes={prefCodes}
      prefectureNameByPrefCode={prefectureNameByPrefCode}
    />
  );
};
