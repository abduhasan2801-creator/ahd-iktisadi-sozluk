import React from 'react';
import { X, ShieldCheck, BookOpen, Sparkles, Heart } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-white dark:bg-[#1E1E24] text-slate-900 dark:text-white rounded-3xl p-6 shadow-2xl border border-red-500/20 dark:border-amber-500/30 z-10 animate-in zoom-in-95 duration-150 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <BrandLogo size="md" showSubtitle={true} />
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <p className="font-semibold text-slate-900 dark:text-white">
            <strong className="text-gold-metallic">AHD İktisadi Sözlük</strong>, Türkçe ve Arapça dilleri arasında ekonomi, finans, bankacılık, dış ticaret ve sermaye piyasaları alanlarında uzmanlaşmış iki dilli dijital sözlük platformudur.
          </p>

          <div className="p-3 bg-red-50 dark:bg-red-950/30 rounded-2xl border border-red-200/50 dark:border-red-900/30 font-arabic text-right leading-relaxed" dir="rtl">
            <span className="font-bold text-[#C8102E] dark:text-red-400 block mb-1">
              عن معجم AHD الاقتصادي:
            </span>
            معجم رقمي احترافي متخصص في المصطلحات الاقتصادية والمصرفية والمالية بين اللغتين التركية والعربية، صُمم بواجهة مستوحاة من الهوية التركية بألوانها الأحمر والذهبي اللامع مع دعم الشروحات المفصلة والنطق الصوتي والوضع الليلي الكامل.
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#E30A17] shrink-0" />
              <span className="text-xs font-medium">Kapsamlı İktisat Terimleri</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
              <span className="text-xs font-medium">Altın Tasarım & Gece Modu</span>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Sürüm 1.0 · 2026</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#C8102E] text-white rounded-xl font-semibold hover:bg-[#a60b24] transition-all"
          >
            Kapat / إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
