"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deletePengukuran(id: number) {
  try {
    await prisma.pengukuran.delete({
      where: { id }
    });

    revalidatePath("/kader/pengukuran");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete pengukuran:", error);
    return { success: false, error: "Gagal menghapus data pengukuran" };
  }
}

export async function updatePengukuran(id: number, data: any) {
  try {
    await prisma.pengukuran.update({
      where: { id },
      data: {
        balitaId: parseInt(data.balitaId),
        tanggalPengukuran: new Date(data.tanggal),
        beratBadan: parseFloat(data.beratBadan),
        tinggiBadan: parseFloat(data.tinggiBadan),
        lingkarKepala: data.lingkarKepala ? parseFloat(data.lingkarKepala) : null,
        catatan: data.catatan || null,
      }
    });

    revalidatePath("/kader/pengukuran");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to update pengukuran:", error);
    return { success: false, error: "Gagal memperbarui data pengukuran" };
  }
}
