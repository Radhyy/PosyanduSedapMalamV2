import prisma from "@/lib/prisma";
import AdminCharts from "../admin/AdminCharts";

export default async function KaderDashboard() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

  // Fetch statistics
  const totalBalita = await prisma.balita.count();
  
  const totalPengukuranBulanIni = await prisma.pengukuran.count({
    where: {
      tanggalPengukuran: { gte: startOfMonth, lte: endOfMonth }
    }
  });

  const totalImunisasiBulanIni = await prisma.imunisasi.count({
    where: {
      tanggalImunisasi: { gte: startOfMonth, lte: endOfMonth }
    }
  });

  // Fetch latest 5 pengukuran
  const recentPengukuran = await prisma.pengukuran.findMany({
    take: 5,
    orderBy: { tanggalPengukuran: 'desc' },
    include: { balita: { select: { namaBalita: true } } }
  });

  // Fetch latest 5 imunisasi
  const recentImunisasi = await prisma.imunisasi.findMany({
    take: 5,
    orderBy: { tanggalImunisasi: 'desc' },
    include: { balita: { select: { namaBalita: true } } }
  });

  // Combine and sort by date descending, take top 10
  const combinedHistory = [
    ...recentPengukuran.map(p => ({
      id: `p-${p.id}`,
      type: 'Pengukuran',
      date: p.tanggalPengukuran,
      namaBalita: p.balita.namaBalita,
      detail: `BB: ${p.beratBadan} kg, TB: ${p.tinggiBadan} cm`
    })),
    ...recentImunisasi.map(i => ({
      id: `i-${i.id}`,
      type: 'Imunisasi',
      date: i.tanggalImunisasi,
      namaBalita: i.balita.namaBalita,
      detail: i.jenisImunisasi
    }))
  ].sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 10);

  // Generate last 6 months data for chart
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ags", "Sep", "Okt", "Nov", "Des"];
  const chartDataPromises = Array.from({ length: 6 }).map((_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
    const mStart = new Date(d.getFullYear(), d.getMonth(), 1);
    const mEnd = new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59);
    
    return Promise.all([
      prisma.pengukuran.count({ where: { tanggalPengukuran: { gte: mStart, lte: mEnd } } }),
      prisma.imunisasi.count({ where: { tanggalImunisasi: { gte: mStart, lte: mEnd } } })
    ]).then(([pCount, iCount]) => ({
      label: monthNames[d.getMonth()],
      count: pCount + iCount
    }));
  });

  const chartData = await Promise.all(chartDataPromises);
  const maxChartCount = Math.max(...chartData.map(d => d.count), 5); // Fallback max to 5

  // Fetch Chart Data for Recharts
  const countL = await prisma.balita.count({ where: { jenisKelamin: 'L' } });
  const countP = await prisma.balita.count({ where: { jenisKelamin: 'P' } });
  const genderData = [
    { name: 'Laki-laki', value: countL },
    { name: 'Perempuan', value: countP }
  ];

  const countOrtu = await prisma.user.count({ where: { role: 'orangtua' } });
  const countKdr = await prisma.user.count({ where: { role: 'kader' } });
  const countAdm = await prisma.user.count({ where: { role: 'admin' } });
  const userData = [
    { name: 'Orang Tua', value: countOrtu },
    { name: 'Kader', value: countKdr },
    { name: 'Admin', value: countAdm }
  ];

  return (
    <div className="pb-8">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight mb-1">Halo, Kader!</h1>
          <p className="text-sm font-medium text-gray-400">Berikut adalah ringkasan data Posyandu Sedap Malam saat ini.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {/* Card 1: Total Balita */}
        <div className="bg-white p-5 rounded-[20px] border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col justify-between h-36 hover:border-gray-200 hover:shadow-[0_4px_20px_rgb(0,0,0,0.06)] transition-all cursor-default">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
              <i className="fa-solid fa-baby"></i>
            </div>
            <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Keseluruhan</span>
          </div>
          <div>
            <h3 className="text-3xl font-black text-gray-900 tracking-tighter">{totalBalita}</h3>
            <p className="text-xs font-semibold text-gray-400 mt-1">Total Balita Terdaftar</p>
          </div>
        </div>

        {/* Card 2: Imunisasi Bulan Ini */}
        <div className="bg-white p-5 rounded-[20px] border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col justify-between h-36 hover:border-gray-200 hover:shadow-[0_4px_20px_rgb(0,0,0,0.06)] transition-all cursor-default">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500">
              <i className="fa-solid fa-syringe"></i>
            </div>
            <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Bulan Ini</span>
          </div>
          <div>
            <h3 className="text-3xl font-black text-gray-900 tracking-tighter">{totalImunisasiBulanIni}</h3>
            <p className="text-xs font-semibold text-gray-400 mt-1">Imunisasi Diinput</p>
          </div>
        </div>

        {/* Card 3: Pengukuran Bulan Ini */}
        <div className="bg-white p-5 rounded-[20px] border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col justify-between h-36 hover:border-gray-200 hover:shadow-[0_4px_20px_rgb(0,0,0,0.06)] transition-all cursor-default">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500">
              <i className="fa-solid fa-weight-scale"></i>
            </div>
            <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Bulan Ini</span>
          </div>
          <div>
            <h3 className="text-3xl font-black text-gray-900 tracking-tighter">{totalPengukuranBulanIni}</h3>
            <p className="text-xs font-semibold text-gray-400 mt-1">Pengukuran Diinput</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Chart (Activity) */}
        <div className="lg:col-span-1 bg-white rounded-[24px] border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] p-6 flex flex-col">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 tracking-tight">Statistik Input</h3>
            <p className="text-xs font-medium text-gray-400 mt-1">Tren data 6 bulan terakhir</p>
          </div>
          
          <div className="flex items-end justify-between h-48 gap-2 mt-auto pt-4 border-b border-gray-100 pb-2">
             {chartData.map((data, i) => {
               const h = (data.count / maxChartCount) * 100;
               return (
                <div key={i} className="flex flex-col items-center gap-2 w-full h-full justify-end group">
                   <div className="w-full bg-blue-50 rounded-t-md flex items-end relative h-full">
                      <div className="w-full bg-blue-500 rounded-t-md transition-all group-hover:bg-blue-600" style={{ height: `${h}%` }}></div>
                      {/* Tooltip */}
                      <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] font-bold py-1 px-2 rounded transition-opacity pointer-events-none z-10 shadow-lg">
                        {data.count}
                      </div>
                   </div>
                   <span className="text-[10px] font-bold text-gray-400 uppercase">{data.label}</span>
                </div>
               );
             })}
          </div>
        </div>

        {/* Riwayat Table */}
        <div className="lg:col-span-2 bg-white rounded-[24px] border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-100/60">
            <h3 className="text-lg font-bold text-gray-900 tracking-tight">Riwayat Penginputan</h3>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50/50 text-gray-500 font-semibold text-[11px] uppercase tracking-widest border-b border-gray-100/60">
                <tr>
                  <th className="px-6 py-4">Waktu</th>
                  <th className="px-6 py-4">Nama Balita</th>
                  <th className="px-6 py-4">Jenis Data</th>
                  <th className="px-6 py-4">Detail</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100/60">
                {combinedHistory.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center">
                      <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 mb-3 text-xl mx-auto">
                        <i className="fa-solid fa-clock-rotate-left"></i>
                      </div>
                      <p className="text-sm font-medium text-gray-400">Belum ada data riwayat.</p>
                    </td>
                  </tr>
                ) : (
                  combinedHistory.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 text-xs font-semibold text-gray-400">
                        {item.date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                      </td>
                      <td className="px-6 py-4 text-[13px] font-bold text-gray-900">{item.namaBalita}</td>
                      <td className="px-6 py-4">
                        {item.type === 'Imunisasi' ? (
                          <span className="bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">Imunisasi</span>
                        ) : (
                          <span className="bg-orange-50 text-orange-600 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">Pengukuran</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-[13px] text-gray-500 font-medium">{item.detail}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AdminCharts genderData={genderData} userData={userData} />
    </div>
  );
}
