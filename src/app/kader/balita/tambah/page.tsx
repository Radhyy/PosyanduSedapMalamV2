"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function TambahBalita() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    namaIbu: "",
    nikIbu: "",
    noTelp: "",
    alamat: "",
    namaBalita: "",
    nikBalita: "",
    tanggalLahir: "",
    jenisKelamin: "L",
    beratLahir: "",
    panjangLahir: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/kader/balita", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Gagal menambahkan data balita");
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
          <h1 className="text-2xl font-bold text-gray-900">Tambah Data Balita</h1>
          <p className="text-sm text-gray-500 mt-1">Registrasi balita baru beserta akun login orang tua</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100 flex items-start gap-3">
          <i className="fa-solid fa-circle-exclamation mt-0.5"></i>
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid md:grid-cols-12 gap-6">
        
        {/* Kolom Kiri: Akun & Identitas Ibu */}
        <div className="md:col-span-5 space-y-6">
          
          {/* Card Kredensial Akun */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2">
              <i className="fa-solid fa-users text-gray-400"></i> Kredensial Akun (Login Ortu)
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Username Login</label>
                <input 
                  type="text" 
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-posyandu-blue/20 focus:border-posyandu-blue outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-posyandu-blue/20 focus:border-posyandu-blue outline-none transition-all"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

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

              <div className="bg-green-50 rounded-xl p-4 mt-6 flex gap-3 text-sm text-green-800 border border-green-100">
                <i className="fa-solid fa-circle-info mt-0.5"></i>
                <p>Pastikan data awal lahir valid, data ini menjadi dasar grafik pertumbuhan anak di sistem.</p>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end">
              <button 
                type="submit" 
                disabled={isLoading}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-sm flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <><i className="fa-solid fa-circle-notch fa-spin"></i> Menyimpan...</>
                ) : (
                  <><i className="fa-solid fa-floppy-disk"></i> Simpan Data Balita</>
                )}
              </button>
            </div>
          </div>
        </div>

      </form>
    </div>
  );
}
