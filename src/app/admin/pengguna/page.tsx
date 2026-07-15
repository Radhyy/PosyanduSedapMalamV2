import prisma from "@/lib/prisma";
import Link from "next/link";
import DeleteButton from "./DeleteButton";

export default async function PenggunaPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Pengguna</h1>
          <p className="text-gray-500">Kelola akun admin, kader, dan orang tua</p>
        </div>
        <Link href="/admin/pengguna/tambah" className="bg-posyandu-blue hover:bg-posyandu-dark text-white px-4 py-2 rounded-xl font-medium transition-colors flex items-center gap-2 shadow-sm">
          <i className="fa-solid fa-user-plus"></i> Tambah Pengguna
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="flex gap-4">
            <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-posyandu-blue bg-white">
              <option>Semua Role</option>
              <option>admin</option>
              <option>kader</option>
              <option>orangtua</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">Nama Lengkap</th>
                <th className="px-6 py-4">Username</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">Belum ada data pengguna.</td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{user.name}</td>
                    <td className="px-6 py-4 text-gray-600">{user.username}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        user.role === 'admin' ? 'bg-red-100 text-red-700' :
                        user.role === 'kader' ? 'bg-green-100 text-green-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {user.role === 'admin' ? 'Admin' : user.role === 'kader' ? 'Kader' : 'Orang Tua'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center space-x-2">
                      {user.role !== 'orangtua' && (
                        <Link href={`/admin/pengguna/edit/${user.id}`} className="text-blue-600 hover:bg-blue-50 px-2 py-1 rounded inline-block" title="Edit">
                          <i className="fa-solid fa-pen-to-square"></i>
                        </Link>
                      )}
                      <DeleteButton id={user.id} role={user.role} />
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
