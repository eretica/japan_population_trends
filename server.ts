import { serve } from "@hono/node-server";
import "dotenv/config";
import app from "./api";

const port = 3003;

serve({
  fetch: app,
  port,
});

console.log(`🟢 Hono server running at http://localhost:${port}`);
