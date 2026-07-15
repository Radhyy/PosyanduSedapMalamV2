"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteBalita(id: number) {
  try {
    await prisma.balita.delete({
      where: { id }
    });

    revalidatePath("/kader/balita");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete balita:", error);
    return { success: false, error: "Gagal menghapus data balita" };
  }
}

export async function updateBalita(id: number, data: any) {
  try {
    // Parsing dates and numbers
    const parsedBeratLahir = parseFloat(data.beratLahir);
    const parsedPanjangLahir = parseFloat(data.panjangLahir);
    const parsedTanggalLahir = new Date(data.tanggalLahir);

    await prisma.$transaction(async (tx) => {
      // Update Balita
      const balita = await tx.balita.update({
        where: { id },
        data: {
          namaBalita: data.namaBalita,
          nikBalita: data.nikBalita || null,
          tanggalLahir: parsedTanggalLahir,
          jenisKelamin: data.jenisKelamin === "P" ? "P" : "L",
          beratLahir: parsedBeratLahir,
          panjangLahir: parsedPanjangLahir,
        }
      });

      // Update OrangTua
      await tx.orangTua.update({
        where: { id: balita.orangtuaId },
        data: {
          namaIbu: data.namaIbu,
          nikIbu: data.nikIbu,
          noTelp: data.noTelp || null,
          alamat: data.alamat || null,
        }
      });

      // If user provided a new password, we could update the User, but we'll skip it for simplicity unless requested.
      // Usually, passwords should be reset somewhere else.
    });

    revalidatePath("/kader/balita");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to update balita:", error);
    return { success: false, error: "Gagal memperbarui data balita" };
  }
}
