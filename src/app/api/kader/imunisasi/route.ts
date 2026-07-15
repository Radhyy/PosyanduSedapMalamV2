import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { balitaId, tanggal, jenisVaksin, keterangan } = body;

    // Validasi input dasar
    if (!balitaId || !tanggal || !jenisVaksin) {
      return NextResponse.json(
        { error: "Mohon isi nama balita, tanggal, dan jenis vaksin" },
        { status: 400 }
      );
    }

    // Ambil data balita untuk menghitung usia saat imunisasi
    const balita = await prisma.balita.findUnique({
      where: { id: parseInt(balitaId, 10) }
    });

    if (!balita) {
      return NextResponse.json(
        { error: "Balita tidak ditemukan" },
        { status: 404 }
      );
    }

    // Pastikan tanggal valid
    const parsedTanggal = new Date(tanggal);
    
    // Hitung usia dalam bulan saat imunisasi
    const birthDate = new Date(balita.tanggalLahir);
    let months = (parsedTanggal.getFullYear() - birthDate.getFullYear()) * 12;
    months -= birthDate.getMonth();
    months += parsedTanggal.getMonth();
    const usiaBulan = months <= 0 ? 0 : months;

    // Simpan ke database
    const imunisasiBaru = await prisma.imunisasi.create({
      data: {
        balitaId: parseInt(balitaId, 10),
        tanggalImunisasi: parsedTanggal,
        usiaSaatImunisasi: usiaBulan,
        jenisImunisasi: jenisVaksin,
        keterangan: keterangan || "",
      }
    });

    return NextResponse.json(
      { message: "Catatan imunisasi berhasil ditambahkan", data: imunisasiBaru },
      { status: 201 }
    );

  } catch (error: any) {
    console.error("Error creating imunisasi:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat menyimpan catatan imunisasi" },
      { status: 500 }
    );
  }
}
