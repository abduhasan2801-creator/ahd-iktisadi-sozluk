import React from 'react';
import { Layers, ChevronRight, PieChart, Landmark, Receipt, Globe, TrendingUp, Scale, Building2, Coins } from 'lucide-react';
import { ECONOMIC_CATEGORIES, ECONOMIC_TERMS } from '../data/economicTerms';
import { EconomicTerm } from '../types/dictionary';

interface CategoriesViewProps {
  onSelectCategoryFilter: (categoryTr: string) => void;
  onSelectTerm: (term: EconomicTerm) => void;
}

export const CategoriesView: React.FC<CategoriesViewProps> = ({
  onSelectCategoryFilter,
  onSelectTerm,
}) => {
  const getCategoryIcon = (name: string) => {
    switch (name) {
      case 'Makroekonomi':
        return PieChart;
      case 'Para ve Bankacılık':
        return Landmark;
      case 'Maliye ve Vergi':
        return Receipt;
      case 'Uluslararası Ticaret':
        return Globe;
      case 'Borsa ve Finansal Piyasalar':
        return TrendingUp;
      case 'İslam İktisadı ve Katılım Finansı':
        return Scale;
      case 'Şirketler ve Girişimcilik':
        return Building2;
      case 'Dijital Varlıklar ve Kripto':
        return Coins;
      default:
        return Layers;
    }
  };

  const categories = ECONOMIC_CATEGORIES.filter((c) => c.tr !== 'Tümü');

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <div>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#E30A17]" />
          <span>İktisadi Alanlar ve Kategoriler</span>
        </h2>
        <p className="text-xs text-slate-500 font-arabic">
          تصفح المصطلحات حسب الاختصاصات والمجالات الاقتصادية
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {categories.map((cat) => {
          const Icon = getCategoryIcon(cat.tr);
          const termCount = ECONOMIC_TERMS.filter((t) => t.category === cat.tr).length;

          return (
            <div
              key={cat.tr}
              onClick={() => onSelectCategoryFilter(cat.tr)}
              className="group p-4 rounded-2xl bg-white dark:bg-[#1E1E24] border border-slate-200/80 dark:border-slate-800/80 hover:border-[#E30A17] dark:hover:border-amber-400/50 shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/40 text-[#C8102E] dark:text-red-400 flex items-center justify-center shrink-0 border border-red-200/40 dark:border-red-900/40 group-hover:bg-[#C8102E] group-hover:text-white transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white truncate group-hover:text-[#C8102E] dark:group-hover:text-amber-400 transition-colors">
                    {cat.tr}
                  </h3>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-arabic truncate" dir="rtl">
                    {cat.ar}
                  </div>
                  <span className="text-[10px] text-slate-400">
                    {termCount} terim
                  </span>
                </div>
              </div>

              <ChevronRight className="w-5 h-5 text-slate-300 dark:text-slate-600 group-hover:text-[#C8102E] dark:group-hover:text-amber-400 group-hover:translate-x-1 transition-transform shrink-0" />
            </div>
          );
        })}
      </div>
    </div>
  );
};
