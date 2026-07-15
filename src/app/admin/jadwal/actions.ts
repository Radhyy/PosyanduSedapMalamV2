"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function setActiveJadwal(id: number) {
  try {
    // 1. Matikan semua jadwal (isActive = false)
    await prisma.jadwalPosyandu.updateMany({
      data: { isActive: false }
    });

    // 2. Nyalakan jadwal yang dipilih (isActive = true)
    await prisma.jadwalPosyandu.update({
      where: { id },
      data: { isActive: true }
    });

    // 3. Refresh halaman admin dan landing page agar perubahan langsung terlihat
    revalidatePath('/admin/jadwal');
    revalidatePath('/');
    
    return { success: true };
  } catch (error) {
    console.error("Failed to set active jadwal:", error);
    return { success: false, error: "Gagal mengaktifkan jadwal" };
  }
}

export async function createJadwal(formData: FormData) {
  try {
    const tanggalStr = formData.get("tanggal") as string;
    let tanggal: Date;
    if (tanggalStr.includes('/')) {
      const [day, month, year] = tanggalStr.split('/');
      tanggal = new Date(`${year}-${month}-${day}`);
    } else if (tanggalStr.includes('-') && tanggalStr.split('-')[0].length !== 4) {
      const [day, month, year] = tanggalStr.split('-');
      tanggal = new Date(`${year}-${month}-${day}`);
    } else {
      tanggal = new Date(tanggalStr);
    }
    
    if (isNaN(tanggal.getTime())) {
      throw new Error(`Format tanggal tidak valid: ${tanggalStr}`);
    }
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

    revalidatePath("/admin/jadwal");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to create jadwal:", error);
    require('fs').writeFileSync('c:\\Users\\ADVAN\\Downloads\\posyandu-sedapmalam-nextjs\\error.log', String(error) + '\n' + (error.stack || ''));
    return { success: false, error: "Gagal menyimpan jadwal" };
  }
}
