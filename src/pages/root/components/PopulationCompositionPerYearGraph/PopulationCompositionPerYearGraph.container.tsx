import { PopulationCompositionPerYearGraphComponent } from "@/pages/root/components/PopulationCompositionPerYearGraph/PopulationCompositionPerYearGraph.component.tsx";
import { usePopulationCompositionPerYearGraphContainer } from "@/pages/root/components/PopulationCompositionPerYearGraph/PopulationCompositionPerYearGraph.container.hooks.ts";
import { Skeleton } from "@/components/Skeleton";

type Props = {
  prefCodes: number[];
};

export const PopulationCompositionPerYearGraphContainer = ({
  prefCodes,
}: Props) => {
  const { prefectures, populationCompositionPerYears, eitherLoaded } =
    usePopulationCompositionPerYearGraphContainer({
      prefCodes,
    });

  // データが1つも取得できていない場合はSkeletonを表示
  if (!eitherLoaded) {
    return <Skeleton width="100%" height={300} />;
  }

  return (
    <PopulationCompositionPerYearGraphComponent
      prefectures={prefectures}
      populationCompositionPerYears={populationCompositionPerYears}
      prefCodes={prefCodes}
    />
  );
};
