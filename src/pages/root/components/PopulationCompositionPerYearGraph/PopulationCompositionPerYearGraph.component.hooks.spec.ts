import { usePopulationCompositionPerYearGraph } from "./PopulationCompositionPerYearGraph.component.hooks.ts";
import { renderHook, act } from "@testing-library/react";
import { expect } from "vitest";

describe("usePopulationCompositionPerYearGraph", () => {
  it("総人口が人口表示タイプの初期値であること", () => {
    const { result } = renderHook(() =>
      usePopulationCompositionPerYearGraph({
        prefCodes: [],
        prefectures: [],
        populationCompositionPerYears: [],
      }),
    );

    expect(result.current.selectedPopulation).toBe("totalPopulation");
  });

  it("handleChangePopulationで人口表示タイプが変わること", () => {
    const { result } = renderHook(() =>
      usePopulationCompositionPerYearGraph({
        prefCodes: [],
        prefectures: [],
        populationCompositionPerYears: [],
      }),
    );

    act(() => result.current.handleChangePopulation("youngPopulation"));

    expect(result.current.selectedPopulation).toBe("youngPopulation");
  });

  it("渡したデータからグラフ用のデータを作成する", () => {
    const { result } = renderHook(() =>
      usePopulationCompositionPerYearGraph({
        prefCodes: [1, 2, 3],
        prefectures: [
          { prefCode: 1, prefName: "北海道" },
          { prefCode: 2, prefName: "青森県" },
          { prefCode: 3, prefName: "岩手県" },
        ],
        populationCompositionPerYears: [
          {
            message: "success",
            result: {
              prefCode: 1,
              boundaryYear: 2020,
              data: [
                {
                  label: "総人口",
                  data: [
                    { year: 1998, value: 111 },
                    { year: 1999, value: 112 },
                  ],
                },
                {
                  label: "年少人口",
                  data: [
                    { year: 1998, value: 222, rate: 30 },
                    { year: 1999, value: 223, rate: 29 },
                  ],
                },
                {
                  label: "生産年齢人口",
                  data: [
                    { year: 1998, value: 333, rate: 40 },
                    { year: 1999, value: 334, rate: 39 },
                  ],
                },
                {
                  label: "老年人口",
                  data: [
                    { year: 1998, value: 444, rate: 50 },
                    { year: 1999, value: 445, rate: 49 },
                  ],
                },
              ],
            },
          },
          {
            message: "success",
            result: {
              prefCode: 2,
              boundaryYear: 2020,
              data: [
                {
                  label: "総人口",
                  data: [
                    { year: 1998, value: 555 },
                    { year: 1999, value: 556 },
                  ],
                },
                {
                  label: "年少人口",
                  data: [
                    { year: 1998, value: 666, rate: 10 },
                    { year: 1999, value: 667, rate: 9 },
                  ],
                },
                {
                  label: "生産年齢人口",
                  data: [
                    { year: 1998, value: 777, rate: 20 },
                    { year: 1999, value: 778, rate: 19 },
                  ],
                },
                {
                  label: "老年人口",
                  data: [
                    { year: 1998, value: 888, rate: 30 },
                    { year: 1999, value: 889, rate: 29 },
                  ],
                },
              ],
            },
          },
        ],
      }),
    );

    expect(
      result.current.normalizedPopulationCompositionPerYears,
    ).toStrictEqual([
      {
        year: 1998,
        "1": {
          prefName: "北海道",
          boundaryYear: 2020,
          elderlyPopulation: {
            rate: 50,
            value: 444,
            year: 1998,
          },
          totalPopulation: {
            value: 111,
            year: 1998,
          },
          workingAgePopulation: {
            rate: 40,
            value: 333,
            year: 1998,
          },
          youngPopulation: {
            rate: 30,
            value: 222,
            year: 1998,
          },
        },
        "2": {
          prefName: "青森県",
          boundaryYear: 2020,
          elderlyPopulation: {
            rate: 30,
            value: 888,
            year: 1998,
          },
          totalPopulation: {
            value: 555,
            year: 1998,
          },
          workingAgePopulation: {
            rate: 20,
            value: 777,
            year: 1998,
          },
          youngPopulation: {
            rate: 10,
            value: 666,
            year: 1998,
          },
        },
        "3": {
          prefName: "岩手県",
        },
      },
      {
        year: 1999,
        "1": {
          prefName: "北海道",
          boundaryYear: 2020,
          elderlyPopulation: {
            rate: 49,
            value: 445,
            year: 1999,
          },
          totalPopulation: {
            value: 112,
            year: 1999,
          },
          workingAgePopulation: {
            rate: 39,
            value: 334,
            year: 1999,
          },
          youngPopulation: {
            rate: 29,
            value: 223,
            year: 1999,
          },
        },
        "2": {
          prefName: "青森県",
          boundaryYear: 2020,
          elderlyPopulation: {
            rate: 29,
            value: 889,
            year: 1999,
          },
          totalPopulation: {
            value: 556,
            year: 1999,
          },
          workingAgePopulation: {
            rate: 19,
            value: 778,
            year: 1999,
          },
          youngPopulation: {
            rate: 9,
            value: 667,
            year: 1999,
          },
        },
        "3": {
          prefName: "岩手県",
        },
      },
    ]);
  });

  it("populationCompositionPerYearsが空の場合はnormalizedPopulationCompositionPerYearsは空配列を返すこと", () => {
    const { result } = renderHook(() =>
      usePopulationCompositionPerYearGraph({
        prefCodes: [],
        prefectures: [],
        populationCompositionPerYears: [],
      }),
    );

    expect(
      result.current.normalizedPopulationCompositionPerYears,
    ).toStrictEqual([]);
  });

  it("prefCodeをもとにprefCodeとprefName,取得済みののマッピングを作成すること", () => {
    const { result } = renderHook(() =>
      usePopulationCompositionPerYearGraph({
        prefCodes: [],
        prefectures: [
          { prefCode: 1, prefName: "北海道" },
          { prefCode: 2, prefName: "青森県" },
          { prefCode: 3, prefName: "岩手県" },
        ],
        populationCompositionPerYears: [
          {
            message: null,
            result: {
              prefCode: 2,
              data: [
                {
                  label: "老年人口",
                  data: [{ year: 2022, rate: 2, value: 100 }],
                },
              ],
              boundaryYear: 2022,
            },
          },
        ],
      }),
    );

    expect(result.current.prefectureDictByPrefCode).toStrictEqual({
      1: { name: "北海道", isLoaded: false },
      2: { name: "青森県", isLoaded: true },
      3: { name: "岩手県", isLoaded: false },
    });
  });
});
