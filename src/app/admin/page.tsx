import prisma from "@/lib/prisma";
import Link from "next/link";
import AdminCharts from "./AdminCharts";

export default async function AdminDashboard() {
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  // Fetch Stats
  const totalBalita = await prisma.balita.count();
  const totalImunisasiBulanIni = await prisma.imunisasi.count({
    where: {
      tanggalImunisasi: {
        gte: firstDayOfMonth
      }
    }
  });
  const totalKader = await prisma.kader.count();
  const totalPengguna = await prisma.user.count();

  // Fetch Jadwal Terdekat (Mulai dari awal hari ini agar jadwal hari ini tetap muncul)
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const jadwalTerdekat = await prisma.jadwalPosyandu.findFirst({
    where: { tanggal: { gte: startOfToday } },
    orderBy: { tanggal: 'asc' }
  });

  // Fetch Aktivitas Terkini (Balita terbaru)
  const recentBalitas = await prisma.balita.findMany({
    take: 3,
    orderBy: { createdAt: 'desc' },
    include: { orangtua: { include: { user: true } } }
  });

  // Fetch Chart Data
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
          <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight mb-1">Dashboard Overview</h1>
          <p className="text-sm font-medium text-gray-400">Ringkasan aktivitas Posyandu Sedap Malam</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {/* Stat Card 1 */}
        <div className="bg-white p-5 rounded-[20px] border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col justify-between h-36 hover:border-gray-200 hover:shadow-[0_4px_20px_rgb(0,0,0,0.06)] transition-all cursor-default">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
              <i className="fa-solid fa-baby"></i>
            </div>
            <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Total</span>
          </div>
          <div>
            <h3 className="text-3xl font-black text-gray-900 tracking-tighter">{totalBalita}</h3>
            <p className="text-xs font-semibold text-gray-400 mt-1">Balita Terdaftar</p>
          </div>
        </div>

        {/* Stat Card 2 */}
        <div className="bg-white p-5 rounded-[20px] border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col justify-between h-36 hover:border-gray-200 hover:shadow-[0_4px_20px_rgb(0,0,0,0.06)] transition-all cursor-default">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500">
              <i className="fa-solid fa-syringe"></i>
            </div>
            <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Bulan Ini</span>
          </div>
          <div>
            <h3 className="text-3xl font-black text-gray-900 tracking-tighter">{totalImunisasiBulanIni}</h3>
            <p className="text-xs font-semibold text-gray-400 mt-1">Imunisasi Diberikan</p>
          </div>
        </div>

        {/* Stat Card 3 */}
        <div className="bg-white p-5 rounded-[20px] border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col justify-between h-36 hover:border-gray-200 hover:shadow-[0_4px_20px_rgb(0,0,0,0.06)] transition-all cursor-default">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500">
              <i className="fa-solid fa-user-nurse"></i>
            </div>
            <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Total</span>
          </div>
          <div>
            <h3 className="text-3xl font-black text-gray-900 tracking-tighter">{totalKader}</h3>
            <p className="text-xs font-semibold text-gray-400 mt-1">Kader Aktif</p>
          </div>
        </div>

        {/* Stat Card 4 */}
        <div className="bg-white p-5 rounded-[20px] border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col justify-between h-36 hover:border-gray-200 hover:shadow-[0_4px_20px_rgb(0,0,0,0.06)] transition-all cursor-default">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-500">
              <i className="fa-solid fa-users"></i>
            </div>
            <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Total</span>
          </div>
          <div>
            <h3 className="text-3xl font-black text-gray-900 tracking-tighter">{totalPengguna}</h3>
            <p className="text-xs font-semibold text-gray-400 mt-1">Akun Pengguna</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Jadwal Terdekat */}
        <div className="lg:col-span-2 bg-white rounded-[24px] border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900 tracking-tight">Jadwal Terdekat</h3>
            <Link href="/admin/jadwal" className="text-xs font-bold text-blue-500 hover:text-blue-700 transition-colors flex items-center gap-1">
              Lihat Semua <i className="fa-solid fa-arrow-right text-[10px]"></i>
            </Link>
          </div>
          
          <div>
            {jadwalTerdekat ? (
              <div className="flex items-start md:items-center gap-5 p-5 rounded-[20px] bg-blue-50/30 border border-blue-50 hover:bg-blue-50/50 transition-colors">
                <div className="bg-white shadow-sm rounded-2xl px-4 py-3 text-center min-w-[72px] border border-gray-100 shrink-0">
                  <span className="block text-[10px] font-bold text-blue-500 uppercase tracking-widest">{jadwalTerdekat.tanggal.toLocaleDateString('id-ID', { month: 'short' })}</span>
                  <span className="block text-2xl font-black text-blue-900 mt-0.5">{jadwalTerdekat.tanggal.getDate()}</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 text-[15px] mb-2">{jadwalTerdekat.agenda.split(',')[0]}</h4>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                    <p className="text-xs font-medium text-gray-500 flex items-center gap-2">
                      <i className="fa-regular fa-clock text-blue-400"></i> {jadwalTerdekat.waktuMulai} - {jadwalTerdekat.waktuSelesai}
                    </p>
                    <p className="text-xs font-medium text-gray-500 flex items-center gap-2">
                      <i className="fa-solid fa-location-dot text-blue-400"></i> {jadwalTerdekat.lokasi}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-10 text-center flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 mb-3 text-xl">
                  <i className="fa-regular fa-calendar-xmark"></i>
                </div>
                <p className="text-sm font-medium text-gray-400">Tidak ada jadwal dalam waktu dekat.</p>
              </div>
            )}
          </div>
        </div>

        {/* Notifikasi / Aktivitas */}
        <div className="bg-white rounded-[24px] border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] p-6">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 tracking-tight">Balita Baru</h3>
          </div>
          <div className="space-y-5">
            {recentBalitas.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-sm font-medium text-gray-400">Belum ada pendaftaran baru.</p>
              </div>
            ) : (
              recentBalitas.map((balita, idx) => (
                <div key={balita.id} className="flex gap-4 items-start">
                  <div className="w-9 h-9 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                    <i className="fa-solid fa-child text-xs text-blue-500"></i>
                  </div>
                  <div>
                    <p className="text-[13px] text-gray-600 font-medium leading-relaxed">
                      <span className="font-bold text-gray-900">{balita.namaBalita}</span> didaftarkan ke Posyandu.
                    </p>
                    <p className="text-[11px] font-semibold text-gray-400 mt-1 uppercase tracking-wider">
                      {balita.createdAt.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <AdminCharts genderData={genderData} userData={userData} />
    </div>
  );
}
