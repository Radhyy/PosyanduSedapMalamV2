"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { updateUser } from "../../actions";

export default function EditUserForm({ user }: { user: any }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const result = await updateUser(user.id, formData);

    if (result.success) {
      router.push("/admin/pengguna");
    } else {
      setError(result.error || "Terjadi kesalahan");
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/pengguna" className="w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-gray-500 hover:text-posyandu-blue hover:border-posyandu-blue transition-colors">
          <i className="fa-solid fa-arrow-left"></i>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit Pengguna</h1>
          <p className="text-gray-500">Perbarui informasi akun {user.username}</p>
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
            <label htmlFor="name" className="text-sm font-medium text-gray-700">Nama Lengkap <span className="text-red-500">*</span></label>
            <input type="text" id="name" name="name" required defaultValue={user.name}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-posyandu-blue focus:border-posyandu-blue outline-none transition-all" />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">Password Baru (Opsional)</label>
            <input type="password" id="password" name="password" placeholder="Kosongkan jika tidak ingin mengubah" minLength={6}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-posyandu-blue focus:border-posyandu-blue outline-none transition-all" />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Peran (Role)</label>
            <input type="text" disabled value={user.role === 'admin' ? 'Admin' : 'Kader'}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 outline-none cursor-not-allowed" />
            <p className="text-xs text-gray-500 mt-1">Peran tidak dapat diubah setelah akun dibuat.</p>
          </div>

          {user.role === "kader" && (
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <i className="fa-solid fa-address-card text-gray-400"></i>
                <h3 className="text-sm font-bold text-gray-700">Informasi Tambahan Kader</h3>
              </div>
              <div className="space-y-1.5">
                <label htmlFor="nikKader" className="text-sm font-medium text-gray-700">NIK Kader <span className="text-red-500">*</span></label>
                <input type="text" id="nikKader" name="nikKader" required maxLength={16} defaultValue={user.kader?.nikKader}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-posyandu-blue focus:border-posyandu-blue outline-none transition-all" />
              </div>
            </div>
          )}

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
    </>
  );
}
