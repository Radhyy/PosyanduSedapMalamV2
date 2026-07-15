import "dotenv/config";
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Start seeding...');

  // The password hash for "password" (bcrypt)
  const passwordHash = '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi';

  const admin = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      name: 'Administrator',
      username: 'admin',
      password: passwordHash,
      role: 'admin',
    },
  });

  const kader = await prisma.user.upsert({
    where: { username: 'kader1' },
    update: {},
    create: {
      name: 'Bidan Sari',
      username: 'kader1',
      password: passwordHash,
      role: 'kader',
    },
  });

  const ortu = await prisma.user.upsert({
    where: { username: 'ortu1' },
    update: {},
    create: {
      name: 'Ibu Budi',
      username: 'ortu1',
      password: passwordHash,
      role: 'orangtua',
    },
  });

  console.log('Seeding finished.');
  console.log({ admin, kader, ortu });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
