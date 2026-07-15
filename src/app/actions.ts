"use server";

import prisma from "@/lib/prisma";

export async function getActiveJadwal() {
  return await prisma.jadwalPosyandu.findFirst({
    orderBy: { tanggal: 'asc' }
  });
}
