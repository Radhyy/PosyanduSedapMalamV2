// src/lib/groq.ts

// Daftar API Keys Groq untuk Load Balancing
const GROQ_API_KEYS = [
  process.env.GROQ_API_KEY_1 || "",
  process.env.GROQ_API_KEY_2 || "",
  process.env.GROQ_API_KEY_3 || "",
  process.env.GROQ_API_KEY_4 || "",
  process.env.GROQ_API_KEY_5 || ""
].filter(key => key !== "");

let currentIndex = 0;

/**
 * Mengambil API Key Groq secara Round-Robin untuk Load Balancing
 */
export function getNextGroqApiKey(): string {
  const key = GROQ_API_KEYS[currentIndex];
  // Pindah ke index berikutnya, jika sudah di ujung, kembali ke 0
  currentIndex = (currentIndex + 1) % GROQ_API_KEYS.length;
  return key;
}

/**
 * Fungsi pembantu untuk memanggil Groq API
 */
export async function generateGroqCompletion(systemPrompt: string, userMessage: string) {
  const apiKey = getNextGroqApiKey();
  
  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant", // Menggunakan model Llama 3.1 terbaru
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage }
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Groq API Error:", errorData);
      throw new Error("Gagal mengambil respon dari Groq API");
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || "Tidak ada saran dari AI saat ini.";
  } catch (error) {
    console.error("Groq Request Failed:", error);
    throw error;
  }
}
