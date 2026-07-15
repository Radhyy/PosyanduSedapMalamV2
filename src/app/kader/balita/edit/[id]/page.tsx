import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditForm from "./EditForm";

export default async function EditBalitaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const balitaId = parseInt(id);

  if (isNaN(balitaId)) {
    notFound();
  }

  const balita = await prisma.balita.findUnique({
    where: { id: balitaId },
    include: {
      orangtua: true,
    }
  });

  if (!balita) {
    notFound();
  }

  return <EditForm initialData={balita} />;
}
