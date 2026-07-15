import { NextResponse } from "next/server";
import { generateGroqCompletion } from "@/lib/groq";
import { getSession } from "@/lib/session";

export async function POST(req: Request) {
  try {
    // Pastikan user sudah login (opsional, tapi disarankan untuk keamanan API)
    const session = await getSession();
    if (!session || session.role !== "orangtua") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { namaBalita, usia, beratBadan, tinggiBadan } = body;

    if (!namaBalita || usia === undefined || !beratBadan || !tinggiBadan) {
      return NextResponse.json({ error: "Data balita tidak lengkap" }, { status: 400 });
    }

    const systemPrompt = `Anda adalah asisten kesehatan anak yang ahli, empatik, dan suportif dari "Posyandu Sedap Malam". 
Tugas Anda adalah memberikan evaluasi dan rekomendasi singkat mengenai tumbuh kembang balita kepada ibunya.
Gunakan bahasa Indonesia yang santai, ramah, dan mudah dipahami oleh ibu-ibu (gunakan sapaan "Bunda" atau "Ibu").
JANGAN memberikan diagnosa medis, cukup berikan saran gizi, apresiasi, atau stimulasi aktivitas yang sesuai dengan usianya.
Berikan format jawaban dalam 1 paragraf singkat pujian/evaluasi, diikuti dengan 2-3 poin (*bullet points*) tips praktis.`;

    const userMessage = `Tolong berikan evaluasi untuk balita saya yang bernama ${namaBalita}. 
Saat ini usianya ${usia} bulan, dengan berat badan ${beratBadan} kg dan tinggi badan ${tinggiBadan} cm.
Apakah pertumbuhannya bagus? Tolong berikan rekomendasi untuk menjaga atau memperbaikinya.`;

    const aiResponse = await generateGroqCompletion(systemPrompt, userMessage);

    return NextResponse.json({ recommendation: aiResponse });
  } catch (error) {
    console.error("AI Recommendation API Error:", error);
    return NextResponse.json({ error: "Gagal mengambil rekomendasi AI" }, { status: 500 });
  }
}
