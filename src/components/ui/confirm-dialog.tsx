import React, { useEffect } from 'react';
import { AlertTriangle, LogOut, HelpCircle, Info } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'info',
}: ConfirmDialogProps) {
  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Variant helper styles
  const getIcon = () => {
    switch (variant) {
      case 'danger':
        return (
          <div className="w-16 h-16 bg-rose-50 border-2 border-rose-100 rounded-3xl flex items-center justify-center text-rose-500 mb-4">
            <LogOut className="w-8 h-8 stroke-[2.5]" />
          </div>
        );
      case 'warning':
        return (
          <div className="w-16 h-16 bg-amber-50 border-2 border-amber-100 rounded-3xl flex items-center justify-center text-amber-500 mb-4">
            <AlertTriangle className="w-8 h-8 stroke-[2.5]" />
          </div>
        );
      case 'info':
      default:
        return (
          <div className="w-16 h-16 bg-blue-50 border-2 border-blue-100 rounded-3xl flex items-center justify-center text-blue-500 mb-4">
            <Info className="w-8 h-8 stroke-[2.5]" />
          </div>
        );
    }
  };

  const getConfirmButtonStyles = () => {
    switch (variant) {
      case 'danger':
        return 'bg-rose-500 border-rose-700 hover:bg-rose-450 text-white';
      case 'warning':
        return 'bg-amber-500 border-amber-700 hover:bg-amber-450 text-white';
      case 'info':
      default:
        return 'bg-violet-600 border-violet-850 hover:bg-[#8b5cf6] text-white';
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-sm bg-white border-2 border-slate-100 rounded-[32px] p-6 text-center shadow-[0_24px_60px_-15px_rgba(0,0,0,0.25)] flex flex-col items-center animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon */}
        {getIcon()}

        {/* Title */}
        <h3 className="text-xl font-black text-slate-800 mb-2 leading-tight tracking-tight">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm font-semibold text-slate-500 mb-6 leading-relaxed max-w-70">
          {description}
        </p>

        {/* Actions */}
        <div className="flex w-full gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3.5 px-4 rounded-2xl font-black text-[15px] border-b-4 bg-white border-slate-200 text-slate-500 cursor-pointer hover:bg-slate-50 hover:text-slate-600 transition-all active:translate-y-0.5 active:border-b-0"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 py-3.5 px-4 rounded-2xl font-black text-[15px] border-b-4 cursor-pointer transition-all active:translate-y-0.5 active:border-b-0 ${getConfirmButtonStyles()}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
