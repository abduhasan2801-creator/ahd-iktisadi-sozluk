import React from 'react';
import { Star, Info, ArrowRight, Volume2 } from 'lucide-react';
import { EconomicTerm } from '../types/dictionary';
import { speakTerm } from '../utils/speech';
import { stripTashkeel } from '../utils/textNormalization';

interface BuAyinTerimiCardProps {
  term: EconomicTerm;
  onOpenDetails: (term: EconomicTerm) => void;
}

export const BuAyinTerimiCard: React.FC<BuAyinTerimiCardProps> = ({
  term,
  onOpenDetails,
}) => {
  return (
    <section className="space-y-2.5">
      {/* Section Title matching screenshot 1 with Star Icon */}
      <div className="flex items-center justify-between">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Star className="w-5 h-5 text-[#E30A17] fill-[#E30A17]" />
          <span>Bu Ayın İktisadi Terimi</span>
        </h2>
        <span className="text-xs text-amber-500 font-arabic font-medium">
          مصطلح الشهر الاقتصادي
        </span>
      </div>

      {/* Card matching screenshot 1 dark container */}
      <div
        onClick={() => onOpenDetails(term)}
        className="group relative bg-[#1F1F24] dark:bg-[#1E1E24] text-white rounded-3xl p-5 sm:p-6 shadow-xl border border-slate-800/80 hover:border-amber-400/50 transition-all cursor-pointer overflow-hidden"
      >
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-[#E30A17]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Date / Month pill badge */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#E30A17] text-white shadow-sm">
            Ekim 2026
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              speakTerm(term.turkish, 'tr');
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Dinle"
            aria-label="Dinle"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        {/* Turkish Term Heading */}
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-1 group-hover:text-amber-300 transition-colors">
          {term.turkish}
        </h3>

        {/* Arabic Equivalent in Gold (Clean Unvowelized) */}
        <div className="text-lg sm:text-xl font-bold text-amber-400 font-arabic mb-3" dir="rtl">
          {stripTashkeel(term.arabic)}
        </div>

        {/* Definition preview with (i) icon */}
        <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300/90 leading-relaxed mb-4 bg-white/5 p-3 rounded-xl border border-white/5">
          <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <p className="line-clamp-3">{term.turkishDefinition}</p>
        </div>

        {/* Bottom CTA Link: Detaylı İncele -> in Red/Gold */}
        <div className="flex items-center justify-end">
          <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#E30A17] group-hover:text-amber-400 transition-colors">
            <span>Detaylı İncele</span>
            <span className="font-arabic text-xs">(شرح مفصل)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </section>
  );
};
