import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined };

// Force Next.js HMR to drop the old cached Prisma client
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = undefined;
}

let prisma: PrismaClient;

if (typeof window === "undefined") {
  if (process.env.NODE_ENV === "production") {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const adapter = new PrismaPg(pool);
    prisma = new PrismaClient({ adapter });
  } else {
    if (!globalForPrisma.prisma) {
      const pool = new Pool({ connectionString: process.env.DATABASE_URL });
      const adapter = new PrismaPg(pool);
      globalForPrisma.prisma = new PrismaClient({ adapter });
    }
    prisma = globalForPrisma.prisma;
  }
}

export default prisma!;
