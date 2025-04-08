import type { PopulationCompositionPerYearResponse } from "@/api/population/composition/perYear";
import { useMemo, useState } from "react";
import type { Prefecture } from "@/api/prefectures";
import {
  GraphData,
  PopulationType,
} from "./PopulationCompositionPerYearGraph.types.ts";

type Props = {
  prefCodes: number[];
  prefectures: Prefecture[];
  populationCompositionPerYears: PopulationCompositionPerYearResponse[];
};

export const usePopulationCompositionPerYearGraph = ({
  prefCodes,
  prefectures,
  populationCompositionPerYears,
}: Props) => {
  const [selectedPopulation, setSelectedPopulation] =
    useState<PopulationType>("totalPopulation");

  const handleChangePopulation = (populationType: PopulationType) => {
    setSelectedPopulation(populationType);
  };

  const prefectureDictByPrefCode = useMemo(() => {
    return prefectures.reduce(
      (acc, prefecture) => {
        acc[prefecture.prefCode] = {
          name: prefecture.prefName,
          isLoaded: !!populationCompositionPerYears.find(
            (populationCompositionPerYear) =>
              populationCompositionPerYear.result.prefCode ===
              prefecture.prefCode,
          ),
        };
        return acc;
      },
      {} as Record<
        number,
        {
          name: string;
          isLoaded: boolean;
        }
      >,
    );
  }, [prefectures, populationCompositionPerYears]);

  // 年度の範囲や感覚は全て同じなので最初に見つかったデータを年のサンプルとして確保
  const years = useMemo(() => {
    // 最初にみつかったデータがあるやつを取得
    const firstData = populationCompositionPerYears.find(
      (populationCompositionPerYear) =>
        populationCompositionPerYear.result.data,
    );

    return firstData?.result.data[0].data.map((v) => v.year) || [];
  }, [populationCompositionPerYears]);

  const normalizedPopulationCompositionPerYears = useMemo<GraphData[]>(() => {
    // yearsが空配列の場合は表示するデータがないので空配列を返しておく
    if (!years.length) return [];

    return years.map<GraphData>((year) => {
      return {
        year,
        // 都道府県毎に対象年のデータを取り出す
        ...prefCodes.reduce(
          (acc, prefCode) => {
            const prefPopulation = populationCompositionPerYears.find(
              (populationCompositionPerYear) =>
                populationCompositionPerYear.result.prefCode === prefCode,
            );

            if (!prefPopulation) {
              return {
                ...acc,
                [prefCode]: {
                  prefName: prefectureDictByPrefCode[prefCode].name,
                },
              };
            }

            return {
              ...acc,
              [prefCode]: {
                prefName: prefectureDictByPrefCode[prefCode].name,
                boundaryYear: prefPopulation.result.boundaryYear,
                totalPopulation: prefPopulation.result.data
                  .find((v) => v.label === "総人口")
                  ?.data.find((v) => v.year === year),
                youngPopulation: prefPopulation.result.data
                  .find((v) => v.label === "年少人口")
                  ?.data.find((v) => v.year === year),
                workingAgePopulation: prefPopulation.result.data
                  .find((v) => v.label === "生産年齢人口")
                  ?.data.find((v) => v.year === year),
                elderlyPopulation: prefPopulation.result.data
                  .find((v) => v.label === "老年人口")
                  ?.data.find((v) => v.year === year),
              },
            };
          },
          {} as Omit<GraphData, "year">,
        ),
      };
    });
  }, [
    years,
    prefCodes,
    populationCompositionPerYears,
    prefectureDictByPrefCode,
  ]);

  return {
    selectedPopulation,
    handleChangePopulation,
    prefectureDictByPrefCode,
    normalizedPopulationCompositionPerYears,
  };
};
