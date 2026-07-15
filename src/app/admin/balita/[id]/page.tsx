import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function BalitaDetailPage({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  // Await params to support both Next.js 14 and 15
  const resolvedParams = await params;
  const balitaId = parseInt(resolvedParams.id, 10);
  
  if (isNaN(balitaId)) {
    return <div className="p-8 text-center text-red-500 font-bold">Error: ID Balita tidak valid (Bukan angka)</div>;
  }

  const balita = await prisma.balita.findUnique({
    where: { id: balitaId },
    include: {
      orangtua: true,
      pengukuran: {
        orderBy: { tanggalPengukuran: 'desc' }
      },
      imunisasi: {
        orderBy: { tanggalImunisasi: 'desc' }
      }
    }
  });

  if (!balita) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[50vh]">
        <i className="fa-solid fa-triangle-exclamation text-5xl text-yellow-500 mb-4"></i>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Data Tidak Ditemukan</h1>
        <p className="text-gray-500">Balita dengan ID {balitaId} tidak ditemukan di database.</p>
        <Link href="/admin/balita" className="mt-6 bg-posyandu-blue text-white px-6 py-2 rounded-xl font-medium">
          Kembali ke Data Balita
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/balita" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-500 hover:text-posyandu-blue hover:bg-posyandu-light transition-colors shadow-sm border border-gray-100">
          <i className="fa-solid fa-arrow-left"></i>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Detail Balita</h1>
          <p className="text-gray-500">Informasi lengkap dan riwayat kesehatan</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-posyandu-light rounded-bl-full -z-10 opacity-50"></div>
            
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center text-4xl mb-4 shadow-inner">
                <i className="fa-solid fa-child"></i>
              </div>
              <h2 className="text-xl font-bold text-gray-900 text-center">{balita.namaBalita}</h2>
              <span className={`mt-2 px-3 py-1 rounded-full text-xs font-bold ${balita.jenisKelamin === 'L' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'}`}>
                {balita.jenisKelamin === 'L' ? 'Laki-laki' : 'Perempuan'}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">NIK Balita</span>
                <span className="font-medium text-gray-900">{balita.nikBalita || "-"}</span>
              </div>
              <div>
                <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Tanggal Lahir</span>
                <span className="font-medium text-gray-900">{balita.tanggalLahir.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">BB Lahir</span>
                  <span className="font-medium text-gray-900">{balita.beratLahir} kg</span>
                </div>
                <div>
                  <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">PB Lahir</span>
                  <span className="font-medium text-gray-900">{balita.panjangLahir} cm</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <i className="fa-solid fa-users text-posyandu-blue"></i> Data Orang Tua
            </h3>
            <div className="space-y-4">
              <div>
                <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Nama Ibu</span>
                <span className="font-medium text-gray-900">{balita.orangtua?.namaIbu || "-"}</span>
              </div>
              <div>
                <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">NIK Ibu</span>
                <span className="font-medium text-gray-900">{balita.orangtua?.nikIbu || "-"}</span>
              </div>
              <div>
                <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">No. HP</span>
                <span className="font-medium text-gray-900">{balita.orangtua?.noTelp || "-"}</span>
              </div>
              <div>
                <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Alamat</span>
                <span className="font-medium text-gray-900">{balita.orangtua?.alamat || "-"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* History Tables */}
        <div className="lg:col-span-2 space-y-6">
          {/* Imunisasi History */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <i className="fa-solid fa-syringe text-green-500"></i> Riwayat Imunisasi
            </h3>
            <div className="overflow-x-auto rounded-xl border border-gray-100">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
                  <tr>
                    <th className="px-4 py-3">Tanggal</th>
                    <th className="px-4 py-3">Jenis Imunisasi</th>
                    <th className="px-4 py-3">Catatan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {balita.imunisasi.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="px-4 py-8 text-center text-gray-400">Belum ada data imunisasi</td>
                    </tr>
                  ) : (
                    balita.imunisasi.map((im) => (
                      <tr key={im.id} className="hover:bg-gray-50/50">
                        <td className="px-4 py-3 text-gray-600">{im.tanggalImunisasi.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                        <td className="px-4 py-3 font-semibold text-gray-900">{im.jenisImunisasi}</td>
                        <td className="px-4 py-3 text-gray-500">{im.keterangan || "-"}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pengukuran History */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <i className="fa-solid fa-weight-scale text-orange-500"></i> Riwayat Pengukuran (KMS)
            </h3>
            <div className="overflow-x-auto rounded-xl border border-gray-100">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
                  <tr>
                    <th className="px-4 py-3">Tanggal</th>
                    <th className="px-4 py-3">Umur (Bulan)</th>
                    <th className="px-4 py-3">Berat Badan</th>
                    <th className="px-4 py-3">Tinggi/Panjang</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {balita.pengukuran.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-4 py-8 text-center text-gray-400">Belum ada data pengukuran</td>
                    </tr>
                  ) : (
                    balita.pengukuran.map((pk) => {
                      // Hitung umur secara kasar dalam bulan
                      const diffTime = Math.abs(pk.tanggalPengukuran.getTime() - balita.tanggalLahir.getTime());
                      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                      const umurBulan = Math.floor(diffDays / 30);
                      
                      return (
                        <tr key={pk.id} className="hover:bg-gray-50/50">
                          <td className="px-4 py-3 text-gray-600">{pk.tanggalPengukuran.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                          <td className="px-4 py-3 font-medium text-gray-700">{umurBulan} bln</td>
                          <td className="px-4 py-3 font-bold text-blue-600">{pk.beratBadan} kg</td>
                          <td className="px-4 py-3 font-bold text-orange-600">{pk.tinggiBadan} cm</td>
                        </tr>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
