export type PopulationType =
  | "totalPopulation"
  | "youngPopulation"
  | "workingAgePopulation"
  | "elderlyPopulation";

export type GraphData = {
  year: number;
  [prefCode: number]: {
    prefName: string;
    boundaryYear?: number;
    totalPopulation?: {
      value: number;
    };
    youngPopulation?: {
      value: number;
      rate: number;
    };
    workingAgePopulation?: {
      value: number;
      rate: number;
    };
    elderlyPopulation?: {
      value: number;
      rate: number;
    };
  };
};
