import type { FastifyInstance } from "fastify";
import { db } from "../lib/db";

export async function healthRoute(app: FastifyInstance) {
  app.get("/health", async () => {
    try {
      await db.$queryRaw`SELECT 1`;
      return {
        status: "ok",
        db: "connected",
        timestamp: new Date().toISOString(),
      };
    } catch {
      return {
        status: "ok",
        db: "disconnected",
        timestamp: new Date().toISOString(),
      };
    }
  });
}
