import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Script from "next/script";
// 1. IMPORT COMPONENT CHATBOT KAMU DI SINI
import Chatbot from "@/components/Chatbot";

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Posyandu SEDAP MALAM",
  description: "Sistem Informasi Posyandu terpadu untuk memantau tumbuh kembang balita dengan mudah, cepat, dan akurat.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body className={`${poppins.variable} font-sans min-h-screen flex flex-col bg-gray-50 text-gray-800 antialiased selection:bg-posyandu-blue selection:text-white`}>
        {/* Semua halaman web kamu akan di-render di sini */}
        {children}

        {/* 2. PASANG CHATBOT DI SINI */}
        <Chatbot />
      </body>
    </html>
  );
}