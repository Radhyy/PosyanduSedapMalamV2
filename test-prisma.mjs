import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function test() {
  try {
    const tanggal = new Date("2026-07-16");
    console.log("Tanggal parsed:", tanggal);
    
    await prisma.jadwalPosyandu.create({
      data: {
        tanggal: tanggal,
        waktuMulai: "08:00",
        waktuSelesai: "11:00",
        lokasi: "Cluster Jasmine Block A/12, Green Palm Sidoarjo",
        agenda: "Pemeriksaan Kesehatan Bayi",
        isActive: false
      }
    });
    console.log("Berhasil!");
  } catch (err) {
    console.error("Prisma error:", err);
  }
}
test();
