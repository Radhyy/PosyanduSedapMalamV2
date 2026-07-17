import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-[#020813] text-gray-300 pt-20 pb-10 overflow-hidden border-t border-gray-800 mt-auto w-full">
      {/* Glow Effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none translate-y-1/2"></div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
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
                <Link href="/#profil" className="group flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors duration-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Profil Posyandu
                </Link>
              </li>
              <li>
                <Link href="/#layanan" className="group flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors duration-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Fasilitas & Layanan
                </Link>
              </li>
              <li>
                <Link href="/#jadwal" className="group flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors duration-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Jadwal Terdekat
                </Link>
              </li>
              <li>
                <Link href="/hasil-imunisasi" className="group flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors duration-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Cek Hasil Imunisasi
                </Link>
              </li>
              <li>
                <Link href="/panduan" className="group flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors duration-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Panduan
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
  );
}
