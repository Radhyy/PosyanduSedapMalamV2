"use client";

import { useEffect } from "react";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function ConfirmModal({ isOpen, title, message, onConfirm, onCancel, isLoading = false }: ConfirmModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity"
        onClick={!isLoading ? onCancel : undefined}
      ></div>

      {/* Modal Content */}
      <div className="bg-white rounded-[24px] shadow-xl w-full max-w-sm relative z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6 text-center">
          <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center text-xl mb-4 mx-auto">
            <i className="fa-solid fa-triangle-exclamation"></i>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-sm text-gray-500 leading-relaxed">{message}</p>
        </div>
        
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-center gap-3 border-t border-gray-100">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-200/50 rounded-xl transition-colors disabled:opacity-50"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="px-4 py-2 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 rounded-xl transition-colors disabled:opacity-50 flex items-center gap-2 shadow-sm shadow-red-500/20"
          >
            {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : null}
            {isLoading ? 'Menghapus...' : 'Ya, Hapus'}
          </button>
        </div>
      </div>
    </div>
  );
}
