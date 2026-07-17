"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";

const Player = dynamic(
  () => import('@lottiefiles/react-lottie-player').then((mod) => mod.Player),
  { ssr: false }
);

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [showContextMenu, setShowContextMenu] = useState(false);
  
  // Chat state
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { role: "assistant", content: "Halo! Saya **Asisten AI Spesialis Anak**. Ada yang bisa saya bantu terkait informasi tumbuh kembang balita dan kesehatan hari ini?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const closeMenu = () => setShowContextMenu(false);
    window.addEventListener("click", closeMenu);
    return () => window.removeEventListener("click", closeMenu);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 200);
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] })
      });

      if (!response.ok) throw new Error("API Error");
      
      const data = await response.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.message || data.error }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: "assistant", content: "Maaf, terjadi kesalahan saat menghubungi AI. Coba lagi nanti." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const sizeClasses = {
    sm: "md:h-11 md:w-11",
    md: "md:h-14 md:w-14",
    lg: "md:h-18 md:w-18"
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes customFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes customPopUp {
          0% { opacity: 0; transform: scale(0.8) translateY(20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes customPopDown {
          0% { opacity: 1; transform: scale(1) translateY(0); }
          100% { opacity: 0; transform: scale(0.8) translateY(20px); }
        }
        .animasi-melayang { animation: customFloat 3s ease-in-out infinite; }
        .animasi-popup { animation: customPopUp 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .animasi-popdown { animation: customPopDown 0.2s ease-in forwards; }
      `}} />

      {!isOpen && showContextMenu && (
        <div className="hidden md:block absolute bottom-full right-0 mb-2 bg-white/90 backdrop-blur-sm border border-gray-100 shadow-xl rounded-xl p-1.5 min-w-[120px] transition-all">
          <p className="text-[10px] font-bold text-gray-400 px-2.5 py-1 uppercase tracking-wider">Ukuran Ikon</p>
          <button onClick={() => setSize('sm')} className={`w-full text-left px-2.5 py-1.5 text-xs rounded-lg font-medium transition-colors ${size === 'sm' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}>Kecil</button>
          <button onClick={() => setSize('md')} className={`w-full text-left px-2.5 py-1.5 text-xs rounded-lg font-medium transition-colors ${size === 'md' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}>Normal</button>
          <button onClick={() => setSize('lg')} className={`w-full text-left px-2.5 py-1.5 text-xs rounded-lg font-medium transition-colors ${size === 'lg' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}>Besar</button>
        </div>
      )}

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          onContextMenu={(e) => { e.preventDefault(); setShowContextMenu(true); }}
          title="Klik kiri untuk chat, Klik kanan untuk ubah ukuran"
          className={`animasi-melayang flex items-center justify-center rounded-full bg-blue-600 shadow-[0_4px_20px_rgba(37,99,235,0.3)] transition-all hover:scale-105 active:scale-95 ${sizeClasses[size]} overflow-hidden p-1`}
        >
          <Player autoplay loop src="https://lottie.host/710ecdf4-8c74-496c-b44d-147e56edfd7f/ee47FIKnRe.json" style={{ width: '100%', height: '100%' }} />
        </button>
      )}

      {(isOpen || isClosing) && (
        <div className={`
          fixed inset-0 flex flex-col bg-white shadow-[0_10px_40px_rgba(0,0,0,0.12)]
          md:absolute md:bottom-0 md:right-0 md:top-auto md:left-auto
          md:h-[530px] md:w-[380px] md:rounded-2xl md:border md:border-gray-100
          origin-bottom-right ${isClosing ? "animasi-popdown" : "animasi-popup"}
        `}>
          <div className="flex items-center justify-between bg-blue-600 p-4 text-white md:rounded-t-2xl">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.7)]"></div>
              <div>
                <span className="font-semibold block text-sm tracking-wide">Asisten AI</span>
                <span className="text-[10px] text-blue-200 block -mt-0.5">Sistem Siap Membantu</span>
              </div>
            </div>
            <button onClick={handleClose} className="p-1.5 rounded-lg hover:bg-white/20 text-white/90 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex items-start gap-2.5 max-w-[85%] ${msg.role === "user" ? "ml-auto flex-row-reverse" : ""}`}>
                {msg.role !== "user" && (
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white mt-1">AI</div>
                )}
                <div className={`rounded-2xl p-3 text-sm shadow-sm border border-gray-100 leading-relaxed ${msg.role === "user" ? "bg-blue-600 text-white rounded-tr-none whitespace-pre-wrap" : "bg-white text-gray-700 rounded-tl-none prose prose-sm prose-blue max-w-none"}`}>
                  {msg.role === "user" ? (
                    msg.content
                  ) : (
                    <ReactMarkdown
                      components={{
                        p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                        ul: ({node, ...props}) => <ul className="list-disc pl-4 mb-2" {...props} />,
                        ol: ({node, ...props}) => <ol className="list-decimal pl-4 mb-2" {...props} />,
                        li: ({node, ...props}) => <li className="mb-1" {...props} />,
                        strong: ({node, ...props}) => <strong className="font-semibold text-gray-900" {...props} />,
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-2.5 max-w-[85%]">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">AI</div>
                <div className="rounded-2xl rounded-tl-none bg-white p-4 text-sm shadow-sm border border-gray-100 flex gap-1">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-gray-100 p-4 bg-white md:rounded-b-2xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Tanyakan sesuatu pada Asisten AI..."
                className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                disabled={isLoading}
              />
              <button 
                onClick={handleSendMessage}
                disabled={isLoading}
                className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 active:scale-95 transition-all shadow-sm disabled:opacity-50 disabled:pointer-events-none"
              >
                Kirim
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}