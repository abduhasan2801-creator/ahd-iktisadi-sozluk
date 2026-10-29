import React from 'react';
import { Clock, ChevronRight, TrendingUp } from 'lucide-react';
import { EconomicTerm } from '../types/dictionary';
import { stripTashkeel } from '../utils/textNormalization';

interface GundemdekiTerimlerProps {
  terms: EconomicTerm[];
  onSelectTerm: (term: EconomicTerm) => void;
}

export const GundemdekiTerimler: React.FC<GundemdekiTerimlerProps> = ({
  terms,
  onSelectTerm,
}) => {
  return (
    <section className="space-y-3">
      {/* Header matching screenshot 1 with Red Clock / Trending Icon */}
      <div className="flex items-center justify-between">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-[#E30A17] flex items-center justify-center text-white text-xs">
            <Clock className="w-3.5 h-3.5 stroke-[2.5]" />
          </span>
          <span>Gündemdeki İktisadi Terimler</span>
        </h2>
        <span className="text-xs text-slate-400 font-arabic">
          المصطلحات الاقتصادية الأكثر بحثاً
        </span>
      </div>

      {/* List matching screenshot 1 cards */}
      <div className="space-y-2.5">
        {terms.map((term, index) => {
          const rank = term.trendingRank || index + 1;
          return (
            <div
              key={term.id}
              onClick={() => onSelectTerm(term)}
              className="group flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-[#1F1F24] dark:bg-[#1E1E24] text-white border border-slate-800/80 hover:border-red-500/40 hover:bg-[#25252b] transition-all cursor-pointer shadow-md"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                {/* Numbered Red Circle Badge like Screenshot 1 */}
                <div className="w-8 h-8 rounded-full bg-[#E30A17] text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-sm">
                  {rank}
                </div>

                {/* Term and Meaning */}
                <div className="min-w-0">
                  <div className="flex items-baseline gap-2">
                    <h3 className="font-bold text-white text-base tracking-tight truncate group-hover:text-amber-300 transition-colors">
                      {term.turkish}
                    </h3>
                    <span className="text-xs font-arabic text-amber-400 font-semibold truncate" dir="rtl">
                      {stripTashkeel(term.arabic)}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 truncate mt-0.5 max-w-md">
                    {term.turkishDefinition}
                  </p>
                </div>
              </div>

              {/* Red Chevron Right Arrow matching Screenshot 1 */}
              <div className="shrink-0 pl-2">
                <ChevronRight className="w-5 h-5 text-[#E30A17] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
