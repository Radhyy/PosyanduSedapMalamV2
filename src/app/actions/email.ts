"use server";

import prisma from "@/lib/prisma";
import nodemailer from "nodemailer";

export async function subscribeToReminder(email: string) {
  try {
    // 1. Validasi email sederhana
    if (!email || !email.includes('@')) {
      return { success: false, error: "Alamat email tidak valid." };
    }

    // 2. Cek apakah email sudah terdaftar
    const existing = await prisma.pengingatJadwal.findUnique({
      where: { email }
    });

    if (existing) {
      if (!existing.statusAktif) {
        // Jika sebelumnya dimatikan, aktifkan kembali
        await prisma.pengingatJadwal.update({
          where: { email },
          data: { statusAktif: true }
        });
        return { success: true, message: "Pengingat diaktifkan kembali!" };
      }
      return { success: false, error: "Email ini sudah terdaftar untuk menerima pengingat." };
    }

    // 3. Simpan email baru ke database
    await prisma.pengingatJadwal.create({
      data: { email }
    });

    // 4. Kirim Email Selamat Datang (hanya jika ada konfigurasi)
    const { EMAIL_USER, EMAIL_APP_PASSWORD } = process.env;

    if (!EMAIL_USER || !EMAIL_APP_PASSWORD) {
      // Jika user belum setting email di .env, kita kembalikan sukses tapi beri catatan di console
      console.warn("⚠️ Fitur Email belum dikonfigurasi. Email disimpan ke database, tetapi notifikasi sambutan tidak dikirim. Harap isi EMAIL_USER dan EMAIL_APP_PASSWORD di .env");
      return { success: true, message: "Berhasil didaftarkan! (Notifikasi email sedang dinonaktifkan oleh Admin)" };
    }

    // Konfigurasi SMTP Nodemailer untuk Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_APP_PASSWORD,
      },
    });

    // Konten Email
    const mailOptions = {
      from: `"Posyandu SEDAP MALAM" <${EMAIL_USER}>`,
      to: email,
      subject: 'Pendaftaran Pengingat Posyandu Berhasil! 🎉',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px;">
          <h2 style="color: #2563eb; text-align: center;">Halo!</h2>
          <p>Terima kasih telah mendaftar layanan pengingat jadwal Posyandu SEDAP MALAM.</p>
          <p>Mulai sekarang, Anda akan menerima email notifikasi setiap kali ada jadwal kegiatan Posyandu terdekat (seperti penimbangan, imunisasi, dan lainnya).</p>
          <br/>
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; border-left: 4px solid #3b82f6;">
            <strong>Jangan lupa!</strong> Bawa selalu Buku KIA / KMS Anda setiap berkunjung ke Posyandu.
          </div>
          <br/>
          <p>Salam Sehat,<br/><strong>Kader Posyandu SEDAP MALAM</strong></p>
        </div>
      `,
    };

    // Kirim email
    await transporter.sendMail(mailOptions);

    return { success: true, message: "Berhasil didaftarkan! Silakan cek kotak masuk Gmail Anda." };

  } catch (error: any) {
    console.error("Gagal mendaftarkan email:", error);
    return { success: false, error: "Gagal menyimpan pendaftaran. Coba lagi nanti." };
  }
}
