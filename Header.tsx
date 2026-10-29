import React from 'react';
import { Menu, Sun, Moon, Sparkles } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  currentTabName: string;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onOpenDrawer: () => void;
  onOpenQuickQuiz?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTabName,
  isDarkMode,
  onToggleTheme,
  onOpenDrawer,
  onOpenQuickQuiz,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#121212]/95 dark:bg-[#0c0c0e]/95 light:bg-[#C8102E]/95 backdrop-blur-md border-b border-red-950/40 dark:border-red-950/60 shadow-lg transition-colors">
      {/* Top Banner with glossy gold accent bar */}
      <div className="h-[2px] bg-gradient-to-r from-amber-500 via-yellow-300 to-amber-600" />

      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        {/* Left Section: Menu trigger and Page title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenDrawer}
            className="p-2 -ml-2 text-white hover:text-amber-300 active:scale-95 transition-all rounded-lg hover:bg-white/10"
            aria-label="Menüyü Aç / القائمة"
            title="Menüyü Aç / افتح القائمة"
          >
            <Menu className="w-6 h-6 stroke-[2.2]" />
          </button>
          <div className="flex items-center gap-2">
            <span className="text-white font-bold text-base md:text-lg tracking-tight">
              {currentTabName}
            </span>
          </div>
        </div>

        {/* Center: Shiny Gold AHD & Turkish Crescent Brand */}
        <div className="hidden sm:block">
          <BrandLogo size="md" showSubtitle={false} />
        </div>

        {/* Right Section: Theme Toggle & Quick Practice / Emblem */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {onOpenQuickQuiz && (
            <button
              onClick={onOpenQuickQuiz}
              className="px-2.5 py-1.5 text-xs font-semibold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-lg transition-all flex items-center gap-1.5"
              title="Terim Testi / اختبار المصطلحات"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden md:inline">Pratik Yap</span>
            </button>
          )}

          {/* Day / Night Mode Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-lg text-white hover:text-amber-300 hover:bg-white/10 active:scale-95 transition-all relative"
            aria-label={isDarkMode ? 'Gündüz Moduna Geç (وضع النهار)' : 'Gece Moduna Geç (وضع الليل)'}
            title={isDarkMode ? 'Gündüz Modu (Light)' : 'Gece Modu (Dark)'}
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-amber-300 animate-spin-once" />
            ) : (
              <Moon className="w-5 h-5 text-amber-200" />
            )}
          </button>

          {/* Mobile Brand Mark */}
          <div className="sm:hidden">
            <BrandLogo size="sm" showSubtitle={false} />
          </div>
        </div>
      </div>
    </header>
  );
};
