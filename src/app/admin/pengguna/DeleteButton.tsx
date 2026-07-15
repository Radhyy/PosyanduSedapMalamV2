"use client";

import { useState } from "react";
import { deleteUser } from "./actions";
import ConfirmModal from "@/components/ConfirmModal";

export default function DeleteButton({ id, role }: { id: number; role: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await deleteUser(id);
      if (!res.success) {
        alert(res.error || "Gagal menghapus pengguna");
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
        disabled={isDeleting}
        className={`text-red-600 hover:bg-red-50 px-2 py-1 rounded transition-colors ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`} 
        title="Hapus"
      >
        <i className={`fa-solid ${isDeleting ? 'fa-spinner fa-spin' : 'fa-trash'}`}></i>
      </button>

      <ConfirmModal
        isOpen={isOpen}
        title="Hapus Pengguna"
        message={`Apakah Anda yakin ingin menghapus akun ${role} ini? Data yang terkait mungkin akan ikut terhapus.`}
        onConfirm={handleDelete}
        onCancel={() => setIsOpen(false)}
        isLoading={isDeleting}
      />
    </>
  );
}
