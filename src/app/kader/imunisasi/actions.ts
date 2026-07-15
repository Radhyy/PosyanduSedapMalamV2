"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteImunisasi(id: number) {
  try {
    await prisma.imunisasi.delete({
      where: { id }
    });

    revalidatePath("/kader/imunisasi");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete imunisasi:", error);
    return { success: false, error: "Gagal menghapus data imunisasi" };
  }
}

export async function updateImunisasi(id: number, data: any) {
  try {
    await prisma.imunisasi.update({
      where: { id },
      data: {
        balitaId: parseInt(data.balitaId),
        tanggalImunisasi: new Date(data.tanggal),
        jenisImunisasi: data.jenisVaksin,
        keterangan: data.keterangan || null,
      }
    });

    revalidatePath("/kader/imunisasi");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to update imunisasi:", error);
    return { success: false, error: "Gagal memperbarui data imunisasi" };
  }
}
