import React from 'react';
import { Bookmark, ChevronRight, Trash2, BookOpen } from 'lucide-react';
import { EconomicTerm } from '../types/dictionary';
import { stripTashkeel } from '../utils/textNormalization';

interface FavoritesViewProps {
  favoriteIds: string[];
  terms: EconomicTerm[];
  onSelectTerm: (term: EconomicTerm) => void;
  onRemoveFavorite: (id: string) => void;
  onClearAll: () => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  favoriteIds,
  terms,
  onSelectTerm,
  onRemoveFavorite,
  onClearAll,
}) => {
  const favoriteTerms = terms.filter((t) => favoriteIds.includes(t.id));

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-amber-500 fill-amber-500" />
            <span>Sık Kullanılanlar & Favoriler</span>
          </h2>
          <p className="text-xs text-slate-500 font-arabic">
            المصطلحات المحفوظة في قائمتك المفضلة ({favoriteTerms.length})
          </p>
        </div>

        {favoriteTerms.length > 0 && (
          <button
            onClick={onClearAll}
            className="text-xs font-semibold text-red-500 hover:text-red-700 flex items-center gap-1 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Tümünü Sil</span>
          </button>
        )}
      </div>

      {favoriteTerms.length === 0 ? (
        <div className="text-center py-16 px-4 rounded-3xl bg-slate-100 dark:bg-[#1A1A1E] border border-dashed border-slate-300 dark:border-slate-800">
          <Bookmark className="w-10 h-10 text-slate-400 mx-auto mb-2" />
          <h3 className="font-bold text-slate-700 dark:text-slate-200 text-base">
            Henüz Favori Terim Eklenmedi
          </h3>
          <p className="text-xs text-slate-500 font-arabic mt-1">
            انقر على أيقونة الإشارة المرجعية بجانب أي مصطلح اقتصادي لحفظه هنا
          </p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {favoriteTerms.map((term) => (
            <div
              key={term.id}
              onClick={() => onSelectTerm(term)}
              className="group flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-[#1E1E24] border border-slate-200/80 dark:border-slate-800/80 hover:border-amber-400/50 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex-1 min-w-0 pr-3">
                <span className="text-[10px] font-semibold text-[#C8102E] dark:text-red-400 uppercase">
                  {term.category}
                </span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors">
                    {term.turkish}
                  </h3>
                  <span className="text-sm font-bold text-amber-600 dark:text-amber-400 font-arabic" dir="rtl">
                    {stripTashkeel(term.arabic)}
                  </span>
                </div>
                <p className="text-xs text-slate-500 truncate mt-1">
                  {term.turkishDefinition}
                </p>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveFavorite(term.id);
                  }}
                  className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Favorilerden Kaldır"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <ChevronRight className="w-5 h-5 text-slate-300 dark:text-slate-600 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
