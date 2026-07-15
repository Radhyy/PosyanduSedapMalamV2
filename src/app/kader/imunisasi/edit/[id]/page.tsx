import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditForm from "./EditForm";

export default async function EditImunisasiPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const imunisasiId = parseInt(id);

  if (isNaN(imunisasiId)) {
    notFound();
  }

  const imunisasi = await prisma.imunisasi.findUnique({
    where: { id: imunisasiId },
    include: {
      balita: {
        select: {
          namaBalita: true,
          orangtua: { select: { namaIbu: true } }
        }
      }
    }
  });

  if (!imunisasi) {
    notFound();
  }

  // Also fetch list of balita for the dropdown
  const balitaList = await prisma.balita.findMany({
    select: {
      id: true,
      namaBalita: true,
      orangtua: { select: { namaIbu: true } }
    },
    orderBy: { namaBalita: 'asc' }
  });

  return <EditForm initialData={imunisasi} balitaList={balitaList} />;
}
