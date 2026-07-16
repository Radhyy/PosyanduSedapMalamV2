"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.user) setUser(data.user);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.push("/auth/login");
  };

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <nav id="navbar" className="bg-white/95 backdrop-blur-md rounded-full shadow-lg px-6 md:px-10 py-3 flex items-center justify-between w-full max-w-[1440px] border border-gray-100 transition-all">
        <Link href="/" className="flex items-center gap-3 cursor-pointer flex-shrink-0">
          <Image src="/LogoNav.png" alt="Logo Posyandu" width={36} height={36} className="h-9 w-auto" />
          <div>
            <span className="font-bold text-base text-[#102a5e] block leading-tight">Posyandu</span>
            <span className="font-semibold text-xs text-blue-500 block leading-tight">SEDAP MALAM</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-7">
          <Link href="/#profil" className="text-gray-600 hover:text-blue-600 font-medium text-sm transition-colors">Profil</Link>
          <Link href="/#layanan" className="text-gray-600 hover:text-blue-600 font-medium text-sm transition-colors">Layanan</Link>
          <Link href="/#jadwal" className="text-gray-600 hover:text-blue-600 font-medium text-sm transition-colors">Jadwal</Link>
          <Link href="/hasil-imunisasi" className="text-gray-600 hover:text-blue-600 font-medium text-sm transition-colors">Pantau Hasil</Link>
          <Link href="/#artikel" className="text-gray-600 hover:text-blue-600 font-medium text-sm transition-colors">Artikel</Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="relative group">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 bg-gray-50 hover:bg-blue-50 px-4 py-2 rounded-full border border-gray-100 cursor-pointer transition-colors">
                <i className="fa-solid fa-user-circle text-blue-500 text-lg"></i> 
                {user.displayName}
                <i className="fa-solid fa-chevron-down text-xs ml-1 text-gray-400"></i>
              </div>
              
              {/* Dropdown Menu */}
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right translate-y-2 group-hover:translate-y-0">
                <div className="p-2 space-y-1">
                  <div className="px-3 py-2 pb-3 mb-1 border-b border-gray-50">
                    <div className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Masuk Sebagai</div>
                    <div className="text-sm font-bold text-gray-900">{user.role}</div>
                  </div>
                  {user.role !== 'orangtua' && (
                    <Link 
                      href={user.role === 'admin' ? '/admin' : '/kader'} 
                      className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 rounded-xl hover:bg-blue-50 hover:text-posyandu-blue transition-colors"
                    >
                      <i className="fa-solid fa-table-columns w-4 text-center"></i> Dashboard
                    </Link>
                  )}
                  <button 
                    onClick={handleLogout} 
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-600 rounded-xl hover:bg-red-50 transition-colors text-left"
                  >
                    <i className="fa-solid fa-arrow-right-from-bracket w-4 text-center"></i> Keluar
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link href="/auth/login" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-semibold text-sm transition-all shadow flex items-center gap-2">
              <i className="fa-solid fa-right-to-bracket"></i> Login
            </Link>
          )}
        </div>

        <div className="md:hidden flex items-center">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600 hover:text-blue-600 focus:outline-none p-2">
            <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-2xl`}></i>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-[110%] right-4 left-4 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 md:hidden flex flex-col gap-2">
          <Link href="/#profil" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 hover:bg-blue-50 rounded-xl text-gray-700 font-medium">Profil</Link>
          <Link href="/#layanan" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 hover:bg-blue-50 rounded-xl text-gray-700 font-medium">Layanan</Link>
          <Link href="/#jadwal" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 hover:bg-blue-50 rounded-xl text-gray-700 font-medium">Jadwal</Link>
          <Link href="/hasil-imunisasi" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 hover:bg-blue-50 rounded-xl text-gray-700 font-medium">Pantau Hasil</Link>
          <Link href="/#artikel" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 hover:bg-blue-50 rounded-xl text-gray-700 font-medium">Artikel</Link>
          <hr className="my-2 border-gray-100" />
          {user ? (
            <>
              <div className="px-4 py-3 text-gray-700 font-bold bg-gray-50 rounded-xl flex items-center gap-2">
                <i className="fa-solid fa-user-circle text-blue-500"></i> {user.displayName}
              </div>
              {user.role !== 'orangtua' && (
                <Link 
                  href={user.role === 'admin' ? '/admin' : '/kader'} 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="px-4 py-3 text-gray-700 font-bold hover:bg-blue-50 rounded-xl flex items-center gap-3"
                >
                  <i className="fa-solid fa-table-columns w-4 text-center"></i> Ke Dashboard
                </Link>
              )}
              <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="w-full text-left px-4 py-3 text-red-600 font-bold hover:bg-red-50 rounded-xl flex items-center gap-3">
                <i className="fa-solid fa-arrow-right-from-bracket w-4 text-center"></i> Logout
              </button>
            </>
          ) : (
            <Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl font-bold text-center">
              Login
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
