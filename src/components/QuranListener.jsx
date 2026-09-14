import React, { useState, useEffect } from 'react';
import { 
  Headphones, Play, Pause, Clock, Sparkles, Plus, 
  RotateCcw, Check, ShieldCheck, Heart, Moon, Volume2, 
  ListMusic, Book, SkipBack, SkipForward, Repeat, Radio, X
} from 'lucide-react';
import { LISTENER_PLAYLISTS, SURAHS_INDEX, RECITERS } from '../data/quranData';

export default function QuranListener({
  activeSurahId,
  setActiveSurahId,
  currentAyahNumber,
  setCurrentAyahNumber,
  currentSurah,
  isPlaying,
  setIsPlaying,
  selectedReciter,
  setSelectedReciter
}) {
  const [selectedPlaylist, setSelectedPlaylist] = useState(LISTENER_PLAYLISTS[0]);
  const [sleepTimerMinutes, setSleepTimerMinutes] = useState(null);
  const [sleepTimeRemaining, setSleepTimeRemaining] = useState(null);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [customPlaylists, setCustomPlaylists] = useState(() => {
    try {
      const saved = localStorage.getItem('aiquran_user_playlists');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [newPlaylistTitle, setNewPlaylistTitle] = useState('');
  const [newPlaylistSurah, setNewPlaylistSurah] = useState(1);

  // Sleep Timer countdown
  useEffect(() => {
    if (!sleepTimeRemaining || sleepTimeRemaining <= 0) {
      if (sleepTimeRemaining === 0) {
        setIsPlaying(false);
        setSleepTimerMinutes(null);
        setSleepTimeRemaining(null);
      }
      return;
    }

    const interval = setInterval(() => {
      setSleepTimeRemaining(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [sleepTimeRemaining]);

  const setTimer = (mins) => {
    setSleepTimerMinutes(mins);
    setSleepTimeRemaining(mins * 60);
  };

  const cancelTimer = () => {
    setSleepTimerMinutes(null);
    setSleepTimeRemaining(null);
  };

  const handleTogglePlayPlaylist = (pl) => {
    if (activeSurahId === pl.surahId && isPlaying) {
      setIsPlaying(false);
    } else {
      setSelectedPlaylist(pl);
      setActiveSurahId(pl.surahId);
      setCurrentAyahNumber(1);
      if (pl.reciterId) {
        const rec = RECITERS.find(r => r.id === pl.reciterId);
        if (rec) setSelectedReciter(rec);
      }
      setIsPlaying(true);
    }
  };

  const handleCreatePlaylist = () => {
    if (!newPlaylistTitle.trim()) return;
    const targetSurah = SURAHS_INDEX.find(s => s.number === Number(newPlaylistSurah)) || SURAHS_INDEX[0];
    const newPl = {
      id: `custom_${Date.now()}`,
      titleAr: newPlaylistTitle,
      titleEn: 'Personal Custom Playlist',
      description: 'قائمتك الخاصة للاستماع المتواصل لآيات الذكر الحكيم',
      surahId: Number(newPlaylistSurah),
      surahNameAr: targetSurah.arabic,
      reciterId: selectedReciter.id,
      gradient: 'from-emerald-900 via-teal-900 to-slate-950',
      badge: 'Custom'
    };
    const updated = [newPl, ...customPlaylists];
    setCustomPlaylists(updated);
    localStorage.setItem('aiquran_user_playlists', JSON.stringify(updated));
    setNewPlaylistTitle('');
    setIsCustomModalOpen(false);
  };

  const formatTimer = (seconds) => {
    if (!seconds) return '00:00';
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const totalAyahs = currentSurah?.ayahs?.length || 7;
  const allPlaylists = [...customPlaylists, ...LISTENER_PLAYLISTS];

  return (
    <div className="max-w-6xl mx-auto w-full px-4 lg:px-8 py-6 space-y-6" dir="rtl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200/80 dark:border-emerald-900/40">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-bold font-arabic mb-2">
            <Headphones size={14} className="text-blue-600 dark:text-blue-400" />
            <span>ركن الاستماع والسكينة</span>
            <span className="font-sans text-[10px]" dir="ltr">Quran Listener & Sleep Desk</span>
          </div>
          <h1 className="text-2xl font-bold font-arabic text-stone-900 dark:text-stone-100">
            تلاوات هادئة وقوائم استماع مخصصة
          </h1>
          <p className="text-xs text-stone-500 dark:text-stone-400 font-arabic mt-1">
            استمع لكتاب الله بتلاوة متواصلة أثناء العمل، الراحة، أو قبل النوم مع موقت الإيقاف التلقائي.
          </p>
        </div>

        <button
          onClick={() => setIsCustomModalOpen(true)}
          className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold font-arabic text-xs flex items-center gap-2 shadow-md shadow-emerald-700/20 active:scale-95 transition-all self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>إنشاء قائمة استماع مخصصة</span>
        </button>
      </div>

      {/* Prominent Active Now Playing Desk */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-950 via-teal-950 to-[#0A1310] border border-emerald-800/40 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mt-20"></div>

        {/* Close Active Play Section Button */}
        <button
          onClick={() => setIsPlaying(false)}
          className="absolute top-4 left-4 z-20 p-2 rounded-2xl bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all shadow-sm flex items-center gap-1 text-xs font-arabic"
          title="إغلاق وإيقاف التلاوة"
        >
          <X size={15} />
          <span className="hidden sm:inline text-[11px]">إغلاق</span>
        </button>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          
          {/* Surah info & Equalizer */}
          <div className="flex items-center gap-4 text-right">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center font-bold text-xl text-white shadow-lg shadow-emerald-700/30 font-sans">
              {currentSurah?.number || activeSurahId}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-emerald-800/80 text-emerald-200 text-[10px] px-2.5 py-0.5 rounded-full font-bold font-arabic">
                  جاري الاستماع الآن
                </span>
                <span className="text-[10px] text-stone-300 font-sans" dir="ltr">
                  Ayah {currentAyahNumber} of {totalAyahs}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-arabic text-amber-200 leading-tight" style={{ fontFamily: "Amiri, serif" }}>
                سُورَةُ {currentSurah?.arabic || 'الفاتحة'}
              </h2>
              <p className="text-xs text-emerald-300/80 font-arabic mt-0.5">
                بصوت القارئ: الشيخ {selectedReciter?.nameAr}
              </p>
            </div>
          </div>

          {/* Controls: Only Play / Pause button */}
          <div className="flex items-center justify-center">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-16 h-16 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-amber-950 flex items-center justify-center shadow-xl shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all"
              title={isPlaying ? "إيقاف مؤقت" : "تشغيل التلاوة"}
            >
              {isPlaying ? <Pause size={28} /> : <Play size={28} className="mr-1 fill-amber-950" />}
            </button>
          </div>

          {/* Quick Reciter Switcher */}
          <div className="flex items-center gap-2 bg-black/30 border border-white/10 px-3.5 py-2 rounded-2xl">
            <Volume2 size={16} className="text-emerald-400" />
            <select
              value={selectedReciter?.id}
              onChange={(e) => {
                const rec = RECITERS.find(r => r.id === e.target.value);
                if (rec) setSelectedReciter(rec);
              }}
              className="bg-transparent text-xs font-arabic font-bold text-white focus:outline-none cursor-pointer"
            >
              {RECITERS.map(r => (
                <option key={r.id} value={r.id} className="text-stone-900 bg-white dark:bg-[#121E1A] dark:text-stone-100">
                  {r.nameAr}
                </option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* Sleep Timer & Atmosphere Bar */}
      <div className="p-5 rounded-3xl bg-white dark:bg-[#121E1A] border border-stone-200/80 dark:border-emerald-900/40 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Moon size={18} className="text-amber-500" />
            <h3 className="font-bold text-sm font-arabic text-stone-900 dark:text-stone-100">
              موقت النوم والإيقاف الذكي (Sleep Timer)
            </h3>
          </div>
          <p className="text-xs text-stone-500 dark:text-stone-400 font-arabic">
            حدد وقتاً لإيقاف التلاوة تلقائياً عند استغراقك في النوم لمنع استمرار الصوت وتوفير البطارية.
          </p>
        </div>

        {/* Timer buttons & status */}
        <div className="flex flex-wrap items-center gap-2">
          {sleepTimeRemaining ? (
            <div className="flex items-center gap-3 bg-amber-50 dark:bg-amber-950/60 px-4 py-2 rounded-2xl border border-amber-300 dark:border-amber-800">
              <Clock size={16} className="text-amber-600 animate-pulse" />
              <div className="text-right">
                <span className="text-[10px] text-amber-800 font-arabic block leading-tight">يتوقف بعد</span>
                <span className="font-bold text-sm text-amber-950 dark:text-amber-100 font-sans" dir="ltr">
                  {formatTimer(sleepTimeRemaining)}
                </span>
              </div>
              <button
                onClick={cancelTimer}
                className="text-xs bg-red-500 text-white px-2 py-1 rounded-lg font-arabic mr-1 hover:bg-red-600"
              >
                إلغاء
              </button>
            </div>
          ) : (
            <div className="flex gap-1.5">
              {[15, 30, 45, 60].map(mins => (
                <button
                  key={mins}
                  onClick={() => setTimer(mins)}
                  className="px-3.5 py-1.5 rounded-xl bg-stone-100 dark:bg-emerald-950/50 hover:bg-stone-200 text-stone-700 dark:text-stone-300 text-xs font-bold font-sans transition-colors"
                  dir="ltr"
                >
                  {mins}m
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Playlists Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 font-arabic flex items-center gap-2">
          <ListMusic size={18} className="text-emerald-600" />
          <span>قوائم التلاوات والورد اليومي</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {allPlaylists.map(pl => {
            const isThisPlaying = activeSurahId === pl.surahId && isPlaying;
            return (
              <div
                key={pl.id}
                className={`bg-white dark:bg-[#121E1A] rounded-3xl p-4 border transition-all flex flex-col justify-between group ${
                  isThisPlaying 
                    ? 'border-emerald-500 shadow-lg shadow-emerald-700/10 ring-2 ring-emerald-400/40' 
                    : 'border-stone-200/80 dark:border-emerald-900/40 shadow-sm hover:shadow-md'
                }`}
              >
                <div>
                  <div className={`relative h-36 rounded-2xl overflow-hidden mb-3 bg-gradient-to-br ${pl.gradient || 'from-emerald-900 via-teal-900 to-emerald-950'} p-3.5 flex flex-col justify-between text-white shadow-inner`}>
                    {/* Geometric star watermark */}
                    <div className="absolute -left-6 -bottom-6 w-32 h-32 opacity-10 pointer-events-none">
                      <svg viewBox="0 0 100 100" fill="currentColor">
                        <polygon points="50,0 63,38 100,50 63,62 50,100 37,62 0,50 37,38" />
                      </svg>
                    </div>
                    
                    <div className="flex items-center justify-between z-10">
                      <span className="bg-black/30 backdrop-blur-md text-amber-300 text-[10px] px-2.5 py-0.5 rounded-full font-bold font-sans border border-white/10" dir="ltr">
                        {pl.badge}
                      </span>
                      <Book size={16} className="text-emerald-300/80" />
                    </div>

                    <div className="z-10 text-center my-auto">
                      <span className="text-xl font-bold font-arabic text-amber-200 drop-shadow-md block" style={{ fontFamily: "Amiri, serif" }}>
                        {pl.surahNameAr ? `سورة ${pl.surahNameAr}` : pl.titleAr}
                      </span>
                    </div>

                    <div className="flex justify-start z-10">
                      <button
                        onClick={() => handleTogglePlayPlaylist(pl)}
                        className={`w-9 h-9 rounded-full flex items-center justify-center shadow-lg shadow-black/30 hover:scale-110 active:scale-95 transition-all ${
                          isThisPlaying 
                            ? 'bg-amber-400 text-amber-950' 
                            : 'bg-white text-emerald-900'
                        }`}
                        title={isThisPlaying ? "إيقاف مؤقت" : "تشغيل القائمة"}
                      >
                        {isThisPlaying ? <Pause size={16} /> : <Play size={16} className="mr-0.5 fill-current" />}
                      </button>
                    </div>
                  </div>

                  <h3 className="font-bold text-base font-arabic text-stone-900 dark:text-stone-100 leading-tight mb-1">
                    {pl.titleAr}
                  </h3>
                  <span className="text-[10px] text-stone-400 font-sans block mb-2" dir="ltr">
                    {pl.titleEn}
                  </span>
                  <p className="text-xs text-stone-500 dark:text-stone-400 font-arabic leading-relaxed">
                    {pl.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 dark:border-emerald-950/50 flex items-center justify-between text-xs text-stone-400 font-arabic">
                  <span>سورة رقم {pl.surahId}</span>
                  <button
                    onClick={() => handleTogglePlayPlaylist(pl)}
                    className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
                  >
                    {isThisPlaying ? 'إيقاف' : 'استمع الآن'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal: Create Custom Playlist */}
      {isCustomModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#121E1A] w-full max-w-md rounded-3xl p-6 shadow-2xl border border-stone-200 dark:border-emerald-900/60 animate-fade-in text-right">
            
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-100 dark:border-emerald-950/50">
              <h3 className="font-bold text-base font-arabic text-stone-900 dark:text-stone-100">
                إنشاء قائمة تلاوة جديدة
              </h3>
              <button
                onClick={() => setIsCustomModalOpen(false)}
                className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300 font-arabic block">
                  اسم القائمة
                </label>
                <input
                  type="text"
                  placeholder="مثال: ورد قيام الليل، سورة مريم..."
                  value={newPlaylistTitle}
                  onChange={(e) => setNewPlaylistTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-100 dark:bg-emerald-950/40 border border-stone-200/80 dark:border-emerald-900/40 text-xs sm:text-sm font-arabic focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300 font-arabic block">
                  السورة الأساسية في القائمة
                </label>
                <select
                  value={newPlaylistSurah}
                  onChange={(e) => setNewPlaylistSurah(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-100 dark:bg-emerald-950/40 border border-stone-200/80 dark:border-emerald-900/40 text-xs sm:text-sm font-arabic focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                >
                  {SURAHS_INDEX.map(s => (
                    <option key={s.id} value={s.number} className="dark:bg-[#121E1A]">
                      {s.number}. سورة {s.arabic} ({s.english})
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleCreatePlaylist}
                className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold font-arabic text-sm shadow-md shadow-emerald-700/20 active:scale-98 transition-all"
              >
                حفظ وإضافة القائمة
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
