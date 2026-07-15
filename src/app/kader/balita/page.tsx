import Link from "next/link";
import prisma from "@/lib/prisma";
import DeleteBalitaButton from "./DeleteBalitaButton";

// This is a Server Component, so we can fetch data directly
export default async function DataBalita() {
  // Fetch balita along with their parents' data
  const balitaList = await prisma.balita.findMany({
    include: {
      orangtua: true,
    },
    orderBy: {
      createdAt: 'desc',
    }
  });

  // Calculate age helper
  const hitungUsiaBulan = (tanggalLahir: Date) => {
    const today = new Date();
    const birthDate = new Date(tanggalLahir);
    let months = (today.getFullYear() - birthDate.getFullYear()) * 12;
    months -= birthDate.getMonth();
    months += today.getMonth();
    return months <= 0 ? 0 : months;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Data Balita</h1>
          <p className="text-sm text-gray-500 mt-1">Kelola data balita yang terdaftar di posyandu</p>
        </div>
        <Link 
          href="/kader/balita/tambah" 
          className="bg-posyandu-blue hover:bg-posyandu-dark text-white px-5 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 transition-colors shadow-sm"
        >
          <i className="fa-solid fa-plus"></i> Tambah Balita
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
          <div className="relative max-w-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fa-solid fa-magnifying-glass text-gray-400"></i>
            </div>
            <input 
              type="text" 
              placeholder="Cari nama balita..." 
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-posyandu-blue/20 focus:border-posyandu-blue transition-all"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50/50 text-gray-700 font-semibold border-b border-gray-100">
              <tr>
                <th scope="col" className="px-6 py-4">No</th>
                <th scope="col" className="px-6 py-4">Nama Balita</th>
                <th scope="col" className="px-6 py-4">NIK</th>
                <th scope="col" className="px-6 py-4">Tanggal Lahir</th>
                <th scope="col" className="px-6 py-4">Usia</th>
                <th scope="col" className="px-6 py-4">Nama Ibu</th>
                <th scope="col" className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {balitaList.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    Belum ada data balita. Klik "Tambah Balita" untuk memulai.
                  </td>
                </tr>
              ) : (
                balitaList.map((balita, index) => (
                  <tr key={balita.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">{balita.namaBalita}</td>
                    <td className="px-6 py-4">{balita.nikBalita || '-'}</td>
                    <td className="px-6 py-4">{balita.tanggalLahir.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                    <td className="px-6 py-4">{hitungUsiaBulan(balita.tanggalLahir)} bulan</td>
                    <td className="px-6 py-4">{balita.orangtua.namaIbu}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-3">
                        <Link href={`/kader/balita/edit/${balita.id}`} className="text-posyandu-blue hover:text-posyandu-dark transition-colors" title="Edit Data">
                          <i className="fa-solid fa-pen-to-square"></i>
                        </Link>
                        <DeleteBalitaButton id={balita.id} nama={balita.namaBalita} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
