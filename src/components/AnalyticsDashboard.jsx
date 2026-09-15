import React, { useState } from 'react';
import {
  BarChart2, TrendingUp, Award, Clock, BookOpen, Mic,
  Target, Zap, Star, Calendar, CheckCircle2, Flame
} from 'lucide-react';

const MOCK_WEEKLY = [
  { day: 'الأحد', ayahs: 12, minutes: 18 },
  { day: 'الاثنين', ayahs: 8, minutes: 12 },
  { day: 'الثلاثاء', ayahs: 15, minutes: 22 },
  { day: 'الأربعاء', ayahs: 5, minutes: 8 },
  { day: 'الخميس', ayahs: 20, minutes: 30 },
  { day: 'الجمعة', ayahs: 25, minutes: 38 },
  { day: 'السبت', ayahs: 10, minutes: 15 },
];

const SURAH_PROGRESS = [
  { nameAr: 'الفاتحة', pct: 100, quizPct: 95 },
  { nameAr: 'البقرة', pct: 40, quizPct: 62 },
  { nameAr: 'آل عمران', pct: 20, quizPct: 45 },
  { nameAr: 'الملك', pct: 100, quizPct: 98 },
  { nameAr: 'الكهف', pct: 85, quizPct: 78 },
];

const BADGES = [
  { icon: '📖', nameAr: 'قارئ منتظم', descAr: '7 أيام متتالية من التلاوة', earned: true },
  { icon: '🏆', nameAr: 'بطل المسابقات', descAr: 'فاز بـ 10 مسابقات', earned: true },
  { icon: '🎯', nameAr: 'دقة التجويد', descAr: 'دقة %90+ في 5 تلاوات', earned: true },
  { icon: '⭐', nameAr: 'حافظ جزء عم', descAr: 'حفظ الجزء الثلاثين كاملاً', earned: false },
  { icon: '🌙', nameAr: 'قيام الليل', descAr: 'حضور 30 ختمة ليلية', earned: false },
  { icon: '📿', nameAr: 'الذاكر الدؤوب', descAr: '100,000 ذكر مسجل', earned: false },
];

const SUMMARY_STATS = [
  { icon: BookOpen, labelAr: 'إجمالي الآيات', value: '1,284', sub: 'آية مقروءة', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-950/50' },
  { icon: Clock, labelAr: 'وقت الاستماع', value: '48.5', sub: 'ساعة', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-950/50' },
  { icon: Mic, labelAr: 'جلسات التلاوة', value: '63', sub: 'جلسة مسجلة', color: 'text-violet-600 dark:text-violet-400', bg: 'bg-violet-50 dark:bg-violet-950/50' },
  { icon: Target, labelAr: 'دقة التجويد', value: '94%', sub: 'متوسط الدقة', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-950/50' },
];

const maxAyahs = Math.max(...MOCK_WEEKLY.map(d => d.ayahs));

export default function AnalyticsDashboard() {
  const [activeChart, setActiveChart] = useState('ayahs');

  return (
    <div className="max-w-6xl mx-auto w-full px-4 lg:px-8 py-6 space-y-6" dir="rtl">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200/80 dark:border-emerald-900/40">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-bold font-arabic mb-2">
            <BarChart2 size={14} />
            <span>تحليلات وإحصائيات</span>
            <span className="font-sans text-[10px]" dir="ltr">Study Analytics</span>
          </div>
          <h1 className="text-2xl font-bold font-arabic text-stone-900 dark:text-stone-100">لوحة الإحصائيات والتقدم</h1>
          <p className="text-xs text-stone-500 dark:text-stone-400 font-arabic mt-1">
            تتبع تقدمك في حفظ وتلاوة القرآن الكريم بشكل مرئي ومفصّل.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 px-4 py-2.5 rounded-2xl">
          <Flame size={20} className="text-amber-500" />
          <div className="text-right">
            <span className="text-[10px] text-amber-700 dark:text-amber-400 font-arabic block">أيام التتابع</span>
            <span className="text-xl font-bold text-amber-900 dark:text-amber-200 font-sans">7</span>
            <span className="text-xs text-amber-700 font-arabic mr-1">يوماً 🔥</span>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {SUMMARY_STATS.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white dark:bg-[#121E1A] rounded-3xl p-5 border border-stone-200/80 dark:border-emerald-900/40 shadow-sm flex flex-col gap-3">
              <div className={`w-11 h-11 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                <Icon size={20} />
              </div>
              <div>
                <p className="text-[10px] text-stone-400 font-arabic">{stat.labelAr}</p>
                <p className="text-2xl font-bold text-stone-900 dark:text-stone-100 font-sans" dir="ltr">{stat.value}</p>
                <p className="text-[10px] text-stone-500 font-arabic">{stat.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Weekly Activity Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-[#121E1A] rounded-3xl p-6 border border-stone-200/80 dark:border-emerald-900/40 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-sm font-bold font-arabic text-stone-900 dark:text-stone-100">النشاط الأسبوعي</h2>
              <p className="text-[10px] text-stone-400 font-arabic">آخر 7 أيام</p>
            </div>
            <div className="flex gap-1 p-1 bg-stone-100 dark:bg-emerald-950/40 rounded-xl">
              <button
                onClick={() => setActiveChart('ayahs')}
                className={`px-3 py-1 rounded-lg text-[10px] font-bold font-arabic transition ${activeChart === 'ayahs' ? 'bg-white dark:bg-[#0F1A15] shadow text-emerald-600' : 'text-stone-400'}`}
              >
                آيات
              </button>
              <button
                onClick={() => setActiveChart('minutes')}
                className={`px-3 py-1 rounded-lg text-[10px] font-bold font-arabic transition ${activeChart === 'minutes' ? 'bg-white dark:bg-[#0F1A15] shadow text-emerald-600' : 'text-stone-400'}`}
              >
                دقائق
              </button>
            </div>
          </div>

          <div className="flex items-end justify-between gap-2 h-36">
            {MOCK_WEEKLY.map((day, i) => {
              const val = activeChart === 'ayahs' ? day.ayahs : day.minutes;
              const maxVal = activeChart === 'ayahs' ? maxAyahs : Math.max(...MOCK_WEEKLY.map(d => d.minutes));
              const heightPct = maxVal > 0 ? (val / maxVal) * 100 : 0;
              const isToday = i === new Date().getDay();
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[9px] font-bold font-sans text-stone-500" dir="ltr">{val}</span>
                  <div className="w-full flex items-end" style={{ height: '100px' }}>
                    <div
                      className={`w-full rounded-t-xl transition-all duration-500 ${
                        isToday
                          ? 'bg-gradient-to-t from-emerald-600 to-teal-500 shadow-lg shadow-emerald-500/20'
                          : 'bg-stone-200 dark:bg-emerald-950/50'
                      }`}
                      style={{ height: `${Math.max(4, heightPct)}%` }}
                    />
                  </div>
                  <span className={`text-[9px] font-arabic ${isToday ? 'text-emerald-600 font-bold' : 'text-stone-400'}`}>{day.day.slice(0, 2)}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Surah Progress */}
        <div className="bg-white dark:bg-[#121E1A] rounded-3xl p-6 border border-stone-200/80 dark:border-emerald-900/40 shadow-sm">
          <h2 className="text-sm font-bold font-arabic text-stone-900 dark:text-stone-100 mb-5">تقدم السور الرئيسية</h2>
          <div className="space-y-4">
            {SURAH_PROGRESS.map((surah, i) => (
              <div key={i}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-arabic font-bold text-stone-700 dark:text-stone-300">سورة {surah.nameAr}</span>
                  <div className="flex gap-3">
                    <span className="text-[10px] font-bold font-sans text-emerald-600 dark:text-emerald-400">{surah.pct}%</span>
                  </div>
                </div>
                <div className="h-2 bg-stone-100 dark:bg-emerald-950/50 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-l from-emerald-500 to-teal-500 transition-all duration-700"
                    style={{ width: `${surah.pct}%` }}
                  />
                </div>
                <div className="flex justify-between mt-0.5">
                  <span className="text-[9px] text-stone-400 font-arabic">الحفظ</span>
                  <span className="text-[9px] text-stone-400 font-arabic">مسابقة: {surah.quizPct}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="bg-white dark:bg-[#121E1A] rounded-3xl p-6 border border-stone-200/80 dark:border-emerald-900/40 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-sm font-bold font-arabic text-stone-900 dark:text-stone-100">الإنجازات والشارات</h2>
            <p className="text-[10px] text-stone-400 font-arabic">حصلت على {BADGES.filter(b => b.earned).length} من {BADGES.length} شارة</p>
          </div>
          <Award size={20} className="text-amber-500" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {BADGES.map((badge, i) => (
            <div
              key={i}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl border text-center transition-all ${
                badge.earned
                  ? 'border-amber-200 dark:border-amber-800/60 bg-amber-50 dark:bg-amber-950/30'
                  : 'border-stone-200/80 dark:border-emerald-900/30 bg-stone-50 dark:bg-[#0E1715] opacity-50 grayscale'
              }`}
            >
              <span className="text-3xl">{badge.icon}</span>
              <div>
                <p className="text-[10px] font-bold font-arabic text-stone-800 dark:text-stone-200">{badge.nameAr}</p>
                <p className="text-[9px] text-stone-400 font-arabic leading-tight mt-0.5">{badge.descAr}</p>
              </div>
              {badge.earned && <CheckCircle2 size={14} className="text-amber-500" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
