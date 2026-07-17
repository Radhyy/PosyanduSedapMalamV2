"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

interface ChartProps {
  genderData: { name: string; value: number }[];
  userData: { name: string; value: number }[];
}

const COLORS = ['#3b82f6', '#ec4899', '#10b981', '#f59e0b']; // Blue, Pink, Green, Amber

export default function AdminCharts({ genderData, userData }: ChartProps) {
  // Hanya tampilkan jika ada data
  const hasGenderData = genderData.some(d => d.value > 0);
  const hasUserData = userData.some(d => d.value > 0);

  return (
    <div className="grid lg:grid-cols-2 gap-6 mt-6">
      {/* Chart Jenis Kelamin */}
      <div className="bg-white rounded-[24px] border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] p-6">
        <h3 className="text-lg font-bold text-gray-900 tracking-tight mb-6">Demografi Balita</h3>
        <div className="h-[300px] w-full">
          {hasGenderData ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {genderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.name === 'Laki-laki' ? '#3b82f6' : '#ec4899'} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: any) => [`${value} Anak`, 'Total']}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                />
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400 text-sm">Belum ada data balita.</div>
          )}
        </div>
      </div>

      {/* Chart Tipe Pengguna */}
      <div className="bg-white rounded-[24px] border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] p-6">
        <h3 className="text-lg font-bold text-gray-900 tracking-tight mb-6">Distribusi Pengguna</h3>
        <div className="h-[300px] w-full">
          {hasUserData ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} allowDecimals={false} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="value" name="Total" radius={[6, 6, 0, 0]} maxBarSize={50}>
                  {userData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400 text-sm">Belum ada data pengguna.</div>
          )}
        </div>
      </div>
    </div>
  );
}
