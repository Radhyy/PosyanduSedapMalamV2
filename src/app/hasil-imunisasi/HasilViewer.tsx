"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function HasilViewer({ balitaList, userName }: { balitaList: any[], userName: string }) {
  const [selectedBalitaId, setSelectedBalitaId] = useState(balitaList.length > 0 ? balitaList[0].id : null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [aiRecommendation, setAiRecommendation] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const selectedBalita = balitaList.find(b => b.id === selectedBalitaId);

  useEffect(() => {
    if (!selectedBalita) return;
    const latestPengukuran = selectedBalita.pengukuran?.[0];
    if (!latestPengukuran) {
      setAiRecommendation(null);
      return;
    }

    const fetchAI = async () => {
      setIsAiLoading(true);
      setAiRecommendation(null);
      try {
        const res = await fetch("/api/ai/recommendation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            namaBalita: selectedBalita.namaBalita,
            usia: latestPengukuran.usiaSaatDiukur,
            beratBadan: latestPengukuran.beratBadan,
            tinggiBadan: latestPengukuran.tinggiBadan
          })
        });
        const data = await res.json();
        if (data.recommendation) {
          setAiRecommendation(data.recommendation);
        } else {
          setAiRecommendation("Gagal memuat rekomendasi.");
        }
      } catch (err) {
        setAiRecommendation("Gagal menghubungi asisten AI.");
      } finally {
        setIsAiLoading(false);
      }
    };

    fetchAI();
  }, [selectedBalitaId, selectedBalita]);

  return (
    <div className="bg-[#f4f7fb] min-h-screen pb-20 font-sans">
      
      {/* Premium Navbar */}
      <Navbar />

      {/* Hero Header Section */}
      <div className="relative bg-gradient-to-br from-blue-50 via-white to-[#e3efff] pt-40 pb-32 overflow-hidden border-b border-blue-100/50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 text-blue-600 font-bold text-xs tracking-[0.2em] uppercase mb-4 px-4 py-1.5 rounded-full bg-blue-100/50 border border-blue-200/50">
            <i className="fa-solid fa-chart-line"></i> PANTAU HASIL
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[#102a5e] mb-6 tracking-tight">Tumbuh Kembang & Imunisasi</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Pantau terus perkembangan buah hati Anda. Pastikan setiap tahap pertumbuhannya tercatat dengan baik dan akurat.
          </p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-16">
        
        {balitaList.length === 0 ? (
          <div className="bg-white rounded-[2rem] p-10 text-center shadow-[0_20px_50px_rgb(0,0,0,0.08)]">
            <div className="text-6xl mb-4">🚼</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Belum Ada Data Balita</h3>
            <p className="text-gray-500 max-w-md mx-auto">Anda belum mendaftarkan balita atau data anak Anda belum dimasukkan oleh Kader Posyandu. Silakan hubungi kader setempat.</p>
          </div>
        ) : (
          <>
            {/* Selector Card */}
            <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-[0_20px_50px_rgb(0,0,0,0.08)] border border-gray-100 mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex flex-col md:flex-row items-center gap-6 w-full md:w-auto">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl flex items-center justify-center text-blue-600 text-2xl shadow-inner border border-blue-100/50 shrink-0">
                  <i className="fa-solid fa-child-reaching"></i>
                </div>
                <div className="text-center md:text-left w-full">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Pilih Data Balita</p>
                  <div className="relative inline-block">
                    <select 
                      value={selectedBalitaId || ""} 
                      onChange={(e) => setSelectedBalitaId(Number(e.target.value))} 
                      className="w-full md:w-auto font-black text-2xl md:text-3xl text-[#102a5e] bg-transparent border-none focus:ring-0 p-0 pr-8 cursor-pointer outline-none appearance-none tracking-tight"
                    >
                      {balitaList.map(b => (
                        <option key={b.id} value={b.id}>{b.namaBalita}</option>
                      ))}
                    </select>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-[#102a5e]">
                      <i className="fa-solid fa-chevron-down text-sm"></i>
                    </div>
                  </div>
                </div>
              </div>

              {selectedBalita && (
                <div className="flex flex-wrap justify-center md:justify-end gap-3 w-full md:w-auto">
                  <div className="bg-[#f8fafc] px-5 py-3 rounded-xl border border-gray-100 flex flex-col items-center md:items-start min-w-[140px]">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">NIK Balita</span>
                    <span className="text-sm font-bold text-gray-800">{selectedBalita.nikBalita || "-"}</span>
                  </div>
                  <div className="bg-[#f8fafc] px-5 py-3 rounded-xl border border-gray-100 flex flex-col items-center md:items-start min-w-[140px]">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Tgl Lahir</span>
                    <span className="text-sm font-bold text-gray-800">{new Date(selectedBalita.tanggalLahir).toLocaleDateString('id-ID', {day: 'numeric', month: 'short', year: 'numeric'})}</span>
                  </div>
                </div>
              )}
            </div>

            {/* AI Recommendation Card */}
            {selectedBalita && selectedBalita.pengukuran?.length > 0 && (
              <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-[1.5rem] md:rounded-[2rem] p-5 md:p-8 shadow-[0_20px_50px_rgb(0,0,0,0.05)] border border-purple-100 mb-8 md:mb-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
                
                <div className="relative z-10">
                  <div className="flex flex-row items-center gap-4 mb-5">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-2xl flex items-center justify-center text-purple-600 text-xl md:text-2xl shadow-sm border border-purple-100 shrink-0">
                      <i className="fa-solid fa-wand-magic-sparkles"></i>
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1 flex flex-wrap items-center gap-2">
                        Rekomendasi AI <span className="text-[10px] bg-purple-600 text-white px-2 py-0.5 rounded-full uppercase tracking-widest shrink-0">BETA</span>
                      </h3>
                      <p className="text-xs md:text-sm font-medium text-purple-700/80">Data terakhir (usia {selectedBalita.pengukuran[0].usiaSaatDiukur} bln)</p>
                    </div>
                  </div>
                  
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 md:p-5 border border-white/50 text-gray-800 text-sm leading-relaxed whitespace-pre-wrap font-medium">
                    {isAiLoading ? (
                      <div className="flex items-center gap-3 text-purple-600 animate-pulse font-bold">
                        <i className="fa-solid fa-circle-notch fa-spin"></i> AI sedang menganalisis data {selectedBalita.namaBalita}...
                        </div>
                      ) : (
                        aiRecommendation || "Belum ada rekomendasi."
                      )}
                    </div>
                  </div>
                </div>
            )}

            {selectedBalita && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                
                {/* Riwayat Imunisasi */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4 border-b border-gray-200 pb-4">
                    <div className="w-10 h-10 bg-green-100 text-green-600 rounded-xl flex items-center justify-center text-lg">
                      <i className="fa-solid fa-shield-virus"></i>
                    </div>
                    <h2 className="text-2xl font-bold text-[#102a5e]">Riwayat Imunisasi</h2>
                  </div>

                  <div className="relative">
                    <div className="absolute left-8 top-4 bottom-4 w-0.5 bg-gradient-to-b from-gray-200 to-transparent"></div>
                    <div className="space-y-6">
                      {selectedBalita.imunisasi.length === 0 ? (
                        <p className="text-gray-500 pl-20">Belum ada catatan imunisasi.</p>
                      ) : (
                        selectedBalita.imunisasi.map((imun: any, index: number) => (
                          <div key={imun.id} className="relative pl-20 pr-4 transition-transform hover:-translate-y-1">
                            <div className="absolute left-[1.65rem] top-6 w-3 h-3 bg-blue-500 rounded-full border-4 border-white shadow-sm z-10"></div>
                            
                            <div className="bg-white rounded-2xl p-6 shadow-[0_5px_15px_rgb(0,0,0,0.03)] border border-gray-100 hover:border-blue-100 transition-colors group">
                              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                                  {new Date(imun.tanggalImunisasi).toLocaleDateString('id-ID', {day: 'numeric', month: 'short', year: 'numeric'})}
                                </span>
                                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider bg-green-100 text-green-700">
                                  <i className="fa-solid fa-check mr-1"></i> Selesai
                                </span>
                              </div>
                              <h4 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{imun.jenisImunisasi}</h4>
                              <p className="text-sm font-medium text-gray-500 mb-4">Usia: {imun.usiaSaatImunisasi} Bulan</p>
                              
                              <div className="bg-blue-50/50 rounded-xl p-4 text-sm text-gray-600 flex gap-3 items-start border border-blue-100/30">
                                <i className="fa-solid fa-notes-medical text-blue-400 mt-0.5"></i>
                                <p>{imun.keterangan || "Tidak ada keterangan tambahan."}</p>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                {/* Grafik & Pengukuran */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4 border-b border-gray-200 pb-4">
                    <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center text-lg">
                      <i className="fa-solid fa-chart-simple"></i>
                    </div>
                    <h2 className="text-2xl font-bold text-[#102a5e]">Data Pengukuran</h2>
                  </div>

                  <div className="space-y-6">
                    {selectedBalita.pengukuran.length === 0 ? (
                      <p className="text-gray-500">Belum ada catatan pengukuran.</p>
                    ) : (
                      selectedBalita.pengukuran.map((ukur: any, index: number) => (
                        <div key={ukur.id} className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_5px_15px_rgb(0,0,0,0.03)] border border-gray-100 transition-all hover:shadow-[0_10px_30px_rgb(0,0,0,0.05)] hover:-translate-y-1">
                          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center font-black text-gray-400 text-xl border border-gray-100">
                                #{selectedBalita.pengukuran.length - index}
                              </div>
                              <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                                  {new Date(ukur.tanggalPengukuran).toLocaleDateString('id-ID', {day: 'numeric', month: 'short', year: 'numeric'})}
                                </p>
                                <h4 className="text-lg font-bold text-gray-900">Pengukuran Usia {ukur.usiaSaatDiukur} Bulan</h4>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-6">
                            <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100 flex flex-col items-center justify-center text-center">
                              <i className="fa-solid fa-weight-scale text-blue-400 text-xl mb-2"></i>
                              <span className="text-2xl font-black text-gray-900">{ukur.beratBadan}<span className="text-sm font-bold text-gray-400 ml-1">kg</span></span>
                              <span className="text-xs font-medium text-gray-500 mt-1">Berat Badan</span>
                            </div>
                            <div className="bg-green-50/50 rounded-xl p-4 border border-green-100 flex flex-col items-center justify-center text-center">
                              <i className="fa-solid fa-ruler-vertical text-green-400 text-xl mb-2"></i>
                              <span className="text-2xl font-black text-gray-900">{ukur.tinggiBadan}<span className="text-sm font-bold text-gray-400 ml-1">cm</span></span>
                              <span className="text-xs font-medium text-gray-500 mt-1">Tinggi Badan</span>
                            </div>
                            <div className="bg-purple-50/50 rounded-xl p-4 border border-purple-100 flex flex-col items-center justify-center text-center col-span-2 md:col-span-1">
                              <i className="fa-solid fa-tape text-purple-400 text-xl mb-2"></i>
                              <span className="text-2xl font-black text-gray-900">{ukur.lingkarKepala || "-"}<span className="text-sm font-bold text-gray-400 ml-1">cm</span></span>
                              <span className="text-xs font-medium text-gray-500 mt-1">Lingkar Kepala</span>
                            </div>
                          </div>

                          {ukur.catatan && (
                            <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 flex gap-3 items-start border border-gray-100">
                              <i className="fa-regular fa-comment-dots text-gray-400 mt-0.5"></i>
                              <p className="italic">"{ukur.catatan}"</p>
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>

              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
