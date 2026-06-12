import { defineConfig } from "prisma/config";

export default defineConfig({
  // Use simple relative string literals instead of path.join()
  schema: "./prisma/schema.prisma",
  
  migrations: {
    path: "./prisma/migrations",
  },
  
  datasource: {
    url: "postgresql://postgres:mIezojvkPecNGoNlWoLEXaZISNGZXnnZ@thomas.proxy.rlwy.net:30550/railway",
  },
});
