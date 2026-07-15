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

export default function TambahImunisasi() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingBalita, setIsFetchingBalita] = useState(true);
  const [balitaList, setBalitaList] = useState<Balita[]>([]);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    balitaId: "",
    tanggal: new Date().toISOString().split('T')[0], // Set default hari ini
    jenisVaksin: "",
    keterangan: ""
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
      const res = await fetch("/api/kader/imunisasi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Gagal menyimpan catatan imunisasi");
      }

      router.push("/kader/imunisasi");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const daftarVaksin = [
    "BCG", "Hepatitis B (HB-0)", "DPT-HB-Hib 1", "Polio 1", 
    "DPT-HB-Hib 2", "Polio 2", "DPT-HB-Hib 3", "Polio 3", 
    "Polio 4", "IPV", "Campak / MR", "DPT-HB-Hib Lanjutan", 
    "Campak / MR Lanjutan"
  ];

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-10">
      <div className="flex items-center gap-4">
        <Link href="/kader/imunisasi" className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-500 hover:text-blue-600 transition-colors border border-gray-100">
          <i className="fa-solid fa-arrow-left"></i>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Catat Imunisasi Baru</h1>
          <p className="text-sm text-gray-500 mt-1">Isi formulir berikut untuk mencatat riwayat vaksinasi</p>
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
          <i className="fa-solid fa-syringe"></i> Data Imunisasi
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-5">
            {/* Input Dropdown Balita */}
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

            {/* Kolom Tanggal dan Vaksin */}
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Tanggal Pemberian <span className="text-red-500">*</span></label>
                <input 
                  type="date" 
                  name="tanggal"
                  value={formData.tanggal}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-posyandu-blue/20 focus:border-posyandu-blue outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Jenis Vaksin <span className="text-red-500">*</span></label>
                <select 
                  name="jenisVaksin"
                  value={formData.jenisVaksin}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-posyandu-blue/20 focus:border-posyandu-blue outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="" disabled>-- Pilih Vaksin --</option>
                  {daftarVaksin.map(v => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Input Keterangan */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Keterangan Tambahan <span className="text-gray-400 font-normal">(Opsional)</span></label>
              <textarea 
                name="keterangan"
                value={formData.keterangan}
                onChange={handleChange}
                rows={3}
                placeholder="Cth: Suhu tubuh normal, reaksi pasca imunisasi aman..."
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
                <><i className="fa-solid fa-floppy-disk"></i> Simpan Catatan</>
              )}
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
}
