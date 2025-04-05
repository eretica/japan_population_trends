import { usePrefectureCheckboxContainer } from "./PrefectureCheckbox.container.hooks";
import { renderHook } from "@testing-library/react";
import { expect, vi, describe, it } from "vitest";
import * as UsePrefecturesQuery from "@/api/prefectures";
import { PrefecturesResponse } from "@/api/prefectures/prefectures";
import { UseQueryResult } from "@tanstack/react-query";

describe("usePrefectureCheckboxContainer", () => {
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
      } as UseQueryResult<PrefecturesResponse>);

    return {
      usePrefecturesQueryMock,
    };
  };

  it("取得した都道府県のデータを返すこと", () => {
    setup();

    const { result } = renderHook(() => usePrefectureCheckboxContainer());

    expect(result.current.prefectures).toEqual([
      { prefCode: 1, prefName: "北海道" },
      { prefCode: 2, prefName: "青森県" },
      { prefCode: 3, prefName: "岩手県" },
    ]);
  });

  it("未取得の場合はprefecturesは空配列を返す事", () => {
    const { usePrefecturesQueryMock } = setup();

    usePrefecturesQueryMock.mockReturnValue({
      data: undefined,
    } as UseQueryResult<PrefecturesResponse>);

    const { result } = renderHook(() => usePrefectureCheckboxContainer());

    expect(result.current.prefectures).toEqual([]);
  });
});
