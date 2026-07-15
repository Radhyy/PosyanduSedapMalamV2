import Link from "next/link";
import prisma from "@/lib/prisma";
import DeleteImunisasiButton from "./DeleteImunisasiButton";

export default async function DataImunisasi() {
  // Fetch imunisasi records with related balita info
  const imunisasiList = await prisma.imunisasi.findMany({
    include: {
      balita: {
        select: {
          namaBalita: true,
          nikBalita: true
        }
      }
    },
    orderBy: {
      tanggalImunisasi: 'desc'
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Input Imunisasi</h1>
          <p className="text-sm text-gray-500 mt-1">Catat riwayat pemberian vaksin untuk balita</p>
        </div>
        <Link 
          href="/kader/imunisasi/tambah" 
          className="bg-posyandu-blue hover:bg-posyandu-dark text-white px-5 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 transition-colors shadow-sm"
        >
          <i className="fa-solid fa-plus"></i> Tambah Catatan
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50/50 text-[#102a5e] font-bold border-b border-gray-100">
              <tr>
                <th scope="col" className="px-6 py-5">Tanggal</th>
                <th scope="col" className="px-6 py-5">Nama Balita</th>
                <th scope="col" className="px-6 py-5">Jenis Vaksin</th>
                <th scope="col" className="px-6 py-5">Keterangan</th>
                <th scope="col" className="px-6 py-5 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {imunisasiList.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 text-2xl">
                        <i className="fa-solid fa-syringe"></i>
                      </div>
                      <p className="font-medium">Belum ada riwayat imunisasi.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                imunisasiList.map((item) => (
                  <tr key={item.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-6 py-4">
                      {item.tanggalImunisasi.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-800">{item.balita.namaBalita}</td>
                    <td className="px-6 py-4 font-bold text-[#102a5e]">{item.jenisImunisasi}</td>
                    <td className="px-6 py-4 text-gray-500">{item.keterangan || "-"}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-4">
                        <Link href={`/kader/imunisasi/edit/${item.id}`} className="text-posyandu-blue hover:text-posyandu-dark transition-colors" title="Edit Data">
                          <i className="fa-solid fa-pen-to-square"></i>
                        </Link>
                        <DeleteImunisasiButton 
                          id={item.id} 
                          namaBalita={item.balita.namaBalita} 
                          jenisVaksin={item.jenisImunisasi} 
                        />
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
