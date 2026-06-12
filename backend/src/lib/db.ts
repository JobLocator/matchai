import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../prisma/generated/prisma/client";

let _client: PrismaClient | undefined;

function getClient(): PrismaClient {
  if (!_client) {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const adapter = new PrismaPg(pool);
    _client = new PrismaClient({ adapter, log: ["error"] });
  }
  return _client;
}

export const db = new Proxy({} as PrismaClient, {
  get(_t, prop) {
    return (getClient() as any)[prop];
  },
});
