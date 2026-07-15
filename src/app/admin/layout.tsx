import Link from "next/link";
import Image from "next/image";
import AdminSidebar from "@/components/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="md:hidden flex items-center gap-3">
            <Image src="/LogoNav.png" alt="Logo" width={32} height={32} />
            <span className="font-bold text-[15px] text-gray-900 tracking-tight">Posyandu</span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <h2 className="font-bold text-xl text-gray-900 tracking-tight">Panel Administrator</h2>
          </div>
          <div className="flex items-center gap-5">
            {/* Notification Bell */}
            <button className="relative w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors shadow-sm">
              <i className="fa-regular fa-bell"></i>
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            {/* Profile Pill (Mobile fallback or quick action) */}
            <div className="flex items-center gap-3 bg-white border border-gray-100 pl-2 pr-4 py-1.5 rounded-full shadow-sm cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Admin&backgroundColor=f3f4f6" alt="Admin" width={32} height={32} />
              </div>
              <span className="text-sm font-bold text-gray-900">Admin</span>
              <i className="fa-solid fa-chevron-down text-[10px] text-gray-400 ml-1"></i>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 p-6 md:p-8 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
