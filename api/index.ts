import { Hono } from "hono";
import "dotenv/config";
import { handle } from "hono/vercel";

const TARGET_API_HOST = process.env.API_DOMAIN;
const API_KEY = process.env.API_KEY;

const app = new Hono();

// すべてのリクエストをプロキシ
app.all("/*", async (c) => {
  const path = c.req.path;
  const url = new URL(c.req.url);
  const queryString = url.search;

  try {
    const endpoint = `${TARGET_API_HOST}${path}${queryString}`;

    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "X-API-KEY": API_KEY,
      },
    });

    const responseData = await response.json();

    return c.json(responseData, 200, {
      // todo origin
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, X-API-KEY",
    });
  } catch (error) {
    console.error("Proxy error:", error);
    return c.json({ error: "Proxy request failed" }, 500);
  }
});

// OPTIONSリクエストに対するCORSヘッダーの設定
app.options("/*", (c) => {
  return c.text("", {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, X-API-KEY",
    },
  });
});

export default handle(app);
