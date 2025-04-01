type QueryParams = Record<string, string | number | boolean>;

export const get = async <T>(
  endpoint: string,
  params?: QueryParams,
): Promise<T> => {
  // オブジェクトをqueryStringに変換。booleanやnumberは文字列に変換して渡す
  const query = params
    ? new URLSearchParams(
        Object.fromEntries(
          Object.entries(params).map(([key, value]) => [key, String(value)]),
        ),
      )
    : "";

  const response = await fetch(
    `${import.meta.env.VITE_API_DOMAIN}${endpoint}${query ? `?${query}` : ""}`,
    {
      method: "GET",
      headers: {
        "X-API-KEY": import.meta.env.VITE_API_KEY,
      },
    },
  );

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  return response.json() as T;
};
