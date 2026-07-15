"use client";

import { useState } from "react";
import { subscribeToReminder } from "@/app/actions/email";

export default function SubscribeModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    const result = await subscribeToReminder(email);
    
    if (result.success) {
      setMessage({ type: 'success', text: result.message! });
      setEmail("");
      // Jangan langsung tutup modal agar user bisa baca pesan sukses
    } else {
      setMessage({ type: 'error', text: result.error! });
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl relative overflow-hidden">
        {/* Background Decorative */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-50 rounded-full blur-2xl -z-10"></div>
        
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-100 text-posyandu-blue rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
            <i className="fa-solid fa-envelope-open-text"></i>
          </div>
          <h3 className="text-xl font-bold text-gray-900">Notifikasi Jadwal</h3>
          <p className="text-gray-500 text-sm mt-2">Dapatkan pengingat langsung ke Gmail Anda setiap ada jadwal Posyandu terbaru.</p>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-xl flex items-start gap-3 text-sm ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
            <i className={`fa-solid mt-0.5 ${message.type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'}`}></i>
            <p>{message.text}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">Alamat Gmail</label>
            <input 
              type="email" 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="contoh@gmail.com" 
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-posyandu-blue focus:border-posyandu-blue outline-none transition-all"
            />
          </div>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`w-full py-3 rounded-xl font-medium text-white flex justify-center items-center gap-2 transition-all shadow-lg ${isSubmitting ? 'bg-posyandu-blue/70 cursor-not-allowed' : 'bg-posyandu-blue hover:bg-posyandu-dark shadow-blue-500/30'}`}
          >
            {isSubmitting ? (
              <><i className="fa-solid fa-spinner fa-spin"></i> Memproses...</>
            ) : (
              <>Aktifkan Sekarang <i className="fa-solid fa-paper-plane"></i></>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
