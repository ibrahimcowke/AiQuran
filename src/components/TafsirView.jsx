import React, { useState, useMemo } from 'react';
import {
  BookOpen, ChevronLeft, ChevronRight, Search, Sparkles,
  BookMarked, Eye, AlignRight, Globe, BookText, ChevronDown
} from 'lucide-react';
import { SURAHS_INDEX, SURAH_DETAILS } from '../data/quranData';

const TAFSIR_SCHOLARS = [
  {
    id: 'saadi',
    nameAr: 'تفسير السعدي',
    nameEn: "As-Sa'di",
    descAr: 'تيسير الكريم الرحمن في تفسير كلام المنان',
    color: 'emerald',
    icon: '📗'
  },
  {
    id: 'kathir',
    nameAr: 'تفسير ابن كثير',
    nameEn: 'Ibn Kathir',
    descAr: 'تفسير القرآن العظيم',
    color: 'amber',
    icon: '📘'
  }
];

export default function TafsirView({ setView, setActiveSurahId, setCurrentAyahNumber }) {
  const [selectedSurahId, setSelectedSurahId] = useState(1);
  const [selectedAyahId, setSelectedAyahId] = useState(null);
  const [activeScholar, setActiveScholar] = useState('saadi');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSurahPicker, setShowSurahPicker] = useState(false);

  const surahMeta = SURAHS_INDEX.find(s => s.number === selectedSurahId) || SURAHS_INDEX[0];
  const surahDetail = SURAH_DETAILS[selectedSurahId];

  const ayahs = useMemo(() => {
    if (surahDetail?.ayahs) return surahDetail.ayahs;
    return Array.from({ length: surahMeta.ayahs || 7 }, (_, i) => ({
      id: i + 1,
      numberInSurah: i + 1,
      arabic: `آية ${i + 1}`,
      english: `Verse ${i + 1}`,
      tafsirSaadi: 'التفسير متاح للسور المفصلة فقط في هذا الإصدار.',
      tafsirKathir: 'التفسير متاح للسور المفصلة فقط في هذا الإصدار.'
    }));
  }, [selectedSurahId, surahDetail, surahMeta]);

  const filteredSurahs = SURAHS_INDEX.filter(s =>
    s.arabic.includes(searchQuery) ||
    s.english.toLowerCase().includes(searchQuery.toLowerCase()) ||
    String(s.number).includes(searchQuery)
  );

  const selectedAyah = ayahs.find(a => a.id === selectedAyahId) || ayahs[0];
  const tafsirText = activeScholar === 'saadi' ? selectedAyah?.tafsirSaadi : selectedAyah?.tafsirKathir;

  const goToAyah = (dir) => {
    const idx = ayahs.findIndex(a => a.id === (selectedAyahId || 1));
    const newIdx = Math.max(0, Math.min(ayahs.length - 1, idx + dir));
    setSelectedAyahId(ayahs[newIdx].id);
  };

  return (
    <div className="max-w-6xl mx-auto w-full px-4 lg:px-8 py-6 space-y-6" dir="rtl">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200/80 dark:border-emerald-900/40">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 px-3 py-1 rounded-full text-xs font-bold font-arabic mb-2">
            <BookText size={14} />
            <span>التفسير والبيان</span>
            <span className="font-sans text-[10px]" dir="ltr">Quranic Tafsir</span>
          </div>
          <h1 className="text-2xl font-bold font-arabic text-stone-900 dark:text-stone-100">
            تفسير القرآن الكريم
          </h1>
          <p className="text-xs text-stone-500 dark:text-stone-400 font-arabic mt-1">
            تفسير كل آية من كتاب الله بأقوال أئمة التفسير: السعدي وابن كثير رحمهما الله.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left: Surah & Ayah selector */}
        <div className="space-y-4">

          {/* Surah Picker */}
          <div className="bg-white dark:bg-[#121E1A] rounded-3xl border border-stone-200/80 dark:border-emerald-900/40 shadow-sm overflow-hidden">
            <button
              onClick={() => setShowSurahPicker(!showSurahPicker)}
              className="w-full flex items-center justify-between p-4 hover:bg-stone-50 dark:hover:bg-emerald-950/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 flex items-center justify-center font-bold text-sm font-sans">
                  {selectedSurahId}
                </span>
                <div className="text-right">
                  <span className="font-bold font-arabic text-stone-900 dark:text-stone-100 block text-sm">
                    سورة {surahMeta.arabic}
                  </span>
                  <span className="text-[10px] text-stone-400 font-sans" dir="ltr">{surahMeta.english}</span>
                </div>
              </div>
              <ChevronDown size={16} className={`text-stone-400 transition-transform ${showSurahPicker ? 'rotate-180' : ''}`} />
            </button>

            {showSurahPicker && (
              <div className="border-t border-stone-100 dark:border-emerald-950/50">
                <div className="p-3 border-b border-stone-100 dark:border-emerald-950/50">
                  <div className="relative">
                    <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      type="text"
                      placeholder="ابحث عن سورة..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="w-full pr-9 pl-3 py-2 rounded-xl bg-stone-100 dark:bg-emerald-950/40 text-xs font-arabic focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>
                <div className="max-h-56 overflow-y-auto">
                  {filteredSurahs.map(s => (
                    <button
                      key={s.number}
                      onClick={() => {
                        setSelectedSurahId(s.number);
                        setSelectedAyahId(null);
                        setShowSurahPicker(false);
                        setSearchQuery('');
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-right hover:bg-stone-50 dark:hover:bg-emerald-950/30 transition-colors ${selectedSurahId === s.number ? 'bg-teal-50 dark:bg-teal-950/40' : ''}`}
                    >
                      <span className="text-[10px] font-bold font-sans text-teal-600 dark:text-teal-400 w-6 shrink-0">{s.number}</span>
                      <span className="text-xs font-bold font-arabic text-stone-800 dark:text-stone-200">سورة {s.arabic}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Ayah List */}
          <div className="bg-white dark:bg-[#121E1A] rounded-3xl border border-stone-200/80 dark:border-emerald-900/40 shadow-sm">
            <div className="p-3 border-b border-stone-100 dark:border-emerald-950/50">
              <h3 className="text-xs font-bold font-arabic text-stone-600 dark:text-stone-400">
                آيات سورة {surahMeta.arabic} ({surahMeta.ayahs} آية)
              </h3>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {ayahs.map((ayah) => {
                const isSelected = (selectedAyahId || 1) === ayah.id;
                return (
                  <button
                    key={ayah.id}
                    onClick={() => setSelectedAyahId(ayah.id)}
                    className={`w-full flex items-start gap-3 px-4 py-3 text-right transition-all border-b border-stone-50 dark:border-emerald-950/30 last:border-0 ${
                      isSelected
                        ? 'bg-teal-50 dark:bg-teal-950/40 border-r-2 border-r-teal-500'
                        : 'hover:bg-stone-50 dark:hover:bg-emerald-950/20'
                    }`}
                  >
                    <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold font-sans mt-0.5 ${
                      isSelected
                        ? 'bg-teal-500 text-white'
                        : 'bg-stone-100 dark:bg-emerald-950/50 text-stone-500 dark:text-stone-400'
                    }`}>
                      {ayah.numberInSurah}
                    </span>
                    <p className="text-xs font-arabic text-stone-700 dark:text-stone-300 leading-relaxed line-clamp-2 flex-1" style={{ fontFamily: 'Amiri, serif' }}>
                      {ayah.arabic}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Tafsir Panel */}
        <div className="lg:col-span-2 space-y-4">

          {/* Scholar Switcher */}
          <div className="flex gap-2 p-1 bg-stone-100 dark:bg-emerald-950/40 rounded-2xl">
            {TAFSIR_SCHOLARS.map(scholar => (
              <button
                key={scholar.id}
                onClick={() => setActiveScholar(scholar.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold font-arabic transition-all ${
                  activeScholar === scholar.id
                    ? 'bg-white dark:bg-[#121E1A] shadow-md text-stone-900 dark:text-stone-100'
                    : 'text-stone-500 dark:text-stone-400 hover:text-stone-700'
                }`}
              >
                <span>{scholar.icon}</span>
                <span>{scholar.nameAr}</span>
              </button>
            ))}
          </div>

          {/* Ayah Display */}
          {selectedAyah && (
            <div className="bg-white dark:bg-[#121E1A] rounded-3xl border border-stone-200/80 dark:border-emerald-900/40 shadow-sm overflow-hidden">

              {/* Ayah Header */}
              <div className="bg-gradient-to-br from-teal-700 via-emerald-800 to-teal-900 p-6 text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -ml-16 -mt-16 pointer-events-none" />
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-white/10 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold font-arabic border border-white/20">
                      آية {selectedAyah.numberInSurah}
                    </span>
                    <span className="text-[10px] text-teal-200 font-arabic">من سورة {surahMeta.arabic}</span>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => goToAyah(-1)}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      <ChevronRight size={14} />
                    </button>
                    <button
                      onClick={() => goToAyah(1)}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      <ChevronLeft size={14} />
                    </button>
                  </div>
                </div>
                <p className="text-xl sm:text-2xl font-bold font-arabic leading-loose text-amber-100 relative z-10" style={{ fontFamily: 'Amiri, serif' }}>
                  {selectedAyah.arabic}
                </p>
                <p className="text-xs text-teal-200/80 mt-3 font-sans leading-relaxed" dir="ltr">
                  "{selectedAyah.english}"
                </p>
              </div>

              {/* Tafsir Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles size={16} className="text-teal-600 dark:text-teal-400" />
                  <h3 className="font-bold text-sm font-arabic text-stone-800 dark:text-stone-200">
                    {TAFSIR_SCHOLARS.find(s => s.id === activeScholar)?.nameAr}
                  </h3>
                  <span className="text-[9px] text-stone-400 font-arabic">
                    — {TAFSIR_SCHOLARS.find(s => s.id === activeScholar)?.descAr}
                  </span>
                </div>

                <div className="bg-teal-50/50 dark:bg-teal-950/20 rounded-2xl p-4 border border-teal-100 dark:border-teal-900/30">
                  <p className="text-sm font-arabic text-stone-700 dark:text-stone-300 leading-loose">
                    {tafsirText || 'التفسير غير متاح لهذه الآية في هذا الإصدار. قريباً سيتم إضافة تفسير كامل للقرآن الكريم.'}
                  </p>
                </div>

                {/* Jump to Mushaf button */}
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => {
                      if (setActiveSurahId) setActiveSurahId(selectedSurahId);
                      if (setCurrentAyahNumber) setCurrentAyahNumber(selectedAyah.numberInSurah);
                      if (setView) setView('mushaf');
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold font-arabic flex items-center justify-center gap-2 transition-colors"
                  >
                    <BookOpen size={14} />
                    <span>فتح في المصحف</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Scholar Info */}
          <div className="grid grid-cols-2 gap-3">
            {TAFSIR_SCHOLARS.map(scholar => (
              <div
                key={scholar.id}
                onClick={() => setActiveScholar(scholar.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  activeScholar === scholar.id
                    ? 'border-teal-400 dark:border-teal-600 bg-teal-50 dark:bg-teal-950/40'
                    : 'border-stone-200/80 dark:border-emerald-900/40 bg-white dark:bg-[#121E1A] hover:border-teal-300'
                }`}
              >
                <div className="text-2xl mb-2">{scholar.icon}</div>
                <h4 className="font-bold text-sm font-arabic text-stone-900 dark:text-stone-100">{scholar.nameAr}</h4>
                <p className="text-[10px] text-stone-400 font-arabic mt-1">{scholar.descAr}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
