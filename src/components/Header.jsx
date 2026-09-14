import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, Sun, Moon, Bell, Volume2, Menu, ShieldCheck, X, 
  Sparkles, Droplets, BookOpen, Check, Palette, Leaf, Stars, Flower2
} from 'lucide-react';
import { RECITERS } from '../data/quranData';
import QuranLogo from './QuranLogo';

export const APP_THEMES = [
  {
    id: 'emerald',
    nameAr: 'نور زمردي',
    nameEn: 'Emerald Oasis',
    icon: Leaf,
    preview: ['#059669', '#0D9488', '#F5F7F3'],
    desc: 'إشراق نهاري بلمسات خضراء زمردية'
  },
  {
    id: 'dark',
    nameAr: 'سكون الليل',
    nameEn: 'Midnight Layl',
    icon: Moon,
    preview: ['#10B981', '#080E0C', '#0F1A15'],
    desc: 'داكن مريح للقراءة الهادئة في الظلام'
  },
  {
    id: 'amber',
    nameAr: 'ذهبي ملكي',
    nameEn: 'Royal Imperial Gold',
    icon: Sparkles,
    preview: ['#B45309', '#D97706', '#FDF7EC'],
    desc: 'أناقة ملكية وتطريز ذهبي فاخر'
  },
  {
    id: 'blue',
    nameAr: 'أزرق سماوي',
    nameEn: 'Celestial Sapphire',
    icon: Droplets,
    preview: ['#0284C7', '#0E7490', '#EFF6FF'],
    desc: 'هدوء سماوي بلون الياقوت الأزرق'
  },
  {
    id: 'sepia',
    nameAr: 'مخطوطة أندلسية',
    nameEn: 'Desert Sepia',
    icon: BookOpen,
    preview: ['#7C5427', '#A0713A', '#F4EDD8'],
    desc: 'ورق مخطوطات عريق دافئ كلاسيكي'
  },
  {
    id: 'rose',
    nameAr: 'حديقة الورد',
    nameEn: 'Rose Garden',
    icon: Flower2,
    preview: ['#E11D48', '#BE185D', '#FFF1F4'],
    desc: 'ناعم وجميل بتدرجات الوردي الهادئ'
  },
  {
    id: 'purple',
    nameAr: 'كوني بنفسجي',
    nameEn: 'Cosmic Purple',
    icon: Stars,
    preview: ['#8B5CF6', '#A78BFA', '#0D0A18'],
    desc: 'عمق كوني بلون البنفسج الداكن الليلي'
  },
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
  const notifRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (themeMenuRef.current && !themeMenuRef.current.contains(e.target)) {
        setShowThemeMenu(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentThemeConfig = APP_THEMES.find(t => t.id === theme) || APP_THEMES[0];
  const ActiveThemeIcon = currentThemeConfig.icon;

  const isDarkTheme = theme === 'dark' || theme === 'purple';

  return (
    <header
      className="sticky top-0 z-30 w-full backdrop-blur-xl border-b px-4 lg:px-8 py-3.5 theme-transition"
      style={{
        backgroundColor: 'var(--t-header)',
        borderColor: 'var(--t-border)',
      }}
    >
      <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
        
        {/* Mobile Menu Button + Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-xl transition-colors theme-transition"
            style={{ color: 'var(--t-text2)' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--t-surface2)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
          
          <div className="hidden sm:flex items-center gap-2.5">
            <QuranLogo size="sm" />
            <div>
              <span className="font-arabic font-bold text-sm block leading-none theme-transition" style={{ color: 'var(--t-text)' }}>
                القرآن الكريم
              </span>
              <span className="text-[10px] font-sans theme-transition" style={{ color: 'var(--t-muted)' }}>
                AiQuran Intelligent Companion
              </span>
            </div>
          </div>
        </div>

        {/* Center: Global Search */}
        <div className="relative flex-1 max-w-md mx-2">
          <button
            onClick={onOpenSearchModal}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-arabic transition-all shadow-inner text-right group theme-transition"
            style={{
              backgroundColor: 'var(--t-input)',
              color: 'var(--t-muted)',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: 'var(--t-border)',
            }}
          >
            <div className="flex items-center gap-2.5">
              <Search size={16} style={{ color: 'var(--t-muted)' }} />
              <span>ابحث عن سورة، آية، أو علامة مرجعية...</span>
            </div>
            <kbd
              className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-mono rounded border theme-transition"
              style={{
                color: 'var(--t-muted)',
                backgroundColor: 'var(--t-surface)',
                borderColor: 'var(--t-border)',
              }}
            >
              Ctrl + K
            </kbd>
          </button>
        </div>

        {/* Right: Reciter + Theme Switcher + Notifications */}
        <div className="flex items-center gap-2">
          
          {/* Reciter selector */}
          <div
            className="hidden md:flex items-center gap-2 rounded-2xl px-2.5 py-1.5 text-xs border theme-transition"
            style={{
              backgroundColor: 'var(--t-surface2)',
              borderColor: 'var(--t-border)',
              color: 'var(--t-text)',
            }}
          >
            <Volume2 size={15} style={{ color: 'var(--t-accent)' }} />
            <select
              value={selectedReciter.id}
              onChange={(e) => {
                const rec = RECITERS.find(r => r.id === e.target.value);
                if (rec) setSelectedReciter(rec);
              }}
              className="bg-transparent text-xs font-arabic font-semibold focus:outline-none cursor-pointer"
              style={{ color: 'var(--t-text)' }}
            >
              {RECITERS.map(r => (
                <option key={r.id} value={r.id} style={{ backgroundColor: 'var(--t-card)', color: 'var(--t-text)' }}>
                  {r.nameAr}
                </option>
              ))}
            </select>
          </div>

          {/* THEME SWITCHER */}
          <div className="relative" ref={themeMenuRef}>
            <button
              onClick={() => setShowThemeMenu(!showThemeMenu)}
              className="w-9 h-9 rounded-2xl flex items-center justify-center transition-all border relative overflow-hidden group theme-transition"
              style={{
                backgroundColor: 'var(--t-surface2)',
                borderColor: 'var(--t-border)',
              }}
              title={`المظهر: ${currentThemeConfig.nameAr} — انقر لتغييره`}
              aria-label="تغيير مظهر التطبيق"
            >
              {/* Color dots preview from current theme */}
              <div className="flex gap-0.5">
                {currentThemeConfig.preview.slice(0, 2).map((c, i) => (
                  <span
                    key={i}
                    className="w-2 h-2 rounded-full transition-transform group-hover:scale-125"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
              <span
                className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full ring-1"
                style={{
                  backgroundColor: currentThemeConfig.preview[0],
                  ringColor: 'var(--t-bg)',
                }}
              />
            </button>

            {/* Theme Picker Dropdown */}
            {showThemeMenu && (
              <div
                className="absolute left-0 mt-2 w-72 rounded-2xl shadow-2xl border p-3 z-50 animate-fade-in text-right theme-transition"
                style={{
                  backgroundColor: 'var(--t-card)',
                  borderColor: 'var(--t-border)',
                }}
              >
                <div
                  className="flex items-center justify-between pb-2 mb-2 border-b"
                  style={{ borderColor: 'var(--t-border)' }}
                >
                  <div className="flex items-center gap-1.5">
                    <Palette size={15} style={{ color: 'var(--t-accent)' }} />
                    <span className="font-bold text-xs font-arabic" style={{ color: 'var(--t-text)' }}>
                      مظهر التطبيق الكامل
                    </span>
                  </div>
                  <span className="text-[10px] font-sans" style={{ color: 'var(--t-muted)' }}>
                    7 Themes
                  </span>
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
                        className="w-full flex items-center justify-between p-2.5 rounded-xl transition-all text-right font-arabic group theme-transition"
                        style={{
                          backgroundColor: isActive ? 'var(--t-surface2)' : 'transparent',
                          outline: isActive ? `1.5px solid var(--t-accent)` : 'none',
                        }}
                        onMouseEnter={e => !isActive && (e.currentTarget.style.backgroundColor = 'var(--t-surface2)')}
                        onMouseLeave={e => !isActive && (e.currentTarget.style.backgroundColor = 'transparent')}
                      >
                        {/* Colour swatches */}
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden shadow-sm"
                            style={{ backgroundColor: t.preview[2] }}
                          >
                            <TIcon size={16} style={{ color: t.preview[0] }} />
                          </div>
                          <div>
                            <span className="text-xs font-bold block leading-tight" style={{ color: 'var(--t-text)' }}>
                              {t.nameAr}
                            </span>
                            <span className="text-[10px] leading-tight block mt-0.5" style={{ color: 'var(--t-muted)' }}>
                              {t.desc}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                          {/* Preview swatches */}
                          <div className="flex gap-1">
                            {t.preview.map((c, i) => (
                              <span key={i} className="w-2.5 h-2.5 rounded-full ring-1 ring-white/30" style={{ backgroundColor: c }} />
                            ))}
                          </div>
                          {isActive && <Check size={14} style={{ color: 'var(--t-accent)' }} />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <p className="text-[10px] text-center mt-3 pt-2 border-t font-arabic" style={{ color: 'var(--t-muted)', borderColor: 'var(--t-border)' }}>
                  المظهر يُطبَّق على كامل التطبيق فوراً ويُحفظ تلقائياً
                </p>
              </div>
            )}
          </div>

          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="w-9 h-9 rounded-2xl flex items-center justify-center transition-all border relative theme-transition"
              style={{
                backgroundColor: 'var(--t-surface2)',
                borderColor: 'var(--t-border)',
                color: 'var(--t-text2)',
              }}
              title="الإشعارات والتنبيهات"
            >
              <Bell size={18} />
              <span
                className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full ring-1"
                style={{ backgroundColor: 'var(--t-accent)', ringColor: 'var(--t-bg)' }}
              />
            </button>

            {showNotifications && (
              <div
                className="absolute left-0 mt-2 w-72 rounded-2xl shadow-2xl border p-4 z-50 animate-fade-in text-right theme-transition"
                style={{
                  backgroundColor: 'var(--t-card)',
                  borderColor: 'var(--t-border)',
                }}
              >
                <div className="flex items-center justify-between pb-2 border-b mb-3" style={{ borderColor: 'var(--t-border)' }}>
                  <span className="font-bold text-xs font-arabic" style={{ color: 'var(--t-text)' }}>الإشعارات والتنبيهات</span>
                  <ShieldCheck size={14} style={{ color: 'var(--t-accent)' }} />
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-xl border" style={{ backgroundColor: 'var(--t-surface2)', borderColor: 'var(--t-border)' }}>
                    <p className="font-bold font-arabic" style={{ color: 'var(--t-text)' }}>المراجعة اليومية (AI Hifz)</p>
                    <p className="text-[11px] font-arabic mt-0.5" style={{ color: 'var(--t-muted)' }}>لديك 12 آية من سورتي الفاتحة والملك حان موعد مراجعتها لتثبيت الحفظ.</p>
                  </div>
                  <div className="p-2.5 rounded-xl border" style={{ backgroundColor: 'var(--t-surface2)', borderColor: 'var(--t-border)' }}>
                    <p className="font-bold font-arabic" style={{ color: 'var(--t-text)' }}>إنجاز جديد 🏆</p>
                    <p className="text-[11px] font-arabic mt-0.5" style={{ color: 'var(--t-muted)' }}>أكملت بنجاح اختبار سورة الإخلاص بنسبة إتقان 98%!</p>
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
