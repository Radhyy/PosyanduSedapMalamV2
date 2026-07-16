"use client";

import { useState, useEffect } from "react";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [showContextMenu, setShowContextMenu] = useState(false);

  // Menutup menu klik kanan jika user mengklik di tempat lain
  useEffect(() => {
    const closeMenu = () => setShowContextMenu(false);
    window.addEventListener("click", closeMenu);
    return () => window.removeEventListener("click", closeMenu);
  }, []);

  // Mapping ukuran khusus laptop
  const sizeClasses = {
    sm: "md:h-11 md:w-11",
    md: "md:h-14 md:w-14",
    lg: "md:h-18 md:w-18"
  };

  const iconSizes = {
    sm: "md:h-5 md:w-5",
    md: "md:h-7 md:w-7",
    lg: "md:h-9 md:w-9"
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes customFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animasi-melayang {
          animation: customFloat 3s ease-in-out infinite;
        }
      `}} />

      {/* 1. INTERFACES MENU KLIK KANAN (Hanya muncul saat klik kanan di laptop) */}
      {!isOpen && showContextMenu && (
        <div className="hidden md:block absolute bottom-full right-0 mb-2 bg-white/90 backdrop-blur-sm border border-gray-100 shadow-xl rounded-xl p-1.5 min-w-[120px] animate-in fade-in slide-in-from-bottom-2 duration-200">
          <p className="text-[10px] font-bold text-gray-400 px-2.5 py-1 uppercase tracking-wider">Ukuran Ikon</p>
          <button 
            onClick={() => setSize('sm')} 
            className={`w-full text-left px-2.5 py-1.5 text-xs rounded-lg font-medium transition-colors ${size === 'sm' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            Kecil
          </button>
          <button 
            onClick={() => setSize('md')} 
            className={`w-full text-left px-2.5 py-1.5 text-xs rounded-lg font-medium transition-colors ${size === 'md' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            Normal
          </button>
          <button 
            onClick={() => setSize('lg')} 
            className={`w-full text-left px-2.5 py-1.5 text-xs rounded-lg font-medium transition-colors ${size === 'lg' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            Besar
          </button>
        </div>
      )}

      {/* 2. FLOATING BUTTON CHATBOT */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          onContextMenu={(e) => {
            e.preventDefault(); // Mencegah menu bawaan browser muncul
            setShowContextMenu(true);
          }}
          title="Klik kiri untuk chat, Klik kanan untuk ubah ukuran"
          className={`animasi-melayang flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-[0_4px_20px_rgba(37,99,235,0.3)] transition-all hover:scale-105 active:scale-95 ${sizeClasses[size]}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className={`h-7 w-7 transition-all ${iconSizes[size]}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.813 15.904 9 21l8.982-5.03c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018c0 1.602 1.123 2.994 2.707 3.227l4.856.618Z"
            />
          </svg>
        </button>
      )}

      {/* 3. JENDELA CHAT ASISTEN AI */}
      {isOpen && (
        <div className="
          fixed inset-0 flex flex-col bg-white shadow-[0_10px_40px_rgba(0,0,0,0.12)]
          md:absolute md:bottom-0 md:right-0 md:top-auto md:left-auto
          md:h-[530px] md:w-[380px] md:rounded-2xl md:border md:border-gray-100
        ">
          {/* HEADER CHAT */}
          <div className="flex items-center justify-between bg-blue-600 p-4 text-white md:rounded-t-2xl">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.7)]"></div>
              <div>
                <span className="font-semibold block text-sm tracking-wide">Asisten AI</span>
                <span className="text-[10px] text-blue-200 block -mt-0.5">Sistem Siap Membantu</span>
              </div>
            </div>
            
            {/* TOMBOL BATAL (Icon X) */}
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg hover:bg-white/20 text-white/90 hover:text-white transition-colors"
              aria-label="Tutup Chat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* BODY CHAT */}
          <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4">
            <div className="flex items-start gap-2.5 max-w-[85%]">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                AI
              </div>
              <div className="rounded-2xl rounded-tl-none bg-white p-3 text-sm text-gray-700 shadow-sm border border-gray-100 leading-relaxed">
                Halo! Saya **Asisten AI**. Ada yang bisa saya bantu terkait informasi tumbuh kembang balita hari ini?
              </div>
            </div>
          </div>

          {/* FOOTER INPUT CHAT */}
          <div className="border-t border-gray-100 p-4 bg-white md:rounded-b-2xl">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Tanyakan sesuatu pada Asisten AI..."
                className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
              />
              <button className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 active:scale-95 transition-all shadow-sm">
                Kirim
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}