import React, { useState, useEffect } from 'react';
import { 
  Award, History, CheckCircle2, AlertCircle, Calendar, 
  RotateCcw, Sparkles, ChevronLeft, Eye, EyeOff, BookOpen, Clock,
  Flame, CheckSquare, Target, Compass, BarChart3
} from 'lucide-react';
import { HIFZ_DUE_ITEMS, SURAH_DETAILS } from '../data/quranData';

export default function HifzPlanner({ setView, setActiveSurahId }) {
  const [dueItems, setDueItems] = useState(HIFZ_DUE_ITEMS);
  const [activeTestItem, setActiveTestItem] = useState(null);
  const [isVerseRevealed, setIsVerseRevealed] = useState(false);
  const [testResultFeedback, setTestResultFeedback] = useState(null);

  // 30 Juz Memorization State
  const [juzProgress, setJuzProgress] = useState(() => {
    try {
      const saved = localStorage.getItem('aiquran_juz_progress');
      if (saved) return JSON.parse(saved);
    } catch {}
    // default demo data: Juz 1, 29, 30 are completed, some in progress
    const initial = {};
    for (let i = 1; i <= 30; i++) {
      if (i === 1 || i === 29 || i === 30) initial[i] = 100;
      else if (i === 2) initial[i] = 60;
      else if (i === 3) initial[i] = 30;
      else initial[i] = 0;
    }
    return initial;
  });

  // Khatmah Planner State
  const [targetDays, setTargetDays] = useState(30);
  const [completedPagesToday, setCompletedPagesToday] = useState(0);

  const saveJuzProgress = (juzNum, newPercent) => {
    const updated = { ...juzProgress, [juzNum]: newPercent };
    setJuzProgress(updated);
    try {
      localStorage.setItem('aiquran_juz_progress', JSON.stringify(updated));
    } catch (e) {
      console.warn(e);
    }
  };

  const handleStartReview = (item) => {
    setActiveTestItem(item);
    setIsVerseRevealed(false);
    setTestResultFeedback(null);
  };

  const handleRateRetention = (rating) => {
    setTestResultFeedback(`تم تحديث جدول التكرار المتباعد بنجاح! التقييم: ${rating === 'easy' ? 'ممتاز (المراجعة بعد 14 يوماً)' : rating === 'good' ? 'جيد (المراجعة بعد 5 أيام)' : 'يحتاج تثبيت (المراجعة غداً)'}`);
    
    setDueItems(prev => prev.map(it => it.id === activeTestItem.id ? { ...it, status: 'reviewed' } : it));

    setTimeout(() => {
      setActiveTestItem(null);
      setTestResultFeedback(null);
    }, 2000);
  };

  const testSurah = activeTestItem ? SURAH_DETAILS[activeTestItem.surahNumber] : null;

  // Khatmah calculations
  const totalMushafPages = 604;
  const pagesPerDay = Math.ceil(totalMushafPages / targetDays);
  const pagesPerPrayer = Math.ceil(pagesPerDay / 5);

  const completedAjzaCount = Object.values(juzProgress).filter(p => p === 100).length;
  const overallPercentage = Math.round(Object.values(juzProgress).reduce((a, b) => a + b, 0) / 30);

  return (
    <div className="max-w-6xl mx-auto w-full px-4 lg:px-8 py-6 space-y-8" dir="rtl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200/80 dark:border-emerald-900/40">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 px-3 py-1 rounded-full text-xs font-bold font-arabic mb-2">
            <Sparkles size={14} className="text-amber-600 dark:text-amber-400" />
            <span>نظام التكرار المتباعد الذكي وخريطة المصحف</span>
          </div>
          <h1 className="text-2xl font-bold font-arabic text-stone-900 dark:text-stone-100">
            مخطط الحفظ والمراجعة الذكية
          </h1>
          <p className="text-xs text-stone-500 dark:text-stone-400 font-arabic mt-1">
            متابعة إتقان الـ 30 جزءاً، حساب وتيرة الختمات، وخوارزمية التكرار المتباعد لتثبيت المحفوظ.
          </p>
        </div>

        {/* Stats Summary Pills */}
        <div className="flex gap-2">
          <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-900/40 text-center">
            <span className="text-[10px] text-stone-500 dark:text-stone-400 font-arabic block">أجزاء مكتملة</span>
            <span className="font-bold text-sm text-emerald-800 dark:text-emerald-300 font-sans" dir="ltr">{completedAjzaCount} / 30</span>
          </div>
          <div className="p-3 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200/80 dark:border-teal-900/40 text-center">
            <span className="text-[10px] text-stone-500 dark:text-stone-400 font-arabic block">نسبة الإتقان الكلي</span>
            <span className="font-bold text-sm text-teal-800 dark:text-teal-300 font-sans" dir="ltr">{overallPercentage}%</span>
          </div>
        </div>
      </div>

      {/* 30-JUZ VISUAL HEATMAP GRID */}
      <div className="bg-white dark:bg-[#121E1A] p-6 rounded-3xl border border-stone-200/80 dark:border-emerald-900/50 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2">
            <BarChart3 className="text-emerald-600 dark:text-emerald-400 w-5 h-5" />
            <div>
              <h2 className="font-bold text-base text-stone-900 dark:text-stone-100 font-arabic">
                خريطة حفظ أجزاء القرآن الكريم (30 جزءاً)
              </h2>
              <p className="text-xs text-stone-400 font-arabic">
                انقر على أي جزء لتعديل نسبة الحفظ والإتقان
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-arabic">
            <span className="flex items-center gap-1 text-stone-500">
              <span className="w-3 h-3 rounded bg-stone-100 dark:bg-emerald-950/60 border border-stone-300 dark:border-emerald-900" />
              لم يبدأ
            </span>
            <span className="flex items-center gap-1 text-teal-600">
              <span className="w-3 h-3 rounded bg-teal-400" />
              قيد الحفظ
            </span>
            <span className="flex items-center gap-1 text-emerald-600 font-bold">
              <span className="w-3 h-3 rounded bg-emerald-600" />
              متقن (100%)
            </span>
          </div>
        </div>

        {/* The 30 Juz Grid */}
        <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-2.5">
          {Array.from({ length: 30 }, (_, i) => i + 1).map((juzNum) => {
            const pct = juzProgress[juzNum] || 0;
            const isCompleted = pct === 100;
            const isStarted = pct > 0 && pct < 100;

            return (
              <div
                key={juzNum}
                onClick={() => {
                  const nextPct = isCompleted ? 0 : isStarted ? 100 : 50;
                  saveJuzProgress(juzNum, nextPct);
                }}
                className={`p-2.5 rounded-2xl border text-center cursor-pointer transition-all hover:scale-105 select-none ${
                  isCompleted
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-700/20'
                    : isStarted
                    ? 'bg-teal-100 dark:bg-teal-950/60 text-teal-900 dark:text-teal-200 border-teal-300 dark:border-teal-800'
                    : 'bg-stone-50 dark:bg-[#0E1715] text-stone-600 dark:text-stone-400 border-stone-200 dark:border-emerald-950/60 hover:border-emerald-300'
                }`}
                title={`الجزء ${juzNum} - نسبة الحفظ: ${pct}% (انقر للتبديل)`}
              >
                <span className="text-[10px] font-sans font-bold block opacity-70">
                  JUZ {juzNum}
                </span>
                <span className="text-xs font-bold font-arabic block mt-0.5">
                  جزء {juzNum}
                </span>
                <span className={`text-[10px] font-sans font-bold block mt-1 ${isCompleted ? 'text-emerald-100' : 'text-stone-400'}`}>
                  {pct}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* KHATMAH PLANNER CALCULATOR */}
      <div className="bg-gradient-to-br from-emerald-900 via-teal-950 to-slate-900 text-white p-6 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-amber-300">
                <Target size={22} />
              </div>
              <div>
                <h2 className="text-lg font-bold font-arabic">
                  مساعد خطة ختم القرآن الكريم
                </h2>
                <p className="text-xs text-emerald-200/80 font-arabic">
                  احسب وِردك اليومي من صفحات المصحف الشريف (604 صفحات) بحسب هدفك الزمني
                </p>
              </div>
            </div>

            {/* Target Days selector */}
            <div className="flex items-center gap-1.5 bg-black/30 p-1 rounded-2xl text-xs font-arabic">
              {[
                { days: 15, label: '15 يوماً' },
                { days: 30, label: 'شهر (30 يوماً)' },
                { days: 60, label: 'شهران' },
                { days: 365, label: 'سنة' }
              ].map(opt => (
                <button
                  key={opt.days}
                  onClick={() => setTargetDays(opt.days)}
                  className={`px-3 py-1.5 rounded-xl transition ${
                    targetDays === opt.days 
                      ? 'bg-emerald-600 text-white font-bold shadow' 
                      : 'text-stone-300 hover:text-white'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-arabic">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-xs text-emerald-300 block mb-1">الورد اليومي المطلوب</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold font-sans">{pagesPerDay}</span>
                <span className="text-sm">صفحة يومياً</span>
              </div>
              <p className="text-[11px] text-stone-300 mt-2">
                يعادل تقريباً {Math.ceil(pagesPerDay / 20)} أجزاء يومياً.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-xs text-amber-300 block mb-1">تقسيم الصلوات الخمس</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold font-sans">{pagesPerPrayer}</span>
                <span className="text-sm">صفحات دبر كل صلاة</span>
              </div>
              <p className="text-[11px] text-stone-300 mt-2">
                (فجر، ظهر، عصر، مغرب، عشاء) لتسهيل الختمة دون مشقة.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
              <div>
                <span className="text-xs text-teal-300 block mb-1">إنجازك اليوم</span>
                <div className="flex items-center justify-between">
                  <span className="text-xs">المقروء: {completedPagesToday} / {pagesPerDay} صفحة</span>
                  <span className="text-xs font-bold font-sans">
                    {Math.min(100, Math.round((completedPagesToday / pagesPerDay) * 100))}%
                  </span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full mt-2 overflow-hidden">
                  <div 
                    className="h-full bg-emerald-400 rounded-full transition-all"
                    style={{ width: `${Math.min(100, (completedPagesToday / pagesPerDay) * 100)}%` }}
                  />
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => setCompletedPagesToday(prev => Math.min(pagesPerDay, prev + 2))}
                  className="flex-1 py-1 rounded-xl bg-emerald-600/80 hover:bg-emerald-600 text-xs font-bold transition"
                >
                  + قراءة صفحتين
                </button>
                <button
                  onClick={() => setCompletedPagesToday(0)}
                  className="px-3 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-stone-300"
                >
                  تصفير
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Review Modal */}
      {activeTestItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#121E1A] w-full max-w-xl rounded-3xl p-6 shadow-2xl border border-stone-200 dark:border-emerald-900/60 text-center animate-fade-in">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-100 dark:border-emerald-950/50">
              <span className="text-xs font-bold text-stone-400 font-sans" dir="ltr">Hifz Recall Test</span>
              <button
                onClick={() => setActiveTestItem(null)}
                className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 p-1"
              >
                ✕
              </button>
            </div>

            <h3 className="font-bold text-xl text-stone-900 dark:text-stone-100 font-arabic mb-1">
              مراجعة سورة {activeTestItem.surahNameAr}
            </h3>
            <p className="text-xs text-stone-400 font-arabic mb-6">
              اقرأ الآية غيباً من ذاكرتك أولاً، ثم اضغط لإظهار النص والتأكد من صحة الحفظ.
            </p>

            <div className="p-8 rounded-3xl bg-stone-50 dark:bg-[#0E1715] border border-stone-200/80 dark:border-emerald-900/40 mb-6 relative">
              {isVerseRevealed ? (
                <div>
                  <p className="font-arabic font-bold text-2xl text-stone-800 dark:text-stone-100 leading-loose" style={{ fontFamily: "Amiri, serif" }}>
                    {testSurah?.ayahs[0]?.arabic || "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ"}
                  </p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-sans mt-3" dir="ltr">
                    {testSurah?.ayahs[0]?.english}
                  </p>
                </div>
              ) : (
                <div className="py-6 flex flex-col items-center">
                  <div className="flex gap-2 mb-4">
                    <span className="w-12 h-3 bg-stone-300 dark:bg-emerald-950/80 rounded-full animate-pulse"></span>
                    <span className="w-20 h-3 bg-stone-300 dark:bg-emerald-950/80 rounded-full animate-pulse"></span>
                    <span className="w-16 h-3 bg-stone-300 dark:bg-emerald-950/80 rounded-full animate-pulse"></span>
                  </div>
                  <p className="text-sm font-bold font-arabic text-stone-400">
                    النص محجوب لاختبار الذاكرة
                  </p>
                </div>
              )}
            </div>

            {!isVerseRevealed ? (
              <button
                onClick={() => setIsVerseRevealed(true)}
                className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold font-arabic flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/20 active:scale-98 transition-all"
              >
                <Eye size={18} />
                <span>كشف الآية والتحقق</span>
              </button>
            ) : (
              <div className="space-y-4">
                <p className="text-xs font-bold text-stone-600 dark:text-stone-300 font-arabic">
                  كيف كان مستوى تذكرك للآية؟
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => handleRateRetention('hard')}
                    className="p-3 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 text-red-700 dark:text-red-300 text-xs font-bold font-arabic hover:bg-red-100"
                  >
                    صعب / نسيت
                    <span className="block text-[9px] font-sans opacity-70 mt-0.5">غداً</span>
                  </button>
                  <button
                    onClick={() => handleRateRetention('good')}
                    className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 text-amber-700 dark:text-amber-300 text-xs font-bold font-arabic hover:bg-amber-100"
                  >
                    جيد
                    <span className="block text-[9px] font-sans opacity-70 mt-0.5">بعد 5 أيام</span>
                  </button>
                  <button
                    onClick={() => handleRateRetention('easy')}
                    className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-emerald-700 dark:text-emerald-300 text-xs font-bold font-arabic hover:bg-emerald-100"
                  >
                    متقن وسهل
                    <span className="block text-[9px] font-sans opacity-70 mt-0.5">بعد 14 يوماً</span>
                  </button>
                </div>
              </div>
            )}

            {testResultFeedback && (
              <div className="mt-4 p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-arabic font-bold animate-fade-in">
                {testResultFeedback}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Review Queue Table / List */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 font-arabic flex items-center gap-2">
          <History size={18} className="text-emerald-600" />
          <span>جدول المراجعة والتثبيت بالتكرار المتباعد</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dueItems.map(item => {
            const isDue = item.status === 'due';
            return (
              <div
                key={item.id}
                className={`p-5 rounded-3xl border transition-all ${
                  isDue 
                    ? 'bg-white dark:bg-[#121E1A] border-amber-300 dark:border-amber-800/80 shadow-md shadow-amber-700/5' 
                    : 'bg-stone-50/80 dark:bg-[#0E1715] border-stone-200/80 dark:border-emerald-950/50 opacity-90'
                }`}
              >
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-100 dark:border-emerald-950/40">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 flex items-center justify-center text-xs font-bold font-sans">
                      {item.surahNumber}
                    </span>
                    <div>
                      <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100 font-arabic leading-tight">
                        سورة {item.surahNameAr}
                      </h4>
                      <span className="text-[10px] text-stone-400 font-arabic">
                        {item.ayahsRange}
                      </span>
                    </div>
                  </div>

                  <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold font-arabic ${
                    isDue 
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' 
                      : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                  }`}>
                    {isDue ? 'حان موعد المراجعة' : 'مجدولة'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                  <div className="p-2 rounded-xl bg-stone-100/80 dark:bg-emerald-950/30">
                    <span className="text-[10px] text-stone-400 font-arabic block">فترة التكرار</span>
                    <span className="font-bold text-stone-700 dark:text-stone-200 font-arabic">{item.interval}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-stone-100/80 dark:bg-emerald-950/30">
                    <span className="text-[10px] text-stone-400 font-arabic block">نسبة الدقة</span>
                    <span className="font-bold text-emerald-600 font-sans" dir="ltr">{item.accuracy}%</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleStartReview(item)}
                    className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold font-arabic flex items-center justify-center gap-1.5 shadow-sm active:scale-98 transition-all"
                  >
                    <RotateCcw size={14} />
                    <span>ابدأ اختبار الحفظ</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveSurahId(item.surahNumber);
                      setView('mushaf');
                    }}
                    className="p-2.5 rounded-xl bg-stone-100 dark:bg-emerald-950/50 text-stone-600 dark:text-stone-300 text-xs hover:bg-stone-200 transition-colors"
                    title="قراءة السورة بالمصحف"
                  >
                    <BookOpen size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
