import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditForm from "./EditForm";

export default async function EditPengukuranPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const pengukuranId = parseInt(id);

  if (isNaN(pengukuranId)) {
    notFound();
  }

  const pengukuran = await prisma.pengukuran.findUnique({
    where: { id: pengukuranId },
    include: {
      balita: {
        select: {
          namaBalita: true,
          orangtua: { select: { namaIbu: true } }
        }
      }
    }
  });

  if (!pengukuran) {
    notFound();
  }

  const balitaList = await prisma.balita.findMany({
    select: {
      id: true,
      namaBalita: true,
      orangtua: { select: { namaIbu: true } }
    },
    orderBy: { namaBalita: 'asc' }
  });

  return <EditForm initialData={pengukuran} balitaList={balitaList} />;
}
