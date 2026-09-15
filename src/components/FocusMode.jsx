import React, { useState, useEffect } from 'react';
import {
  ChevronLeft, ChevronRight, X, Play, Pause, Maximize2,
  Minimize2, Moon, Volume2, Eye, Settings2
} from 'lucide-react';
import { SURAHS_INDEX, SURAH_DETAILS } from '../data/quranData';

const AMBIENT_SOUNDS = [
  { id: 'none', nameAr: 'بدون صوت', icon: '🔇' },
  { id: 'rain', nameAr: 'صوت المطر', icon: '🌧️', url: 'https://www.youtube.com/embed/q76bMs-NwRk?autoplay=1&loop=1&controls=0&mute=0' },
  { id: 'birds', nameAr: 'تغريد الطيور', icon: '🐦', url: 'https://www.youtube.com/embed/EFCs0M1TBQY?autoplay=1&loop=1&controls=0&mute=0' },
  { id: 'sea', nameAr: 'أمواج البحر', icon: '🌊', url: 'https://www.youtube.com/embed/WHPEKLQID4U?autoplay=1&loop=1&controls=0&mute=0' },
];

export default function FocusMode({ onExit, activeSurahId = 1, currentAyahNumber = 1, setActiveSurahId, setCurrentAyahNumber }) {
  const [currentSurahId, setCurrentSurahId] = useState(activeSurahId);
  const [currentAyah, setCurrentAyah] = useState(currentAyahNumber);
  const [showSettings, setShowSettings] = useState(false);
  const [ambientSound, setAmbientSound] = useState('none');
  const [fontSize, setFontSize] = useState('xl');
  const [showTranslation, setShowTranslation] = useState(true);
  const [showTafsir, setShowTafsir] = useState(false);

  const surahMeta = SURAHS_INDEX.find(s => s.number === currentSurahId) || SURAHS_INDEX[0];
  const surahDetail = SURAH_DETAILS[currentSurahId];
  const ayahs = surahDetail?.ayahs || Array.from({ length: surahMeta.ayahs || 7 }, (_, i) => ({
    id: i + 1, numberInSurah: i + 1,
    arabic: `آية ${i + 1}`, english: `Verse ${i + 1}`, tafsirSaadi: ''
  }));
  const totalAyahs = ayahs.length;
  const ayah = ayahs.find(a => a.numberInSurah === currentAyah) || ayahs[0];

  const goNext = () => {
    if (currentAyah < totalAyahs) setCurrentAyah(a => a + 1);
  };
  const goPrev = () => {
    if (currentAyah > 1) setCurrentAyah(a => a - 1);
  };

  const fontSizeClasses = {
    'lg': 'text-2xl sm:text-3xl',
    'xl': 'text-3xl sm:text-4xl',
    '2xl': 'text-4xl sm:text-5xl',
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') goNext();
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') goPrev();
      if (e.key === 'Escape') onExit?.();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [currentAyah, totalAyahs]);

  const activeAmbient = AMBIENT_SOUNDS.find(s => s.id === ambientSound);

  return (
    <div className="fixed inset-0 z-50 bg-[#080E0C] flex flex-col items-center justify-center" dir="rtl">

      {/* Hidden ambient iframe */}
      {activeAmbient?.url && (
        <iframe
          src={activeAmbient.url}
          className="absolute opacity-0 pointer-events-none w-0 h-0"
          allow="autoplay"
          title="ambient"
        />
      )}

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-4 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
          >
            <Settings2 size={18} />
          </button>
          <span className="text-xs font-arabic text-white/40">
            {surahMeta.arabic} • الآية {currentAyah} / {totalAyahs}
          </span>
        </div>
        <button
          onClick={onExit}
          className="p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors flex items-center gap-2"
        >
          <X size={18} />
          <span className="text-xs font-arabic hidden sm:inline">خروج</span>
        </button>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="absolute top-16 right-4 sm:right-6 z-20 w-64 bg-[#121E1A] border border-emerald-900/50 rounded-3xl p-4 shadow-2xl">
          <h3 className="text-sm font-bold font-arabic text-white mb-4">إعدادات وضع التركيز</h3>

          <div className="space-y-4 text-xs font-arabic text-white/70">
            {/* Font Size */}
            <div>
              <p className="mb-2">حجم الخط</p>
              <div className="flex gap-1.5">
                {['lg', 'xl', '2xl'].map(s => (
                  <button
                    key={s}
                    onClick={() => setFontSize(s)}
                    className={`flex-1 py-1.5 rounded-xl border text-[10px] font-bold transition ${
                      fontSize === s
                        ? 'bg-emerald-600 border-emerald-500 text-white'
                        : 'border-white/10 text-white/50 hover:border-white/20'
                    }`}
                  >
                    {s === 'lg' ? 'صغير' : s === 'xl' ? 'متوسط' : 'كبير'}
                  </button>
                ))}
              </div>
            </div>

            {/* Translation Toggle */}
            <div className="flex items-center justify-between">
              <span>إظهار الترجمة</span>
              <button
                onClick={() => setShowTranslation(!showTranslation)}
                className={`w-10 h-5 rounded-full transition-colors ${showTranslation ? 'bg-emerald-600' : 'bg-white/10'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white shadow transition-transform ${showTranslation ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
            </div>

            {/* Ambient Sound */}
            <div>
              <p className="mb-2">الأصوات الهادئة</p>
              <div className="grid grid-cols-2 gap-1.5">
                {AMBIENT_SOUNDS.map(s => (
                  <button
                    key={s.id}
                    onClick={() => setAmbientSound(s.id)}
                    className={`py-2 rounded-xl border text-[10px] transition flex items-center gap-1.5 justify-center ${
                      ambientSound === s.id
                        ? 'bg-emerald-700 border-emerald-500 text-white'
                        : 'border-white/10 text-white/50 hover:border-white/20'
                    }`}
                  >
                    <span>{s.icon}</span>
                    <span>{s.nameAr}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center w-full max-w-4xl px-8 sm:px-16 gap-8 text-center">

        {/* Surah Name Badge */}
        <div className="text-emerald-600/80 text-xs font-arabic tracking-widest uppercase">
          سُورَةُ {surahMeta.arabic}
        </div>

        {/* Arabic Ayah */}
        <div className="relative">
          <p
            className={`font-arabic text-white leading-loose font-bold ${fontSizeClasses[fontSize]}`}
            style={{ fontFamily: 'Amiri, serif', textShadow: '0 0 40px rgba(16,185,129,0.15)' }}
          >
            {ayah.arabic}
          </p>
        </div>

        {/* Ayah Number Ornament */}
        <div className="flex items-center gap-3">
          <div className="h-px w-16 bg-gradient-to-l from-emerald-800/50 to-transparent" />
          <span className="text-xs text-white/30 font-sans">{currentAyah}</span>
          <div className="h-px w-16 bg-gradient-to-r from-emerald-800/50 to-transparent" />
        </div>

        {/* English Translation */}
        {showTranslation && (
          <p className="text-sm sm:text-base text-white/40 font-sans max-w-2xl leading-relaxed" dir="ltr">
            "{ayah.english}"
          </p>
        )}
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-4">
        <button
          onClick={goPrev}
          disabled={currentAyah <= 1}
          className="p-4 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all"
        >
          <ChevronRight size={24} />
        </button>

        {/* Ayah Dots (max 7 shown) */}
        <div className="flex items-center gap-1.5">
          {Array.from({ length: Math.min(totalAyahs, 7) }, (_, i) => {
            const ayahNum = i + 1;
            return (
              <button
                key={i}
                onClick={() => setCurrentAyah(ayahNum)}
                className={`rounded-full transition-all ${
                  ayahNum === currentAyah
                    ? 'w-5 h-2 bg-emerald-500'
                    : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            );
          })}
          {totalAyahs > 7 && (
            <span className="text-[10px] text-white/30 font-sans ml-1">{currentAyah}/{totalAyahs}</span>
          )}
        </div>

        <button
          onClick={goNext}
          disabled={currentAyah >= totalAyahs}
          className="p-4 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft size={24} />
        </button>
      </div>
    </div>
  );
}
