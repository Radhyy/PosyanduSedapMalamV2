"use client";

import { useState } from "react";
import { deletePengukuran } from "./actions";
import ConfirmModal from "@/components/ConfirmModal";

export default function DeletePengukuranButton({ id, namaBalita, tanggal }: { id: number; namaBalita: string; tanggal: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await deletePengukuran(id);
      if (!res.success) {
        alert(res.error || "Gagal menghapus pengukuran");
      }
    } catch (err) {
      alert("Terjadi kesalahan saat menghapus");
    } finally {
      setIsDeleting(false);
      setIsOpen(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="text-red-500 hover:text-red-700 transition-colors" 
        title="Hapus Data"
      >
        <i className="fa-solid fa-trash"></i>
      </button>

      <ConfirmModal
        isOpen={isOpen}
        title="Hapus Catatan Pengukuran"
        message={`Apakah Anda yakin ingin menghapus data pengukuran tanggal ${tanggal} untuk balita ${namaBalita}?`}
        onConfirm={handleDelete}
        onCancel={() => setIsOpen(false)}
        isLoading={isDeleting}
      />
    </>
  );
}
