import React, { useState, useEffect } from 'react';
import { 
  Book, Mic, Award, HelpCircle, Target, BarChart2, 
  History, Play, CheckCircle2, ChevronLeft, ChevronRight, 
  Sparkles, ShieldCheck, Flame, BookOpen, Clock, Heart,
  Sun, Sunset, Moon, Sunrise, Bell
} from 'lucide-react';
import { SURAHS_INDEX, DAILY_REFLECTION } from '../data/quranData';

export default function DashboardView({
  setView,
  setActiveSurahId,
  setCurrentAyahNumber,
  setIsPlaying
}) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Standard Prayer Times approximate schedule
  const prayerSchedule = [
    { id: 'fajr', nameAr: 'الفجر', icon: Sunrise, time: '04:45', hours: 4, mins: 45 },
    { id: 'sunrise', nameAr: 'الشروق', icon: Sun, time: '06:05', hours: 6, mins: 5 },
    { id: 'dhuhr', nameAr: 'الظهر', icon: Sun, time: '12:15', hours: 12, mins: 15 },
    { id: 'asr', nameAr: 'العصر', icon: Sun, time: '15:35', hours: 15, mins: 35 },
    { id: 'maghrib', nameAr: 'المغرب', icon: Sunset, time: '18:15', hours: 18, mins: 15 },
    { id: 'isha', nameAr: 'العشاء', icon: Moon, time: '19:45', hours: 19, mins: 45 }
  ];

  // Find next prayer
  const currentHours = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();
  const currentTotalMins = currentHours * 60 + currentMinutes;

  let nextPrayer = prayerSchedule[0];
  for (const prayer of prayerSchedule) {
    const pMins = prayer.hours * 60 + prayer.mins;
    if (pMins > currentTotalMins) {
      nextPrayer = prayer;
      break;
    }
  }

  // Calculate remaining time to next prayer
  const nextPrayerMins = nextPrayer.hours * 60 + nextPrayer.mins;
  const diffMins = nextPrayerMins > currentTotalMins 
    ? nextPrayerMins - currentTotalMins 
    : (24 * 60 - currentTotalMins) + nextPrayerMins;
  
  const remainingHours = Math.floor(diffMins / 60);
  const remainingMinutes = diffMins % 60;

  const quickActions = [
    { 
      id: 'mushaf',
      icon: Book, 
      color: 'text-amber-600', 
      bg: 'bg-amber-100 dark:bg-amber-950/60', 
      titleAr: 'المصحف الشريف', 
      titleEn: 'Verified Mushaf', 
      descAr: 'تلاوة موثقة بالرسم العثماني مع تفاسير السعدي وابن كثير وعرض الصفحة المصحفية',
      action: () => setView('mushaf') 
    },
    { 
      id: 'voicelab',
      icon: Mic, 
      color: 'text-blue-600', 
      bg: 'bg-blue-100 dark:bg-blue-950/60', 
      titleAr: 'معمل التلاوة', 
      titleEn: 'AI Voice Lab', 
      descAr: 'سجل تلاوتك واكتشف تصحيح مخارج الحروف وقواعد التجويد بصوتك',
      action: () => setView('voicelab') 
    },
    { 
      id: 'hifz',
      icon: Award, 
      color: 'text-purple-600', 
      bg: 'bg-purple-100 dark:bg-purple-950/60', 
      titleAr: 'مخطط الحفظ (SRS)', 
      titleEn: 'Smart Hifz Planner', 
      descAr: 'خريطة الـ 30 جزءاً ومخطط الختمات والمراجعة المتباعدة لتثبيت الحفظ',
      action: () => setView('hifz') 
    },
    { 
      id: 'quiz',
      icon: HelpCircle, 
      color: 'text-teal-600', 
      bg: 'bg-teal-100 dark:bg-teal-950/60', 
      titleAr: 'تحدي القرآن', 
      titleEn: 'Quiz Arena', 
      descAr: 'مسابقات تفاعلية في علوم القرآن وأسباب النزول وأحكام التجويد',
      action: () => setView('quiz') 
    }
  ];

  return (
    <div className="max-w-7xl mx-auto w-full px-4 lg:px-8 py-6 space-y-8" dir="rtl">
      
      {/* Top Welcome & Daily Ayah Reflection Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Hero Card (2 columns on desktop) */}
        <div className="lg:col-span-2 bg-gradient-to-br from-emerald-800 via-emerald-900 to-teal-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-emerald-950/20 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mt-20"></div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-emerald-950/50 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-emerald-500/30 mb-4">
              <Sparkles size={14} className="text-amber-300" />
              <span className="text-xs font-bold font-arabic text-emerald-100">
                منصة الذكاء الاصطناعي لخدمة القرآن الكريم
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-bold font-arabic leading-tight mb-2" style={{ fontFamily: "Amiri, serif" }}>
              السلام عليكم ورحمة الله، إبراهيم
            </h1>
            <p className="text-xs sm:text-sm text-emerald-200/90 font-arabic max-w-xl mb-6">
              «خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ». واصل رحلتك اليوم في الحفظ والمراجعة وتثبيت الآيات.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button 
                onClick={() => setView('quiz')}
                className="bg-gradient-to-r from-amber-300 to-amber-500 text-amber-950 px-6 py-3 rounded-2xl font-bold font-arabic text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all"
              >
                <span>ابدأ اختبار اليوم</span>
                <ChevronLeft size={18} />
              </button>
              <button 
                onClick={() => {
                  setActiveSurahId(1);
                  setView('mushaf');
                }}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-5 py-3 rounded-2xl font-bold font-arabic text-sm flex items-center gap-2 border border-white/20 transition-all"
              >
                <BookOpen size={18} className="text-emerald-300" />
                <span>فتح المصحف الموثق</span>
              </button>
            </div>
          </div>

          {/* Bottom Hero Stats row */}
          <div className="grid grid-cols-4 gap-2 sm:gap-4 mt-8 pt-6 border-t border-emerald-700/50 relative z-10">
            {[
              { labelAr: 'المستوى', value: 'مبتدئ', sub: 'Level' },
              { labelAr: 'السور المتقنة', value: '14 سورة', sub: '14 Surahs' },
              { labelAr: 'دقة التجويد', value: '%94', sub: 'Accuracy' },
              { labelAr: 'حماس التتابع', value: '7 أيام 🔥', sub: '7-day Streak' }
            ].map((stat, i) => (
              <div key={i} className="text-center p-2 rounded-xl bg-black/20 backdrop-blur-sm">
                <span className="text-[10px] sm:text-xs font-bold text-emerald-200 font-arabic block leading-tight">
                  {stat.labelAr}
                </span>
                <span className="text-xs sm:text-base font-bold text-white font-arabic mt-1 block">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Quranic Reflection Widget */}
        <div className="bg-white dark:bg-[#121E1A] rounded-3xl p-6 border border-stone-200/80 dark:border-emerald-900/40 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-100 dark:border-emerald-950/60">
              <div className="flex items-center gap-2">
                <Heart size={16} className="text-red-500 fill-red-500" />
                <h3 className="font-bold text-sm font-arabic text-stone-900 dark:text-stone-100">
                  آية وتأمل اليوم
                </h3>
              </div>
              <span className="text-[10px] text-stone-400 font-arabic">
                {DAILY_REFLECTION.surahName}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-emerald-950/30 text-center mb-4 border border-stone-100 dark:border-emerald-900/20">
              <p className="font-arabic font-bold text-xl text-stone-800 dark:text-stone-100 leading-relaxed mb-2" style={{ fontFamily: "Amiri, serif" }}>
                «{DAILY_REFLECTION.arabic}»
              </p>
              <p className="text-xs text-stone-500 dark:text-stone-400 font-sans" dir="ltr">
                "{DAILY_REFLECTION.english}"
              </p>
            </div>

            <p className="text-xs text-stone-600 dark:text-stone-300 font-arabic leading-relaxed mb-4">
              {DAILY_REFLECTION.reflection}
            </p>
          </div>

          <button
            onClick={() => {
              setActiveSurahId(1);
              setCurrentAyahNumber(1);
              setIsPlaying(true);
            }}
            className="w-full py-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold font-arabic flex items-center justify-center gap-2 hover:bg-emerald-100 transition-colors"
          >
            <Play size={14} className="fill-current" />
            <span>استمع للتلاوة بصوت الحصري</span>
          </button>
        </div>

      </div>

      {/* DAILY PRAYER TIMES WIDGET */}
      <div className="bg-white dark:bg-[#121E1A] p-5 sm:p-6 rounded-3xl border border-stone-200/80 dark:border-emerald-900/40 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-stone-100 dark:border-emerald-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold">
              <Clock size={20} />
            </div>
            <div>
              <h3 className="font-bold text-base text-stone-900 dark:text-stone-100 font-arabic">
                مواقيت الصلاة اليومية
              </h3>
              <p className="text-xs text-stone-400 font-arabic">
                مواقيت تقريبية بحسب توقيت مكة المكرمة
              </p>
            </div>
          </div>

          {/* Countdown Pill to next prayer */}
          <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 px-4 py-2 rounded-2xl">
            <Bell size={15} className="text-emerald-600 animate-pulse" />
            <span className="text-xs text-stone-600 dark:text-stone-300 font-arabic">
              الصلاة القادمة: <strong className="text-emerald-700 dark:text-emerald-300">صلاة {nextPrayer.nameAr}</strong>
            </span>
            <span className="text-xs font-bold font-sans text-emerald-800 dark:text-emerald-200 bg-white dark:bg-emerald-900 px-2 py-0.5 rounded-lg" dir="ltr">
              {remainingHours}h {remainingMinutes}m
            </span>
          </div>
        </div>

        {/* 6 Prayer Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {prayerSchedule.map((p) => {
            const isNext = p.id === nextPrayer.id;
            const Icon = p.icon;

            return (
              <div
                key={p.id}
                className={`p-3.5 rounded-2xl border text-center transition-all ${
                  isNext
                    ? 'bg-gradient-to-b from-emerald-600 to-teal-700 text-white border-emerald-600 shadow-md shadow-emerald-700/20 scale-[1.02]'
                    : 'bg-stone-50 dark:bg-[#0E1715] text-stone-700 dark:text-stone-300 border-stone-200/80 dark:border-emerald-950/60'
                }`}
              >
                <Icon size={18} className={`mx-auto mb-1.5 ${isNext ? 'text-amber-300' : 'text-stone-400'}`} />
                <span className="text-xs font-bold font-arabic block">
                  {p.nameAr}
                </span>
                <span className={`text-sm font-bold font-sans block mt-1 ${isNext ? 'text-white' : 'text-stone-900 dark:text-stone-100'}`} dir="ltr">
                  {p.time}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Spaced Repetition Due Alert Bar */}
      <div className="bg-gradient-to-l from-amber-50 via-orange-50/80 to-amber-50 dark:from-[#1A1813] dark:via-[#1E1C15] dark:to-[#1A1813] border border-amber-200/80 dark:border-amber-800/40 rounded-3xl p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/20 shrink-0">
            <History size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-amber-950 dark:text-amber-200 font-arabic">
                المراجعة الذكية لتثبيت الحفظ (AI Hifz SRS)
              </h3>
              <span className="bg-amber-200/80 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 text-[10px] px-2 py-0.5 rounded-full font-bold font-sans">
                Due Today
              </span>
            </div>
            <p className="text-xs text-amber-800/80 dark:text-amber-400/80 font-arabic mt-0.5">
              لديك 12 آية مستحقة للمراجعة اليوم من سورتي الفاتحة والملك لمنع تفلت الحفظ.
            </p>
          </div>
        </div>

        <button
          onClick={() => setView('hifz')}
          className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-2.5 rounded-2xl font-bold font-arabic text-xs flex items-center gap-2 shadow-md shadow-amber-600/20 active:scale-95 transition-all shrink-0"
        >
          <span>ابدأ المراجعة الآن</span>
          <ChevronLeft size={16} />
        </button>
      </div>

      {/* Quick Action Tiles */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 font-arabic">
              إجراءات سريعة وخدمات المنصة
            </h2>
            <p className="text-xs text-stone-400 font-sans" dir="ltr">Quick Services & AI Tools</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map(act => {
            const Icon = act.icon;
            return (
              <div
                key={act.id}
                onClick={act.action}
                className="bg-white dark:bg-[#121E1A] rounded-3xl p-5 border border-stone-200/80 dark:border-emerald-900/40 shadow-sm hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-700 cursor-pointer active:scale-98 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl ${act.bg} ${act.color} flex items-center justify-center mb-4 shadow-sm`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="font-bold text-stone-900 dark:text-stone-100 text-base font-arabic leading-tight">
                    {act.titleAr}
                  </h3>
                  <span className="text-[10px] text-stone-400 font-sans block mb-2" dir="ltr">
                    {act.titleEn}
                  </span>
                  <p className="text-xs text-stone-500 dark:text-stone-400 font-arabic leading-relaxed">
                    {act.descAr}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 dark:border-emerald-950/60 flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400 font-arabic">
                  <span>فتح القسم</span>
                  <ChevronLeft size={16} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Surahs Preview (Only 3 Surahs, others hidden) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 font-arabic">
              سور مختارة للتلاوة اليومية
            </h2>
            <p className="text-xs text-stone-400 font-sans" dir="ltr">Featured Surahs</p>
          </div>
          <button
            onClick={() => setView('mushaf')}
            className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-arabic flex items-center gap-1 hover:underline"
          >
            <span>عرض فهرس الـ 114 سورة كاملاً</span>
            <ChevronLeft size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SURAHS_INDEX.slice(0, 3).map(surah => (
            <div
              key={surah.id}
              onClick={() => {
                setActiveSurahId(surah.id);
                setView('mushaf');
              }}
              className="bg-white dark:bg-[#121E1A] rounded-3xl p-5 border border-stone-200/80 dark:border-emerald-900/40 shadow-sm hover:border-emerald-400 dark:hover:border-emerald-600 cursor-pointer active:scale-98 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-2xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-bold text-xs font-sans">
                    {surah.number}
                  </span>
                  <div>
                    <h4 className="font-bold text-base font-arabic text-stone-900 dark:text-stone-100">
                      سورة {surah.arabic}
                    </h4>
                    <span className="text-[10px] text-stone-400 font-sans" dir="ltr">
                      {surah.english}
                    </span>
                  </div>
                </div>
                <span className="text-[11px] text-stone-500 font-arabic">
                  {surah.type === 'Meccan' ? 'مكية' : 'مدنية'}
                </span>
              </div>

              {/* Progress bars for Memorization & Quiz */}
              <div className="space-y-2 pt-2 border-t border-stone-100 dark:border-emerald-950/50 text-xs">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-stone-500 dark:text-stone-400 font-arabic">نسبة الحفظ</span>
                  <span className="font-bold text-emerald-600 font-sans" dir="ltr">{surah.memorized}%</span>
                </div>
                <div className="h-1.5 w-full bg-stone-100 dark:bg-emerald-950 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-600 rounded-full" 
                    style={{ width: `${surah.memorized}%` }} 
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
