import { get } from "./client";
import { beforeAll } from "vitest";

describe("get", () => {
  beforeAll(() => {
    import.meta.env.VITE_API_KEY = "DUMMY_API_KEY";
    import.meta.env.VITE_API_DOMAIN = "http://example.com";
  });

  it("fetchが想定されたパラメーターで呼ばれること", async () => {
    const fetchMock = vi.spyOn(window, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          data: "data",
        }),
        {
          status: 200,
          statusText: "OK",
        },
      ),
    );

    const data = await get("/endpoint");

    expect(data).toEqual({ data: "data" });
    expect(fetchMock).toHaveBeenCalledWith("http://example.com/endpoint", {
      method: "GET",
      headers: {
        "X-API-KEY": "DUMMY_API_KEY",
      },
    });
  });

  it("fetchが失敗すると例外が投げられること", async () => {
    vi.spyOn(window, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          message: "error",
        }),
        {
          status: 400,
          statusText: "Bad Request",
        },
      ),
    );

    await expect(get("/endpoint")).rejects.toThrow("Error: 400 Bad Request");
  });
});
