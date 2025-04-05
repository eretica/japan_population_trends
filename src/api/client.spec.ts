import { get } from "./client";

describe("get", () => {
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
    expect(fetchMock).toHaveBeenCalledWith("/api/endpoint", {
      method: "GET",
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

  it("パラメーターを指定した場合、fetchが想定されたパラメーターで呼ばれること", async () => {
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

    await get("/endpoint", {
      char: "str",
      emptyString: "",
      numeric: 0,
      boolean: false,
    });

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/endpoint?char=str&emptyString=&numeric=0&boolean=false",
      {
        method: "GET",
      },
    );
  });
});
