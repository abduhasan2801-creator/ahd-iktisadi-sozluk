import React from 'react';
import { History, Trash2, ArrowUpRight } from 'lucide-react';
import { EconomicTerm } from '../types/dictionary';
import { stripTashkeel } from '../utils/textNormalization';

interface HistoryViewProps {
  historyIds: string[];
  terms: EconomicTerm[];
  onSelectTerm: (term: EconomicTerm) => void;
  onClearHistory: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  historyIds,
  terms,
  onSelectTerm,
  onClearHistory,
}) => {
  const historyTerms = historyIds
    .map((id) => terms.find((t) => t.id === id))
    .filter((t): t is EconomicTerm => Boolean(t));

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <History className="w-5 h-5 text-[#E30A17]" />
            <span>Arama ve İnceleme Geçmişi</span>
          </h2>
          <p className="text-xs text-slate-500 font-arabic">
            سجل المصطلحات التي اطلعت عليها مؤخراً
          </p>
        </div>

        {historyTerms.length > 0 && (
          <button
            onClick={onClearHistory}
            className="text-xs font-semibold text-red-500 hover:text-red-700 flex items-center gap-1 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Geçmişi Temizle</span>
          </button>
        )}
      </div>

      {historyTerms.length === 0 ? (
        <div className="text-center py-16 px-4 rounded-3xl bg-slate-100 dark:bg-[#1A1A1E] border border-dashed border-slate-300 dark:border-slate-800">
          <History className="w-10 h-10 text-slate-400 mx-auto mb-2" />
          <h3 className="font-bold text-slate-700 dark:text-slate-200 text-base">
            Henüz Arama Geçmişi Yok
          </h3>
          <p className="text-xs text-slate-500 font-arabic mt-1">
            ستظهر هنا المصطلحات التي تقوم بفتحها ودراستها
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {historyTerms.map((term) => (
            <div
              key={term.id}
              onClick={() => onSelectTerm(term)}
              className="flex items-center justify-between p-3.5 rounded-xl bg-white dark:bg-[#1E1E24] border border-slate-200/80 dark:border-slate-800/80 hover:border-red-500/40 cursor-pointer transition-all"
            >
              <div className="min-w-0 pr-3">
                <div className="flex items-baseline gap-2">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    {term.turkish}
                  </h4>
                  <span className="text-xs font-bold text-amber-500 font-arabic" dir="rtl">
                    {stripTashkeel(term.arabic)}
                  </span>
                </div>
                <span className="text-[11px] text-slate-400">
                  {term.category}
                </span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-400 shrink-0" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
