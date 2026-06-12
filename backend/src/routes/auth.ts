import type { FastifyInstance } from "fastify";
import { db } from "../lib/db";
import { verifyAuth } from "../middleware/auth";

export async function authRoutes(app: FastifyInstance) {
  app.post("/sync-user", async (request, reply) => {
    const clerkId = await verifyAuth(request, reply);
    if (!clerkId) return; // verifyAuth already sent 401

    const { email, name } = request.body as {
      email: string;
      name?: string;
    };

    if (!email) {
      return reply.code(400).send({ error: "email required" });
    }

    const user = await db.user.upsert({
      where: { clerkId },
      update: { name: name ?? undefined },
      create: { clerkId, email, name: name ?? null },
    });

    return { ok: true, user };
  });
}
