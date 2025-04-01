import { get } from "@/api/client";
import { useQuery } from "@tanstack/react-query";
import { POPULATION } from "./PopulationCompositionPerYear.types";

export type PopulationCompositionPerYear = {
  boundaryYear: number;
  data: POPULATION[];
};

export type PopulationCompositionPerYearResponse = {
  message: string;
  result: PopulationCompositionPerYear;
};

type Props = {
  prefCode: string;
};

export const usePopulationCompositionPerYear = (props: Props) => {
  return useQuery<PopulationCompositionPerYearResponse>({
    queryKey: ["population/composition/perYear", props],
    queryFn: () => get("/api/v1/population/composition/perYear", props),
  });
};
