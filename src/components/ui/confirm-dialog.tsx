import React, { useEffect } from "react";
import { AlertTriangle, LogOut, Info } from "lucide-react";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "info";
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "info",
}: ConfirmDialogProps) {
  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getIcon = () => {
    switch (variant) {
      case "danger":
        return (
          <div className="w-14 h-14 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/60 rounded-2xl flex items-center justify-center text-rose-500 mb-3">
            <LogOut className="w-7 h-7" />
          </div>
        );
      case "warning":
        return (
          <div className="w-14 h-14 bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/60 rounded-2xl flex items-center justify-center text-amber-500 mb-3">
            <AlertTriangle className="w-7 h-7" />
          </div>
        );
      case "info":
      default:
        return (
          <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl flex items-center justify-center text-emerald-500 mb-3">
            <Info className="w-7 h-7" />
          </div>
        );
    }
  };

  const getConfirmButtonStyles = () => {
    switch (variant) {
      case "danger":
        return "bg-[#dc2626] hover:bg-[#b91c1c] dark:bg-[#ef4444] dark:hover:bg-[#dc2626] text-white";
      case "warning":
        return "bg-amber-500 hover:bg-amber-600 text-white";
      case "info":
      default:
        return "bg-[#059669] hover:bg-[#047857] dark:bg-[#10b981] dark:hover:bg-[#059669] text-white";
    }
  };

  return (
    <div
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 transition-all duration-300 animate-fade-in select-none"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm bg-white dark:bg-[#111722] border border-slate-200 dark:border-[#1e293b] rounded-3xl p-6 text-center shadow-2xl flex flex-col items-center animate-pop-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon */}
        {getIcon()}

        {/* Title */}
        <h3 className="text-xl font-black text-slate-900 dark:text-white mb-1.5 leading-tight tracking-tight">
          {title}
        </h3>

        {/* Description */}
        <p className="text-xs md:text-sm font-medium text-slate-500 dark:text-slate-400 mb-6 leading-relaxed max-w-[280px]">
          {description}
        </p>

        {/* Actions */}
        <div className="flex w-full gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-2xl font-extrabold text-sm border border-slate-200 dark:border-[#1e293b] bg-slate-100 hover:bg-slate-200 dark:bg-[#182232] dark:hover:bg-[#1c293d] text-slate-700 dark:text-slate-300 cursor-pointer transition-all active:scale-98"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`flex-1 py-3 px-4 rounded-2xl font-black text-sm cursor-pointer transition-all active:scale-98 shadow-md ${getConfirmButtonStyles()}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
