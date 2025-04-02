export type TOTAL_POPULATION = {
  label: "総人口";
  data: {
    year: number;
    value: number;
  }[];
};

export type YOUNG_POPULATION = {
  label: "年少人口";
  data: {
    year: number;
    value: number;
    rate: number;
  }[];
};

export type WORKING_AGE_POPULATION = {
  label: "生産年齢人口";
  data: {
    year: number;
    value: number;
    rate: number;
  }[];
};

export type ELDERLY_POPULATION = {
  label: "老年人口";
  data: {
    year: number;
    value: number;
    rate: number;
  }[];
};

// tupleでも良さそうだが、順序が保証がされてるかは確認できないので、union型で定義し利用する
export type POPULATION =
  | TOTAL_POPULATION
  | YOUNG_POPULATION
  | WORKING_AGE_POPULATION
  | ELDERLY_POPULATION;
