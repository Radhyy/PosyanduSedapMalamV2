"use client";

import { useTransition } from "react";
import { setActiveJadwal } from "./actions";

export default function ActivateButton({ id, isActive }: { id: number, isActive: boolean }) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    if (isActive) return; // Prevent clicking if already active
    
    startTransition(async () => {
      await setActiveJadwal(id);
    });
  };

  return (
    <button 
      onClick={handleToggle}
      disabled={isPending || isActive}
      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 ${
        isActive 
          ? 'bg-green-500 text-white cursor-default' 
          : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-posyandu-blue hover:border-posyandu-blue'
      } ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
      title={isActive ? 'Jadwal ini sedang tayang di website' : 'Jadikan jadwal ini yang tayang di website'}
    >
      {isPending ? (
        <><i className="fa-solid fa-spinner fa-spin"></i> Loading...</>
      ) : isActive ? (
        <><i className="fa-solid fa-circle-check"></i> Sedang Tayang</>
      ) : (
        <><i className="fa-regular fa-eye"></i> Tampilkan</>
      )}
    </button>
  );
}
