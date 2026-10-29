import React, { useState } from 'react';
import { FileText, Search, X, Volume2 } from 'lucide-react';
import { ECONOMIC_ABBREVIATIONS } from '../data/abbreviations';
import { speakTerm } from '../utils/speech';

export const AbbreviationsView: React.FC = () => {
  const [query, setQuery] = useState('');

  const filtered = ECONOMIC_ABBREVIATIONS.filter((item) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase().trim();
    return (
      item.code.toLowerCase().includes(q) ||
      item.turkishFull.toLowerCase().includes(q) ||
      item.arabicFull.toLowerCase().includes(q) ||
      item.descriptionTr.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <FileText className="w-5 h-5 text-[#E30A17]" />
          <span>İktisadi ve Finansal Kısaltmalar Kılavuzu</span>
        </h2>
        <p className="text-xs text-slate-500 font-arabic mt-0.5">
          دليل أهم الاختصارات الاقتصادية والمصرفية (تركيا والعالم)
        </p>
      </div>

      {/* Search Input */}
      <div className="relative flex items-center bg-white dark:bg-[#1E1E24] rounded-2xl border border-slate-200 dark:border-slate-800 px-3 py-2.5 shadow-sm">
        <Search className="w-4 h-4 text-slate-400 mr-2" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Kısaltma ara (örn. TCMB, TÜFE, BIST, GSYH)..."
          className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-full"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* List */}
      <div className="space-y-2.5">
        {filtered.map((item) => (
          <div
            key={item.code}
            className="p-4 rounded-2xl bg-white dark:bg-[#1E1E24] border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-2"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-1 rounded-lg bg-red-100 dark:bg-red-950/60 text-[#C8102E] dark:text-red-400 font-extrabold text-sm font-mono tracking-wider border border-red-200/50">
                  {item.code}
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  {item.category}
                </span>
              </div>
              <button
                onClick={() => speakTerm(item.turkishFull, 'tr')}
                className="p-1.5 text-slate-400 hover:text-red-600 dark:hover:text-amber-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Sesli Dinle"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1">
              <div className="font-bold text-sm text-slate-900 dark:text-white">
                🇹🇷 {item.turkishFull}
              </div>
              <div className="font-bold text-sm text-amber-600 dark:text-amber-400 font-arabic text-right" dir="rtl">
                🇸🇦 {item.arabicFull}
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-1 border-t border-slate-100 dark:border-slate-800/70">
              {item.descriptionTr}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-arabic text-right leading-relaxed" dir="rtl">
              {item.descriptionAr}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
