import React, { useState } from 'react';
import { Sparkles, RotateCw, CheckCircle2, RefreshCw, Volume2, ArrowRight } from 'lucide-react';
import { EconomicTerm } from '../types/dictionary';
import { speakTerm } from '../utils/speech';
import { stripTashkeel } from '../utils/textNormalization';

interface FlashcardsViewProps {
  terms: EconomicTerm[];
  onOpenDetails: (term: EconomicTerm) => void;
}

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({
  terms,
  onOpenDetails,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [mode, setMode] = useState<'tr-to-ar' | 'ar-to-tr'>('tr-to-ar');
  const [knownCount, setKnownCount] = useState(0);

  const currentTerm = terms[currentIndex] || terms[0];

  const handleNext = (known: boolean) => {
    if (known) {
      setKnownCount((prev) => prev + 1);
    }
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % terms.length);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setKnownCount(0);
  };

  return (
    <div className="space-y-4 max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span>Terim Ezber Kartları (Pano)</span>
          </h2>
          <p className="text-xs text-slate-500 font-arabic">
            بطاقات مراجعة وحفظ المصطلحات الاقتصادية
          </p>
        </div>

        {/* Direction Switch */}
        <button
          onClick={() => {
            setMode((m) => (m === 'tr-to-ar' ? 'ar-to-tr' : 'tr-to-ar'));
            setIsFlipped(false);
          }}
          className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-red-100 dark:bg-red-950/60 text-[#C8102E] dark:text-red-400 border border-red-200/50"
        >
          {mode === 'tr-to-ar' ? 'TR ➔ AR' : 'AR ➔ TR'}
        </button>
      </div>

      {/* Progress */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          Kart {currentIndex + 1} / {terms.length}
        </span>
        <span className="text-emerald-600 dark:text-emerald-400 font-medium">
          Öğrenilen: {knownCount}
        </span>
      </div>

      {/* Interactive Flashcard with Flip Animation */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="relative min-h-[300px] w-full rounded-3xl bg-gradient-to-br from-[#1E1E24] via-[#24242C] to-[#17171C] text-white p-6 shadow-2xl border-2 border-amber-400/30 cursor-pointer flex flex-col justify-between select-none hover:border-amber-400/60 transition-all"
      >
        {/* Top Card Info */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/10 text-amber-300">
            {currentTerm.category}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                speakTerm(
                  mode === 'tr-to-ar' ? currentTerm.turkish : currentTerm.arabic,
                  mode === 'tr-to-ar' ? 'tr' : 'ar'
                );
              }}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              title="Dinle"
            >
              <Volume2 className="w-4 h-4" />
            </button>
            <span className="text-xs text-slate-400 flex items-center gap-1 ml-1">
              <RotateCw className="w-3.5 h-3.5" />
              <span>Çevir</span>
            </span>
          </div>
        </div>

        {/* Center Content */}
        <div className="text-center py-6">
          {!isFlipped ? (
            <div className="space-y-2">
              <span className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
                {mode === 'tr-to-ar' ? 'Türkçe Terim' : 'المصطلح بالعربية'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {mode === 'tr-to-ar' ? currentTerm.turkish : stripTashkeel(currentTerm.arabic)}
              </h3>
              <p className="text-xs text-amber-400/80 mt-2 font-medium">
                (Kartı çevirmek için tıkla / انقر لقلب البطاقة)
              </p>
            </div>
          ) : (
            <div className="space-y-3 animate-in fade-in zoom-in-95 duration-150">
              <span className="text-[11px] font-semibold tracking-wider text-amber-300 uppercase">
                {mode === 'tr-to-ar' ? '🇸🇦 Arapça Karşılığı' : '🇹🇷 Türkçe Karşılığı'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-amber-300 tracking-tight font-arabic">
                {mode === 'tr-to-ar' ? stripTashkeel(currentTerm.arabic) : currentTerm.turkish}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto line-clamp-3">
                {mode === 'tr-to-ar'
                  ? stripTashkeel(currentTerm.arabicDefinition)
                  : currentTerm.turkishDefinition}
              </p>
            </div>
          )}
        </div>

        {/* Bottom Card Action */}
        <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetails(currentTerm);
            }}
            className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
          >
            <span>Detaylı Açıklama</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <span className="text-slate-400 text-[11px]">
            {isFlipped ? 'Ters Yüz' : 'Ön Yüz'}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        <button
          onClick={() => handleNext(false)}
          className="py-3 px-4 rounded-2xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-xs hover:bg-slate-300 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-2 active:scale-95"
        >
          <RefreshCw className="w-4 h-4 text-slate-500" />
          <span>Tekrar Et / مراجعة</span>
        </button>

        <button
          onClick={() => handleNext(true)}
          className="py-3 px-4 rounded-2xl bg-[#E30A17] hover:bg-[#c8102e] text-white font-semibold text-xs shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95"
        >
          <CheckCircle2 className="w-4 h-4 text-white" />
          <span>Biliyorum / تم الحفظ</span>
        </button>
      </div>

      {currentIndex === terms.length - 1 && (
        <div className="text-center pt-2">
          <button
            onClick={handleRestart}
            className="text-xs text-amber-500 hover:underline font-semibold"
          >
            En Başa Dön / البدء من جديد
          </button>
        </div>
      )}
    </div>
  );
};
