"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      window.location.href = "/auth/login";
    } catch (error) {
      console.error(error);
      setIsLoggingOut(false);
    }
  };

  const menuItems = [
    { name: "Dashboard", href: "/admin", icon: "fa-table-cells-large" },
    { name: "Data Balita", href: "/admin/balita", icon: "fa-file-lines" },
    { name: "Jadwal Posyandu", href: "/admin/jadwal", icon: "fa-wallet" },
    { name: "Pengguna", href: "/admin/pengguna", icon: "fa-users" },
  ];

  return (
    <aside className={`relative bg-white border-r border-gray-100 hidden md:flex flex-col py-8 font-sans transition-all duration-300 ease-in-out ${isCollapsed ? 'w-[90px]' : 'w-[280px]'} px-4`}>
      {/* Toggle Button */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-8 bg-white border border-gray-100 shadow-sm rounded-full w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors z-50"
      >
        <i className={`fa-solid ${isCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'} text-[10px]`}></i>
      </button>

      {/* Logo */}
      <div className={`mb-8 ${isCollapsed ? 'flex justify-center px-0' : 'px-4'}`}>
        <Link href="/" className="flex items-center gap-3">
          <Image src="/LogoNav.png" alt="Logo" width={32} height={32} className="shrink-0" />
          {!isCollapsed && (
            <div className="overflow-hidden whitespace-nowrap transition-all duration-300">
              <span className="font-bold text-sm text-gray-900 block tracking-tight">Posyandu</span>
              <span className="font-semibold text-[10px] text-gray-500 block uppercase tracking-widest">Sedap Malam</span>
            </div>
          )}
        </Link>
      </div>

      {/* Search Bar */}
      <div className={`mb-8 ${isCollapsed ? 'flex justify-center px-0' : 'px-4'}`}>
        <div className={`flex items-center justify-between bg-gray-50/80 border border-gray-100 rounded-xl py-2 focus-within:ring-2 focus-within:ring-gray-200 transition-all ${isCollapsed ? 'px-3 justify-center' : 'px-3'}`}>
          <div className="flex items-center gap-3 w-full text-gray-400">
            <i className="fa-solid fa-magnifying-glass text-sm shrink-0"></i>
            {!isCollapsed && (
              <input 
                type="text" 
                placeholder="Search" 
                className="bg-transparent border-none focus:ring-0 text-sm font-medium text-gray-700 w-full p-0 placeholder-gray-400 outline-none"
              />
            )}
          </div>
          {!isCollapsed && (
            <div className="flex gap-1.5 ml-2 shrink-0">
              <span className="bg-white border border-gray-200 text-gray-400 text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm">⌘</span>
              <span className="bg-white border border-gray-200 text-gray-400 text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm">S</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className={`mb-4 ${isCollapsed ? 'text-center px-0' : 'px-4'}`}>
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{isCollapsed ? '—' : 'MAIN'}</span>
        </div>
        
        <div className={`space-y-1.5 ${isCollapsed ? 'px-0 flex flex-col items-center' : ''}`}>
          {menuItems.map((item) => {
            const isActive = 
              item.href === "/admin" || item.href === "/"
                ? pathname === item.href
                : pathname.startsWith(item.href);

            return (
              <Link 
                key={item.href}
                href={item.href} 
                className={`flex items-center justify-between py-3 transition-all ${isCollapsed ? 'px-3 rounded-2xl justify-center w-12' : 'px-4 rounded-2xl'} ${
                  isActive 
                    ? "bg-gray-50 text-gray-900 font-bold" 
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium"
                }`}
                title={isCollapsed ? item.name : undefined}
              >
                <div className="flex items-center gap-4">
                  <i className={`fa-solid ${item.icon} w-5 text-lg shrink-0 ${isActive ? 'text-gray-900' : 'text-gray-400'}`}></i> 
                  {!isCollapsed && <span className="text-[15px] tracking-tight whitespace-nowrap">{item.name}</span>}
                </div>
                {!isCollapsed && isActive && (
                  <i className="fa-solid fa-chevron-up text-xs text-gray-900 shrink-0"></i>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Bottom Profile / Logout */}
      <div className={`mt-auto pt-4 flex flex-col gap-2 ${isCollapsed ? 'px-0 items-center' : 'px-4'}`}>
        <Link href="/" className={`flex items-center gap-3 py-2.5 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-gray-50 font-semibold transition-colors text-sm ${isCollapsed ? 'px-0 justify-center w-12' : 'px-4'}`} title={isCollapsed ? "Landing Page" : undefined}>
          <i className="fa-solid fa-globe w-5 shrink-0 text-center"></i> 
          {!isCollapsed && "Landing Page"}
        </Link>
        <button onClick={() => setIsLogoutModalOpen(true)} className={`flex items-center gap-3 py-2.5 rounded-xl text-red-600 hover:bg-red-50 font-semibold transition-colors text-sm ${isCollapsed ? 'px-0 justify-center w-12' : 'px-4'}`} title={isCollapsed ? "Keluar" : undefined}>
          <i className="fa-solid fa-right-from-bracket w-5 shrink-0 text-center"></i> 
          {!isCollapsed && "Keluar"}
        </button>
        <div className={`block rounded-3xl border border-gray-100 bg-gray-50/50 shadow-[0_2px_10px_rgb(0,0,0,0.02)] ${isCollapsed ? 'p-2 w-14' : 'p-3'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-200 shrink-0">
                <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Admin&backgroundColor=f3f4f6" alt="Admin" width={40} height={40} />
              </div>
              {!isCollapsed && (
                <div className="whitespace-nowrap">
                  <span className="text-[15px] font-bold text-gray-900 block">Admin User</span>
                  <span className="text-[11px] text-gray-400 font-medium uppercase tracking-wider block">Administrator</span>
                </div>
              )}
            </div>
            {!isCollapsed && (
              <div className="pr-1 text-gray-400 shrink-0">
                <i className="fa-solid fa-chevron-down text-xs"></i>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Include ConfirmModal from components using dynamic import or directly if imported */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsLogoutModalOpen(false)}></div>
          <div className="bg-white rounded-[24px] shadow-xl w-full max-w-sm relative z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center text-xl mx-auto mb-4">
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Konfirmasi Keluar</h3>
              <p className="text-gray-500 text-sm mb-6">
                Apakah Anda yakin ingin keluar dari akun ini?
              </p>
              <div className="flex items-center gap-3 w-full">
                <button 
                  onClick={() => setIsLogoutModalOpen(false)}
                  disabled={isLoggingOut}
                  className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-colors text-sm"
                >
                  Batal
                </button>
                <button 
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="flex-1 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-colors text-sm flex items-center justify-center gap-2"
                >
                  {isLoggingOut ? <i className="fa-solid fa-circle-notch fa-spin"></i> : "Ya, Keluar"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
