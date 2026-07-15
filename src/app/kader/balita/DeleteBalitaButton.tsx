"use client";

import { useState } from "react";
import { deleteBalita } from "./actions";
import ConfirmModal from "@/components/ConfirmModal";

export default function DeleteBalitaButton({ id, nama }: { id: number; nama: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await deleteBalita(id);
      if (!res.success) {
        alert(res.error || "Gagal menghapus balita");
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
        title="Hapus Data Balita"
        message={`Apakah Anda yakin ingin menghapus data balita bernama "${nama}"? Semua data riwayat imunisasi dan pengukurannya juga akan ikut terhapus secara permanen.`}
        onConfirm={handleDelete}
        onCancel={() => setIsOpen(false)}
        isLoading={isDeleting}
      />
    </>
  );
}
