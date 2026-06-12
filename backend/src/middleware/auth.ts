import { createClerkClient } from "@clerk/backend";
import type { FastifyRequest, FastifyReply } from "fastify";

const clerk = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY!,
});

export async function verifyAuth(
  request: FastifyRequest,
  reply: FastifyReply
): Promise {
  const authHeader = request.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    reply.code(401).send({ error: "Unauthorized" });
    return null;
  }

  try {
    const token = authHeader.split(" ")[1];
    const payload = await clerk.verifyToken(token);
    return payload.sub; // returns clerkId
  } catch {
    reply.code(401).send({ error: "Invalid token" });
    return null;
  }
}
