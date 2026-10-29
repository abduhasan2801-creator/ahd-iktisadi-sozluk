import React, { useState } from 'react';
import {
  X,
  Volume2,
  Bookmark,
  Share2,
  Copy,
  Check,
  ArrowRight,
  TrendingUp,
  Tag,
  ExternalLink,
} from 'lucide-react';
import { EconomicTerm } from '../types/dictionary';
import { speakTerm } from '../utils/speech';
import { stripTashkeel } from '../utils/textNormalization';

interface TermDetailModalProps {
  term: EconomicTerm | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelectRelatedTerm?: (termName: string) => void;
}

export const TermDetailModal: React.FC<TermDetailModalProps> = ({
  term,
  onClose,
  isFavorite,
  onToggleFavorite,
  onSelectRelatedTerm,
}) => {
  const [copied, setCopied] = useState(false);

  if (!term) return null;

  const handleCopy = () => {
    const textToCopy = `📌 ${term.turkish} ⇄ ${term.arabic}\n\n🇹🇷 Açıklama (TR):\n${term.turkishDefinition}\nÖrnek: "${term.turkishExample}"\n\n🇸🇦 الشرح (AR):\n${term.arabicDefinition}\nمثال: "${term.arabicExample}"\n\n— AHD İktisadi Sözlük`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${term.turkish} - ${term.arabic} | AHD İktisadi Sözlük`,
          text: `${term.turkish} (${term.arabic}): ${term.turkishDefinition}`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      handleCopy();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#1A1A1E] text-slate-900 dark:text-slate-100 rounded-3xl shadow-2xl border border-red-500/20 dark:border-amber-500/20 overflow-hidden my-auto max-h-[90vh] flex flex-col z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Top Gold Accent Line */}
        <div className="h-1 bg-gradient-to-r from-amber-500 via-yellow-300 to-[#E30A17]" />

        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-3 bg-slate-50/50 dark:bg-[#141417]/50">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 dark:bg-red-950/60 text-[#C8102E] dark:text-red-400 border border-red-200/50 dark:border-red-800/40">
              <Tag className="w-3 h-3" />
              <span>{term.category}</span>
              <span className="text-slate-400">·</span>
              <span className="font-arabic">{term.categoryAr}</span>
            </span>
            {term.isTrending && (
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-medium text-amber-600 dark:text-amber-400">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Gündemde</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => onToggleFavorite(term.id)}
              className={`p-2 rounded-xl transition-all ${
                isFavorite
                  ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/40'
                  : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title={isFavorite ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
              aria-label="Favori Ekle"
            >
              <Bookmark className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={handleCopy}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              title="Kopyala / نسخ"
              aria-label="Kopyala"
            >
              {copied ? <Check className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5" />}
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              title="Paylaş / مشاركة"
              aria-label="Paylaş"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all ml-1"
              aria-label="Kapat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Main Dual Terms Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100/70 dark:from-[#202026] dark:to-[#17171B] border border-slate-200/80 dark:border-slate-800">
            {/* Turkish Word Card */}
            <div className="flex flex-col justify-between p-3.5 bg-white dark:bg-[#151518] rounded-xl border border-slate-200/60 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#C8102E] dark:text-red-400 flex items-center gap-1">
                  🇹🇷 Türkçe Terim
                </span>
                <button
                  onClick={() => speakTerm(term.turkish, 'tr')}
                  className="p-1.5 text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-amber-400 rounded-lg hover:bg-red-50 dark:hover:bg-slate-800 transition-colors"
                  title="Türkçe Telaffuzu Dinle"
                  aria-label="Türkçe Sesli Dinle"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                {term.turkish}
              </h2>
              {term.turkishPhonetic && (
                <span className="text-xs text-slate-400 font-mono mt-1">
                  /{term.turkishPhonetic}/
                </span>
              )}
            </div>

            {/* Arabic Word Card */}
            <div className="flex flex-col justify-between p-3.5 bg-white dark:bg-[#151518] rounded-xl border border-slate-200/60 dark:border-slate-800 shadow-sm text-right" dir="rtl">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-bold tracking-wider text-amber-600 dark:text-amber-400 font-arabic flex items-center gap-1">
                  🇸🇦 المصطلح بالعربية
                </span>
                <button
                  onClick={() => speakTerm(stripTashkeel(term.arabic), 'ar')}
                  className="p-1.5 text-slate-500 hover:text-amber-600 dark:text-slate-400 dark:hover:text-amber-400 rounded-lg hover:bg-amber-50 dark:hover:bg-slate-800 transition-colors"
                  title="استمع للنطق بالعربية"
                  aria-label="استمع للنطق بالعربية"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-arabic tracking-wide">
                {stripTashkeel(term.arabic)}
              </h2>
            </div>
          </div>

          {/* Section 1: Detailed Explanations */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold tracking-wide uppercase text-slate-400 dark:text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-600" />
              <span>İktisadi Anlam ve Açıklama / الشرح الاقتصادي المفصل</span>
            </h3>

            {/* Turkish Detailed Definition */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1E1E24] border border-slate-200/70 dark:border-slate-800/80">
              <div className="flex items-center gap-2 mb-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
                <span>Türkçe Tanım:</span>
              </div>
              <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed font-normal">
                {term.turkishDefinition}
              </p>
            </div>

            {/* Arabic Detailed Definition - Clean Unvowelized */}
            <div className="p-4 rounded-2xl bg-amber-500/5 dark:bg-amber-950/20 border border-amber-500/20 dark:border-amber-900/30 text-right" dir="rtl">
              <div className="flex items-center gap-2 mb-1.5 text-xs font-bold text-amber-700 dark:text-amber-400 font-arabic">
                <span>الشرح والمدلول الاقتصادي:</span>
              </div>
              <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed font-arabic font-medium">
                {stripTashkeel(term.arabicDefinition)}
              </p>
            </div>
          </div>

          {/* Section 2: Real-World Economic Examples */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold tracking-wide uppercase text-slate-400 dark:text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>Kullanım Örnekleri / أمثلة واقعية في السياق الاقتصادي</span>
            </h3>

            <div className="p-4 rounded-2xl bg-slate-100/60 dark:bg-[#18181D] border border-slate-200/60 dark:border-slate-800 space-y-3">
              <div className="flex items-start gap-2.5">
                <span className="text-xs font-bold text-red-600 dark:text-red-400 shrink-0 mt-0.5">
                  Örnek:
                </span>
                <p className="text-sm text-slate-700 dark:text-slate-300 italic">
                  "{term.turkishExample}"
                </p>
              </div>

              <div className="h-[1px] bg-slate-200 dark:bg-slate-800" />

              <div className="flex items-start gap-2.5 text-right justify-end" dir="rtl">
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 shrink-0 font-arabic mt-0.5">
                  مثال تطبيقي:
                </span>
                <p className="text-sm text-slate-700 dark:text-slate-300 font-arabic font-medium">
                  «{stripTashkeel(term.arabicExample)}»
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Related Terms */}
          {term.relatedTerms && term.relatedTerms.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                İlgili Terimler / مصطلحات ذات صلة
              </h3>
              <div className="flex flex-wrap gap-2">
                {term.relatedTerms.map((relName, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (onSelectRelatedTerm) {
                        onSelectRelatedTerm(relName);
                      }
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-red-500 hover:text-white dark:hover:bg-red-600 transition-colors"
                  >
                    <span>{relName}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 dark:bg-[#141417] border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
          <span className="text-[11px] font-serif tracking-wider text-amber-500 font-bold">
            AHD İktisadi Sözlük
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-white rounded-xl font-medium transition-all"
          >
            Tamam / إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
