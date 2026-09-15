import React, { useState, useEffect, useCallback } from 'react';
import {
  RotateCcw, Plus, ChevronLeft, ChevronRight,
  Settings2, Check, Sparkles, X, History
} from 'lucide-react';

const PRESET_DHIKR = [
  { id: 'subhan', arabic: 'سُبْحَانَ اللَّهِ', transliteration: 'SubhanAllah', defaultTarget: 33, color: 'from-emerald-600 to-teal-700' },
  { id: 'alhamdulillah', arabic: 'الْحَمْدُ لِلَّهِ', transliteration: 'Alhamdulillah', defaultTarget: 33, color: 'from-amber-600 to-orange-700' },
  { id: 'allahuakbar', arabic: 'اللَّهُ أَكْبَرُ', transliteration: 'Allahu Akbar', defaultTarget: 34, color: 'from-blue-600 to-indigo-700' },
  { id: 'astaghfirullah', arabic: 'أَسْتَغْفِرُ اللَّهَ', transliteration: 'Astaghfirullah', defaultTarget: 100, color: 'from-violet-600 to-purple-700' },
  { id: 'lailaha', arabic: 'لَا إِلَٰهَ إِلَّا اللَّهُ', transliteration: 'La ilaha illallah', defaultTarget: 100, color: 'from-rose-600 to-pink-700' },
  { id: 'salawat', arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ', transliteration: 'Salawat', defaultTarget: 100, color: 'from-teal-600 to-cyan-700' },
];

function getHistory() {
  try {
    const saved = localStorage.getItem('aiquran_dhikr_history');
    return saved ? JSON.parse(saved) : [];
  } catch { return []; }
}

function saveHistory(entry) {
  try {
    const history = getHistory();
    const updated = [entry, ...history].slice(0, 20);
    localStorage.setItem('aiquran_dhikr_history', JSON.stringify(updated));
  } catch {}
}

export default function DhikrCounter() {
  const [selectedDhikr, setSelectedDhikr] = useState(PRESET_DHIKR[0]);
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(33);
  const [customTarget, setCustomTarget] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory);
  const [completed, setCompleted] = useState(false);
  const [flash, setFlash] = useState(false);

  const handleCount = useCallback(() => {
    if (count >= target) return;
    setCount(c => {
      const next = c + 1;
      setFlash(true);
      setTimeout(() => setFlash(false), 150);
      if (next >= target) {
        setCompleted(true);
        const entry = {
          dhikr: selectedDhikr.arabic,
          count: next,
          target,
          date: new Date().toLocaleDateString('ar-SA'),
          time: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
        };
        saveHistory(entry);
        setHistory(getHistory());
      }
      return next;
    });
  }, [count, target, selectedDhikr]);

  const handleReset = () => {
    setCount(0);
    setCompleted(false);
  };

  const selectDhikr = (dhikr) => {
    setSelectedDhikr(dhikr);
    setTarget(dhikr.defaultTarget);
    setCount(0);
    setCompleted(false);
    setShowSettings(false);
  };

  const progressPct = target > 0 ? Math.min(100, (count / target) * 100) : 0;
  const radius = 80;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="max-w-4xl mx-auto w-full px-4 lg:px-8 py-6 space-y-6" dir="rtl">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200/80 dark:border-emerald-900/40">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 px-3 py-1 rounded-full text-xs font-bold font-arabic mb-2">
            <Sparkles size={14} />
            <span>المسبحة الرقمية</span>
            <span className="font-sans text-[10px]" dir="ltr">Dhikr Counter</span>
          </div>
          <h1 className="text-2xl font-bold font-arabic text-stone-900 dark:text-stone-100">عداد الذكر والتسبيح</h1>
          <p className="text-xs text-stone-500 dark:text-stone-400 font-arabic mt-1">
            احرص على ذكر الله في كل وقت. «أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ»
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => { setShowHistory(!showHistory); setShowSettings(false); }}
            className={`p-2.5 rounded-2xl border transition-all ${showHistory ? 'bg-stone-900 dark:bg-white text-white dark:text-stone-900 border-stone-900' : 'bg-white dark:bg-[#121E1A] border-stone-200/80 dark:border-emerald-900/40 text-stone-500'}`}
          >
            <History size={18} />
          </button>
          <button
            onClick={() => { setShowSettings(!showSettings); setShowHistory(false); }}
            className={`p-2.5 rounded-2xl border transition-all ${showSettings ? 'bg-stone-900 dark:bg-white text-white dark:text-stone-900 border-stone-900' : 'bg-white dark:bg-[#121E1A] border-stone-200/80 dark:border-emerald-900/40 text-stone-500'}`}
          >
            <Settings2 size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Main Counter */}
        <div className="lg:col-span-2 flex flex-col items-center gap-6">

          {/* Dhikr Selector */}
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-2">
            {PRESET_DHIKR.map(dhikr => (
              <button
                key={dhikr.id}
                onClick={() => selectDhikr(dhikr)}
                className={`p-3 rounded-2xl text-center text-xs font-bold font-arabic transition-all border ${
                  selectedDhikr.id === dhikr.id
                    ? `bg-gradient-to-br ${dhikr.color} text-white border-transparent shadow-md`
                    : 'bg-white dark:bg-[#121E1A] border-stone-200/80 dark:border-emerald-900/40 text-stone-700 dark:text-stone-300 hover:border-stone-300'
                }`}
              >
                <span className="block text-[11px] leading-tight" style={{ fontFamily: 'Amiri, serif' }}>
                  {dhikr.arabic.length > 15 ? dhikr.arabic.slice(0, 14) + '...' : dhikr.arabic}
                </span>
                <span className="text-[9px] opacity-70 mt-0.5 block">{dhikr.transliteration}</span>
              </button>
            ))}
          </div>

          {/* Circular Counter */}
          <div className="flex flex-col items-center gap-6">
            <button
              onClick={handleCount}
              disabled={completed}
              className={`relative w-52 h-52 rounded-full flex items-center justify-center transition-all select-none ${
                completed
                  ? 'cursor-not-allowed opacity-80'
                  : 'hover:scale-105 active:scale-95 cursor-pointer'
              } ${flash ? 'scale-105' : ''}`}
              aria-label="عد ذكر"
            >
              {/* Background ring */}
              <svg className="absolute inset-0 w-52 h-52 -rotate-90" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r={radius} fill="none" stroke="currentColor" strokeWidth="8"
                  className="text-stone-100 dark:text-emerald-950/50" />
                <circle
                  cx="100" cy="100" r={radius} fill="none"
                  className={`transition-all duration-300 ${completed ? 'text-emerald-500' : 'text-emerald-600'}`}
                  stroke="currentColor" strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference * (1 - progressPct / 100)}
                  strokeLinecap="round"
                />
              </svg>

              {/* Inner circle */}
              <div className={`w-40 h-40 rounded-full flex flex-col items-center justify-center bg-gradient-to-br transition-all ${selectedDhikr.color} shadow-xl`}>
                {completed ? (
                  <Check size={40} className="text-white" />
                ) : (
                  <>
                    <span className="text-5xl font-bold text-white font-sans">{count}</span>
                    <span className="text-white/70 text-[11px] font-arabic mt-1">من {target}</span>
                  </>
                )}
              </div>
            </button>

            {completed && (
              <div className="text-center">
                <p className="text-base font-bold font-arabic text-emerald-600 dark:text-emerald-400">
                  🎉 أتممت التسبيح! جزاك الله خيراً
                </p>
              </div>
            )}

            {/* Current Dhikr Text */}
            <div className="text-center px-4">
              <p className="text-2xl font-bold font-arabic text-stone-900 dark:text-stone-100" style={{ fontFamily: 'Amiri, serif' }}>
                {selectedDhikr.arabic}
              </p>
              <p className="text-xs text-stone-400 font-sans mt-1" dir="ltr">{selectedDhikr.transliteration}</p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCount(c => Math.max(0, c - 1))}
                className="p-3 rounded-2xl bg-stone-100 dark:bg-emerald-950/40 text-stone-600 dark:text-stone-300 hover:bg-stone-200 transition"
              >
                <ChevronRight size={18} />
              </button>
              <button
                onClick={handleReset}
                className="px-5 py-2.5 rounded-2xl bg-stone-100 dark:bg-emerald-950/40 text-stone-600 dark:text-stone-300 text-xs font-bold font-arabic flex items-center gap-2 hover:bg-stone-200 transition"
              >
                <RotateCcw size={14} />
                <span>إعادة</span>
              </button>
              <button
                onClick={handleCount}
                disabled={completed}
                className={`px-6 py-2.5 rounded-2xl text-white font-bold font-arabic text-sm flex items-center gap-2 shadow-md transition bg-gradient-to-r ${selectedDhikr.color} hover:opacity-90 disabled:opacity-50`}
              >
                <Plus size={16} />
                <span>سبّح</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel: Settings or History */}
        <div>
          {showSettings ? (
            <div className="bg-white dark:bg-[#121E1A] rounded-3xl p-5 border border-stone-200/80 dark:border-emerald-900/40 shadow-sm">
              <h3 className="font-bold text-sm font-arabic text-stone-900 dark:text-stone-100 mb-4">إعدادات العداد</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-arabic text-stone-500 mb-2">هدف العد المخصص</p>
                  <div className="flex gap-2">
                    {[33, 99, 100].map(n => (
                      <button
                        key={n}
                        onClick={() => { setTarget(n); setCount(0); setCompleted(false); }}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold font-sans border transition ${
                          target === n
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'border-stone-200 dark:border-emerald-900/40 text-stone-500'
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-2">
                    <input
                      type="number"
                      value={customTarget}
                      onChange={e => setCustomTarget(e.target.value)}
                      placeholder="عدد مخصص"
                      className="flex-1 px-3 py-2 rounded-xl bg-stone-100 dark:bg-emerald-950/40 text-xs font-arabic focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <button
                      onClick={() => {
                        const n = Number(customTarget);
                        if (n > 0) { setTarget(n); setCount(0); setCompleted(false); }
                      }}
                      className="px-3 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold"
                    >
                      <Check size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : showHistory ? (
            <div className="bg-white dark:bg-[#121E1A] rounded-3xl p-5 border border-stone-200/80 dark:border-emerald-900/40 shadow-sm">
              <h3 className="font-bold text-sm font-arabic text-stone-900 dark:text-stone-100 mb-4">سجل التسبيح</h3>
              {history.length === 0 ? (
                <p className="text-xs text-stone-400 font-arabic text-center py-8">لا يوجد سجل بعد</p>
              ) : (
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {history.map((entry, i) => (
                    <div key={i} className="p-3 rounded-2xl bg-stone-50 dark:bg-emerald-950/30 border border-stone-100 dark:border-emerald-900/30">
                      <p className="text-xs font-bold font-arabic text-stone-900 dark:text-stone-100" style={{ fontFamily: 'Amiri, serif' }}>
                        {entry.dhikr}
                      </p>
                      <div className="flex justify-between mt-1">
                        <span className="text-[10px] font-sans text-emerald-600 dark:text-emerald-400">{entry.count}/{entry.target}</span>
                        <span className="text-[10px] text-stone-400 font-arabic">{entry.date} {entry.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Instruction Card */
            <div className="bg-gradient-to-br from-emerald-800 via-teal-900 to-emerald-950 rounded-3xl p-6 text-white">
              <div className="text-center mb-4">
                <p className="text-3xl mb-2">📿</p>
                <h3 className="font-bold font-arabic text-lg">كيفية الاستخدام</h3>
              </div>
              <ul className="text-xs font-arabic text-emerald-200 space-y-3 leading-relaxed">
                <li className="flex gap-2"><span className="text-emerald-400">•</span> اختر ذكراً من القائمة أعلاه</li>
                <li className="flex gap-2"><span className="text-emerald-400">•</span> اضغط على الدائرة أو زر «سبّح» للعد</li>
                <li className="flex gap-2"><span className="text-emerald-400">•</span> يمكنك تخصيص العدد المستهدف من الإعدادات</li>
                <li className="flex gap-2"><span className="text-emerald-400">•</span> يُحفظ سجل تسبيحك تلقائياً</li>
              </ul>
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-[10px] text-emerald-300/70 font-arabic text-center leading-relaxed">
                  «أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ»
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
