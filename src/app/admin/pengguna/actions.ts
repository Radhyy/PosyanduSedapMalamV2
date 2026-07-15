"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

export async function createUser(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const role = formData.get("role") as "admin" | "kader";
    
    // Additional fields for Kader
    const nikKader = formData.get("nikKader") as string;

    // Check if username exists
    const existingUser = await prisma.user.findUnique({
      where: { username }
    });

    if (existingUser) {
      return { success: false, error: "Username sudah digunakan" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        username,
        password: hashedPassword,
        role,
        ...(role === 'kader' && {
          kader: {
            create: {
              nikKader: nikKader || "-",
              namaKader: name,
              jabatan: "Anggota"
            }
          }
        })
      }
    });

    revalidatePath("/admin/pengguna");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to create user:", error);
    return { success: false, error: error.message || "Gagal membuat pengguna" };
  }
}

export async function updateUser(id: number, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const password = formData.get("password") as string;
    
    // Only update password if provided
    const updateData: any = { name };
    if (password && password.length >= 6) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const user = await prisma.user.findUnique({ where: { id }, select: { role: true } });
    if (!user) return { success: false, error: "Pengguna tidak ditemukan" };

    if (user.role === 'kader') {
      const nikKader = formData.get("nikKader") as string;
      await prisma.user.update({
        where: { id },
        data: {
          ...updateData,
          kader: {
            update: {
              nikKader: nikKader || "-",
              namaKader: name
            }
          }
        }
      });
    } else {
      await prisma.user.update({
        where: { id },
        data: updateData
      });
    }

    revalidatePath("/admin/pengguna");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to update user:", error);
    return { success: false, error: error.message || "Gagal memperbarui pengguna" };
  }
}

export async function deleteUser(id: number) {
  try {
    // Delete the user (cascade deletion might be needed for kader/orangtua based on prisma schema)
    // Assuming cascading is handled or we just delete user. 
    // Prisma will delete associated Kader/Ibu if onDelete: Cascade is set. 
    // If not, we might need to delete them manually first, but let's try direct deletion.
    await prisma.user.delete({
      where: { id }
    });

    revalidatePath("/admin/pengguna");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete user:", error);
    return { success: false, error: error.message || "Gagal menghapus pengguna" };
  }
}
