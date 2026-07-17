import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditJadwalForm from "./EditJadwalForm";

export default async function EditJadwalPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id);
  if (isNaN(id)) return notFound();

  const jadwal = await prisma.jadwalPosyandu.findUnique({
    where: { id }
  });

  if (!jadwal) return notFound();

  return <EditJadwalForm jadwal={jadwal} />;
}
