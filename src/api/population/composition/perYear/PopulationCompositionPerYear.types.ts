export type TotalPopulation = {
  label: "総人口";
  data: {
    year: number;
    value: number;
  }[];
};

export type YoungPopulation = {
  label: "年少人口";
  data: {
    year: number;
    value: number;
    rate: number;
  }[];
};

export type WorkingAgePopulation = {
  label: "生産年齢人口";
  data: {
    year: number;
    value: number;
    rate: number;
  }[];
};

export type ElderlyPopulation = {
  label: "老年人口";
  data: {
    year: number;
    value: number;
    rate: number;
  }[];
};

// tupleでも良さそうだが、順序が保証がされてるかは確認できないので、union型で定義し利用する
export type Population =
  | TotalPopulation
  | YoungPopulation
  | WorkingAgePopulation
  | ElderlyPopulation;
