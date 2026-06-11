import type { FastifyInstance } from "fastify";

export async function authRoutes(app: FastifyInstance) {
  // Called by frontend after Clerk sign-up to create DB row
  app.post("/sync-user", async (request, reply) => {
    const { clerkId, email, name } = request.body as {
      clerkId: string;
      email: string;
      name: string;
    };

    if (!clerkId || !email) {
      return reply.code(400).send({ error: "clerkId and email required" });
    }

    // TODO Phase 1 week 2: upsert into users table via Prisma
    // For now, return success so frontend flow works
    return { ok: true, user: { clerkId, email, name } };
  });
}
