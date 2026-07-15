const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function test() {
  const b = await prisma.balita.findUnique({ where: { id: 1 } });
  console.log("Raw:", b);
}
test().finally(() => prisma.$disconnect());
