import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, Sun, Moon, Bell, Volume2, Menu, ShieldCheck, X, 
  Sparkles, Droplets, BookOpen, Check, Palette 
} from 'lucide-react';
import { RECITERS } from '../data/quranData';

export const APP_THEMES = [
  {
    id: 'emerald',
    nameAr: 'نور زمردي',
    nameEn: 'Emerald Oasis',
    icon: Sun,
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    badgeColor: 'bg-emerald-500',
    dotBg: 'bg-emerald-500',
    desc: 'إشراق نهاري مبهج بلمسات خضراء'
  },
  {
    id: 'dark',
    nameAr: 'سكون الليل',
    nameEn: 'Midnight Layl',
    icon: Moon,
    iconColor: 'text-indigo-400',
    badgeColor: 'bg-indigo-600',
    dotBg: 'bg-indigo-600',
    desc: 'سواد داكن مريح للقراءة الهادئة'
  },
  {
    id: 'amber',
    nameAr: 'ذهبي ملكي',
    nameEn: 'Royal Imperial Gold',
    icon: Sparkles,
    iconColor: 'text-amber-500',
    badgeColor: 'bg-amber-500',
    dotBg: 'bg-amber-500',
    desc: 'أناقة ملكية وتطريز ذهبي'
  },
  {
    id: 'blue',
    nameAr: 'أزرق سماوي',
    nameEn: 'Celestial Sapphire',
    icon: Droplets,
    iconColor: 'text-sky-500',
    badgeColor: 'bg-sky-500',
    dotBg: 'bg-sky-500',
    desc: 'هدوء سماوي بلون الياقوت الأزرق'
  },
  {
    id: 'sepia',
    nameAr: 'مخطوطة أندلسية',
    nameEn: 'Desert Sepia',
    icon: BookOpen,
    iconColor: 'text-[#8C6D38]',
    badgeColor: 'bg-[#8C6D38]',
    dotBg: 'bg-[#8C6D38]',
    desc: 'ورق مخطوطات عريق دافئ وعالي التباين'
  }
];

export default function Header({
  theme,
  setTheme,
  selectedReciter,
  setSelectedReciter,
  toggleMobileMenu,
  onOpenSearchModal,
  surahsIndex
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const themeMenuRef = useRef(null);

  // Close theme menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (themeMenuRef.current && !themeMenuRef.current.contains(e.target)) {
        setShowThemeMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Find active theme configuration
  const currentThemeConfig = APP_THEMES.find(t => t.id === theme) || APP_THEMES[0];
  const ActiveThemeIcon = currentThemeConfig.icon;

  return (
    <header className="sticky top-0 z-30 w-full bg-white/80 dark:bg-[#111A17]/80 backdrop-blur-xl border-b border-stone-200/80 dark:border-emerald-900/40 px-4 lg:px-8 py-3.5 transition-colors">
      <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
        
        {/* Mobile Menu Button + Brand info */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-emerald-950/60 transition-colors"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
          
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-emerald-600/20">
              ق
            </div>
            <div>
              <span className="font-arabic font-bold text-emerald-950 dark:text-emerald-300 text-sm block leading-none">
                القرآن الكريم
              </span>
              <span className="text-[10px] text-stone-500 dark:text-stone-400 font-sans">
                AiQuran Intelligent Companion
              </span>
            </div>
          </div>
        </div>

        {/* Center: Global Search Bar Button (triggers GlobalSearchModal) */}
        <div className="relative flex-1 max-w-md mx-2">
          <button
            onClick={onOpenSearchModal}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-2xl bg-stone-100/90 dark:bg-emerald-950/40 text-stone-500 dark:text-stone-400 text-xs sm:text-sm border border-stone-200/80 dark:border-emerald-900/50 hover:border-emerald-500/50 font-arabic transition-all shadow-inner text-right group"
          >
            <div className="flex items-center gap-2.5">
              <Search size={16} className="text-stone-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition" />
              <span>ابحث عن سورة، آية، أو علامة مرجعية...</span>
            </div>
            <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-mono text-stone-400 bg-white dark:bg-stone-800 rounded border border-stone-200 dark:border-stone-700">
              Ctrl + K
            </kbd>
          </button>
        </div>

        {/* Right: Reciter Selector + Multi-Theme Switcher + Notifications */}
        <div className="flex items-center gap-2">
          
          {/* Reciter dropdown selector */}
          <div className="hidden md:flex items-center gap-2 bg-stone-100/90 dark:bg-emerald-950/40 border border-stone-200/80 dark:border-emerald-900/40 rounded-2xl px-2.5 py-1.5 text-xs text-stone-700 dark:text-stone-200">
            <Volume2 size={15} className="text-emerald-600 dark:text-emerald-400" />
            <select
              value={selectedReciter.id}
              onChange={(e) => {
                const rec = RECITERS.find(r => r.id === e.target.value);
                if (rec) setSelectedReciter(rec);
              }}
              className="bg-transparent text-xs font-arabic font-semibold focus:outline-none cursor-pointer"
            >
              {RECITERS.map(r => (
                <option key={r.id} value={r.id} className="dark:bg-[#14201C] text-stone-900 dark:text-stone-100">
                  {r.nameAr}
                </option>
              ))}
            </select>
          </div>

          {/* DYNAMIC MULTI-THEME SWITCHER WITH POPOVER */}
          <div className="relative" ref={themeMenuRef}>
            <button
              onClick={() => setShowThemeMenu(!showThemeMenu)}
              className="w-9 h-9 rounded-2xl bg-stone-100 dark:bg-emerald-950/60 flex items-center justify-center hover:scale-105 active:scale-95 transition-all border border-stone-200/80 dark:border-emerald-900/50 relative group"
              title={`المظهر: ${currentThemeConfig.nameAr} (انقر للاختيار)`}
              aria-label="تغيير مظهر التطبيق"
            >
              <ActiveThemeIcon size={18} className={`${currentThemeConfig.iconColor} transition-transform group-hover:scale-110`} />
              
              {/* Subtle active color badge in corner */}
              <span className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full ${currentThemeConfig.badgeColor} ring-1 ring-white dark:ring-[#111A17]`} />
            </button>

            {/* Themes Selection Popover Menu */}
            {showThemeMenu && (
              <div className="absolute left-0 sm:right-auto mt-2 w-64 bg-white dark:bg-[#14201C] rounded-2xl shadow-2xl border border-stone-200 dark:border-emerald-900/60 p-3 z-50 animate-fade-in text-right">
                <div className="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-emerald-900/30 mb-2">
                  <div className="flex items-center gap-1.5">
                    <Palette size={15} className="text-emerald-600 dark:text-emerald-400" />
                    <span className="font-bold text-xs text-stone-800 dark:text-stone-100 font-arabic">مظهر التطبيق والمصحف</span>
                  </div>
                  <span className="text-[10px] text-stone-400 font-sans">5 Themes</span>
                </div>

                <div className="space-y-1">
                  {APP_THEMES.map((t) => {
                    const TIcon = t.icon;
                    const isActive = theme === t.id;

                    return (
                      <button
                        key={t.id}
                        onClick={() => {
                          setTheme(t.id);
                          setShowThemeMenu(false);
                        }}
                        className={`w-full flex items-center justify-between p-2 rounded-xl transition-all text-right font-arabic group ${
                          isActive
                            ? 'bg-stone-100 dark:bg-emerald-950/80 ring-1 ring-stone-300 dark:ring-emerald-700/60'
                            : 'hover:bg-stone-50 dark:hover:bg-emerald-950/40'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center bg-stone-100 dark:bg-emerald-900/40 ${t.iconColor}`}>
                            <TIcon size={16} />
                          </div>
                          <div>
                            <span className={`text-xs font-bold block ${isActive ? 'text-stone-900 dark:text-stone-100' : 'text-stone-700 dark:text-stone-300'}`}>
                              {t.nameAr}
                            </span>
                            <span className="text-[10px] text-stone-400 block leading-tight">
                              {t.desc}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <span className={`w-2.5 h-2.5 rounded-full ${t.dotBg}`} />
                          {isActive && (
                            <Check size={14} className="text-emerald-600 dark:text-emerald-400" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Notifications button */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="w-9 h-9 rounded-2xl bg-stone-100 dark:bg-emerald-950/60 text-stone-600 dark:text-stone-300 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform border border-stone-200/80 dark:border-emerald-900/50 relative"
              title="الإشعارات والتنبيهات"
            >
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full"></span>
            </button>

            {showNotifications && (
              <div className="absolute left-0 sm:right-auto mt-2 w-72 bg-white dark:bg-[#14201C] rounded-2xl shadow-2xl border border-stone-200 dark:border-emerald-900/60 p-4 z-50 animate-fade-in text-right">
                <div className="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-emerald-900/30 mb-3">
                  <span className="font-bold text-xs text-stone-800 dark:text-stone-100 font-arabic">الإشعارات والتنبيهات</span>
                  <ShieldCheck size={14} className="text-emerald-500" />
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800/40">
                    <p className="font-bold text-amber-900 dark:text-amber-300 font-arabic">المراجعة اليومية (AI Hifz)</p>
                    <p className="text-[11px] text-amber-800/80 dark:text-amber-400/80 font-arabic mt-0.5">لديك 12 آية من سورتي الفاتحة والملك حان موعد مراجعتها لتثبيت الحفظ.</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/40">
                    <p className="font-bold text-emerald-900 dark:text-emerald-300 font-arabic">إنجاز جديد</p>
                    <p className="text-[11px] text-emerald-800/80 dark:text-emerald-400/80 font-arabic mt-0.5">أكملت بنجاح اختبار سورة الإخلاص بنسبة إتقان 98%!</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </header>
  );
}
