export type GraphData = {
  year: number;
  [prefCode: number]: {
    prefName: string;
    // todo 検討中
    // isLoading: boolean;
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
