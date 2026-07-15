import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession } from "@/lib/session";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Rute yang butuh perlindungan (bisa ditambahkan /admin, /kader nantinya)
  const isHasilImunisasi = pathname.startsWith("/hasil-imunisasi");

  if (isHasilImunisasi) {
    // Ambil session dari cookies (perlu ekstrak secara manual karena Edge Runtime tidak support await cookies().get() secara default)
    const sessionCookie = request.cookies.get("session")?.value;
    
    if (!sessionCookie) {
      // Belum login, lempar ke halaman login
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    try {
      // Kita perlu import decrypt dari session tapi jose jalan di Edge Runtime jadi aman
      const { decrypt } = await import("@/lib/session");
      const session = await decrypt(sessionCookie);

      if (!session || session.role !== "orangtua") {
        // Kalau bukan orangtua (misal kader), arahkan ke dashboard masing-masing atau tolak akses
        if (session?.role === "admin") return NextResponse.redirect(new URL("/admin/balita", request.url));
        if (session?.role === "kader") return NextResponse.redirect(new URL("/kader", request.url));
        
        return NextResponse.redirect(new URL("/auth/login", request.url));
      }
    } catch (error) {
      // Jika token expired atau rusak
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/hasil-imunisasi/:path*"],
};
