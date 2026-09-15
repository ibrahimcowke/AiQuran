import React, { useState, useEffect } from 'react';
import {
  Moon, Sun, Sunrise, Sunset, Check, Target, Flame,
  Plus, Minus, CalendarCheck, Star, RotateCcw, Bell, ChevronLeft
} from 'lucide-react';

const WIRD_SESSIONS = [
  { id: 'fajr', nameAr: 'ورد الفجر', timeAr: 'بعد صلاة الفجر', icon: Sunrise, color: 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300', accentBorder: 'border-indigo-300 dark:border-indigo-700' },
  { id: 'duha', nameAr: 'ورد الضحى', timeAr: 'وقت الضحى', icon: Sun, color: 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300', accentBorder: 'border-amber-300 dark:border-amber-700' },
  { id: 'asr', nameAr: 'ورد العصر', timeAr: 'بعد صلاة العصر', icon: Sun, color: 'bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300', accentBorder: 'border-orange-300 dark:border-orange-700' },
  { id: 'maghrib', nameAr: 'ورد المغرب', timeAr: 'بعد صلاة المغرب', icon: Sunset, color: 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300', accentBorder: 'border-rose-300 dark:border-rose-700' },
  { id: 'isha', nameAr: 'ورد العشاء', timeAr: 'بعد صلاة العشاء', icon: Moon, color: 'bg-violet-100 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300', accentBorder: 'border-violet-300 dark:border-violet-700' },
];

const WEEKLY_SURAHS = [
  { day: 'الأحد', nameAr: 'الكهف', num: 18 },
  { day: 'الاثنين', nameAr: 'يس', num: 36 },
  { day: 'الثلاثاء', nameAr: 'الملك', num: 67 },
  { day: 'الأربعاء', nameAr: 'الواقعة', num: 56 },
  { day: 'الخميس', nameAr: 'الرحمن', num: 55 },
  { day: 'الجمعة', nameAr: 'الدخان', num: 44 },
  { day: 'السبت', nameAr: 'الإنسان', num: 76 },
];

function getToday() {
  return new Date().toISOString().split('T')[0];
}

export default function WirdPlanner({ setView, setActiveSurahId }) {
  const [todayGoal, setTodayGoal] = useState(() => {
    try { return Number(localStorage.getItem('aiquran_wird_goal') || 5); } catch { return 5; }
  });

  const [completedSessions, setCompletedSessions] = useState(() => {
    try {
      const saved = localStorage.getItem(`aiquran_wird_${getToday()}`);
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const [ayahsReadToday, setAyahsReadToday] = useState(() => {
    try { return Number(localStorage.getItem(`aiquran_ayahs_${getToday()}`) || 0); } catch { return 0; }
  });

  const [streakDays, setStreakDays] = useState(() => {
    try { return Number(localStorage.getItem('aiquran_streak') || 7); } catch { return 7; }
  });

  const toggleSession = (sessionId) => {
    setCompletedSessions(prev => {
      const next = prev.includes(sessionId) ? prev.filter(s => s !== sessionId) : [...prev, sessionId];
      localStorage.setItem(`aiquran_wird_${getToday()}`, JSON.stringify(next));
      return next;
    });
  };

  const addAyahs = (n) => {
    setAyahsReadToday(prev => {
      const next = Math.max(0, prev + n);
      localStorage.setItem(`aiquran_ayahs_${getToday()}`, String(next));
      return next;
    });
  };

  const completedCount = completedSessions.length;
  const progressPct = Math.min(100, (completedCount / WIRD_SESSIONS.length) * 100);
  const ayahProgressPct = Math.min(100, (ayahsReadToday / todayGoal) * 100);
  const todayDay = WEEKLY_SURAHS[new Date().getDay()];

  return (
    <div className="max-w-5xl mx-auto w-full px-4 lg:px-8 py-6 space-y-6" dir="rtl">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200/80 dark:border-emerald-900/40">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-violet-100 dark:bg-violet-950/60 text-violet-800 dark:text-violet-300 px-3 py-1 rounded-full text-xs font-bold font-arabic mb-2">
            <CalendarCheck size={14} />
            <span>ورد الذكر والتلاوة</span>
            <span className="font-sans text-[10px]" dir="ltr">Daily Wird Planner</span>
          </div>
          <h1 className="text-2xl font-bold font-arabic text-stone-900 dark:text-stone-100">مخطط الورد اليومي</h1>
          <p className="text-xs text-stone-500 dark:text-stone-400 font-arabic mt-1">
            نظّم أورادك اليومية وتابع التزامك بتلاوة القرآن الكريم في أوقاتها المثلى.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 px-4 py-2.5 rounded-2xl">
          <Flame size={20} className="text-amber-500" />
          <div className="text-right">
            <span className="text-[10px] text-amber-700 dark:text-amber-400 font-arabic block">تتابع الالتزام</span>
            <span className="text-xl font-bold font-sans text-amber-900 dark:text-amber-200">{streakDays}</span>
            <span className="text-xs text-amber-700 dark:text-amber-400 font-arabic mr-1">يوماً</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Column */}
        <div className="space-y-4">

          {/* Today's Summary Card */}
          <div className="bg-gradient-to-br from-violet-800 via-indigo-900 to-violet-950 rounded-3xl p-5 text-white relative overflow-hidden">
            <div className="absolute -top-8 -left-8 w-40 h-40 bg-white/5 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-arabic text-violet-200">إجمالي أورداد اليوم</span>
                <CalendarCheck size={18} className="text-violet-300" />
              </div>

              {/* Circular Progress */}
              <div className="flex items-center justify-center mb-4">
                <div className="relative w-24 h-24">
                  <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                    <circle
                      cx="50" cy="50" r="40" fill="none"
                      stroke="rgba(167,139,250,0.9)" strokeWidth="8"
                      strokeDasharray={`${2 * Math.PI * 40}`}
                      strokeDashoffset={`${2 * Math.PI * 40 * (1 - progressPct / 100)}`}
                      strokeLinecap="round"
                      className="transition-all duration-700"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold">{completedCount}</span>
                    <span className="text-[10px] text-violet-300">/ {WIRD_SESSIONS.length}</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm font-bold font-arabic text-white">
                  {completedCount === WIRD_SESSIONS.length ? '🎉 أتممت جميع أورادك اليوم!' :
                   completedCount === 0 ? 'لم تبدأ أورادك بعد' :
                   `أكملت ${completedCount} من ${WIRD_SESSIONS.length} أوراد`}
                </p>
              </div>
            </div>
          </div>

          {/* Daily Ayah Goal */}
          <div className="bg-white dark:bg-[#121E1A] rounded-3xl p-5 border border-stone-200/80 dark:border-emerald-900/40 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Target size={16} className="text-emerald-600" />
                <h3 className="text-sm font-bold font-arabic text-stone-900 dark:text-stone-100">هدف الآيات اليومي</h3>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => {
                  const next = Math.max(1, todayGoal - 1);
                  setTodayGoal(next);
                  localStorage.setItem('aiquran_wird_goal', String(next));
                }} className="w-7 h-7 rounded-full bg-stone-100 dark:bg-emerald-950/50 flex items-center justify-center text-stone-600 dark:text-stone-300 hover:bg-stone-200 transition">
                  <Minus size={12} />
                </button>
                <span className="text-base font-bold font-sans w-8 text-center text-stone-900 dark:text-stone-100">{todayGoal}</span>
                <button onClick={() => {
                  const next = todayGoal + 1;
                  setTodayGoal(next);
                  localStorage.setItem('aiquran_wird_goal', String(next));
                }} className="w-7 h-7 rounded-full bg-stone-100 dark:bg-emerald-950/50 flex items-center justify-center text-stone-600 dark:text-stone-300 hover:bg-stone-200 transition">
                  <Plus size={12} />
                </button>
              </div>
            </div>

            <div className="h-2 bg-stone-100 dark:bg-emerald-950/50 rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-gradient-to-l from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
                style={{ width: `${ayahProgressPct}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] font-arabic text-stone-500 mb-3">
              <span>قرأت {ayahsReadToday} آية</span>
              <span>الهدف: {todayGoal} آية</span>
            </div>

            <div className="flex gap-2">
              {[1, 5, 10].map(n => (
                <button
                  key={n}
                  onClick={() => addAyahs(n)}
                  className="flex-1 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold font-sans hover:bg-emerald-100 transition"
                  dir="ltr"
                >
                  +{n}
                </button>
              ))}
              <button
                onClick={() => addAyahs(-ayahsReadToday)}
                className="p-2 rounded-xl bg-stone-100 dark:bg-emerald-950/30 text-stone-400 hover:bg-stone-200 transition"
              >
                <RotateCcw size={13} />
              </button>
            </div>
          </div>

          {/* Today's Recommended Surah */}
          <div className="bg-white dark:bg-[#121E1A] rounded-3xl p-5 border border-stone-200/80 dark:border-emerald-900/40 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Star size={16} className="text-amber-500 fill-amber-500" />
              <h3 className="text-sm font-bold font-arabic text-stone-900 dark:text-stone-100">سورة اليوم المستحبة</h3>
            </div>
            <div className="bg-amber-50 dark:bg-amber-950/30 rounded-2xl p-4 border border-amber-100 dark:border-amber-900/30">
              <p className="text-xs text-amber-700 dark:text-amber-400 font-arabic mb-1">{todayDay.day}</p>
              <p className="text-xl font-bold font-arabic text-amber-900 dark:text-amber-200" style={{ fontFamily: 'Amiri, serif' }}>
                سورة {todayDay.nameAr}
              </p>
            </div>
            <button
              onClick={() => {
                if (setActiveSurahId) setActiveSurahId(todayDay.num);
                if (setView) setView('mushaf');
              }}
              className="w-full mt-3 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold font-arabic flex items-center justify-center gap-2 transition"
            >
              <span>اقرأ الآن</span>
              <ChevronLeft size={14} />
            </button>
          </div>
        </div>

        {/* Right: Sessions List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-base font-bold font-arabic text-stone-900 dark:text-stone-100">أوراد اليوم الخمسة</h2>

          <div className="space-y-3">
            {WIRD_SESSIONS.map(session => {
              const Icon = session.icon;
              const isDone = completedSessions.includes(session.id);
              return (
                <div
                  key={session.id}
                  className={`bg-white dark:bg-[#121E1A] rounded-3xl p-5 border transition-all shadow-sm ${
                    isDone
                      ? 'border-emerald-400 dark:border-emerald-600 ring-1 ring-emerald-400/30'
                      : 'border-stone-200/80 dark:border-emerald-900/40 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl ${session.color} flex items-center justify-center shrink-0`}>
                        <Icon size={22} />
                      </div>
                      <div>
                        <h3 className="font-bold text-base font-arabic text-stone-900 dark:text-stone-100">{session.nameAr}</h3>
                        <p className="text-xs text-stone-400 font-arabic">{session.timeAr}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleSession(session.id)}
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all shadow-sm ${
                        isDone
                          ? 'bg-emerald-500 text-white scale-105'
                          : 'border-2 border-stone-200 dark:border-emerald-900/50 text-stone-300 hover:border-emerald-400'
                      }`}
                    >
                      {isDone && <Check size={18} />}
                    </button>
                  </div>

                  {isDone && (
                    <div className="mt-3 pt-3 border-t border-emerald-100 dark:border-emerald-900/30 flex items-center gap-2">
                      <Check size={13} className="text-emerald-500" />
                      <span className="text-xs text-emerald-600 dark:text-emerald-400 font-arabic">تم الانتهاء من هذا الورد ✓</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Weekly Schedule */}
          <div className="bg-white dark:bg-[#121E1A] rounded-3xl p-5 border border-stone-200/80 dark:border-emerald-900/40 shadow-sm">
            <h3 className="text-sm font-bold font-arabic text-stone-900 dark:text-stone-100 mb-4">
              السور المستحبة بحسب أيام الأسبوع
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {WEEKLY_SURAHS.map((item, idx) => {
                const isToday = idx === new Date().getDay();
                return (
                  <button
                    key={item.day}
                    onClick={() => {
                      if (setActiveSurahId) setActiveSurahId(item.num);
                      if (setView) setView('mushaf');
                    }}
                    className={`p-3 rounded-2xl text-center transition-all ${
                      isToday
                        ? 'bg-gradient-to-b from-violet-600 to-indigo-700 text-white shadow-md'
                        : 'bg-stone-50 dark:bg-emerald-950/30 hover:bg-stone-100 dark:hover:bg-emerald-950/50 border border-stone-200/80 dark:border-emerald-900/30'
                    }`}
                  >
                    <p className={`text-[10px] font-arabic mb-1 ${isToday ? 'text-violet-200' : 'text-stone-400'}`}>{item.day}</p>
                    <p className={`text-sm font-bold font-arabic ${isToday ? 'text-white' : 'text-stone-800 dark:text-stone-200'}`}>{item.nameAr}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
