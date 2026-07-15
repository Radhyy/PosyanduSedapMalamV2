"use client";

import { useState } from "react";
import { deleteImunisasi } from "./actions";
import ConfirmModal from "@/components/ConfirmModal";

export default function DeleteImunisasiButton({ id, namaBalita, jenisVaksin }: { id: number; namaBalita: string; jenisVaksin: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await deleteImunisasi(id);
      if (!res.success) {
        alert(res.error || "Gagal menghapus imunisasi");
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
        title="Hapus Catatan Imunisasi"
        message={`Apakah Anda yakin ingin menghapus catatan imunisasi ${jenisVaksin} untuk balita ${namaBalita}?`}
        onConfirm={handleDelete}
        onCancel={() => setIsOpen(false)}
        isLoading={isDeleting}
      />
    </>
  );
}
