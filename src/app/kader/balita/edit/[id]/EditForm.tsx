"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { updateBalita } from "../../actions";

export default function EditForm({ initialData }: { initialData: any }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    namaIbu: initialData.orangtua.namaIbu || "",
    nikIbu: initialData.orangtua.nikIbu || "",
    noTelp: initialData.orangtua.noTelp || "",
    alamat: initialData.orangtua.alamat || "",
    namaBalita: initialData.namaBalita || "",
    nikBalita: initialData.nikBalita || "",
    tanggalLahir: new Date(initialData.tanggalLahir).toISOString().split('T')[0],
    jenisKelamin: initialData.jenisKelamin || "L",
    beratLahir: initialData.beratLahir || "",
    panjangLahir: initialData.panjangLahir || ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await updateBalita(initialData.id, formData);

      if (!res.success) {
        throw new Error(res.error || "Gagal memperbarui data balita");
      }

      router.push("/kader/balita");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      <div className="flex items-center gap-4">
        <Link href="/kader/balita" className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-500 hover:text-posyandu-blue transition-colors border border-gray-100">
          <i className="fa-solid fa-arrow-left"></i>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ubah Data Balita</h1>
          <p className="text-sm text-gray-500 mt-1">Perbarui profil balita dan identitas ibu</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100 flex items-start gap-3">
          <i className="fa-solid fa-circle-exclamation mt-0.5"></i>
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid md:grid-cols-12 gap-6">
        
        {/* Kolom Kiri: Identitas Ibu */}
        <div className="md:col-span-5 space-y-6">
          {/* Card Identitas Ibu */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-posyandu-blue mb-5 flex items-center gap-2">
              <i className="fa-solid fa-person-breastfeeding"></i> Identitas Ibu
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nama Lengkap Ibu</label>
                <input 
                  type="text" 
                  name="namaIbu"
                  value={formData.namaIbu}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-posyandu-blue/20 focus:border-posyandu-blue outline-none transition-all"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">NIK Ibu</label>
                  <input 
                    type="text" 
                    name="nikIbu"
                    value={formData.nikIbu}
                    onChange={handleChange}
                    required
                    maxLength={16}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-posyandu-blue/20 focus:border-posyandu-blue outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">No Telepon</label>
                  <input 
                    type="text" 
                    name="noTelp"
                    value={formData.noTelp}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-posyandu-blue/20 focus:border-posyandu-blue outline-none transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Alamat</label>
                <textarea 
                  name="alamat"
                  value={formData.alamat}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-posyandu-blue/20 focus:border-posyandu-blue outline-none transition-all resize-none"
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Profil Balita */}
        <div className="md:col-span-7">
          <div className="bg-[#f0fdf4] rounded-2xl shadow-sm border border-green-100 p-6 h-full flex flex-col">
            <h2 className="text-lg font-bold text-green-700 mb-6 flex items-center gap-2">
              <i className="fa-solid fa-child"></i> Profil Balita
            </h2>
            
            <div className="space-y-5 flex-1">
              <div>
                <label className="block text-sm font-semibold text-green-800 mb-1.5">Nama Lengkap Anak</label>
                <input 
                  type="text" 
                  name="namaBalita"
                  value={formData.namaBalita}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 bg-white border border-green-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-green-800 mb-1.5">NIK Anak (Jika Ada)</label>
                <input 
                  type="text" 
                  name="nikBalita"
                  value={formData.nikBalita}
                  onChange={handleChange}
                  maxLength={16}
                  className="w-full px-4 py-2.5 bg-white border border-green-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-green-800 mb-1.5">Tanggal Lahir</label>
                  <input 
                    type="date" 
                    name="tanggalLahir"
                    value={formData.tanggalLahir}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 bg-white border border-green-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-green-800 mb-1.5">Jenis Kelamin</label>
                  <select 
                    name="jenisKelamin"
                    value={formData.jenisKelamin}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 bg-white border border-green-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all appearance-none"
                  >
                    <option value="L">Laki-laki</option>
                    <option value="P">Perempuan</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-green-800 mb-1.5">Berat Saat Lahir (kg)</label>
                  <input 
                    type="number" 
                    step="0.1"
                    name="beratLahir"
                    value={formData.beratLahir}
                    onChange={handleChange}
                    required
                    placeholder="Misal: 3.2"
                    className="w-full px-4 py-2.5 bg-white border border-green-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-green-800 mb-1.5">Panjang Saat Lahir (cm)</label>
                  <input 
                    type="number" 
                    step="0.1"
                    name="panjangLahir"
                    value={formData.panjangLahir}
                    onChange={handleChange}
                    required
                    placeholder="Misal: 50"
                    className="w-full px-4 py-2.5 bg-white border border-green-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all"
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end">
              <button 
                type="submit" 
                disabled={isLoading}
                className="bg-posyandu-blue hover:bg-posyandu-dark text-white font-bold py-3 px-8 rounded-xl transition-all shadow-sm flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <><i className="fa-solid fa-circle-notch fa-spin"></i> Menyimpan...</>
                ) : (
                  <><i className="fa-solid fa-floppy-disk"></i> Perbarui Data</>
                )}
              </button>
            </div>
          </div>
        </div>

      </form>
    </div>
  );
}
