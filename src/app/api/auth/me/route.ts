import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ user: null });
  
  const user = await prisma.user.findUnique({ where: { id: session.userId } });
  if (!user) return NextResponse.json({ user: null });

  let displayName = user.name;
  if (user.role === 'orangtua') {
    const ot = await prisma.orangTua.findUnique({ where: { userId: user.id } });
    if (ot) displayName = ot.namaIbu;
  }
  
  return NextResponse.json({ user: { id: user.id, username: user.username, role: user.role, displayName } });
}
