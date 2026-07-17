"use client";

import { useTransition, useState } from "react";
import { deleteJadwal } from "./actions";

export default function DeleteButton({ id }: { id: number }) {
  const [isPending, startTransition] = useTransition();
  const [showModal, setShowModal] = useState(false);

  const handleConfirm = () => {
    setShowModal(false);
    startTransition(async () => {
      await deleteJadwal(id);
    });
  };

  return (
    <>
      <button 
        onClick={() => setShowModal(true)}
        disabled={isPending}
        className={`text-red-600 hover:bg-red-50 px-2 py-1 rounded transition-colors ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`} 
        title="Hapus"
      >
        <i className="fa-solid fa-trash"></i>
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl animate-in fade-in zoom-in duration-200">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 mb-4 text-xl">
                <i className="fa-solid fa-triangle-exclamation"></i>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Hapus Jadwal?</h3>
              <p className="text-gray-500 text-sm mb-6">
                Tindakan ini tidak dapat dibatalkan. Apakah Anda yakin ingin menghapus jadwal ini secara permanen?
              </p>
              <div className="flex items-center gap-3 w-full">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl transition-colors"
                >
                  Ya, Hapus
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
