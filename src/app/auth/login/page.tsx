"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login gagal");
      }

      // Redirect based on role
      if (data.user.role === "admin") {
        router.push("/admin/balita"); // or /admin
      } else if (data.user.role === "kader") {
        router.push("/kader");
      } else {
        router.push("/hasil-imunisasi"); // Or /orangtua if it exists
      }
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 font-sans relative overflow-hidden">
      
      {/* Subtle Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-200/30 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Back Button */}
      <div className="absolute top-6 left-6 md:top-8 md:left-8 z-20">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors font-bold text-sm bg-white/80 backdrop-blur-sm px-4 py-2.5 rounded-full shadow-sm border border-gray-100 hover:shadow-md">
          <i className="fa-solid fa-arrow-left text-xs"></i> Kembali
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/LogoNav.png" alt="Logo Posyandu" width={48} height={48} className="h-12 w-auto drop-shadow-sm" />
            <div className="text-left">
              <span className="font-bold text-xl text-[#102a5e] block leading-tight tracking-tight">Posyandu</span>
              <span className="font-bold text-xs text-blue-500 block leading-tight tracking-widest">SEDAP MALAM</span>
            </div>
          </Link>
        </div>
        
        <div className="bg-white py-10 px-6 sm:px-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] rounded-[2.5rem] border border-gray-100/80">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Masuk ke Akun</h2>
            <p className="text-sm text-gray-500 mt-2 font-medium">Silakan masukkan kredensial Anda untuk melanjutkan</p>
          </div>

          {errorMsg && (
            <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold border border-red-100 flex items-center gap-3">
              <i className="fa-solid fa-circle-exclamation"></i>
              <p>{errorMsg}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="username" className="block text-sm font-bold text-gray-700 mb-2">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <i className="fa-regular fa-user"></i>
                </div>
                <input 
                  type="text" 
                  id="username" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required 
                  className="block w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-medium"
                  placeholder="Contoh: admin" 
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="password" className="block text-sm font-bold text-gray-700">Password</label>
                <a href="#" className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors">Lupa Password?</a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <i className="fa-solid fa-lock text-sm opacity-70"></i>
                </div>
                <input 
                  type={showPassword ? "text" : "password"} 
                  id="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                  className="block w-full pl-11 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-medium"
                  placeholder="Masukkan password Anda" 
                />
                <div 
                  className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer text-gray-400 hover:text-gray-600 transition-colors" 
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 pb-2">
              <div className="flex items-center">
                <input id="remember-me" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer transition-colors" />
                <label htmlFor="remember-me" className="ml-2 block text-sm font-bold text-gray-500 cursor-pointer">
                  Ingat Saya
                </label>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full flex justify-center items-center gap-2 py-4 px-4 border border-transparent rounded-2xl shadow-[0_8px_20px_rgba(37,99,235,0.2)] text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 hover:shadow-[0_8px_25px_rgba(37,99,235,0.3)] transform hover:-translate-y-0.5 transition-all focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <><i className="fa-solid fa-circle-notch fa-spin"></i> Memproses...</>
              ) : (
                <>Masuk Sekarang <i className="fa-solid fa-arrow-right-to-bracket ml-1"></i></>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-400 font-medium leading-relaxed">
              Sistem Informasi Terpadu Posyandu SEDAP MALAM. <br/>Akses khusus untuk Admin, Kader, dan Orang Tua.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
