import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const {
      username,
      password,
      namaIbu,
      nikIbu,
      noTelp,
      alamat,
      namaBalita,
      nikBalita,
      tanggalLahir,
      jenisKelamin,
      beratLahir,
      panjangLahir
    } = body;

    // Basic Validation
    if (!username || !password || !namaIbu || !nikIbu || !namaBalita || !tanggalLahir || !beratLahir || !panjangLahir) {
      return NextResponse.json(
        { error: "Mohon lengkapi semua field yang wajib diisi" },
        { status: 400 }
      );
    }

    // Check if username already exists
    const existingUser = await prisma.user.findUnique({
      where: { username }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Username sudah digunakan, silakan pilih username lain" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Parse numeric fields and dates
    const parsedBeratLahir = parseFloat(beratLahir);
    const parsedPanjangLahir = parseFloat(panjangLahir);
    const parsedTanggalLahir = new Date(tanggalLahir);

    // Create User, OrangTua, and Balita in a single transaction
    const result = await prisma.$transaction(async (tx) => {
      // 1. Create User
      const user = await tx.user.create({
        data: {
          name: namaIbu,
          username,
          password: hashedPassword,
          role: "orangtua",
        }
      });

      // 2. Create OrangTua Profile
      const orangTua = await tx.orangTua.create({
        data: {
          userId: user.id,
          namaIbu,
          nikIbu,
          noTelp: noTelp || null,
          alamat: alamat || null,
        }
      });

      // 3. Create Balita
      const balita = await tx.balita.create({
        data: {
          orangtuaId: orangTua.id,
          namaBalita,
          nikBalita: nikBalita || null,
          tanggalLahir: parsedTanggalLahir,
          jenisKelamin: jenisKelamin === "P" ? "P" : "L",
          beratLahir: parsedBeratLahir,
          panjangLahir: parsedPanjangLahir,
        }
      });

      return { user, orangTua, balita };
    });

    return NextResponse.json(
      { message: "Data balita dan akun orang tua berhasil ditambahkan", data: result },
      { status: 201 }
    );

  } catch (error: any) {
    console.error("Error creating balita:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan internal server" },
      { status: 500 }
    );
  }
}
