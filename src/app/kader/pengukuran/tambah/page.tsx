"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Tipe data balita untuk dropdown
type Balita = {
  id: number;
  namaBalita: string;
  nikBalita: string | null;
  orangtua: { namaIbu: string };
};

export default function TambahPengukuran() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingBalita, setIsFetchingBalita] = useState(true);
  const [balitaList, setBalitaList] = useState<Balita[]>([]);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    balitaId: "",
    tanggal: new Date().toISOString().split('T')[0], // Set default hari ini
    beratBadan: "",
    tinggiBadan: "",
    lingkarKepala: "",
    catatan: ""
  });

  // Fetch daftar balita saat halaman dimuat
  useEffect(() => {
    const fetchBalita = async () => {
      try {
        const res = await fetch("/api/balita");
        if (!res.ok) throw new Error("Gagal memuat daftar balita");
        const data = await res.json();
        setBalitaList(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsFetchingBalita(false);
      }
    };
    fetchBalita();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/kader/pengukuran", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Gagal menyimpan data pengukuran");
      }

      router.push("/kader/pengukuran");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-10">
      <div className="flex items-center gap-4">
        <Link href="/kader/pengukuran" className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-500 hover:text-[#ff7a00] transition-colors border border-gray-100">
          <i className="fa-solid fa-arrow-left"></i>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Catat Pengukuran Baru</h1>
          <p className="text-sm text-gray-500 mt-1">Masukkan hasil timbangan dan tinggi badan balita</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100 flex items-start gap-3">
          <i className="fa-solid fa-circle-exclamation mt-0.5"></i>
          <p>{error}</p>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h2 className="text-lg font-bold text-posyandu-blue mb-6 flex items-center gap-2">
          <i className="fa-solid fa-weight-scale"></i> Data Pengukuran
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-5">
            {/* Input Dropdown Balita */}
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Pilih Nama Balita <span className="text-red-500">*</span></label>
                <select 
                  name="balitaId"
                  value={formData.balitaId}
                  onChange={handleChange}
                  required
                  disabled={isFetchingBalita}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-posyandu-blue/20 focus:border-posyandu-blue outline-none transition-all appearance-none disabled:bg-gray-100 disabled:text-gray-400 cursor-pointer"
                >
                  <option value="" disabled>
                    {isFetchingBalita ? "Memuat data balita..." : "-- Pilih Balita yang Terdaftar --"}
                  </option>
                  {balitaList.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.namaBalita} (Ibu: {b.orangtua.namaIbu})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Tanggal Pengukuran <span className="text-red-500">*</span></label>
                <input 
                  type="date" 
                  name="tanggal"
                  value={formData.tanggal}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-posyandu-blue/20 focus:border-posyandu-blue outline-none transition-all"
                />
              </div>
            </div>

            {/* Kolom Berat, Tinggi, Lingkar Kepala */}
            <div className="grid md:grid-cols-3 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Berat Badan (kg) <span className="text-red-500">*</span></label>
                <input 
                  type="number" 
                  step="0.1"
                  name="beratBadan"
                  value={formData.beratBadan}
                  onChange={handleChange}
                  required
                  placeholder="Contoh: 6.5"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-posyandu-blue/20 focus:border-posyandu-blue outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Tinggi Badan (cm) <span className="text-red-500">*</span></label>
                <input 
                  type="number" 
                  step="0.1"
                  name="tinggiBadan"
                  value={formData.tinggiBadan}
                  onChange={handleChange}
                  required
                  placeholder="Contoh: 65.2"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-posyandu-blue/20 focus:border-posyandu-blue outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Lingkar Kepala <span className="text-gray-400 font-normal">(cm)</span></label>
                <input 
                  type="number" 
                  step="0.1"
                  name="lingkarKepala"
                  value={formData.lingkarKepala}
                  onChange={handleChange}
                  placeholder="Opsional"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-posyandu-blue/20 focus:border-posyandu-blue outline-none transition-all"
                />
              </div>
            </div>

            {/* Input Keterangan */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Catatan Tambahan <span className="text-gray-400 font-normal">(Opsional)</span></label>
              <textarea 
                name="catatan"
                value={formData.catatan}
                onChange={handleChange}
                rows={3}
                placeholder="Contoh: Balita sehat, aktif, nafsu makan bertambah..."
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-posyandu-blue/20 focus:border-posyandu-blue outline-none transition-all resize-none"
              ></textarea>
            </div>
          </div>
          
          <div className="pt-4 flex justify-end">
            <button 
              type="submit" 
              disabled={isLoading || isFetchingBalita}
              className="bg-posyandu-blue hover:bg-posyandu-dark text-white font-bold py-3 px-8 rounded-xl transition-all shadow-sm flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <><i className="fa-solid fa-circle-notch fa-spin"></i> Menyimpan...</>
              ) : (
                <><i className="fa-solid fa-floppy-disk"></i> Simpan Pengukuran</>
              )}
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
}
