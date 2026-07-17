import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function PanduanPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16 animate-in slide-in-from-bottom-5 duration-700">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 font-bold text-sm mb-6 border border-blue-100">
              <i className="fa-solid fa-book-open"></i>
              Pusat Bantuan
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-[#102a5e] mb-6 tracking-tight leading-tight">
              Panduan Lengkap <br />
              <span className="text-blue-600">Posyandu Sedap Malam</span>
            </h1>
            <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto font-medium">
              Pelajari cara menggunakan berbagai fitur di Posyandu Sedap Malam untuk memastikan tumbuh kembang si kecil terpantau dengan baik.
            </p>
          </div>

          <div className="space-y-8 relative">
            {/* Dekorasi Garis Vertikal */}
            <div className="absolute left-6 md:left-8 top-10 bottom-10 w-0.5 bg-blue-100 hidden md:block z-0"></div>

            {/* PANDUAN ORANG TUA */}
            <div className="bg-white rounded-[24px] p-6 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative z-10 transition-transform hover:-translate-y-1 duration-300">
              <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                <div className="md:w-1/3 shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl mb-6 border border-blue-100">
                    <i className="fa-solid fa-children"></i>
                  </div>
                  <h2 className="text-2xl font-black text-gray-900 mb-2">Untuk Orang Tua</h2>
                  <p className="text-sm text-gray-500 font-medium">Cara memantau perkembangan anak Anda dengan mudah.</p>
                </div>
                
                <div className="md:w-2/3 space-y-6">
                  <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-2">
                      <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">1</span>
                      Mendaftar / Login
                    </h3>
                    <p className="text-gray-600 text-sm ml-8 leading-relaxed">
                      Klik tombol <strong>Masuk</strong> di kanan atas. Masukkan email dan kata sandi yang telah didaftarkan oleh Kader Posyandu. Jika belum punya akun, silakan hubungi Kader Posyandu terdekat.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-2">
                      <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">2</span>
                      Memantau Hasil Imunisasi
                    </h3>
                    <p className="text-gray-600 text-sm ml-8 leading-relaxed">
                      Buka menu <strong>Pantau Hasil</strong> di menu utama (atau cari berdasarkan ID/Nama Balita tanpa harus login). Anda akan melihat riwayat tinggi badan, berat badan, serta status gizi anak.
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-2">
                      <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">3</span>
                      Chat dengan Asisten AI
                    </h3>
                    <p className="text-gray-600 text-sm ml-8 leading-relaxed">
                      Ada pertanyaan seputar kesehatan bayi atau obat bebas? Klik <strong>ikon robot melayang</strong> di pojok kanan bawah layar. AI kami akan menjawab pertanyaan Anda dengan ramah dan akurat!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* PANDUAN KADER */}
            <div className="bg-white rounded-[24px] p-6 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative z-10 transition-transform hover:-translate-y-1 duration-300">
              <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                <div className="md:w-1/3 shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl mb-6 border border-emerald-100">
                    <i className="fa-solid fa-user-nurse"></i>
                  </div>
                  <h2 className="text-2xl font-black text-gray-900 mb-2">Untuk Kader</h2>
                  <p className="text-sm text-gray-500 font-medium">Cara mengelola data balita dan kunjungan posyandu.</p>
                </div>
                
                <div className="md:w-2/3 space-y-6">
                  <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-2">
                      <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">1</span>
                      Menambahkan Balita Baru
                    </h3>
                    <p className="text-gray-600 text-sm ml-8 leading-relaxed">
                      Login dengan akun Kader. Masuk ke menu <strong>Data Balita</strong> lalu klik tombol <strong>Tambah Balita</strong>. Isi data diri anak beserta data Orang Tua.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-2">
                      <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">2</span>
                      Input Pengukuran & Imunisasi
                    </h3>
                    <p className="text-gray-600 text-sm ml-8 leading-relaxed">
                      Buka menu <strong>Input Pengukuran</strong> atau <strong>Input Imunisasi</strong>. Cari nama balita yang hadir, lalu masukkan berat badan, tinggi badan, atau jenis vaksin yang diberikan hari ini.
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-2">
                      <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">3</span>
                      Download Laporan (Excel)
                    </h3>
                    <p className="text-gray-600 text-sm ml-8 leading-relaxed">
                      Untuk melaporkan hasil kegiatan Posyandu bulan ini ke Puskesmas, cukup buka menu <strong>Laporan & Grafik</strong>, lalu klik tombol <strong>Export Excel</strong> di kanan atas.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="mt-16 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Masih Butuh Bantuan?</h3>
            <p className="text-gray-500 mb-8">Tim kami selalu siap membantu Anda jika mengalami kesulitan.</p>
            <Link href="https://wa.me/6285738804915" target="_blank" className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-3 rounded-xl font-bold transition-transform hover:-translate-y-1 shadow-lg shadow-green-500/30">
              <i className="fa-brands fa-whatsapp text-xl"></i>
              Hubungi via WhatsApp
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
