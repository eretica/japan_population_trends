import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePopulationCompositionPerYearQueries } from "./PopulationCompositionPerYear";

describe("usePopulationCompositionPerYearQueries", () => {
  it("selectの利用部分で想定通りのオブジェクトが最終的に生成されていること", async () => {
    vi.spyOn(window, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          message: "",
          result: {
            boundaryYear: 2020,
            data: [
              {
                label: "総人口",
                data: {
                  year: 2020,
                  value: 1000000,
                },
              },
            ],
          },
        }),
        {
          status: 200,
          statusText: "OK",
        },
      ),
    );

    const { result } = renderHook(
      () => usePopulationCompositionPerYearQueries({ prefCodes: [1] }),
      {
        wrapper: ({ children }) => {
          const queryClient = new QueryClient({
            defaultOptions: {
              queries: {
                retry: false,
              },
            },
          });

          return (
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          );
        },
      },
    );

    await waitFor(() => {
      expect(result.current[0].isLoading).toBe(false);
    });

    expect(result.current[0].data).toStrictEqual({
      message: "",
      result: {
        prefCode: 1,
        boundaryYear: 2020,
        data: [
          {
            label: "総人口",
            data: {
              year: 2020,
              value: 1000000,
            },
          },
        ],
      },
    });
  });
});
