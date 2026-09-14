import React from 'react';
import { 
  BookOpen, HelpCircle, Book, Mic, Award, Settings, 
  Bookmark, BarChart2, Sparkles, X, ChevronLeft, Volume2, 
  Headphones, User
} from 'lucide-react';
import AvatarBadge from './AvatarBadge';

export default function Sidebar({
  currentView,
  setView,
  isMobileMenuOpen,
  closeMobileMenu,
  userProfile,
  memorizationStats
}) {
  const navItems = [
    { id: 'dashboard', labelAr: 'الرئيسية', labelEn: 'Dashboard', icon: BookOpen, badge: null },
    { id: 'mushaf', labelAr: 'المصحف الشريف', labelEn: 'Verified Mushaf', icon: Book, badge: '114' },
    { id: 'listener', labelAr: 'ركن الاستماع', labelEn: 'Quran Listener', icon: Headphones, badge: 'Sleep' },
    { id: 'voicelab', labelAr: 'معمل التلاوة', labelEn: 'AI Voice Lab', icon: Mic, badge: 'AI' },
    { id: 'hifz', labelAr: 'مخطط الحفظ', labelEn: 'Hifz Planner', icon: Award, badge: 'SRS' },
    { id: 'quiz', labelAr: 'تحدي القرآن', labelEn: 'Quiz Arena', icon: HelpCircle, badge: 'Hot' },
    { id: 'profile', labelAr: 'حسابي والإعدادات', labelEn: 'Profile & Settings', icon: User, badge: null },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div
          onClick={closeMobileMenu}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar container: fixed on mobile, sticky on desktop */}
      <aside
        className={`
          fixed lg:sticky top-0 right-0 h-screen z-50 lg:z-20
          w-72 bg-white/95 dark:bg-[#0D1513]/95 backdrop-blur-2xl
          border-l border-stone-200/80 dark:border-emerald-900/30
          flex flex-col justify-between p-5 transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0 shadow-2xl' : 'translate-x-full lg:translate-x-0'}
        `}
        dir="rtl"
      >
        <div className="overflow-y-auto pb-4">
          {/* Brand header */}
          <div className="flex items-center justify-between pb-5 mb-4 border-b border-stone-100 dark:border-emerald-950/60">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-emerald-400 p-0.5 shadow-lg shadow-emerald-700/20 flex items-center justify-center text-white">
                <Book size={24} className="text-amber-300 drop-shadow" />
              </div>
              <div>
                <h1 className="font-bold text-lg font-arabic text-emerald-950 dark:text-emerald-100 leading-tight">
                  القرآن الكريم
                </h1>
                <p className="text-[10px] text-stone-500 dark:text-stone-400 font-sans tracking-wide">
                  AiQuran AI Platform
                </p>
              </div>
            </div>

            {/* Mobile close button */}
            <button
              onClick={closeMobileMenu}
              className="lg:hidden p-2 rounded-xl text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-emerald-950/50"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
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
                    w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl font-arabic transition-all
                    ${isActive 
                      ? 'bg-gradient-to-l from-emerald-700 to-teal-800 text-white shadow-md shadow-emerald-800/25 font-bold scale-[1.02]' 
                      : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100/80 dark:hover:bg-emerald-950/40 font-medium'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={19} className={isActive ? 'text-amber-300' : 'text-stone-400 dark:text-emerald-500'} />
                    <div className="text-right">
                      <span className="text-xs sm:text-sm block leading-tight">{item.labelAr}</span>
                      <span className={`text-[8px] font-sans font-normal opacity-80 ${isActive ? 'text-emerald-100' : 'text-stone-400'}`} dir="ltr">
                        {item.labelEn}
                      </span>
                    </div>
                  </div>

                  {item.badge && (
                    <span className={`
                      text-[9px] px-2 py-0.5 rounded-full font-bold font-sans
                      ${isActive 
                        ? 'bg-white/20 text-amber-200' 
                        : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                      }
                    `}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Hifz Progress Widget */}
          <div className="mt-6 p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50/50 dark:from-[#13201C] dark:to-[#0F1B17] border border-emerald-100/80 dark:border-emerald-900/40">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <Sparkles size={14} className="text-amber-500" />
                <span className="text-xs font-bold text-emerald-950 dark:text-emerald-200 font-arabic">
                  الهدف اليومي: {userProfile?.dailyAyahGoal || 5} آيات
                </span>
              </div>
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 font-sans" dir="ltr">
                {memorizationStats?.overall || 45}%
              </span>
            </div>
            <div className="h-1.5 w-full bg-stone-200/70 dark:bg-emerald-950/80 rounded-full overflow-hidden mb-2">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-1000"
                style={{ width: `${memorizationStats?.overall || 45}%` }}
              />
            </div>
            <p className="text-[10px] text-stone-500 dark:text-stone-400 font-arabic leading-tight">
              أكملت مراجعة اليوم بنجاح وتثبيت الآيات المستحقة.
            </p>
          </div>
        </div>

        {/* User profile section */}
        <div className="pt-3 border-t border-stone-100 dark:border-emerald-950/60">
          <div 
            onClick={() => {
              setView('profile');
              closeMobileMenu();
            }}
            className="flex items-center justify-between p-2 rounded-2xl bg-stone-50 dark:bg-emerald-950/30 border border-stone-200/50 dark:border-emerald-900/30 cursor-pointer hover:bg-emerald-50/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <AvatarBadge 
                avatarId={userProfile?.avatarId} 
                name={userProfile?.name} 
                size="md" 
              />
              <div>
                <h4 className="font-bold text-xs text-stone-800 dark:text-stone-200 font-arabic leading-none mb-1">
                  {userProfile?.name || 'إبراهيم أحمد'}
                </h4>
                <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-arabic font-semibold">
                  {userProfile?.level || 'مبتدئ (جزء عم)'}
                </span>
              </div>
            </div>
            <Settings size={18} className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200" />
          </div>
        </div>
      </aside>
    </>
  );
}
