import React, { useState, useMemo } from 'react';
import { SearchBar } from './SearchBar';
import { EconomicTerm, SearchDirection } from '../types/dictionary';
import { Volume2, Bookmark, ChevronRight, BookOpen, AlertTriangle } from 'lucide-react';
import { speakTerm } from '../utils/speech';
import {
  searchTurkishStrict,
  searchArabicStrict,
  stripTashkeel,
  hasArabicCharacters,
  hasLatinCharacters,
  normalizeArabic,
} from '../utils/textNormalization';

interface SearchViewProps {
  terms: EconomicTerm[];
  onSelectTerm: (term: EconomicTerm) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  initialQuery?: string;
  initialDirection?: SearchDirection;
}

export const SearchView: React.FC<SearchViewProps> = ({
  terms,
  onSelectTerm,
  favorites,
  onToggleFavorite,
  initialQuery = '',
  initialDirection = 'tr-to-ar',
}) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [direction, setDirection] = useState<SearchDirection>(initialDirection);
  const [selectedCategory, setSelectedCategory] = useState<string>('Tümü');
  const [selectedLetter, setSelectedLetter] = useState<string>('ALL');

  const isTrToAr = direction === 'tr-to-ar';
  const hasWrongInputInTr = isTrToAr && hasArabicCharacters(searchQuery);
  const hasWrongInputInAr = !isTrToAr && hasLatinCharacters(searchQuery);

  const turkishAlphabet = [
    'ALL', 'A', 'B', 'C', 'Ç', 'D', 'E', 'F', 'G', 'H', 'İ', 'I', 'K', 'L', 'M', 'N', 'O', 'Ö', 'P', 'R', 'S', 'Ş', 'T', 'U', 'Ü', 'V', 'Y', 'Z',
  ];

  const arabicAlphabet = [
    'ALL', 'ا', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ك', 'ل', 'م', 'ن', 'هـ', 'و', 'ي',
  ];

  const alphabet = isTrToAr ? turkishAlphabet : arabicAlphabet;

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (query.trim() && selectedLetter !== 'ALL') {
      setSelectedLetter('ALL');
    }
  };

  const handleDirectionChange = (newDir: SearchDirection) => {
    setDirection(newDir);
    setSelectedLetter('ALL');
  };

  const filteredTerms = useMemo(() => {
    // If input is in the wrong language for this mode, strictly do not translate/match!
    if (hasWrongInputInTr || hasWrongInputInAr) {
      return [];
    }

    return terms.filter((term) => {
      // 1. Category filter
      if (selectedCategory !== 'Tümü' && term.category !== selectedCategory) {
        return false;
      }

      // 2. Letter filter
      if (!searchQuery.trim() && selectedLetter !== 'ALL') {
        if (isTrToAr) {
          const firstChar = term.turkish.trim().charAt(0).toLocaleUpperCase('tr-TR');
          if (firstChar !== selectedLetter) return false;
        } else {
          const cleanAr = normalizeArabic(term.arabic);
          const cleanTarget = cleanAr.startsWith('ال') ? cleanAr.slice(2) : cleanAr;
          const firstChar = cleanTarget.charAt(0);
          if (firstChar !== selectedLetter && !cleanAr.startsWith(selectedLetter)) {
            return false;
          }
        }
      }

      // 3. Strict Directional Search:
      if (!searchQuery.trim()) return true;

      if (isTrToAr) {
        // Strict Turkish search: only looks at Turkish term and Turkish definition
        return searchTurkishStrict(
          term.turkish,
          term.turkishDefinition,
          searchQuery
        );
      } else {
        // Strict Arabic search: only looks at Arabic term and Arabic definition
        return searchArabicStrict(
          term.arabic,
          term.arabicDefinition,
          searchQuery
        );
      }
    });
  }, [terms, selectedCategory, selectedLetter, searchQuery, isTrToAr, hasWrongInputInTr, hasWrongInputInAr]);

  return (
    <div className="space-y-4">
      {/* Search Input Bar with Clear Segmented Direction Switch */}
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        direction={direction}
        onSetDirection={handleDirectionChange}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        resultCount={filteredTerms.length}
      />

      {/* Alphabetical Quick Bar */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 pt-0.5 scrollbar-none text-xs">
        {alphabet.map((letter) => {
          const isSelected = selectedLetter === letter;
          return (
            <button
              key={letter}
              onClick={() => {
                setSelectedLetter(letter);
                setSearchQuery('');
              }}
              className={`w-7 h-7 shrink-0 rounded-lg flex items-center justify-center font-bold transition-colors ${
                isSelected
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {letter === 'ALL' ? (isTrToAr ? 'Tüm' : 'الكل') : letter}
            </button>
          );
        })}
      </div>

      {/* Terms Result List */}
      <div className="space-y-2.5">
        {hasWrongInputInTr ? (
          <div className="text-center py-10 px-4 rounded-3xl bg-amber-50 dark:bg-amber-950/20 border border-amber-300 dark:border-amber-900/40 space-y-3">
            <AlertTriangle className="w-9 h-9 text-amber-500 mx-auto" />
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Bu Arama Alanı Yalnızca Türkçe Terimler İçindir
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-arabic max-w-md mx-auto leading-relaxed">
              أنت تكتب باللغة العربية في وضع (تركي ➔ عربي). لن تظهر ترجمة هنا لحماية دقة البحث. للبحث عن هذا المصطلح يرجى التبديل لوضع (عربي ➔ تركي):
            </p>
            <button
              onClick={() => handleDirectionChange('ar-to-tr')}
              className="px-4 py-2 bg-[#E30A17] text-white rounded-xl text-xs font-bold font-arabic shadow-md hover:bg-[#c8102e] transition-all"
            >
              🇸🇦 التبديل الآن إلى وضع (عربي ➔ تركي)
            </button>
          </div>
        ) : hasWrongInputInAr ? (
          <div className="text-center py-10 px-4 rounded-3xl bg-amber-50 dark:bg-amber-950/20 border border-amber-300 dark:border-amber-900/40 space-y-3">
            <AlertTriangle className="w-9 h-9 text-amber-500 mx-auto" />
            <h3 className="font-bold text-slate-900 dark:text-white text-base font-arabic">
              حقل البحث هذا مخصص للمصطلحات العربية فقط
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
              Arapça ➔ Türkçe modundasınız ancak Türkçe kelime yazdınız. Türkçe arama yapmak için lütfen (Türkçe ➔ Arapça) moduna geçiniz:
            </p>
            <button
              onClick={() => handleDirectionChange('tr-to-ar')}
              className="px-4 py-2 bg-[#E30A17] text-white rounded-xl text-xs font-bold shadow-md hover:bg-[#c8102e] transition-all"
            >
              🇹🇷 (Türkçe ➔ Arapça) Moduna Geç
            </button>
          </div>
        ) : filteredTerms.length === 0 ? (
          <div className="text-center py-12 px-4 rounded-3xl bg-slate-100 dark:bg-[#1A1A1E] border border-dashed border-slate-300 dark:border-slate-800 space-y-3">
            <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-1" />
            <div>
              <h3 className="font-bold text-slate-700 dark:text-slate-200 text-base">
                "{searchQuery}" ile eşleşen terim bulunamadı
              </h3>
              <p className="text-xs text-slate-500 font-arabic mt-1">
                {isTrToAr
                  ? 'Girdiğiniz Türkçe terim bulunamadı. Lütfen yazımı kontrol ediniz.'
                  : 'لم يتم العثور على مصطلح عربي مطابق. تأكد من صحة الكلمة.'}
              </p>
            </div>

            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Tümü');
                setSelectedLetter('ALL');
              }}
              className="px-3.5 py-1.5 text-xs font-semibold bg-[#C8102E] text-white rounded-xl shadow-sm hover:bg-[#a60b24] transition-colors"
            >
              Filtreleri Temizle / إعادة ضبط
            </button>
          </div>
        ) : (
          filteredTerms.map((term) => {
            const isFav = favorites.includes(term.id);
            // Guarantee pure, clear Arabic without any tashkeel
            const cleanArabic = stripTashkeel(term.arabic);

            return (
              <div
                key={term.id}
                onClick={() => onSelectTerm(term)}
                className="group flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-[#1E1E24] text-slate-900 dark:text-white border border-slate-200/80 dark:border-slate-800/80 hover:border-red-500/50 dark:hover:border-amber-400/50 hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="flex-1 min-w-0 pr-3">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-red-50 dark:bg-red-950/40 text-[#C8102E] dark:text-red-400 border border-red-200/40 dark:border-red-900/40">
                      {term.category}
                    </span>
                    <span className="text-[10px] font-arabic text-slate-400">
                      {term.categoryAr}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                    {/* Primary word displayed according to direction */}
                    {isTrToAr ? (
                      <>
                        <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white group-hover:text-[#C8102E] dark:group-hover:text-amber-300 transition-colors">
                          {term.turkish}
                        </h3>
                        <span
                          className="text-base sm:text-lg font-bold text-amber-600 dark:text-amber-400 font-arabic tracking-wide"
                          dir="rtl"
                        >
                          {cleanArabic}
                        </span>
                      </>
                    ) : (
                      <>
                        <h3
                          className="font-bold text-lg sm:text-xl text-amber-600 dark:text-amber-400 font-arabic tracking-wide group-hover:text-[#C8102E] dark:group-hover:text-amber-300 transition-colors"
                          dir="rtl"
                        >
                          {cleanArabic}
                        </h3>
                        <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                          {term.turkish}
                        </span>
                      </>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1 mt-1 font-normal font-arabic">
                    {isTrToAr ? term.turkishDefinition : stripTashkeel(term.arabicDefinition)}
                  </p>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      speakTerm(isTrToAr ? term.turkish : cleanArabic, isTrToAr ? 'tr' : 'ar');
                    }}
                    className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-amber-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="Sesli Dinle"
                    aria-label="Sesli Dinle"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(term.id);
                    }}
                    className={`p-2 rounded-lg transition-colors ${
                      isFav
                        ? 'text-amber-500'
                        : 'text-slate-400 hover:text-amber-500'
                    }`}
                    title={isFav ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
                    aria-label="Favori Ekle"
                  >
                    <Bookmark className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                  </button>

                  <ChevronRight className="w-5 h-5 text-slate-300 dark:text-slate-600 group-hover:text-[#C8102E] dark:group-hover:text-amber-400 group-hover:translate-x-1 transition-all ml-1" />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
