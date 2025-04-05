import { PopulationCompositionPerYearGraphComponent } from "@/routes/-components/PopulationCompositionPerYearGraph/PopulationCompositionPerYearGraph.component";
import { usePopulationCompositionPerYearGraphContainer } from "@/routes/-components/PopulationCompositionPerYearGraph/PopulationCompositionPerYearGraph.container.hooks";

type Props = {
  prefCodes: number[];
};

export const PopulationCompositionPerYearGraphContainer = ({
  prefCodes,
}: Props) => {
  const { prefectures, populationCompositionPerYears } =
    usePopulationCompositionPerYearGraphContainer({
      prefCodes,
    });

  return (
    <PopulationCompositionPerYearGraphComponent
      prefectures={prefectures}
      populationCompositionPerYears={populationCompositionPerYears}
      prefCodes={prefCodes}
    />
  );
};
