import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { balitaId, tanggal, beratBadan, tinggiBadan, lingkarKepala, catatan } = body;

    // Validasi input dasar
    if (!balitaId || !tanggal || !beratBadan || !tinggiBadan) {
      return NextResponse.json(
        { error: "Semua field yang ditandai bintang (*) wajib diisi" },
        { status: 400 }
      );
    }

    // Ambil data balita untuk menghitung usia saat pengukuran
    const balita = await prisma.balita.findUnique({
      where: { id: parseInt(balitaId, 10) }
    });

    if (!balita) {
      return NextResponse.json(
        { error: "Balita tidak ditemukan" },
        { status: 404 }
      );
    }

    const parsedTanggal = new Date(tanggal);
    
    // Hitung usia dalam bulan saat pengukuran
    const birthDate = new Date(balita.tanggalLahir);
    let months = (parsedTanggal.getFullYear() - birthDate.getFullYear()) * 12;
    months -= birthDate.getMonth();
    months += parsedTanggal.getMonth();
    const usiaBulan = months <= 0 ? 0 : months;

    // Simpan ke database
    const pengukuranBaru = await prisma.pengukuran.create({
      data: {
        balitaId: parseInt(balitaId, 10),
        tanggalPengukuran: parsedTanggal,
        usiaSaatDiukur: usiaBulan,
        beratBadan: parseFloat(beratBadan),
        tinggiBadan: parseFloat(tinggiBadan),
        lingkarKepala: lingkarKepala ? parseFloat(lingkarKepala) : null,
        catatan: catatan || "",
      }
    });

    return NextResponse.json(
      { message: "Data pengukuran berhasil ditambahkan", data: pengukuranBaru },
      { status: 201 }
    );

  } catch (error: any) {
    console.error("Error creating pengukuran:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat menyimpan data pengukuran" },
      { status: 500 }
    );
  }
}
