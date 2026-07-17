import prisma from "@/lib/prisma";
import ActivateButton from "./ActivateButton";
import Link from "next/link";
import DeleteButton from "./DeleteButton";

export default async function JadwalPage() {
  const jadwals = await prisma.jadwalPosyandu.findMany({
    orderBy: { tanggal: 'desc' }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Jadwal Posyandu</h1>
          <p className="text-gray-500">Kelola jadwal kegiatan Posyandu bulanan</p>
        </div>
        <Link href="/admin/jadwal/tambah" className="bg-posyandu-blue hover:bg-posyandu-dark text-white px-4 py-2 rounded-xl font-medium transition-colors flex items-center gap-2 shadow-sm">
          <i className="fa-solid fa-plus"></i> Tambah Jadwal
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">Status Web</th>
                <th className="px-6 py-4">Tanggal</th>
                <th className="px-6 py-4">Waktu</th>
                <th className="px-6 py-4">Lokasi</th>
                <th className="px-6 py-4">Agenda</th>
                <th className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {jadwals.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    Belum ada data jadwal. Silakan tambah jadwal baru.
                  </td>
                </tr>
              ) : (
                jadwals.map((jadwal) => (
                  <tr key={jadwal.id} className={`hover:bg-gray-50 transition-colors ${jadwal.isActive ? 'bg-blue-50/30' : ''}`}>
                    <td className="px-6 py-4">
                      <ActivateButton id={jadwal.id} isActive={jadwal.isActive} />
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {jadwal.tanggal.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {jadwal.waktuMulai} - {jadwal.waktuSelesai}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{jadwal.lokasi}</td>
                    <td className="px-6 py-4 text-gray-600 max-w-xs truncate">{jadwal.agenda}</td>
                    <td className="px-6 py-4 text-center space-x-2">
                      <Link href={`/admin/jadwal/edit/${jadwal.id}`} className="inline-block text-blue-600 hover:bg-blue-50 px-2 py-1 rounded transition-colors" title="Edit">
                        <i className="fa-solid fa-pen-to-square"></i>
                      </Link>
                      <DeleteButton id={jadwal.id} />
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
