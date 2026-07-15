export default function ArtikelPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kelola Artikel</h1>
          <p className="text-gray-500">Manajemen artikel kesehatan dan informasi posyandu</p>
        </div>
        <button className="bg-posyandu-blue hover:bg-posyandu-dark text-white px-4 py-2 rounded-xl font-medium transition-colors flex items-center gap-2">
          <i className="fa-solid fa-plus"></i> Tulis Artikel
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Mock Artikel Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="h-40 bg-gray-200 relative">
            <span className="absolute top-3 left-3 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">Gizi Balita</span>
          </div>
          <div className="p-5 flex-1 flex flex-col">
            <h3 className="font-bold text-gray-900 mb-2">Pentingnya ASI Eksklusif untuk Bayi</h3>
            <p className="text-sm text-gray-500 flex-1">ASI Eksklusif adalah pemberian ASI saja tanpa tambahan cairan...</p>
            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center text-sm">
              <span className="text-gray-500"><i className="fa-regular fa-calendar"></i> 14 Jul 2026</span>
              <div className="space-x-3">
                <button className="text-blue-600 hover:text-blue-800"><i className="fa-solid fa-pen-to-square"></i></button>
                <button className="text-red-600 hover:text-red-800"><i className="fa-solid fa-trash"></i></button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="h-40 bg-gray-200 relative">
            <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">Imunisasi</span>
          </div>
          <div className="p-5 flex-1 flex flex-col">
            <h3 className="font-bold text-gray-900 mb-2">Jadwal Imunisasi Dasar Lengkap</h3>
            <p className="text-sm text-gray-500 flex-1">Imunisasi adalah salah satu cara paling efektif untuk mencegah penyakit...</p>
            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center text-sm">
              <span className="text-gray-500"><i className="fa-regular fa-calendar"></i> 10 Jul 2026</span>
              <div className="space-x-3">
                <button className="text-blue-600 hover:text-blue-800"><i className="fa-solid fa-pen-to-square"></i></button>
                <button className="text-red-600 hover:text-red-800"><i className="fa-solid fa-trash"></i></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
