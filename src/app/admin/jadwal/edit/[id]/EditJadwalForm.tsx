"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { updateJadwal } from "../../actions";

export default function EditJadwalForm({ jadwal }: { jadwal: any }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const result = await updateJadwal(jadwal.id, formData);

    if (result.success) {
      router.push("/admin/jadwal");
    } else {
      setError(result.error || "Terjadi kesalahan");
      setIsSubmitting(false);
    }
  };

  // Convert Date to YYYY-MM-DD for input default value
  const dateStr = new Date(jadwal.tanggal).toISOString().split('T')[0];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/jadwal" className="w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-gray-500 hover:text-posyandu-blue hover:border-posyandu-blue transition-colors">
          <i className="fa-solid fa-arrow-left"></i>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit Jadwal</h1>
          <p className="text-gray-500">Ubah rincian jadwal posyandu</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl flex items-start gap-3 text-sm">
            <i className="fa-solid fa-circle-exclamation mt-0.5"></i>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1.5">
            <label htmlFor="tanggal" className="text-sm font-medium text-gray-700">Tanggal Pelaksanaan <span className="text-red-500">*</span></label>
            <input type="date" id="tanggal" name="tanggal" required defaultValue={dateStr}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-posyandu-blue focus:border-posyandu-blue outline-none transition-all" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="waktuMulai" className="text-sm font-medium text-gray-700">Waktu Mulai <span className="text-red-500">*</span></label>
              <input type="time" id="waktuMulai" name="waktuMulai" required defaultValue={jadwal.waktuMulai}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-posyandu-blue focus:border-posyandu-blue outline-none transition-all" />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="waktuSelesai" className="text-sm font-medium text-gray-700">Waktu Selesai <span className="text-red-500">*</span></label>
              <input type="time" id="waktuSelesai" name="waktuSelesai" required defaultValue={jadwal.waktuSelesai}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-posyandu-blue focus:border-posyandu-blue outline-none transition-all" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="lokasi" className="text-sm font-medium text-gray-700">Lokasi <span className="text-red-500">*</span></label>
            <input type="text" id="lokasi" name="lokasi" required defaultValue={jadwal.lokasi}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-posyandu-blue focus:border-posyandu-blue outline-none transition-all" />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="agenda" className="text-sm font-medium text-gray-700">Agenda Kegiatan <span className="text-red-500">*</span></label>
            <textarea id="agenda" name="agenda" required rows={3} defaultValue={jadwal.agenda}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-posyandu-blue focus:border-posyandu-blue outline-none transition-all resize-none"></textarea>
          </div>

          <div className="pt-4 flex justify-end">
            <button type="submit" disabled={isSubmitting}
              className={`bg-posyandu-blue text-white px-6 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-posyandu-dark'}`}>
              {isSubmitting ? (
                <><i className="fa-solid fa-spinner fa-spin"></i> Menyimpan...</>
              ) : (
                <><i className="fa-solid fa-check"></i> Simpan Perubahan</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
