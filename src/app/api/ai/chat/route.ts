import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import prisma from "@/lib/prisma";
import { generateGroqChatCompletion } from "@/lib/groq";

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Messages array is required" }, { status: 400 });
    }

    // 1. Ekstrak Sesi dan Konteks Balita
    const session = await getSession();
    let userContext = "";

    if (session) {
      const user = await prisma.user.findUnique({ where: { id: session.userId } });
      
      if (user && user.role === 'orangtua') {
        // Ambil data orangtua dan balitanya
        const orangtua = await prisma.orangTua.findUnique({
          where: { userId: user.id },
          include: {
            balita: {
              include: {
                pengukuran: { orderBy: { tanggalPengukuran: 'desc' }, take: 3 },
                imunisasi: { orderBy: { tanggalImunisasi: 'desc' } }
              }
            }
          }
        });

        if (orangtua && orangtua.balita.length > 0) {
          userContext = `\n\n[DATA PENGGUNA SAAT INI]\nNama Ibu: ${orangtua.namaIbu}\nData Anak/Balita:\n`;
          
          orangtua.balita.forEach(b => {
            userContext += `- Nama Balita: ${b.namaBalita} (Jenis Kelamin: ${b.jenisKelamin}, Lahir: ${b.tanggalLahir.toLocaleDateString('id-ID')})\n`;
            
            if (b.pengukuran.length > 0) {
              userContext += `  Riwayat Pengukuran Terakhir: ${b.pengukuran.map(p => `Usia ${p.usiaSaatDiukur} bln: BB ${p.beratBadan}kg, TB ${p.tinggiBadan}cm`).join(' | ')}\n`;
            } else {
              userContext += `  Riwayat Pengukuran: Belum ada data.\n`;
            }

            if (b.imunisasi.length > 0) {
              userContext += `  Riwayat Imunisasi: ${b.imunisasi.map(i => i.jenisImunisasi).join(', ')}\n`;
            } else {
              userContext += `  Riwayat Imunisasi: Belum ada data.\n`;
            }
          });
          userContext += "Gunakan informasi ini jika pengguna bertanya mengenai perkembangan atau status imunisasi anaknya, namun tetap jaga privasi dan gunakan bahasa yang hangat.\n";
        }
      }
    }

    // 2. Persiapkan System Prompt yang sangat ketat
    const systemPrompt = `Anda adalah Asisten AI Spesialis Kesehatan Anak dan Sistem Posyandu Sedap Malam.
Tugas Anda adalah HANYA menjawab pertanyaan seputar:
1. Kesehatan anak dan balita.
2. Perkembangan balita (Gizi, Berat Badan, Tinggi Badan).
3. Jadwal dan jenis imunisasi.
4. Tips *parenting* dan pencegahan stunting.
5. Informasi seputar data balita dari pengguna yang sedang login (jika tersedia).

ATURAN KETAT:
- Jika pengguna bertanya tentang topik di luar kesehatan anak (misal: politik, teknologi umum, cuaca, tokoh, coding, dll), Anda HARUS MENOLAK dengan sopan dan mengingatkan bahwa Anda hanya asisten posyandu.
- Jangan gunakan bahasa yang kaku, gunakan bahasa Indonesia yang ramah, sopan, dan hangat (sapa dengan "Ibu/Bapak" jika konteks pengguna tersedia).
- Jangan berhalusinasi data. Gunakan [DATA PENGGUNA SAAT INI] sebagai fakta tunggal mengenai data anak pengguna.
${userContext}
`;

    // 3. Gabungkan system prompt ke dalam riwayat pesan
    const fullMessages = [
      { role: "system", content: systemPrompt },
      ...messages
    ];

    // 4. Panggil Groq API
    const aiResponse = await generateGroqChatCompletion(fullMessages);

    return NextResponse.json({ message: aiResponse });

  } catch (error) {
    console.error("AI Chat Error:", error);
    return NextResponse.json({ error: "Gagal memproses permintaan AI" }, { status: 500 });
  }
}
