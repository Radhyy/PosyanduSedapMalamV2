import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function test() {
  try {
    const formData = new URLSearchParams();
    formData.append('tanggal', '2026-07-16');
    formData.append('waktuMulai', '08:00');
    formData.append('waktuSelesai', '11:00');
    formData.append('lokasi', 'Test Lokasi');
    formData.append('agenda', 'Test Agenda');

    const tanggal = new Date(formData.get("tanggal") as string);
    const waktuMulai = formData.get("waktuMulai") as string;
    const waktuSelesai = formData.get("waktuSelesai") as string;
    const lokasi = formData.get("lokasi") as string;
    const agenda = formData.get("agenda") as string;

    await prisma.jadwalPosyandu.create({
      data: {
        tanggal,
        waktuMulai,
        waktuSelesai,
        lokasi,
        agenda,
        isActive: false
      }
    });
    console.log("Berhasil!");
  } catch (err) {
    console.error("Prisma error:", err);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}
test();
