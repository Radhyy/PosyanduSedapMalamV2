import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditUserForm from "./EditUserForm";

export default async function EditPenggunaPage({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  const resolvedParams = await params;
  const userId = parseInt(resolvedParams.id, 10);
  
  if (isNaN(userId)) {
    notFound();
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { kader: true }
  });

  if (!user || user.role === 'orangtua') {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto">
      <EditUserForm user={user} />
    </div>
  );
}
