"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getActiveJadwal } from "./actions";
import SubscribeModal from "@/components/SubscribeModal";
import dynamic from 'next/dynamic';
const Player = dynamic(() => import('@lottiefiles/react-lottie-player').then(mod => mod.Player), { ssr: false });
import Navbar from "@/components/Navbar";

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeJadwal, setActiveJadwalState] = useState<any>(null);
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    const revealEls = document.querySelectorAll(".reveal");
    revealEls.forEach((el) => observer.observe(el));

    getActiveJadwal().then(setActiveJadwalState);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen pt-[110px] pb-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center bg-gray-50/50">
        <div className="grid-background opacity-40"></div>
        <div className="w-full max-w-[1440px] bg-white rounded-[2.5rem] shadow-[0_8px_40px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden relative z-10">
          
          <div className="flex flex-col lg:flex-row w-full relative p-8 md:p-12 lg:p-16">
            {/* Left Content */}
            <div className="lg:w-[55%] text-left pb-8 lg:pb-0 flex flex-col justify-center reveal reveal-left z-20">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full pl-1.5 pr-4 py-1 mb-6 shadow-sm w-fit transition-transform hover:scale-105 cursor-pointer">
                <div className="w-6 h-6 bg-posyandu-blue text-white rounded-full flex items-center justify-center text-[10px] shadow-inner">
                  <i className="fa-solid fa-star"></i>
                </div>
                <span className="text-xs font-bold text-gray-700">Layanan Kesehatan 2026</span>
                <i className="fa-solid fa-chevron-right text-[10px] text-gray-400 ml-1"></i>
              </div>

              {/* Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-[4rem] font-bold text-gray-900 leading-[1.1] mb-5 tracking-tight">
                Cegah stunting. <br className="hidden md:block" />
                Mulai dari <span className="relative inline-block mt-1 md:mt-0 whitespace-nowrap">
                  <span className="relative z-10 px-2">yang terpenting</span>
                  <span className="absolute bottom-1 md:bottom-2 left-0 w-full h-[45%] bg-[#e3ff73] -z-10 rounded-sm"></span>
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base md:text-lg text-gray-600 mb-8 max-w-lg leading-relaxed">
                Pemantauan tumbuh kembang balita dibuat sederhana, aman, dan mudah diakses oleh setiap keluarga.
              </p>

              {/* Expert Reviews Area */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-100 overflow-hidden flex items-center justify-center z-30">
                    <img src="https://ui-avatars.com/api/?name=Dokter+A&background=0D8ABC&color=fff" alt="Dokter" className="w-full h-full object-cover"/>
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-green-100 overflow-hidden flex items-center justify-center z-20">
                    <img src="https://ui-avatars.com/api/?name=Bidan+B&background=4CAF50&color=fff" alt="Bidan" className="w-full h-full object-cover"/>
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-yellow-100 overflow-hidden flex items-center justify-center z-10">
                    <img src="https://ui-avatars.com/api/?name=Kader+C&background=FF9800&color=fff" alt="Kader" className="w-full h-full object-cover"/>
                  </div>
                </div>
                <div className="text-sm text-gray-700">
                  Lihat <span className="font-bold underline decoration-2 decoration-gray-900 underline-offset-4 cursor-pointer hover:text-posyandu-blue transition-colors">Ulasan Pakar</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="#panduan" className="bg-posyandu-blue hover:bg-posyandu-dark text-white px-7 py-3 rounded-full font-bold text-sm transition-all shadow-[0_8px_20px_rgba(13,110,253,0.3)] hover:shadow-[0_8px_25px_rgba(13,110,253,0.4)] transform hover:-translate-y-0.5 text-center">
                  Daftarkan Balita
                </a>
                <a href="#layanan" className="bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 px-7 py-3 rounded-full font-bold text-sm transition-all transform hover:-translate-y-0.5 shadow-sm hover:shadow-md text-center">
                  Fasilitas
                </a>
              </div>

            </div>

            {/* Right Content - Hero Image */}
            <div className="lg:w-[50%] flex justify-center items-center relative reveal reveal-right mt-10 lg:mt-0">
               <div className="relative w-full max-w-[500px] flex justify-center items-center">
                  {/* Decorative Particles (Behind) */}
                  <Player
                    autoplay
                    loop
                    src="https://lottie.host/1b4fd239-606d-47d6-baad-a1977def18c0/K8gXVvOB1v.json"
                    className="absolute inset-0 w-full h-full z-0 transform scale-125 md:scale-150 opacity-60 pointer-events-none"
                  />
                  
                  {/* Main Baby Animation (Front) */}
                  <Player
                    autoplay
                    loop
                    src="https://lottie.host/2ac282cd-5b3a-4bdc-a82e-cc1eae143681/LHagDvErCZ.json"
                    className="w-full h-auto relative z-10"
                    style={{ width: '100%', maxWidth: '500px' }}
                  />
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* Profil Section */}
      <section id="profil" className="py-24 bg-gray-50/50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-12 reveal">
            <div className="inline-flex items-center gap-2 text-posyandu-blue font-bold text-xs tracking-[0.2em] uppercase mb-4">
              <i className="fa-solid fa-sparkles"></i> PROFIL KAMI
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5">Mengenal Posyandu Sedap Malam</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto font-light">
              Pahami dasar pelayanan kami dalam 3 pilar utama
            </p>
          </div>

          {/* Profile Card */}
          <div className="bg-white rounded-[2.5rem] shadow-[0_8px_40px_rgb(0,0,0,0.04)] border border-gray-100 p-8 md:p-12 lg:p-16 relative overflow-hidden reveal reveal-delay-1 mt-10">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
              
              {/* Left Content */}
              <div className="lg:w-[45%] flex flex-col justify-center relative z-20">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 leading-[1.25] mb-6 tracking-tight">
                  Keluarga sehat dan cerdas, mulai dari lingkungan sekitar
                </h3>
                <p className="text-base text-gray-600 leading-relaxed mb-10 pr-4">
                  Posyandu Sedap Malam berlokasi di RT.03 RW.02 Kelurahan Karang Dalo. Kami berupaya penuh menyelenggarakan pelayanan kesehatan yang dikelola <span className="relative inline-block px-1 mt-1"><span className="relative z-10 font-medium">dari, oleh, dan bersama masyarakat</span><span className="absolute bottom-1 left-0 w-full h-[50%] bg-[#e3ff73] -z-10 rounded-sm"></span></span> guna memberikan kemudahan kesehatan dasar.
                </p>
                
                <div className="mt-auto pt-8">
                  <span className="text-gray-900 font-bold text-xl">01</span>
                </div>
              </div>

              {/* Right Content */}
              <div className="lg:w-[55%] relative flex justify-center items-center z-10">
                <div className="relative w-full transition-transform hover:scale-[1.02] duration-500">
                  <Image src="/Screenshot_2026-07-14_101913-removebg-preview.png" alt="Tampilan Sistem Posyandu" width={800} height={500} className="w-full h-auto object-contain" unoptimized />
                </div>
              </div>

            </div>
          </div>
          
        </div>
      </section>

      {/* Layanan */}
      <section id="layanan" className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-20 reveal">
            <div className="inline-flex items-center gap-2 text-posyandu-blue font-bold text-xs tracking-[0.2em] uppercase mb-4">
              <i className="fa-solid fa-stethoscope"></i> LAYANAN KAMI
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5">Fasilitas & Pelayanan</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto font-light">
              Kami menyediakan berbagai layanan kesehatan dasar terpadu untuk memastikan tumbuh kembang balita berjalan optimal.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            
            {/* Card 1 */}
            <div className="group bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 reveal reveal-delay-1 relative overflow-hidden z-10 text-left">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-posyandu-blue text-2xl mb-6 shadow-sm border border-blue-100 group-hover:scale-110 transition-transform duration-300">
                <i className="fa-solid fa-scale-unbalanced"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">Penimbangan</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Pemantauan berat dan tinggi badan berkala untuk deteksi dini masalah pertumbuhan pada anak.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 reveal reveal-delay-2 relative overflow-hidden z-10 text-left">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full blur-3xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 text-2xl mb-6 shadow-sm border border-green-100 group-hover:scale-110 transition-transform duration-300">
                <i className="fa-solid fa-syringe"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">Imunisasi</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Pemberian vaksin dasar lengkap untuk mencegah berbagai penyakit berbahaya sejak usia dini.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 reveal reveal-delay-3 relative overflow-hidden z-10 text-left">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-full blur-3xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 text-2xl mb-6 shadow-sm border border-orange-100 group-hover:scale-110 transition-transform duration-300">
                <i className="fa-solid fa-apple-whole"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">Gizi & Vitamin</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Pemantauan status gizi, pemberian makanan tambahan (PMT) serta Vitamin A secara rutin.
              </p>
            </div>

            {/* Card 4 */}
            <div className="group bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 reveal reveal-delay-4 relative overflow-hidden z-10 text-left">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-full blur-3xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 text-2xl mb-6 shadow-sm border border-purple-100 group-hover:scale-110 transition-transform duration-300">
                <i className="fa-solid fa-user-doctor"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">Konsultasi KIA</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Layanan konsultasi kesehatan ibu dan anak bersama tenaga kesehatan profesional yang ramah.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Panduan / Tutorial Section */}
      <section id="panduan" className="py-24 bg-[#f4f7fb] relative overflow-hidden border-t border-blue-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center mb-20 reveal">
            <div className="inline-flex items-center gap-2 text-posyandu-blue font-bold text-xs tracking-[0.2em] uppercase mb-4">
              <i className="fa-solid fa-list-check"></i> PANDUAN POSYANDU
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 tracking-tight">
              Cara Mudah Mengikuti Posyandu
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto font-light">
              Ikuti 3 langkah sederhana ini agar kesehatan dan tumbuh kembang buah hati Anda selalu terpantau secara optimal.
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-12 xl:gap-16 pb-8 px-4">
            
            {/* SVG Connecting Line 1 (Hidden on mobile) */}
            <div className="hidden md:block absolute top-[28%] left-[33%] z-20 pointer-events-none transform -translate-x-1/2 -translate-y-1/2">
              <svg width="100" height="60" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M 10,50 C 40,50 60,10 90,10" stroke="#1a73e8" strokeWidth="4" strokeLinecap="round" />
                <circle cx="10" cy="50" r="7" fill="#1a73e8" />
                <circle cx="90" cy="10" r="7" fill="#1a73e8" />
              </svg>
            </div>

            {/* SVG Connecting Line 2 (Hidden on mobile) */}
            <div className="hidden md:block absolute top-[28%] right-[33%] z-20 pointer-events-none transform translate-x-1/2 -translate-y-1/2">
              <svg width="100" height="80" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M 10,10 C 40,10 60,70 90,70" stroke="#1a73e8" strokeWidth="4" strokeLinecap="round" />
                <circle cx="10" cy="10" r="7" fill="#1a73e8" />
                <circle cx="90" cy="70" r="7" fill="#1a73e8" />
              </svg>
            </div>

            {/* Card 1 */}
            <div className="w-full md:w-1/3 bg-white p-8 md:p-10 rounded-[2.5rem] shadow-[0_15px_40px_rgb(0,0,0,0.03)] border border-gray-100 transform -rotate-3 hover:rotate-0 hover:-translate-y-3 hover:shadow-[0_20px_60px_rgb(0,0,0,0.1)] transition-all duration-700 ease-in-out relative z-10 text-center md:text-left reveal reveal-delay-1">
              <div className="text-5xl font-black text-[#102a5e] mb-6 font-sans tracking-tighter">01</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Datang & Daftar</h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                Silakan datang ke Posyandu Sedap Malam pada jadwal yang ditentukan. Bawa KMS atau Buku KIA, lalu daftarkan anak Anda ke kader.
              </p>
            </div>

            {/* Card 2 */}
            <div className="w-full md:w-1/3 bg-white p-8 md:p-10 rounded-[2.5rem] shadow-[0_15px_40px_rgb(0,0,0,0.03)] border border-gray-100 transform rotate-2 hover:rotate-0 hover:-translate-y-3 hover:shadow-[0_20px_60px_rgb(0,0,0,0.1)] transition-all duration-700 ease-in-out relative z-10 md:-mt-8 text-center md:text-left reveal reveal-delay-2">
              <div className="text-5xl font-black text-[#102a5e] mb-6 font-sans tracking-tighter">02</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Pemeriksaan</h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                Anak akan ditimbang, diukur tinggi badannya, dan diberikan imunisasi maupun Vitamin A oleh tenaga kesehatan ahli.
              </p>
            </div>

            {/* Card 3 */}
            <div className="w-full md:w-1/3 bg-white p-8 md:p-10 rounded-[2.5rem] shadow-[0_15px_40px_rgb(0,0,0,0.03)] border border-gray-100 transform -rotate-2 hover:rotate-0 hover:-translate-y-3 hover:shadow-[0_20px_60px_rgb(0,0,0,0.1)] transition-all duration-700 ease-in-out relative z-10 md:mt-8 text-center md:text-left reveal reveal-delay-3">
              <div className="text-5xl font-black text-[#102a5e] mb-6 font-sans tracking-tighter">03</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Pantau Hasil</h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                Kembali ke rumah, Anda dapat langsung melihat catatan hasil pemeriksaan dan riwayat anak secara online di website ini.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Jadwal Section - Clean Professional Design */}
      <section id="jadwal" className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            
            {/* Left Content */}
            <div className="lg:w-[45%] text-center lg:text-left reveal reveal-left">
              <div className="inline-flex items-center gap-2 text-posyandu-blue font-bold text-xs tracking-[0.2em] uppercase mb-4">
                <i className="fa-solid fa-calendar-check"></i> AGENDA TERDEKAT
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-[1.25] mb-6 tracking-tight">
                Pemeriksaan Rutin <br className="hidden lg:block"/>Bulan Ini
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
                Catat tanggalnya dan pastikan kehadiran Anda. Jangan lupa membawa Kartu Menuju Sehat (KMS) atau Buku KIA untuk mempermudah proses pencatatan.
              </p>
              
              <button 
                onClick={() => setIsSubscribeOpen(true)}
                className="bg-posyandu-blue text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-1 transition-all flex items-center gap-2 group w-max"
              >
                <i className="fa-regular fa-bell group-hover:animate-[ring_1s_ease-in-out_infinite]"></i>
                Aktifkan Pengingat
              </button>
            </div>

            {/* Right Content - Clean Event Card */}
            <div className="lg:w-[55%] w-full reveal reveal-right mt-12 lg:mt-0 flex justify-center lg:justify-end">
              
              {!activeJadwal ? (
                <div className="w-full max-w-lg bg-gray-50 rounded-3xl border border-gray-100 flex flex-col items-center justify-center py-20">
                  <i className="fa-solid fa-calendar-xmark text-4xl text-gray-300 mb-4"></i>
                  <p className="text-gray-500 font-medium">Belum ada jadwal aktif bulan ini.</p>
                </div>
              ) : (
                <div className="w-full max-w-lg bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 overflow-hidden transition-transform duration-300 hover:scale-[1.01]">
                  
                  {/* Card Header (Date) */}
                  <div className="bg-posyandu-blue px-8 py-6 text-white flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="bg-white/20 rounded-2xl w-14 h-14 flex items-center justify-center backdrop-blur-sm border border-white/30">
                        <i className="fa-regular fa-calendar text-2xl"></i>
                      </div>
                      <div>
                        <div className="text-blue-100 font-medium uppercase tracking-wider text-xs mb-1">Jadwal Aktif</div>
                        <div className="text-2xl font-bold">
                          {new Date(activeJadwal.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </div>
                      </div>
                    </div>
                    <div className="hidden sm:block text-right">
                      <div className="text-blue-100 text-xs mb-1 uppercase tracking-wider">Status</div>
                      <div className="inline-block bg-[#e3ff73] text-[#4d5c19] text-xs font-bold px-3 py-1 rounded-full">Segera Hadir</div>
                    </div>
                  </div>

                  {/* Card Body (Details) */}
                  <div className="p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Pemeriksaan Rutin Posyandu</h3>
                    
                    <div className="space-y-6">
                      {/* Waktu */}
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 text-posyandu-blue">
                          <i className="fa-regular fa-clock"></i>
                        </div>
                        <div>
                          <div className="text-sm font-bold text-gray-900 mb-1">Waktu Pelaksanaan</div>
                          <div className="text-gray-500 text-sm">{activeJadwal.waktuMulai} - {activeJadwal.waktuSelesai} WIB</div>
                        </div>
                      </div>
                      
                      {/* Lokasi */}
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 text-posyandu-blue">
                          <i className="fa-solid fa-location-dot"></i>
                        </div>
                        <div>
                          <div className="text-sm font-bold text-gray-900 mb-1">Lokasi Posyandu</div>
                          <div className="text-gray-500 text-sm leading-relaxed">{activeJadwal.lokasi}</div>
                        </div>
                      </div>

                      {/* Agenda */}
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 text-posyandu-blue">
                          <i className="fa-solid fa-clipboard-list"></i>
                        </div>
                        <div>
                          <div className="text-sm font-bold text-gray-900 mb-1">Agenda Utama</div>
                          <div className="text-gray-500 text-sm leading-relaxed">{activeJadwal.agenda}</div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              )}
              
            </div>
            
          </div>
        </div>
      </section>


      {/* Pantau Hasil */}
      <section id="pantau" className="py-16 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#f2f7ff] rounded-[2.5rem] p-10 md:p-16 lg:p-20 flex flex-col md:flex-row items-center justify-between gap-12 reveal">
            <div className="md:w-3/5 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-gray-900 mb-6 leading-[1.2] tracking-tight">
                Pantau Hasil Imunisasi & Tumbuh Kembang Anak
              </h2>
              <p className="text-gray-600 text-lg mb-10 max-w-2xl leading-relaxed font-light">
                Ibu dapat langsung mengecek dan memantau status gizi, riwayat penimbangan, serta riwayat imunisasi anak secara online. Cukup klik tombol di bawah ini!
              </p>
              <Link href="/hasil-imunisasi" className="inline-flex items-center gap-3 bg-[#1a73e8] hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-base transition-all shadow-[0_8px_20px_rgba(26,115,232,0.3)] transform hover:-translate-y-1">
                <i className="fa-solid fa-magnifying-glass"></i> Cek Hasil Sekarang
              </Link>
            </div>
            
            <div className="md:w-2/5 flex justify-center mt-10 md:mt-0">
              <Player
                autoplay
                loop
                src="https://lottie.host/14361b7e-f19a-438d-bca2-4c0b65644b4f/8FWbywVr7O.json"
                className="w-full h-auto max-w-[350px]"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="relative bg-[#020813] text-gray-300 pt-20 pb-10 overflow-hidden border-t border-gray-800 mt-auto">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none translate-y-1/2"></div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
            
            {/* Brand Column (Spans 5 cols) */}
            <div className="md:col-span-5 lg:pr-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#1a73e8] to-[#102a5e] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-900/20">
                  <i className="fa-solid fa-hands-holding-child text-2xl"></i>
                </div>
                <div>
                  <span className="font-bold text-2xl text-white block leading-tight tracking-tight">Posyandu</span>
                  <span className="font-bold text-xs text-blue-400 block tracking-[0.2em]">SEDAP MALAM</span>
                </div>
              </div>
              <p className="text-gray-400 mb-8 leading-relaxed text-sm">
                Sistem Informasi Posyandu terpadu untuk memantau tumbuh kembang balita dengan mudah, cepat, dan akurat. Kami berkomitmen memberikan layanan kesehatan terbaik untuk masa depan buah hati Anda.
              </p>
              {/* Social Media */}
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-500 hover:border-blue-500 hover:text-white hover:scale-110 transition-all duration-300">
                  <i className="fa-brands fa-instagram"></i>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-500 hover:border-blue-500 hover:text-white hover:scale-110 transition-all duration-300">
                  <i className="fa-brands fa-whatsapp text-lg"></i>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-500 hover:border-blue-500 hover:text-white hover:scale-110 transition-all duration-300">
                  <i className="fa-brands fa-facebook-f"></i>
                </a>
              </div>
            </div>
            
            {/* Quick Links (Spans 3 cols) */}
            <div className="md:col-span-3">
              <h4 className="text-white font-bold mb-6 text-lg tracking-tight">Tautan Cepat</h4>
              <ul className="space-y-4">
                <li>
                  <a href="#profil" className="group flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors duration-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Profil Posyandu
                  </a>
                </li>
                <li>
                  <a href="#layanan" className="group flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors duration-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Fasilitas & Layanan
                  </a>
                </li>
                <li>
                  <a href="#jadwal" className="group flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors duration-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Jadwal Terdekat
                  </a>
                </li>
                <li>
                  <Link href="/hasil-imunisasi" className="group flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors duration-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Cek Hasil Imunisasi
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Us (Spans 4 cols) */}
            <div className="md:col-span-4">
              <h4 className="text-white font-bold mb-6 text-lg tracking-tight">Kontak Kami</h4>
              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <i className="fa-solid fa-location-dot text-blue-400"></i>
                  </div>
                  <div>
                    <span className="block text-white text-sm font-medium mb-1">Alamat</span>
                    <span className="text-sm text-gray-400 leading-relaxed">RT.03 RW.02, Kel. Karang Dalo<br/>Kota Pagar Alam, Sumatera Selatan</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <i className="fa-solid fa-phone text-blue-400"></i>
                  </div>
                  <div>
                    <span className="block text-white text-sm font-medium mb-1">Telepon / WhatsApp</span>
                    <span className="text-sm text-gray-400">+62 812-3456-7890</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <i className="fa-solid fa-envelope text-blue-400"></i>
                  </div>
                  <div>
                    <span className="block text-white text-sm font-medium mb-1">Email</span>
                    <span className="text-sm text-gray-400">info@posyandusedapmalam.com</span>
                  </div>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm text-gray-500">
              &copy; 2026 Posyandu <span className="text-gray-300 font-medium">SEDAP MALAM</span>. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500 bg-white/5 px-4 py-2 rounded-full border border-white/5 shadow-inner">
              Dibuat dengan <i className="fa-solid fa-heart text-pink-500 animate-pulse text-xs"></i> untuk <span className="text-gray-300 font-medium">Balita Sehat</span>
            </div>
          </div>
        </div>
      </footer>

      <SubscribeModal isOpen={isSubscribeOpen} onClose={() => setIsSubscribeOpen(false)} />
    </>
  );
}
