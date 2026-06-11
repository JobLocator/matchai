import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import dotenv from "dotenv";
import { healthRoute } from "./routes/health";
import { authRoutes } from "./routes/auth";

dotenv.config();

const app = Fastify({ logger: true });

async function start() {
  await app.register(cors, {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  });
  await app.register(helmet);

  app.register(healthRoute);
  app.register(authRoutes, { prefix: "/api/auth" });

  const port = Number(process.env.PORT) || 3001;
  await app.listen({ port, host: "0.0.0.0" });
  console.log(`Server running on http://localhost:${port}`);
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
