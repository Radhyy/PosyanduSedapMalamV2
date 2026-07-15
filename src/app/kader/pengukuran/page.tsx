import Link from "next/link";
import prisma from "@/lib/prisma";
import DeletePengukuranButton from "./DeletePengukuranButton";

export default async function DataPengukuran() {
  // Fetch pengukuran records with related balita info
  const pengukuranList = await prisma.pengukuran.findMany({
    include: {
      balita: {
        select: {
          namaBalita: true,
          nikBalita: true,
          jenisKelamin: true
        }
      }
    },
    orderBy: {
      tanggalPengukuran: 'desc'
    }
  });

  // Fungsi bantuan simpel untuk menentukan status gizi statis untuk UI mock
  // Di aplikasi nyata, ini menggunakan standar deviasi WHO Z-Score.
  const getStatusGizi = (berat: number, kelamin: string) => {
    if (berat < 5) return { label: "Kurang", style: "bg-yellow-100 text-yellow-700" };
    if (berat > 15) return { label: "Lebih", style: "bg-red-100 text-red-700" };
    return { label: "Gizi Baik", style: "bg-green-100 text-green-700" };
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Input Pengukuran</h1>
          <p className="text-sm text-gray-500 mt-1">Catat berat dan tinggi badan balita</p>
        </div>
        <Link 
          href="/kader/pengukuran/tambah" 
          className="bg-posyandu-blue hover:bg-posyandu-dark text-white px-5 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 transition-colors shadow-sm"
        >
          <i className="fa-solid fa-plus"></i> Tambah Pengukuran
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50/50 text-[#102a5e] font-bold border-b border-gray-100">
              <tr>
                <th scope="col" className="px-6 py-5">Tanggal</th>
                <th scope="col" className="px-6 py-5">Nama Balita</th>
                <th scope="col" className="px-6 py-5">BB (kg)</th>
                <th scope="col" className="px-6 py-5">TB (cm)</th>
                <th scope="col" className="px-6 py-5">Status Gizi</th>
                <th scope="col" className="px-6 py-5 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pengukuranList.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 text-2xl">
                        <i className="fa-solid fa-scale-balanced"></i>
                      </div>
                      <p className="font-medium">Belum ada riwayat pengukuran.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                pengukuranList.map((item) => {
                  const statusGizi = getStatusGizi(item.beratBadan, item.balita.jenisKelamin);
                  return (
                    <tr key={item.id} className="hover:bg-orange-50/30 transition-colors">
                      <td className="px-6 py-4">
                        {item.tanggalPengukuran.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-4 font-bold text-gray-800">{item.balita.namaBalita}</td>
                      <td className="px-6 py-4 font-bold text-blue-600">{item.beratBadan}</td>
                      <td className="px-6 py-4 font-bold text-green-600">{item.tinggiBadan}</td>
                      <td className="px-6 py-4 font-bold">
                        <span className={`px-3 py-1 rounded-full text-xs ${statusGizi.style}`}>
                          {statusGizi.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-4">
                          <Link href={`/kader/pengukuran/edit/${item.id}`} className="text-posyandu-blue hover:text-posyandu-dark transition-colors" title="Edit Data">
                            <i className="fa-solid fa-pen-to-square"></i>
                          </Link>
                          <DeletePengukuranButton 
                            id={item.id} 
                            namaBalita={item.balita.namaBalita} 
                            tanggal={item.tanggalPengukuran.toLocaleDateString('id-ID')}
                          />
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
