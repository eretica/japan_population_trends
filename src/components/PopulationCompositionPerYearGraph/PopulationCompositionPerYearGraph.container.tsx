import { PopulationCompositionPerYearGraphComponent } from "@/components/PopulationCompositionPerYearGraph/PopulationCompositionPerYearGraph.component.tsx";
import { usePopulationCompositionPerYearGraphContainer } from "@/components/PopulationCompositionPerYearGraph/PopulationCompositionPerYearGraph.container.hooks.ts";

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
