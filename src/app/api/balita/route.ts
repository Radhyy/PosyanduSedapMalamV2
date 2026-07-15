import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const balitaList = await prisma.balita.findMany({
      select: {
        id: true,
        namaBalita: true,
        nikBalita: true,
        orangtua: {
          select: { namaIbu: true }
        }
      },
      orderBy: { namaBalita: 'asc' }
    });

    return NextResponse.json(balitaList, { status: 200 });
  } catch (error) {
    console.error("Error fetching balita list:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data balita" },
      { status: 500 }
    );
  }
}
