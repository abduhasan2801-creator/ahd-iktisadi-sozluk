/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Drawer } from './components/Drawer';
import { BottomNav } from './components/BottomNav';
import { BuAyinTerimiCard } from './components/BuAyinTerimiCard';
import { GundemdekiTerimler } from './components/GundemdekiTerimler';
import { SearchView } from './components/SearchView';
import { FlashcardsView } from './components/FlashcardsView';
import { AbbreviationsView } from './components/AbbreviationsView';
import { FavoritesView } from './components/FavoritesView';
import { HistoryView } from './components/HistoryView';
import { CategoriesView } from './components/CategoriesView';
import { TermDetailModal } from './components/TermDetailModal';
import { AboutModal } from './components/AboutModal';
import { BrandLogo } from './components/BrandLogo';
import { ECONOMIC_TERMS } from './data/economicTerms';
import { EconomicTerm } from './types/dictionary';
import { Search, Sparkles, BookOpen, Layers, ArrowRight } from 'lucide-react';

export default function App() {
  // Theme state: default dark mode to match user screenshot, with persistence
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('ahd_theme');
    if (saved) return saved === 'dark';
    return true; // Default dark
  });

  const [searchDirection, setSearchDirection] = useState<'tr-to-ar' | 'ar-to-tr'>('tr-to-ar');
  const [activeTab, setActiveTab] = useState<string>('home');

  const openSearchWithDirection = (dir: 'tr-to-ar' | 'ar-to-tr') => {
    setSearchDirection(dir);
    setActiveTab('search');
  };
  const [selectedTerm, setSelectedTerm] = useState<EconomicTerm | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);

  // Favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ahd_favorites');
      return saved ? JSON.parse(saved) : ['enflasyon', 'faiz-orani', 'kkm'];
    } catch {
      return ['enflasyon', 'faiz-orani', 'kkm'];
    }
  });

  // History
  const [history, setHistory] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ahd_history');
      return saved ? JSON.parse(saved) : ['enflasyon', 'gsyh', 'cari-acik'];
    } catch {
      return ['enflasyon', 'gsyh', 'cari-acik'];
    }
  });

  // Sync theme with <html> class
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('ahd_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('ahd_theme', 'light');
    }
  }, [isDarkMode]);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('ahd_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Save history to localStorage
  useEffect(() => {
    localStorage.setItem('ahd_history', JSON.stringify(history));
  }, [history]);

  const handleToggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleToggleFavorite = (termId: string) => {
    setFavorites((prev) =>
      prev.includes(termId) ? prev.filter((id) => id !== termId) : [...prev, termId]
    );
  };

  const handleSelectTerm = (term: EconomicTerm) => {
    setSelectedTerm(term);
    // Add to history without duplicates at top
    setHistory((prev) => [term.id, ...prev.filter((id) => id !== term.id)].slice(0, 30));
  };

  const handleSelectRelatedTerm = (termName: string) => {
    const found = ECONOMIC_TERMS.find(
      (t) =>
        t.turkish.toLowerCase().includes(termName.toLowerCase()) ||
        t.arabic.includes(termName)
    );
    if (found) {
      handleSelectTerm(found);
    } else {
      setSelectedTerm(null);
      setActiveTab('search');
    }
  };

  // Get active tab display title
  const getTabTitle = () => {
    switch (activeTab) {
      case 'home':
        return 'Ana Sayfa';
      case 'search':
        return 'Sözlükte Ara';
      case 'categories':
        return 'İktisadi Kategoriler';
      case 'abbreviations':
        return 'Kısaltmalar Kılavuzu';
      case 'flashcards':
        return 'Pano & Ezber';
      case 'favorites':
        return 'Sık Kullanılanlar';
      case 'history':
        return 'Arama Geçmişi';
      default:
        return 'AHD İktisadi Sözlük';
    }
  };

  // Featured month term
  const featuredTerm =
    ECONOMIC_TERMS.find((t) => t.isFeaturedMonth) || ECONOMIC_TERMS[0];

  // Trending terms
  const trendingTerms = ECONOMIC_TERMS.filter((t) => t.isTrending).slice(0, 6);

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-200 ${
        isDarkMode
          ? 'bg-[#121215] text-slate-100'
          : 'bg-[#F8F9FA] text-slate-900'
      }`}
    >
      {/* Top Header */}
      <Header
        currentTabName={getTabTitle()}
        isDarkMode={isDarkMode}
        onToggleTheme={handleToggleTheme}
        onOpenDrawer={() => setIsDrawerOpen(true)}
        onOpenQuickQuiz={() => setActiveTab('flashcards')}
      />

      {/* Side Navigation Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        isDarkMode={isDarkMode}
        onToggleTheme={handleToggleTheme}
        onOpenAbout={() => setIsAboutOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 pt-4 pb-24 space-y-6">
        {/* HOME TAB */}
        {activeTab === 'home' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            {/* Top Shiny Gold & Crescent Hero Branding Card */}
            <div className="relative rounded-3xl p-5 sm:p-6 bg-gradient-to-r from-[#D91424] via-[#C8102E] to-[#990012] text-white shadow-xl overflow-hidden border border-amber-300/30">
              {/* Background ambient lighting */}
              <div className="absolute -right-12 -top-12 w-48 h-48 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-extrabold text-gold-metallic font-serif tracking-widest drop-shadow-md">
                      AHD
                    </span>
                    <span className="text-lg font-bold text-white tracking-tight">
                      İktisadi Sözlük
                    </span>
                  </div>
                  <p className="text-xs text-amber-200/90 font-arabic font-medium">
                    معجم المصطلحات الاقتصادية الشامل (تركي ⇄ عربي)
                  </p>
                  <p className="text-[11px] text-white/80 max-w-xs mt-1">
                    Ekonomi, borsa, bankacılık ve ticaret terimlerinin detaylı tanımları ve örnekleri.
                  </p>
                </div>

                <div className="shrink-0 flex sm:flex-col gap-2">
                  <button
                    onClick={() => setActiveTab('search')}
                    className="flex-1 sm:flex-none px-4 py-2 bg-white text-[#C8102E] font-bold text-xs rounded-xl shadow-md hover:bg-amber-50 active:scale-95 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Search className="w-4 h-4 stroke-[2.5]" />
                    <span>Hemen Ara</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('flashcards')}
                    className="flex-1 sm:flex-none px-4 py-2 bg-black/25 text-amber-200 hover:bg-black/35 font-semibold text-xs rounded-xl border border-amber-300/30 active:scale-95 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Terim Testi</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Clearly Separated Dual Quick Search Mode Cards */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => openSearchWithDirection('tr-to-ar')}
                className="p-3.5 rounded-2xl bg-white dark:bg-[#1E1E24] border-2 border-red-500/30 hover:border-[#E30A17] dark:hover:border-red-500 shadow-sm transition-all text-left group flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xl">🇹🇷</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-950/60 text-[#E30A17]">
                    TR ➔ AR
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-[#E30A17] transition-colors">
                    Türkçe ➔ Arapça
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Yalnızca Türkçe iktisat terimleri
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => openSearchWithDirection('ar-to-tr')}
                className="p-3.5 rounded-2xl bg-white dark:bg-[#1E1E24] border-2 border-amber-500/30 hover:border-amber-500 shadow-sm transition-all text-right group flex flex-col justify-between"
                dir="rtl"
              >
                <div className="flex items-center justify-between mb-2" dir="ltr">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 font-arabic">
                    عربي ➔ تركي
                  </span>
                  <span className="text-xl">🇸🇦</span>
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white font-arabic group-hover:text-amber-500 transition-colors">
                    عربي ➔ تركي
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-arabic mt-0.5">
                    ابحث بالمصطلحات العربية حصراً
                  </p>
                </div>
              </button>
            </div>

            {/* "Bu Ayın İktisadi Terimi" Card (Matches Screenshot 1) */}
            <BuAyinTerimiCard
              term={featuredTerm}
              onOpenDetails={handleSelectTerm}
            />

            {/* "Gündemdeki İktisadi Terimler" (Matches Screenshot 1) */}
            <GundemdekiTerimler
              terms={trendingTerms}
              onSelectTerm={handleSelectTerm}
            />

            {/* Quick Action Tiles */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div
                onClick={() => setActiveTab('abbreviations')}
                className="p-4 rounded-2xl bg-white dark:bg-[#1E1E24] border border-slate-200/80 dark:border-slate-800/80 hover:border-red-500/40 shadow-sm cursor-pointer transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-950/60 text-[#C8102E] dark:text-red-400 flex items-center justify-center mb-2">
                  <BookOpen className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-[#C8102E] transition-colors">
                  Kısaltmalar Kılavuzu
                </h3>
                <p className="text-[11px] text-slate-500 font-arabic mt-0.5">
                  TCMB, TÜFE, GSYH, BIST...
                </p>
              </div>

              <div
                onClick={() => setActiveTab('categories')}
                className="p-4 rounded-2xl bg-white dark:bg-[#1E1E24] border border-slate-200/80 dark:border-slate-800/80 hover:border-amber-400/50 shadow-sm cursor-pointer transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-2">
                  <Layers className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors">
                  İktisadi Alanlar
                </h3>
                <p className="text-[11px] text-slate-500 font-arabic mt-0.5">
                  Makro, Banka, Vergi, Borsa
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SEARCH TAB */}
        {activeTab === 'search' && (
          <div className="animate-in fade-in duration-150">
            <SearchView
              terms={ECONOMIC_TERMS}
              onSelectTerm={handleSelectTerm}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              initialDirection={searchDirection}
            />
          </div>
        )}

        {/* CATEGORIES TAB */}
        {activeTab === 'categories' && (
          <div className="animate-in fade-in duration-150">
            <CategoriesView
              onSelectCategoryFilter={(catTr) => {
                setActiveTab('search');
              }}
              onSelectTerm={handleSelectTerm}
            />
          </div>
        )}

        {/* ABBREVIATIONS TAB */}
        {activeTab === 'abbreviations' && (
          <div className="animate-in fade-in duration-150">
            <AbbreviationsView />
          </div>
        )}

        {/* FLASHCARDS / PANO TAB */}
        {activeTab === 'flashcards' && (
          <div className="animate-in fade-in duration-150">
            <FlashcardsView
              terms={ECONOMIC_TERMS}
              onOpenDetails={handleSelectTerm}
            />
          </div>
        )}

        {/* FAVORITES TAB */}
        {activeTab === 'favorites' && (
          <div className="animate-in fade-in duration-150">
            <FavoritesView
              favoriteIds={favorites}
              terms={ECONOMIC_TERMS}
              onSelectTerm={handleSelectTerm}
              onRemoveFavorite={handleToggleFavorite}
              onClearAll={() => setFavorites([])}
            />
          </div>
        )}

        {/* HISTORY TAB */}
        {activeTab === 'history' && (
          <div className="animate-in fade-in duration-150">
            <HistoryView
              historyIds={history}
              terms={ECONOMIC_TERMS}
              onSelectTerm={handleSelectTerm}
              onClearHistory={() => setHistory([])}
            />
          </div>
        )}
      </main>

      {/* Floating Bottom Navigation Bar (Matches Screenshot 1) */}
      <BottomNav
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        favoritesCount={favorites.length}
      />

      {/* Term Detail Modal (Complete Economic Explanation) */}
      <TermDetailModal
        term={selectedTerm}
        onClose={() => setSelectedTerm(null)}
        isFavorite={selectedTerm ? favorites.includes(selectedTerm.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onSelectRelatedTerm={handleSelectRelatedTerm}
      />

      {/* About Modal */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />
    </div>
  );
}
