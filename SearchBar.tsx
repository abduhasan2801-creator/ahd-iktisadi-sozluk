import React from 'react';
import { Search, X, ArrowRightLeft, AlertCircle } from 'lucide-react';
import { SearchDirection } from '../types/dictionary';
import { ECONOMIC_CATEGORIES } from '../data/economicTerms';
import { hasArabicCharacters, hasLatinCharacters } from '../utils/textNormalization';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  direction: SearchDirection;
  onSetDirection: (direction: SearchDirection) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  resultCount: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  direction,
  onSetDirection,
  selectedCategory,
  onSelectCategory,
  resultCount,
}) => {
  const isTrToAr = direction === 'tr-to-ar';
  const isWrongLangInTr = isTrToAr && hasArabicCharacters(searchQuery);
  const isWrongLangInAr = !isTrToAr && hasLatinCharacters(searchQuery);

  const turkishSpecialChars = ['ç', 'ğ', 'ı', 'ö', 'ş', 'ü'];

  const handleCharInsert = (char: string) => {
    onSearchChange(searchQuery + char);
  };

  return (
    <div className="space-y-3">
      {/* 1. Clear, Prominent Direction Segmented Control */}
      <div className="bg-slate-100 dark:bg-[#18181D] p-1.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 grid grid-cols-2 gap-1.5 shadow-sm">
        <button
          type="button"
          onClick={() => onSetDirection('tr-to-ar')}
          className={`py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
            isTrToAr
              ? 'bg-[#E30A17] text-white shadow-md ring-2 ring-red-400/40'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800'
          }`}
        >
          <span className="text-base">🇹🇷</span>
          <span className="whitespace-nowrap">Türkçe ➔ Arapça</span>
          <span className="text-[11px] opacity-80 font-arabic hidden sm:inline">(تركي ➔ عربي)</span>
        </button>

        <button
          type="button"
          onClick={() => onSetDirection('ar-to-tr')}
          className={`py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
            !isTrToAr
              ? 'bg-[#C8102E] text-white shadow-md ring-2 ring-red-400/40'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800'
          }`}
        >
          <span className="text-base">🇸🇦</span>
          <span className="font-arabic font-bold whitespace-nowrap">عربي ➔ تركي</span>
          <span className="text-[11px] opacity-80 hidden sm:inline">(Arapça ➔ TR)</span>
        </button>
      </div>

      {/* 2. Strict Language Mismatch Warning Banner */}
      {isWrongLangInTr && (
        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs flex items-center justify-between gap-3 animate-in fade-in duration-150">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-500" />
            <p className="font-arabic leading-snug">
              تنبيه: أنت حالياً في وضع <strong>(تركي ➔ عربي)</strong>، يرجى إدخال المصطلح باللغة التركية، أو التبديل إلى وضع البحث بالعربية.
            </p>
          </div>
          <button
            onClick={() => onSetDirection('ar-to-tr')}
            className="shrink-0 px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-lg text-xs font-arabic transition-all shadow-sm"
          >
            التبديل إلى (عربي ➔ تركي)
          </button>
        </div>
      )}

      {isWrongLangInAr && (
        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs flex items-center justify-between gap-3 animate-in fade-in duration-150">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-500" />
            <p className="leading-snug">
              Uyarı: <strong>(Arapça ➔ Türkçe)</strong> modundasınız. Türkçe terim aramak için lütfen yönü değiştiriniz.
            </p>
          </div>
          <button
            onClick={() => onSetDirection('tr-to-ar')}
            className="shrink-0 px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-lg text-xs transition-all shadow-sm"
          >
            (Türkçe ➔ Arapça) Moduna Geç
          </button>
        </div>
      )}

      {/* 3. Search Input */}
      <div className="relative flex items-center bg-white dark:bg-[#1E1E24] rounded-2xl border-2 border-slate-200 dark:border-slate-800 focus-within:border-[#E30A17] dark:focus-within:border-amber-400 shadow-md transition-all">
        <div className="pl-3.5 pr-1 text-slate-400 flex items-center">
          <Search className="w-5 h-5 text-[#E30A17]" />
        </div>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={
            isTrToAr
              ? 'Yalnızca Türkçe iktisat terimi yazın (örn. Enflasyon, Faiz, Devalüasyon)...'
              : 'اكتب المصطلح الاقتصادي بالعربية فقط (مثل: التضخم، سعر الصرف، السندات)...'
          }
          dir={isTrToAr ? 'ltr' : 'rtl'}
          className="w-full py-3.5 px-3 bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm md:text-base focus:outline-none font-medium"
        />

        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="p-1.5 mr-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Temizle"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Turkish Character Helper Bar */}
      {isTrToAr && (
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 text-xs">
          <span className="text-[11px] text-slate-400 shrink-0 font-medium mr-1">
            Türkçe Karakterler:
          </span>
          {turkishSpecialChars.map((ch) => (
            <button
              key={ch}
              onClick={() => handleCharInsert(ch)}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-mono text-xs font-bold transition-colors"
            >
              {ch}
            </button>
          ))}
        </div>
      )}

      {/* Category Horizontal Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-0.5 scrollbar-none">
        {ECONOMIC_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.tr;
          return (
            <button
              key={cat.tr}
              onClick={() => onSelectCategory(cat.tr)}
              className={`px-3 py-1.5 rounded-xl text-xs whitespace-nowrap shrink-0 transition-all font-medium ${
                isSelected
                  ? 'bg-[#C8102E] text-white shadow-sm font-semibold'
                  : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <span>{isTrToAr ? cat.tr : cat.ar}</span>
            </button>
          );
        })}
      </div>

      {/* Active Search Mode Banner & Result Count */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
        <span className="font-semibold text-[#E30A17] dark:text-red-400">
          {isTrToAr ? '🇹🇷 Yalnızca Türkçe Terim Araması' : '🇸🇦 البحث في المصطلحات العربية حصراً'}
        </span>
        <span className="font-bold text-slate-700 dark:text-slate-300">
          {resultCount} {resultCount === 1 ? 'terim' : 'terim'}
        </span>
      </div>
    </div>
  );
};
