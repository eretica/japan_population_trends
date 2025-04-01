export const get = async <T>(endpoint: string): Promise<T> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_DOMAIN}${endpoint}`,
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
