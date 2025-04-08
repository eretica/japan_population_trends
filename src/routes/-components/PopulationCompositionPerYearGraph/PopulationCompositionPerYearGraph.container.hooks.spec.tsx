import { usePopulationCompositionPerYearGraphContainer } from "./PopulationCompositionPerYearGraph.container.hooks.ts";
import * as UsePrefecturesQuery from "@/api/prefectures";
import { renderHook } from "@testing-library/react";
import * as UsePopulationCompositionPerYear from "@/api/population/composition/perYear";
import { vi } from "vitest";
import { UseQueryResult, UseSuspenseQueryResult } from "@tanstack/react-query";
import { PrefecturesResponse } from "@/api/prefectures";
import { PopulationCompositionPerYearResponse } from "@/api/population/composition/perYear";

describe("usePopulationCompositionPerYearGraphContainer", () => {
  const setup = () => {
    const usePrefecturesQueryMock = vi
      .spyOn(UsePrefecturesQuery, "usePrefecturesQuery")
      .mockReturnValue({
        data: {
          message: null,
          result: [
            { prefCode: 1, prefName: "北海道" },
            { prefCode: 2, prefName: "青森県" },
            { prefCode: 3, prefName: "岩手県" },
          ],
        },
      } as UseSuspenseQueryResult<PrefecturesResponse>);

    const usePopulationCompositionPerYearMock = vi
      .spyOn(
        UsePopulationCompositionPerYear,
        "usePopulationCompositionPerYearQueries",
      )
      .mockReturnValue([
        {
          data: {
            message: null,
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
        },
        {
          data: undefined,
        },
      ] as UseQueryResult<PopulationCompositionPerYearResponse>[]);

    return {
      usePrefecturesQueryMock,
      usePopulationCompositionPerYearMock,
    };
  };

  it("取得した都道府県のデータを返すこと", () => {
    setup();

    const { result } = renderHook(() =>
      usePopulationCompositionPerYearGraphContainer({
        prefCodes: [1, 2, 3],
      }),
    );

    expect(result.current.prefectures).toStrictEqual([
      {
        prefCode: 1,
        prefName: "北海道",
      },
      {
        prefCode: 2,
        prefName: "青森県",
      },
      {
        prefCode: 3,
        prefName: "岩手県",
      },
    ]);
  });

  it("都道府県が未取得の場合は空配列を返すこと", () => {
    const { usePrefecturesQueryMock } = setup();

    usePrefecturesQueryMock.mockReturnValue({
      data: {},
    } as UseSuspenseQueryResult<PrefecturesResponse>);

    const { result } = renderHook(() =>
      usePopulationCompositionPerYearGraphContainer({
        prefCodes: [1, 2, 3],
      }),
    );

    expect(result.current.prefectures).toStrictEqual([]);
  });

  it("取得が完了したした人口データを返す事", () => {
    setup();

    const { result } = renderHook(() =>
      usePopulationCompositionPerYearGraphContainer({
        prefCodes: [1, 2, 3],
      }),
    );

    expect(result.current.populationCompositionPerYears).toStrictEqual([
      {
        message: null,
        result: {
          boundaryYear: 2020,
          data: [
            {
              data: [
                {
                  value: 111,
                  year: 1998,
                },
                {
                  value: 112,
                  year: 1999,
                },
              ],
              label: "総人口",
            },
            {
              data: [
                {
                  rate: 30,
                  value: 222,
                  year: 1998,
                },
                {
                  rate: 29,
                  value: 223,
                  year: 1999,
                },
              ],
              label: "年少人口",
            },
            {
              data: [
                {
                  rate: 40,
                  value: 333,
                  year: 1998,
                },
                {
                  rate: 39,
                  value: 334,
                  year: 1999,
                },
              ],
              label: "生産年齢人口",
            },
            {
              data: [
                {
                  rate: 50,
                  value: 444,
                  year: 1998,
                },
                {
                  rate: 49,
                  value: 445,
                  year: 1999,
                },
              ],
              label: "老年人口",
            },
          ],
          prefCode: 1,
        },
      },
    ]);
  });

  it("人口データが全て取得な場合は空配列を返す事", () => {
    const { usePopulationCompositionPerYearMock } = setup();

    usePopulationCompositionPerYearMock.mockReturnValue([
      { data: undefined },
      { data: undefined },
    ] as UseQueryResult<PopulationCompositionPerYearResponse>[]);

    const { result } = renderHook(() =>
      usePopulationCompositionPerYearGraphContainer({
        prefCodes: [1, 2, 3],
      }),
    );

    expect(result.current.populationCompositionPerYears).toStrictEqual([]);
  });

  it("prefCodesで指定した値で人口データ取得を呼び出している事", () => {
    const { usePopulationCompositionPerYearMock } = setup();

    renderHook(() =>
      usePopulationCompositionPerYearGraphContainer({
        prefCodes: [1, 2, 3],
      }),
    );

    expect(usePopulationCompositionPerYearMock).toBeCalledWith({
      prefCodes: [1, 2, 3],
    });
  });

  it("データが1つも取得できていない時はeitherLoadedがfalseになる事", () => {
    const { usePopulationCompositionPerYearMock } = setup();

    usePopulationCompositionPerYearMock.mockReturnValue([
      { data: undefined },
      { data: undefined },
    ] as UseQueryResult<PopulationCompositionPerYearResponse>[]);

    const { result } = renderHook(() =>
      usePopulationCompositionPerYearGraphContainer({
        prefCodes: [1, 2, 3],
      }),
    );

    expect(result.current.eitherLoaded).toStrictEqual(false);
  });

  it("データが1つでも取得できている時はeitherLoadedがtrueになる事", () => {
    const { usePopulationCompositionPerYearMock } = setup();

    usePopulationCompositionPerYearMock.mockReturnValue([
      {
        data: {
          message: null,
          result: {
            data: [],
            prefCode: 1,
            boundaryYear: 2020,
          },
        },
      },
      { data: undefined },
    ] as UseQueryResult<PopulationCompositionPerYearResponse>[]);

    const { result } = renderHook(() =>
      usePopulationCompositionPerYearGraphContainer({
        prefCodes: [1, 2, 3],
      }),
    );

    expect(result.current.eitherLoaded).toStrictEqual(true);
  });
});
