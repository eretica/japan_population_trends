import type { Meta } from "@storybook/react";
import { PopulationCompositionPerYearGraphComponent } from "./PopulationCompositionPerYearGraph.component";

const meta: Meta<typeof PopulationCompositionPerYearGraphComponent> = {
  component: PopulationCompositionPerYearGraphComponent,
};

export default meta;

export const Default = () => {
  return (
    <PopulationCompositionPerYearGraphComponent
      prefCodes={[1, 2, 3]}
      prefectures={[
        { prefCode: 1, prefName: "北海道" },
        { prefCode: 2, prefName: "青森県" },
        { prefCode: 3, prefName: "岩手県" },
      ]}
      populationCompositionPerYears={[
        {
          message: null,
          result: {
            prefCode: 1,
            boundaryYear: 2020,
            data: [
              {
                label: "総人口",
                data: [
                  {
                    year: 2030,
                    value: 1044038,
                  },
                  {
                    year: 2035,
                    value: 996732,
                  },
                  {
                    year: 2040,
                    value: 946917,
                  },
                  {
                    year: 2045,
                    value: 896653,
                  },
                ],
              },
              {
                label: "年少人口",
                data: [
                  {
                    year: 2030,
                    value: 119767,
                    rate: 11.47,
                  },
                  {
                    year: 2035,
                    value: 111412,
                    rate: 11.18,
                  },
                  {
                    year: 2040,
                    value: 105073,
                    rate: 11.1,
                  },
                  {
                    year: 2045,
                    value: 99257,
                    rate: 11.07,
                  },
                ],
              },
              {
                label: "生産年齢人口",
                data: [
                  {
                    year: 2030,
                    value: 552367,
                    rate: 52.91,
                  },
                  {
                    year: 2035,
                    value: 522980,
                    rate: 52.47,
                  },
                  {
                    year: 2040,
                    value: 481160,
                    rate: 50.81,
                  },
                  {
                    year: 2045,
                    value: 444584,
                    rate: 49.58,
                  },
                ],
              },
              {
                label: "老年人口",
                data: [
                  {
                    year: 2030,
                    value: 371904,
                    rate: 35.62,
                  },
                  {
                    year: 2035,
                    value: 362340,
                    rate: 36.35,
                  },
                  {
                    year: 2040,
                    value: 360684,
                    rate: 38.09,
                  },
                  {
                    year: 2045,
                    value: 352812,
                    rate: 39.35,
                  },
                ],
              },
            ],
          },
        },
        {
          message: null,
          result: {
            prefCode: 3,
            boundaryYear: 2020,
            data: [
              {
                label: "総人口",
                data: [
                  {
                    year: 2030,
                    value: 1244038,
                  },
                  {
                    year: 2035,
                    value: 96732,
                  },
                  {
                    year: 2040,
                    value: 924917,
                  },
                  {
                    year: 2045,
                    value: 89653,
                  },
                ],
              },
              {
                label: "年少人口",
                data: [
                  {
                    year: 2030,
                    value: 19767,
                    rate: 11.47,
                  },
                  {
                    year: 2035,
                    value: 111412,
                    rate: 11.18,
                  },
                  {
                    year: 2040,
                    value: 310073,
                    rate: 11.1,
                  },
                  {
                    year: 2045,
                    value: 9257,
                    rate: 11.07,
                  },
                ],
              },
              {
                label: "生産年齢人口",
                data: [
                  {
                    year: 2030,
                    value: 355237,
                    rate: 52.91,
                  },
                  {
                    year: 2035,
                    value: 52290,
                    rate: 52.47,
                  },
                  {
                    year: 2040,
                    value: 48160,
                    rate: 50.81,
                  },
                  {
                    year: 2045,
                    value: 44584,
                    rate: 49.58,
                  },
                ],
              },
              {
                label: "老年人口",
                data: [
                  {
                    year: 2030,
                    value: 37194,
                    rate: 35.62,
                  },
                  {
                    year: 2035,
                    value: 36340,
                    rate: 36.35,
                  },
                  {
                    year: 2040,
                    value: 236684,
                    rate: 38.09,
                  },
                  {
                    year: 2045,
                    value: 35212,
                    rate: 39.35,
                  },
                ],
              },
            ],
          },
        },
      ]}
    />
  );
};
