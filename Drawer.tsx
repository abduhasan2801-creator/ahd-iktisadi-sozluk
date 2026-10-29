import React from 'react';
import {
  Home,
  Search,
  BookOpen,
  FileText,
  Bookmark,
  History,
  Info,
  Layers,
  Sparkles,
  X,
  Share2,
  Moon,
  Sun,
  Globe2,
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  onSelectTab: (tab: string) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onOpenAbout: () => void;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  activeTab,
  onSelectTab,
  isDarkMode,
  onToggleTheme,
  onOpenAbout,
}) => {
  if (!isOpen) return null;

  const handleNavClick = (tabId: string) => {
    onSelectTab(tabId);
    onClose();
  };

  const navItems = [
    { id: 'home', labelTr: 'Ana Sayfa', labelAr: 'الرئيسية', icon: Home },
    { id: 'search', labelTr: 'Arama Yap', labelAr: 'البحث في القاموس', icon: Search },
    { id: 'categories', labelTr: 'İktisadi Kategoriler', labelAr: 'التصنيفات الاقتصادية', icon: Layers },
    { id: 'abbreviations', labelTr: 'Kısaltmalar Kılavuzu', labelAr: 'دليل الاختصارات', icon: FileText },
    { id: 'flashcards', labelTr: 'Terim Ezber Kartları', labelAr: 'بطاقات المراجعة', icon: Sparkles },
    { id: 'favorites', labelTr: 'Sık Kullanılanlar', labelAr: 'المصطلحات المحفوظة', icon: Bookmark },
    { id: 'history', labelTr: 'Arama Geçmişi', labelAr: 'سجل البحث', icon: History },
  ];

  return (
    <div className="fixed inset-0 z-50 flex" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/65 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel - Inspired by Turkish Red TDK Sidebar */}
      <div className="relative w-full max-w-[320px] bg-gradient-to-b from-[#D91424] via-[#C8102E] to-[#8C0010] text-white flex flex-col justify-between shadow-2xl z-10 animate-in slide-in-from-left duration-250">
        {/* Top Header inside Drawer */}
        <div className="p-5 pb-4 border-b border-red-400/25">
          <div className="flex items-center justify-between mb-4">
            <BrandLogo size="md" showSubtitle={false} />
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 active:scale-95 transition-all"
              aria-label="Kapat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="bg-black/20 rounded-xl p-3 border border-amber-300/20 backdrop-blur-xs">
            <div className="text-amber-200 text-xs font-semibold tracking-wide uppercase">
              Türkçe ⇄ Arapça
            </div>
            <div className="text-white font-bold text-sm leading-tight mt-0.5">
              İktisat & Finans Terimleri
            </div>
            <div className="text-amber-100/70 text-[11px] font-arabic mt-1">
              معجم الاقتصاد والتمويل والمصارف
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                  isActive
                    ? 'bg-white text-[#C8102E] shadow-md font-bold'
                    : 'text-white/90 hover:bg-white/15 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                      isActive ? 'text-[#C8102E]' : 'text-amber-300'
                    }`}
                  />
                  <span>{item.labelTr}</span>
                </div>
                <span
                  className={`text-[11px] font-arabic font-normal ${
                    isActive ? 'text-[#C8102E]/80' : 'text-white/60'
                  }`}
                >
                  {item.labelAr}
                </span>
              </button>
            );
          })}

          <div className="pt-2 pb-1">
            <div className="h-[1px] bg-red-400/20 my-2" />
          </div>

          {/* Quick Theme Switcher in Drawer */}
          <button
            onClick={onToggleTheme}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm text-white/90 hover:bg-white/15 transition-all"
          >
            <div className="flex items-center gap-3">
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-amber-300" />
              ) : (
                <Moon className="w-4 h-4 text-amber-200" />
              )}
              <span>{isDarkMode ? 'Gündüz Modu' : 'Gece Modu'}</span>
            </div>
            <span className="text-[11px] font-arabic text-white/60">
              {isDarkMode ? 'الوضع النهاري' : 'الوضع الليلي'}
            </span>
          </button>
        </div>

        {/* Drawer Bottom Actions */}
        <div className="p-4 border-t border-red-400/25 bg-black/25">
          <div className="grid grid-cols-2 gap-2 mb-3">
            <button
              onClick={() => {
                onClose();
                onOpenAbout();
              }}
              className="flex items-center justify-center gap-1.5 py-2 px-3 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-medium text-white transition-all"
            >
              <Info className="w-3.5 h-3.5 text-amber-300" />
              <span>Hakkında</span>
            </button>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator
                    .share({
                      title: 'AHD İktisadi Sözlük',
                      text: 'Türkçe - Arapça İktisadi Terimler Sözlüğü',
                      url: window.location.href,
                    })
                    .catch(() => {});
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Bağlantı kopyalandı! تم نسخ الرابط');
                }
              }}
              className="flex items-center justify-center gap-1.5 py-2 px-3 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-medium text-white transition-all"
            >
              <Share2 className="w-3.5 h-3.5 text-amber-300" />
              <span>Paylaş</span>
            </button>
          </div>

          <div className="text-center text-[10px] text-white/60 flex items-center justify-center gap-1">
            <Globe2 className="w-3 h-3 text-amber-300" />
            <span>AHD İktisadi Sözlük © 2026</span>
          </div>
        </div>
      </div>
    </div>
  );
};
