import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, SkipBack, SkipForward, Repeat, 
  Volume2, VolumeX, Sparkles, ChevronUp, ChevronDown,
  RotateCcw, Sliders, Check, X
} from 'lucide-react';
import { formatAyahAudioUrl } from '../data/quranData';

export default function AudioPlayerBar({
  currentSurah,
  currentAyahNumber,
  setCurrentAyahNumber,
  selectedReciter,
  isPlaying,
  setIsPlaying
}) {
  const audioRef = useRef(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [repeatAyah, setRepeatAyah] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  // Range Loop (Hifz Memorization) state
  const [isRangeLoopOpen, setIsRangeLoopOpen] = useState(false);
  const [isRangeLoopActive, setIsRangeLoopActive] = useState(false);
  const [rangeStart, setRangeStart] = useState(1);
  const [rangeEnd, setRangeEnd] = useState(5);
  const [rangeTargetLoops, setRangeTargetLoops] = useState(3);
  const [currentLoopCount, setCurrentLoopCount] = useState(1);

  const totalAyahsInSurah = currentSurah?.ayahs?.length || 7;
  const audioUrl = currentSurah 
    ? formatAyahAudioUrl(selectedReciter.subfolder, currentSurah.number, currentAyahNumber)
    : '';

  const playPromiseRef = useRef(null);
  const prevUrlRef = useRef('');

  // Un-dismiss player bar whenever audio playback is requested
  useEffect(() => {
    if (isPlaying) {
      setIsDismissed(false);
    }
  }, [isPlaying]);

  // Update default range end when surah changes
  useEffect(() => {
    setRangeStart(1);
    setRangeEnd(Math.min(5, totalAyahsInSurah));
    setIsRangeLoopActive(false);
    setCurrentLoopCount(1);
  }, [currentSurah?.number, totalAyahsInSurah]);

  const safePlay = () => {
    if (!audioRef.current) return;
    const p = audioRef.current.play();
    if (p !== undefined) {
      playPromiseRef.current = p;
      p.catch(err => {
        if (err.name !== 'AbortError') {
          console.warn("Audio playback issue:", err);
          setIsPlaying(false);
        }
      });
    }
  };

  const safePause = () => {
    if (!audioRef.current) return;
    if (playPromiseRef.current) {
      playPromiseRef.current
        .then(() => {
          audioRef.current?.pause();
        })
        .catch(() => {
          audioRef.current?.pause();
        });
    } else {
      audioRef.current.pause();
    }
  };

  // Unified playback & URL management effect
  useEffect(() => {
    if (!audioRef.current || !audioUrl) return;

    const urlChanged = prevUrlRef.current !== audioUrl;
    if (urlChanged) {
      prevUrlRef.current = audioUrl;
      audioRef.current.src = audioUrl;
      audioRef.current.playbackRate = playbackRate;
      audioRef.current.load();
    }

    if (isPlaying) {
      safePlay();
    } else {
      safePause();
    }
  }, [audioUrl, isPlaying]);

  // Sync playback rate changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  const togglePlay = () => {
    setIsPlaying(prev => !prev);
  };

  const handleNext = () => {
    if (isRangeLoopActive) {
      if (currentAyahNumber < rangeEnd) {
        setCurrentAyahNumber(currentAyahNumber + 1);
      } else {
        // reached end of range
        if (currentLoopCount < rangeTargetLoops) {
          setCurrentLoopCount(prev => prev + 1);
          setCurrentAyahNumber(rangeStart);
        } else {
          setIsRangeLoopActive(false);
          setIsPlaying(false);
        }
      }
      return;
    }

    if (currentAyahNumber < totalAyahsInSurah) {
      setCurrentAyahNumber(currentAyahNumber + 1);
    } else {
      setIsPlaying(false);
    }
  };

  const handlePrev = () => {
    if (isRangeLoopActive && currentAyahNumber > rangeStart) {
      setCurrentAyahNumber(currentAyahNumber - 1);
      return;
    }
    if (currentAyahNumber > 1) {
      setCurrentAyahNumber(currentAyahNumber - 1);
    }
  };

  const handleAudioEnded = () => {
    if (repeatAyah) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
      return;
    }

    if (isRangeLoopActive) {
      if (currentAyahNumber < rangeEnd) {
        setCurrentAyahNumber(currentAyahNumber + 1);
      } else {
        // reached end of range
        if (rangeTargetLoops === 0 || currentLoopCount < rangeTargetLoops) {
          setCurrentLoopCount(prev => prev + 1);
          setCurrentAyahNumber(rangeStart);
        } else {
          setIsRangeLoopActive(false);
          setIsPlaying(false);
        }
      }
      return;
    }

    if (currentAyahNumber < totalAyahsInSurah) {
      setCurrentAyahNumber(currentAyahNumber + 1);
    } else {
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleSeek = (e) => {
    const time = Number(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const startRangeLoop = () => {
    const start = Math.max(1, Math.min(rangeStart, totalAyahsInSurah));
    const end = Math.max(start, Math.min(rangeEnd, totalAyahsInSurah));
    setRangeStart(start);
    setRangeEnd(end);
    setIsRangeLoopActive(true);
    setCurrentLoopCount(1);
    setCurrentAyahNumber(start);
    setIsPlaying(true);
    setIsRangeLoopOpen(false);
  };

  const stopRangeLoop = () => {
    setIsRangeLoopActive(false);
    setCurrentLoopCount(1);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleClose = () => {
    safePause();
    setIsPlaying(false);
    setIsDismissed(true);
  };

  if (!currentSurah || isDismissed) return null;

  return (
    <div className="fixed bottom-16 lg:bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#0D1513]/95 backdrop-blur-2xl border-t border-stone-200/80 dark:border-emerald-900/40 shadow-2xl transition-all" dir="rtl">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleAudioEnded}
        onError={() => setIsPlaying(false)}
      />

      {/* Active Range Loop Alert Banner */}
      {isRangeLoopActive && (
        <div className="bg-gradient-to-r from-teal-700 via-emerald-700 to-teal-800 text-white px-4 py-1 text-xs font-arabic flex items-center justify-between">
          <div className="flex items-center gap-2">
            <RotateCcw size={13} className="animate-spin" />
            <span>
              حلقة التكرار للحفظ نشطة: الآيات ({rangeStart} إلى {rangeEnd})
            </span>
            <span className="bg-black/20 px-2 py-0.5 rounded-full text-[11px] font-sans" dir="ltr">
              التكرار {currentLoopCount} {rangeTargetLoops > 0 ? `/ ${rangeTargetLoops}` : '(مستمر)'}
            </span>
          </div>
          <button
            onClick={stopRangeLoop}
            className="text-[11px] bg-white/20 hover:bg-white/30 px-2 py-0.5 rounded-lg flex items-center gap-1 transition"
          >
            <X size={12} />
            <span>إيقاف الحلقة</span>
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-2.5">
        
        {/* Progress Timeline bar */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] text-stone-400 font-sans min-w-[28px]" dir="ltr">
            {formatTime(currentTime)}
          </span>
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1 bg-stone-200 dark:bg-emerald-950 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
          <span className="text-[10px] text-stone-400 font-sans min-w-[28px]" dir="ltr">
            {formatTime(duration)}
          </span>
        </div>

        {/* Player Controls Row */}
        <div className="flex items-center justify-between gap-4">
          
          {/* Current Surah / Ayah info */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-md shadow-emerald-700/20">
              {currentSurah.number}
            </div>
            <div className="truncate">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-stone-900 dark:text-stone-100 font-arabic">
                  سورة {currentSurah.arabic}
                </span>
                <span className="bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 text-[10px] px-2 py-0.5 rounded-full font-bold font-sans" dir="ltr">
                  آية {currentAyahNumber} / {totalAyahsInSurah}
                </span>
              </div>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 font-arabic truncate">
                بصوت الشيخ {selectedReciter.nameAr}
              </p>
            </div>
          </div>

          {/* Main playback buttons */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Single Ayah Repeat toggle */}
            <button
              onClick={() => setRepeatAyah(!repeatAyah)}
              className={`p-2 rounded-xl transition-colors ${
                repeatAyah 
                  ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400' 
                  : 'text-stone-400 hover:text-stone-600 dark:hover:text-stone-300'
              }`}
              title="تكرار الآية الواحدة"
            >
              <Repeat size={17} />
            </button>

            {/* Range Loop Button for Hifz */}
            <button
              onClick={() => setIsRangeLoopOpen(!isRangeLoopOpen)}
              className={`p-2 rounded-xl text-xs font-arabic flex items-center gap-1 transition-colors ${
                isRangeLoopActive 
                  ? 'bg-teal-600 text-white shadow-md' 
                  : 'text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-emerald-950/50'
              }`}
              title="تحديد نطاق آيات للتكرار والحفظ"
            >
              <RotateCcw size={16} />
              <span className="hidden sm:inline">تكرار الحفظ</span>
            </button>

            {/* Previous Ayah */}
            <button
              onClick={handlePrev}
              disabled={isRangeLoopActive ? currentAyahNumber <= rangeStart : currentAyahNumber <= 1}
              className="p-2 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-emerald-950/50 disabled:opacity-30 transition-colors"
              title="الآية السابقة"
            >
              <SkipForward size={19} />
            </button>

            {/* Play / Pause button */}
            <button
              onClick={togglePlay}
              className="w-11 h-11 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white flex items-center justify-center shadow-lg shadow-emerald-700/30 hover:scale-105 active:scale-95 transition-all"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} className="mr-0.5 fill-white" />}
            </button>

            {/* Next Ayah */}
            <button
              onClick={handleNext}
              disabled={isRangeLoopActive ? false : currentAyahNumber >= totalAyahsInSurah}
              className="p-2 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-emerald-950/50 disabled:opacity-30 transition-colors"
              title="الآية التالية"
            >
              <SkipBack size={19} />
            </button>

            {/* Speed Switcher */}
            <button
              onClick={() => {
                const rates = [0.75, 1, 1.25, 1.5];
                const nextRate = rates[(rates.indexOf(playbackRate) + 1) % rates.length];
                setPlaybackRate(nextRate);
              }}
              className="hidden sm:block text-[11px] font-bold font-sans px-2.5 py-1 rounded-xl bg-stone-100 dark:bg-emerald-950/50 text-stone-600 dark:text-stone-300 hover:bg-stone-200"
              title="سرعة التلاوة"
              dir="ltr"
            >
              {playbackRate}x
            </button>
          </div>

          {/* Volume toggle & Close button */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <button
              onClick={() => {
                if (audioRef.current) {
                  audioRef.current.muted = !isMuted;
                  setIsMuted(!isMuted);
                }
              }}
              className="hidden md:flex p-2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
              title={isMuted ? "إلغاء الكتم" : "كتم الصوت"}
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>

            {/* Close Audio Player Bar Button */}
            <button
              onClick={handleClose}
              className="p-2 rounded-xl text-stone-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
              title="إغلاق شريط التلاوة وإيقاف الصوت"
            >
              <X size={19} />
            </button>
          </div>

        </div>
      </div>

      {/* Range Loop Config Modal / Popover */}
      {isRangeLoopOpen && (
        <div className="absolute bottom-full mb-3 left-4 sm:left-auto sm:right-32 z-50 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-4 animate-fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 font-arabic">
                تكرار نطاق للحفظ (سورة {currentSurah.arabic})
              </h4>
            </div>
            <button 
              onClick={() => setIsRangeLoopOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
            >
              <X size={15} />
            </button>
          </div>

          <div className="space-y-3 font-arabic text-xs">
            <div className="flex items-center justify-between gap-3">
              <span className="text-slate-600 dark:text-slate-400">من الآية:</span>
              <input
                type="number"
                min={1}
                max={totalAyahsInSurah}
                value={rangeStart}
                onChange={(e) => setRangeStart(Number(e.target.value))}
                className="w-20 px-2 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-center font-bold font-sans text-slate-800 dark:text-slate-100 focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-between gap-3">
              <span className="text-slate-600 dark:text-slate-400">إلى الآية:</span>
              <input
                type="number"
                min={rangeStart}
                max={totalAyahsInSurah}
                value={rangeEnd}
                onChange={(e) => setRangeEnd(Number(e.target.value))}
                className="w-20 px-2 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-center font-bold font-sans text-slate-800 dark:text-slate-100 focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-between gap-3">
              <span className="text-slate-600 dark:text-slate-400">عدد مرات التكرار:</span>
              <select
                value={rangeTargetLoops}
                onChange={(e) => setRangeTargetLoops(Number(e.target.value))}
                className="w-24 px-2 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-center font-bold text-slate-800 dark:text-slate-100 focus:outline-none"
              >
                <option value={1}>مرة واحدة</option>
                <option value={3}>3 مرات</option>
                <option value={5}>5 مرات</option>
                <option value={10}>10 مرات</option>
                <option value={0}>تكرار مستمر</option>
              </select>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                onClick={startRangeLoop}
                className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md shadow-emerald-700/20 text-center transition"
              >
                بدء التكرار الآن
              </button>
              {isRangeLoopActive && (
                <button
                  onClick={stopRangeLoop}
                  className="px-3 py-2 rounded-xl bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 text-center transition"
                >
                  إلغاء
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
