import React from 'react';
import {
  BookOpen, HelpCircle, Book, Mic, Award, Settings,
  Sparkles, X, Headphones, User, BookText, CalendarCheck,
  BarChart2, Layers, Bookmark, Target, Moon, Trophy
} from 'lucide-react';
import AvatarBadge from './AvatarBadge';
import QuranLogo from './QuranLogo';

const NAV_SECTIONS = [
  {
    label: 'الرئيسية',
    items: [
      { id: 'dashboard', labelAr: 'الرئيسية', labelEn: 'Dashboard', icon: BookOpen, badge: null },
    ]
  },
  {
    label: 'التلاوة والاستماع',
    items: [
      { id: 'mushaf', labelAr: 'المصحف الشريف', labelEn: 'Verified Mushaf', icon: Book, badge: '114' },
      { id: 'listener', labelAr: 'ركن الاستماع', labelEn: 'Quran Listener', icon: Headphones, badge: 'Sleep' },
      { id: 'tafsir', labelAr: 'التفسير والبيان', labelEn: 'Tafsir', icon: BookText, badge: null },
      { id: 'focus', labelAr: 'وضع التركيز', labelEn: 'Focus Mode', icon: Moon, badge: 'Dark' },
    ]
  },
  {
    label: 'الحفظ والتعلم',
    items: [
      { id: 'hifz', labelAr: 'مخطط الحفظ', labelEn: 'Hifz Planner', icon: Award, badge: 'SRS' },
      { id: 'juz', labelAr: 'الأجزاء الثلاثون', labelEn: 'Juz Navigator', icon: Layers, badge: '30' },
      { id: 'tajweed', labelAr: 'أحكام التجويد', labelEn: 'Tajweed Guide', icon: BookOpen, badge: null },
      { id: 'quiz', labelAr: 'تحدي القرآن', labelEn: 'Quiz Arena', icon: HelpCircle, badge: 'Hot' },
    ]
  },
  {
    label: 'الأدوات والتتبع',
    items: [
      { id: 'voicelab', labelAr: 'معمل التلاوة', labelEn: 'AI Voice Lab', icon: Mic, badge: 'AI' },
      { id: 'wird', labelAr: 'الورد اليومي', labelEn: 'Wird Planner', icon: CalendarCheck, badge: null },
      { id: 'dhikr', labelAr: 'عداد الذكر', labelEn: 'Dhikr Counter', icon: Target, badge: null },
      { id: 'bookmarks', labelAr: 'إشاراتي المرجعية', labelEn: 'Bookmarks', icon: Bookmark, badge: null },
      { id: 'analytics', labelAr: 'إحصائياتي', labelEn: 'Analytics', icon: BarChart2, badge: null },
      { id: 'community', labelAr: 'المجتمع', labelEn: 'Community', icon: Trophy, badge: 'New' },
    ]
  },
  {
    label: 'الحساب',
    items: [
      { id: 'profile', labelAr: 'حسابي والإعدادات', labelEn: 'Profile & Settings', icon: User, badge: null },
    ]
  },
];

export default function Sidebar({
  currentView,
  setView,
  isMobileMenuOpen,
  closeMobileMenu,
  userProfile,
  memorizationStats
}) {
  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div
          onClick={closeMobileMenu}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`
          fixed lg:sticky top-0 right-0 h-screen z-50 lg:z-20
          w-72 backdrop-blur-2xl
          flex flex-col justify-between p-5 transition-all duration-300 ease-in-out theme-transition
          ${isMobileMenuOpen ? 'translate-x-0 shadow-2xl' : 'translate-x-full lg:translate-x-0'}
        `}
        style={{
          backgroundColor: 'var(--t-sidebar)',
          borderLeft: '1px solid var(--t-border)',
        }}
        dir="rtl"
      >
        <div className="overflow-y-auto pb-4 flex-1">

          {/* Brand Header */}
          <div
            className="flex items-center justify-between pb-5 mb-4 border-b theme-transition"
            style={{ borderColor: 'var(--t-border)' }}
          >
            <div className="flex items-center gap-3">
              <QuranLogo size="md" />
              <div>
                <h1 className="font-bold text-lg font-arabic leading-tight theme-transition" style={{ color: 'var(--t-text)' }}>
                  القرآن الكريم
                </h1>
                <p className="text-[10px] font-sans tracking-wide theme-transition" style={{ color: 'var(--t-muted)' }}>
                  AiQuran AI Platform
                </p>
              </div>
            </div>

            {/* Mobile close */}
            <button
              onClick={closeMobileMenu}
              className="lg:hidden p-2 rounded-xl transition-colors theme-transition"
              style={{ color: 'var(--t-muted)' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--t-surface2)'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Sections */}
          <nav className="space-y-4">
            {NAV_SECTIONS.map((section) => (
              <div key={section.label}>
                <p className="text-[9px] font-bold uppercase tracking-widest font-sans px-3.5 mb-1.5 theme-transition" style={{ color: 'var(--t-muted)' }}>
                  {section.label}
                </p>
                <div className="space-y-0.5">
                  {section.items.map((item) => {
                    const isActive = currentView === item.id;
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setView(item.id);
                          closeMobileMenu();
                        }}
                        className={`
                          w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl font-arabic transition-all theme-transition
                          ${isActive ? 'nav-active font-bold scale-[1.02]' : 'font-medium'}
                        `}
                        style={isActive ? {} : { color: 'var(--t-text2)' }}
                        onMouseEnter={e => !isActive && (e.currentTarget.style.backgroundColor = 'var(--t-surface2)')}
                        onMouseLeave={e => !isActive && (e.currentTarget.style.backgroundColor = 'transparent')}
                      >
                        <div className="flex items-center gap-3">
                          <Icon
                            size={17}
                            style={isActive
                              ? { color: 'rgba(255,255,255,0.9)' }
                              : { color: 'var(--t-accent)' }
                            }
                          />
                          <div className="text-right">
                            <span className="text-xs block leading-tight">{item.labelAr}</span>
                            <span
                              className="text-[8px] font-sans font-normal opacity-70"
                              dir="ltr"
                              style={isActive ? { color: 'rgba(255,255,255,0.6)' } : { color: 'var(--t-muted)' }}
                            >
                              {item.labelEn}
                            </span>
                          </div>
                        </div>
                        {item.badge && (
                          <span
                            className="text-[9px] px-2 py-0.5 rounded-full font-bold font-sans theme-transition"
                            style={isActive
                              ? { backgroundColor: 'rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.9)' }
                              : { backgroundColor: 'var(--t-surface2)', color: 'var(--t-accent)' }
                            }
                          >
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* Hifz Progress Widget */}
          <div
            className="mt-4 p-4 rounded-2xl border theme-transition"
            style={{
              backgroundColor: 'var(--t-surface2)',
              borderColor: 'var(--t-border)',
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <Sparkles size={14} style={{ color: 'var(--t-gold)' }} />
                <span className="text-xs font-bold font-arabic theme-transition" style={{ color: 'var(--t-text)' }}>
                  الهدف اليومي: {userProfile?.dailyAyahGoal || 5} آيات
                </span>
              </div>
              <span className="text-xs font-bold font-sans theme-transition" style={{ color: 'var(--t-accent)' }} dir="ltr">
                {memorizationStats?.overall || 45}%
              </span>
            </div>
            <div className="h-1.5 w-full rounded-full overflow-hidden mb-2 theme-transition" style={{ backgroundColor: 'var(--t-border)' }}>
              <div
                className="h-full rounded-full progress-bar-fill"
                style={{ width: `${memorizationStats?.overall || 45}%` }}
              />
            </div>
            <p className="text-[10px] font-arabic leading-tight theme-transition" style={{ color: 'var(--t-muted)' }}>
              أكملت مراجعة اليوم بنجاح وتثبيت الآيات المستحقة.
            </p>
          </div>
        </div>

        {/* User Profile Footer */}
        <div className="pt-3 border-t theme-transition" style={{ borderColor: 'var(--t-border)' }}>
          <div
            onClick={() => {
              setView('profile');
              closeMobileMenu();
            }}
            className="flex items-center justify-between p-2 rounded-2xl border cursor-pointer transition-all theme-transition"
            style={{
              backgroundColor: 'var(--t-surface2)',
              borderColor: 'var(--t-border)',
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--t-surface)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--t-surface2)'}
          >
            <div className="flex items-center gap-3">
              <AvatarBadge avatarId={userProfile?.avatarId} name={userProfile?.name} size="md" />
              <div>
                <h4 className="font-bold text-xs font-arabic leading-none mb-1 theme-transition" style={{ color: 'var(--t-text)' }}>
                  {userProfile?.name || 'إبراهيم أحمد'}
                </h4>
                <span className="text-[9px] font-arabic font-semibold theme-transition" style={{ color: 'var(--t-accent)' }}>
                  {userProfile?.level || 'مبتدئ (جزء عم)'}
                </span>
              </div>
            </div>
            <Settings size={18} style={{ color: 'var(--t-muted)' }} />
          </div>
        </div>
      </aside>
    </>
  );
}
