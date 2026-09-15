import React, { useState } from 'react';
import { BookOpen, ChevronLeft, Layers, CheckCircle2 } from 'lucide-react';
import { QURAN_PARTS_30 } from '../data/quranParts';
import { SURAHS_INDEX } from '../data/quranData';

// Mock memorization progress per juz
const JUZ_MEMORIZED = {
  1: 45, 2: 20, 3: 10, 4: 5, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0,
  11: 0, 12: 0, 13: 0, 14: 0, 15: 0, 16: 0, 17: 0, 18: 0, 19: 0, 20: 0,
  21: 0, 22: 0, 23: 0, 24: 0, 25: 0, 26: 0, 27: 0, 28: 0, 29: 100, 30: 100
};

const getJuzColor = (pct) => {
  if (pct === 100) return 'from-emerald-600 to-teal-600 text-white';
  if (pct >= 50) return 'from-amber-500 to-orange-500 text-white';
  if (pct > 0) return 'from-blue-500 to-indigo-500 text-white';
  return '';
};

const getJuzBg = (pct) => {
  if (pct === 100) return 'bg-gradient-to-br from-emerald-600 to-teal-700';
  if (pct >= 50) return 'bg-gradient-to-br from-amber-500 to-orange-600';
  if (pct > 0) return 'bg-gradient-to-br from-blue-500 to-indigo-600';
  return 'bg-stone-100 dark:bg-emerald-950/30';
};

export default function JuzNavigator({ setView, setActiveSurahId, setCurrentAyahNumber }) {
  const [selectedJuz, setSelectedJuz] = useState(null);

  const overallProgress = Math.round(
    Object.values(JUZ_MEMORIZED).reduce((a, b) => a + b, 0) / 30
  );

  const selectedPart = selectedJuz ? QURAN_PARTS_30.find(p => p.juz === selectedJuz) : null;
  const juzSurahs = selectedPart
    ? SURAHS_INDEX.filter(s => s.juz === selectedJuz)
    : [];

  return (
    <div className="max-w-6xl mx-auto w-full px-4 lg:px-8 py-6 space-y-6" dir="rtl">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200/80 dark:border-emerald-900/40">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 px-3 py-1 rounded-full text-xs font-bold font-arabic mb-2">
            <Layers size={14} />
            <span>أجزاء القرآن الكريم</span>
            <span className="font-sans text-[10px]" dir="ltr">30 Juz Navigator</span>
          </div>
          <h1 className="text-2xl font-bold font-arabic text-stone-900 dark:text-stone-100">متصفح الأجزاء الثلاثين</h1>
          <p className="text-xs text-stone-500 dark:text-stone-400 font-arabic mt-1">
            تصفح وتنقل بين الأجزاء الثلاثين للقرآن الكريم وتتبع نسبة حفظك في كل جزء.
          </p>
        </div>

        {/* Overall Progress */}
        <div className="bg-white dark:bg-[#121E1A] rounded-3xl p-4 border border-stone-200/80 dark:border-emerald-900/40 shadow-sm min-w-[160px]">
          <p className="text-[10px] text-stone-400 font-arabic mb-2">التقدم الإجمالي</p>
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12">
              <svg viewBox="0 0 100 100" className="w-12 h-12 -rotate-90">
                <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="10" className="text-stone-100 dark:text-emerald-950/50" />
                <circle
                  cx="50" cy="50" r="38" fill="none"
                  stroke="url(#grad)" strokeWidth="10"
                  strokeDasharray={`${2 * Math.PI * 38}`}
                  strokeDashoffset={`${2 * Math.PI * 38 * (1 - overallProgress / 100)}`}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#0D9488" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[10px] font-bold text-stone-900 dark:text-stone-100">{overallProgress}%</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-bold font-arabic text-stone-900 dark:text-stone-100">{overallProgress}%</p>
              <p className="text-[10px] text-stone-400 font-arabic">محفوظ</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* 30 Juz Grid */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-5 sm:grid-cols-6 gap-2">
            {QURAN_PARTS_30.map(part => {
              const pct = JUZ_MEMORIZED[part.juz] || 0;
              const isSelected = selectedJuz === part.juz;
              const isDone = pct === 100;

              return (
                <button
                  key={part.juz}
                  onClick={() => setSelectedJuz(isSelected ? null : part.juz)}
                  className={`relative aspect-square rounded-2xl flex flex-col items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-sm ${
                    pct > 0
                      ? getJuzBg(pct)
                      : 'bg-stone-100 dark:bg-emerald-950/30 border border-stone-200/80 dark:border-emerald-900/30'
                  } ${isSelected ? 'ring-2 ring-offset-2 ring-emerald-500 scale-105' : ''}`}
                >
                  <span className={`text-lg font-bold font-sans ${pct > 0 ? 'text-white' : 'text-stone-600 dark:text-stone-400'}`}>
                    {part.juz}
                  </span>
                  {isDone && (
                    <CheckCircle2 size={12} className="text-white/80 absolute top-1.5 left-1.5" />
                  )}
                  {pct > 0 && pct < 100 && (
                    <div className="absolute bottom-1 left-1 right-1 h-1 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-white/60 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-3 mt-4 text-[10px] font-arabic text-stone-500">
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded bg-gradient-to-br from-emerald-600 to-teal-700" />
              <span>محفوظ بالكامل</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded bg-gradient-to-br from-amber-500 to-orange-600" />
              <span>حفظ جزئي (50%+)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded bg-gradient-to-br from-blue-500 to-indigo-600" />
              <span>بدأ الحفظ</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded bg-stone-200 dark:bg-emerald-950/50 border border-stone-300" />
              <span>لم يبدأ</span>
            </div>
          </div>
        </div>

        {/* Juz Details Panel */}
        <div>
          {selectedPart ? (
            <div className="bg-white dark:bg-[#121E1A] rounded-3xl border border-stone-200/80 dark:border-emerald-900/40 shadow-sm overflow-hidden">
              {/* Juz Header */}
              <div className={`p-5 ${getJuzBg(JUZ_MEMORIZED[selectedJuz] || 0)} text-white`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-arabic opacity-80">الجزء</span>
                  <span className="text-3xl font-bold font-sans">{selectedPart.juz}</span>
                </div>
                <p className="text-sm font-bold font-arabic opacity-90">
                  {selectedPart.nameAr}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[10px] opacity-75 font-arabic">
                    من {selectedPart.startSurahName} — إلى {selectedPart.endSurahName}
                  </span>
                  <span className="text-sm font-bold font-sans">{JUZ_MEMORIZED[selectedJuz] || 0}%</span>
                </div>
                <div className="mt-2 h-1.5 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white/70 rounded-full"
                    style={{ width: `${JUZ_MEMORIZED[selectedJuz] || 0}%` }}
                  />
                </div>
              </div>

              {/* Surahs in this Juz */}
              <div className="p-4">
                <p className="text-[10px] font-bold text-stone-400 font-arabic mb-3">
                  سور هذا الجزء ({juzSurahs.length})
                </p>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {juzSurahs.map(s => (
                    <button
                      key={s.number}
                      onClick={() => {
                        if (setActiveSurahId) setActiveSurahId(s.number);
                        if (setCurrentAyahNumber) setCurrentAyahNumber(1);
                        if (setView) setView('mushaf');
                      }}
                      className="w-full flex items-center justify-between p-3 rounded-2xl bg-stone-50 dark:bg-emerald-950/30 hover:bg-stone-100 dark:hover:bg-emerald-950/50 transition-colors border border-stone-200/60 dark:border-emerald-900/30"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-xl bg-indigo-100 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 flex items-center justify-center text-[10px] font-bold font-sans">
                          {s.number}
                        </span>
                        <span className="text-xs font-bold font-arabic text-stone-800 dark:text-stone-200">سورة {s.arabic}</span>
                      </div>
                      <ChevronLeft size={14} className="text-stone-400" />
                    </button>
                  ))}

                  {juzSurahs.length === 0 && (
                    <button
                      onClick={() => {
                        if (setActiveSurahId) setActiveSurahId(selectedPart.startSurahId);
                        if (setCurrentAyahNumber) setCurrentAyahNumber(selectedPart.startAyah);
                        if (setView) setView('mushaf');
                      }}
                      className="w-full flex items-center justify-between p-3 rounded-2xl bg-stone-50 dark:bg-emerald-950/30 hover:bg-stone-100 dark:hover:bg-emerald-950/50 transition-colors border border-stone-200/60 dark:border-emerald-900/30"
                    >
                      <span className="text-xs font-bold font-arabic text-stone-800 dark:text-stone-200">
                        سورة {selectedPart.startSurahName}
                      </span>
                      <ChevronLeft size={14} className="text-stone-400" />
                    </button>
                  )}
                </div>

                <button
                  onClick={() => {
                    if (setActiveSurahId) setActiveSurahId(selectedPart.startSurahId);
                    if (setCurrentAyahNumber) setCurrentAyahNumber(selectedPart.startAyah);
                    if (setView) setView('mushaf');
                  }}
                  className="w-full mt-3 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold font-arabic flex items-center justify-center gap-2 transition-colors"
                >
                  <BookOpen size={14} />
                  <span>افتح هذا الجزء في المصحف</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-[#121E1A] rounded-3xl border border-stone-200/80 dark:border-emerald-900/40 shadow-sm p-8 flex flex-col items-center justify-center text-center min-h-[300px]">
              <Layers size={40} className="text-stone-300 dark:text-stone-600 mb-4" />
              <p className="font-bold font-arabic text-stone-500 dark:text-stone-400 mb-1">اختر جزءاً</p>
              <p className="text-xs text-stone-400 font-arabic">اضغط على أي جزء لعرض تفاصيله وسوره</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
