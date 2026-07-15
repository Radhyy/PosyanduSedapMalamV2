import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import prisma from "@/lib/prisma";
import HasilViewer from "./HasilViewer";

export const dynamic = "force-dynamic";

export default async function HasilImunisasiPage() {
  const session = await getSession();

  if (!session || session.role !== "orangtua") {
    redirect("/auth/login");
  }

  // Cari data orangtua berdasarkan userId dari session
  const orangTua = await prisma.orangTua.findUnique({
    where: { userId: session.userId },
    include: {
      balita: {
        include: {
          imunisasi: {
            orderBy: { tanggalImunisasi: 'desc' }
          },
          pengukuran: {
            orderBy: { tanggalPengukuran: 'desc' }
          }
        }
      },
      user: true
    }
  });

  if (!orangTua) {
    // Mungkin akun dibuat tanpa profil OrangTua yang valid (harusnya dibuat saat daftar)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-2xl shadow text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Profil Tidak Ditemukan</h2>
          <p className="text-gray-600 mb-6">Sistem tidak dapat menemukan profil Orang Tua Anda. Harap hubungi Admin.</p>
          <a href="/auth/login" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium">Kembali Login</a>
        </div>
      </div>
    );
  }

  // Kita lewatkan balitaList ke client component
  // Karena Date object tidak bisa dilempar langsung via Server Components ke Client Components di Next.js (bisa menyebabkan warning kalau tidak diubah ke string/iso),
  // kita stringify & parse secara aman atau ubah Date ke string manual.
  const serializedBalitaList = JSON.parse(JSON.stringify(orangTua.balita));

  return <HasilViewer balitaList={serializedBalitaList} userName={orangTua.namaIbu} />;
}
