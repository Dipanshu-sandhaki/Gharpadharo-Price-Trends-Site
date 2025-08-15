"use client";
import React from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "max-w-2xl", // Default value yaha set
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/60 backdrop-blur-sm"
      onClick={onClose}
      aria-modal
      role="dialog"
    >
      <div
        className={`bg-white dark:bg-gray-900 rounded-lg shadow-xl w-[94%] ${maxWidth} p-5 relative animate-fadeIn transition-colors duration-300`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          aria-label="Close"
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        {title && (
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            {title}
          </h2>
        )}

        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
