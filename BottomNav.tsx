import React from 'react';
import { Home, Layers, Search, Bookmark, History } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  favoritesCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  favoritesCount,
}) => {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 max-w-lg mx-auto px-4 pb-3 pt-1 pointer-events-none"
      aria-label="Alt Menü"
    >
      <div className="pointer-events-auto bg-[#D91424] dark:bg-[#b50f1d] text-white rounded-2xl shadow-2xl border border-red-400/30 px-2 py-1.5 flex items-center justify-around backdrop-blur-md">
        {/* 1. Ana Sayfa */}
        <button
          onClick={() => onSelectTab('home')}
          className={`flex flex-col items-center justify-center py-1 px-3 min-w-[56px] rounded-xl transition-all ${
            activeTab === 'home'
              ? 'text-white font-bold scale-105'
              : 'text-white/70 hover:text-white'
          }`}
          aria-label="Ana Sayfa"
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">Ana Sayfa</span>
        </button>

        {/* 2. Pano (Ezber & Test) */}
        <button
          onClick={() => onSelectTab('flashcards')}
          className={`flex flex-col items-center justify-center py-1 px-3 min-w-[56px] rounded-xl transition-all ${
            activeTab === 'flashcards'
              ? 'text-white font-bold scale-105'
              : 'text-white/70 hover:text-white'
          }`}
          aria-label="Pano ve Ezber Kartları"
        >
          <Layers className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">Pano</span>
        </button>

        {/* 3. Center Elevated Search Button (Like TDK Mobile App) */}
        <div className="relative -top-5 flex flex-col items-center">
          <button
            onClick={() => onSelectTab('search')}
            className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl border-4 border-slate-950 dark:border-slate-900 transition-all duration-200 active:scale-95 ${
              activeTab === 'search'
                ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-400/40'
                : 'bg-white text-[#D91424] hover:bg-amber-50'
            }`}
            aria-label="Arama Yap"
            title="Sözlükte Ara / ابحث في القاموس"
          >
            <Search className="w-6 h-6 stroke-[2.5]" />
          </button>
        </div>

        {/* 4. Sık Kullanılanlar (Favoriler) */}
        <button
          onClick={() => onSelectTab('favorites')}
          className={`flex flex-col items-center justify-center py-1 px-3 min-w-[56px] rounded-xl transition-all relative ${
            activeTab === 'favorites'
              ? 'text-white font-bold scale-105'
              : 'text-white/70 hover:text-white'
          }`}
          aria-label="Sık Kullanılanlar"
        >
          <Bookmark className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">Sık Kullanılan</span>
          {favoritesCount > 0 && (
            <span className="absolute top-0.5 right-2 bg-amber-400 text-slate-900 text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
              {favoritesCount}
            </span>
          )}
        </button>

        {/* 5. Geçmiş (History) */}
        <button
          onClick={() => onSelectTab('history')}
          className={`flex flex-col items-center justify-center py-1 px-3 min-w-[56px] rounded-xl transition-all ${
            activeTab === 'history'
              ? 'text-white font-bold scale-105'
              : 'text-white/70 hover:text-white'
          }`}
          aria-label="Arama Geçmişi"
        >
          <History className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">Geçmiş</span>
        </button>
      </div>
    </nav>
  );
};
