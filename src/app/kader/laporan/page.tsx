import prisma from "@/lib/prisma";
import ExportExcelButton from "./ExportExcelButton";

export default async function KaderLaporanPage() {
  // Setup tanggal awal dan akhir bulan ini
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

  const namaBulan = now.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });

  // 1. Fetch Data Pengukuran Bulan Ini
  const pengukuranBulanIni = await prisma.pengukuran.findMany({
    where: {
      tanggalPengukuran: {
        gte: startOfMonth,
        lte: endOfMonth
      }
    },
    include: {
      balita: { select: { id: true, namaBalita: true, jenisKelamin: true } }
    },
    orderBy: { tanggalPengukuran: 'desc' }
  });

  // 2. Fetch Data Imunisasi Bulan Ini
  const imunisasiBulanIni = await prisma.imunisasi.findMany({
    where: {
      tanggalImunisasi: {
        gte: startOfMonth,
        lte: endOfMonth
      }
    },
    include: {
      balita: { select: { id: true, namaBalita: true } }
    },
    orderBy: { tanggalImunisasi: 'desc' }
  });

  // --- KALKULASI GRAFIK STATUS GIZI ---
  let giziBaik = 0, giziKurang = 0, giziLebih = 0;
  
  pengukuranBulanIni.forEach(p => {
    // Logika statis sementara: 
    if (p.beratBadan < 5) giziKurang++;
    else if (p.beratBadan > 15) giziLebih++;
    else giziBaik++;
  });
  
  const totalGizi = pengukuranBulanIni.length || 1; // hindari pembagian 0

  // --- KALKULASI GRAFIK IMUNISASI ---
  const imunisasiCount: Record<string, number> = {};
  imunisasiBulanIni.forEach(i => {
    // Kita grouping berdasarkan kata kunci vaksin utama untuk chart
    let key = "Lainnya";
    const jv = i.jenisImunisasi.toLowerCase();
    if (jv.includes("bcg")) key = "BCG";
    else if (jv.includes("dpt")) key = "DPT";
    else if (jv.includes("polio")) key = "Polio";
    else if (jv.includes("campak") || jv.includes("mr")) key = "Campak/MR";
    
    imunisasiCount[key] = (imunisasiCount[key] || 0) + 1;
  });

  const topVaksinKeys = ["BCG", "DPT", "Polio", "Campak/MR"];
  const totalVaksin = imunisasiBulanIni.length || 1;

  // --- GABUNGKAN DATA KUNJUNGAN UNTUK TABEL BAWAH ---
  // Menggunakan map untuk menggabungkan data per balita
  const kunjunganMap = new Map();
  
  pengukuranBulanIni.forEach(p => {
    kunjunganMap.set(p.balita.id, {
      idBalita: p.balita.id,
      namaBalita: p.balita.namaBalita,
      statusGizi: p.beratBadan < 5 ? 'Kurang' : (p.beratBadan > 15 ? 'Buruk' : 'Gizi Baik'),
      imunisasi: "-",
      tanggal: p.tanggalPengukuran
    });
  });

  imunisasiBulanIni.forEach(i => {
    const existing = kunjunganMap.get(i.balita.id);
    if (existing) {
      existing.imunisasi = i.jenisImunisasi;
      // Gunakan tanggal terbaru
      if (i.tanggalImunisasi > existing.tanggal) existing.tanggal = i.tanggalImunisasi;
    } else {
      kunjunganMap.set(i.balita.id, {
        idBalita: i.balita.id,
        namaBalita: i.balita.namaBalita,
        statusGizi: "Belum Diukur",
        imunisasi: i.jenisImunisasi,
        tanggal: i.tanggalImunisasi
      });
    }
  });

  const listKunjungan = Array.from(kunjunganMap.values()).sort((a, b) => b.tanggal.getTime() - a.tanggal.getTime());

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Laporan Posyandu</h1>
          <p className="text-gray-500">Ringkasan real-time pertumbuhan dan imunisasi balita</p>
        </div>
        <ExportExcelButton data={listKunjungan} namaBulan={namaBulan} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Chart Status Gizi */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col">
          <h3 className="font-bold text-gray-900 mb-6">Status Gizi Balita ({namaBulan})</h3>
          <div className="flex items-end justify-around h-48 pb-2 border-b border-gray-200 mt-auto">
            <div className="flex flex-col items-center w-1/3 h-full">
              <div className="flex-1 w-full flex items-end justify-center">
                <div className="w-16 bg-[#1cc26c] rounded-t-lg transition-all duration-1000 shadow-sm" style={{ height: `${(giziBaik/totalGizi)*100 || 5}%` }}></div>
              </div>
              <span className="text-xs font-bold text-gray-600 text-center mt-2">Baik<br/>({giziBaik})</span>
            </div>
            <div className="flex flex-col items-center w-1/3 h-full">
              <div className="flex-1 w-full flex items-end justify-center">
                <div className="w-16 bg-yellow-400 rounded-t-lg transition-all duration-1000 shadow-sm" style={{ height: `${(giziKurang/totalGizi)*100 || 5}%` }}></div>
              </div>
              <span className="text-xs font-bold text-gray-600 text-center mt-2">Kurang<br/>({giziKurang})</span>
            </div>
            <div className="flex flex-col items-center w-1/3 h-full">
              <div className="flex-1 w-full flex items-end justify-center">
                <div className="w-16 bg-red-500 rounded-t-lg transition-all duration-1000 shadow-sm" style={{ height: `${(giziLebih/totalGizi)*100 || 5}%` }}></div>
              </div>
              <span className="text-xs font-bold text-gray-600 text-center mt-2">Lebih/Buruk<br/>({giziLebih})</span>
            </div>
          </div>
        </div>

        {/* Chart Cakupan Imunisasi */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col">
          <h3 className="font-bold text-gray-900 mb-6">Cakupan Imunisasi Utama ({namaBulan})</h3>
          <div className="flex items-end justify-around h-48 pb-2 border-b border-gray-200 mt-auto">
            {topVaksinKeys.map(k => {
              const count = imunisasiCount[k] || 0;
              return (
                <div key={k} className="flex flex-col items-center w-1/4 h-full">
                  <div className="flex-1 w-full flex items-end justify-center">
                    <div className="w-12 bg-blue-500 rounded-t-lg transition-all duration-1000 shadow-sm" style={{ height: `${(count/totalVaksin)*100 || 5}%` }}></div>
                  </div>
                  <span className="text-xs font-bold text-gray-600 text-center mt-2">{k}<br/>({count})</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="font-bold text-[#102a5e]">Riwayat Kunjungan Bulan Ini</h3>
          <select className="border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium bg-white">
            <option>Bulan Ini ({namaBulan})</option>
          </select>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 font-bold border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">No</th>
                <th className="px-6 py-4">Nama Balita</th>
                <th className="px-6 py-4">Status Gizi</th>
                <th className="px-6 py-4">Imunisasi Terakhir</th>
                <th className="px-6 py-4">Tanggal Kunjungan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {listKunjungan.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    Belum ada data kunjungan balita di bulan ini.
                  </td>
                </tr>
              ) : (
                listKunjungan.map((k, index) => (
                  <tr key={k.idBalita} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-6 py-4 text-gray-500 font-medium">{index + 1}</td>
                    <td className="px-6 py-4 font-bold text-gray-900">{k.namaBalita}</td>
                    <td className="px-6 py-4">
                      {k.statusGizi === 'Gizi Baik' && <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">Gizi Baik</span>}
                      {k.statusGizi === 'Kurang' && <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold">Gizi Kurang</span>}
                      {k.statusGizi === 'Buruk' && <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold">Gizi Buruk</span>}
                      {k.statusGizi === 'Belum Diukur' && <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-xs font-bold">Belum Diukur</span>}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-600">{k.imunisasi}</td>
                    <td className="px-6 py-4 text-gray-500">
                      {k.tanggal.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
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
