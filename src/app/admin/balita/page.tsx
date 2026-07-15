import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function AdminBalitaPage() {
  const balitas = await prisma.balita.findMany({
    include: {
      orangtua: true
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Data Balita</h1>
          <p className="text-gray-500">Lihat data balita yang terdaftar di posyandu (Mode Read-Only)</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="relative">
            <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input type="text" placeholder="Cari nama balita..." className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-posyandu-blue w-64" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">No</th>
                <th className="px-6 py-4">Nama Balita</th>
                <th className="px-6 py-4">NIK</th>
                <th className="px-6 py-4">Tanggal Lahir</th>
                <th className="px-6 py-4">Nama Ibu</th>
                <th className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {balitas.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    Belum ada data balita terdaftar.
                  </td>
                </tr>
              ) : (
                balitas.map((balita, index) => (
                  <tr key={balita.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">{balita.namaBalita}</td>
                    <td className="px-6 py-4 text-gray-600">{balita.nikBalita || "-"}</td>
                    <td className="px-6 py-4 text-gray-600">
                      {balita.tanggalLahir.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{balita.orangtua?.namaIbu || "-"}</td>
                    <td className="px-6 py-4 text-center">
                      <Link href={`/admin/balita/${balita.id}`} className="bg-posyandu-blue text-white hover:bg-posyandu-dark px-4 py-2 rounded-xl transition-colors inline-flex items-center gap-2 font-semibold shadow-sm text-sm" title="Lihat Detail">
                        <i className="fa-solid fa-eye"></i> Detail
                      </Link>
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
