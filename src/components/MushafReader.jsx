import React, { useState, useEffect, useRef } from 'react';
import { 
  Book, BookOpen, ShieldCheck, PlayCircle, PauseCircle, 
  Bookmark, BookmarkCheck, Share2, Info, ChevronRight, 
  ChevronLeft, Sparkles, Sliders, Eye, EyeOff, Layers, 
  Mic, Square, Volume2, RotateCcw, Check, Loader2,
  Copy, Edit3, CheckCheck, FileText, LayoutList, Search,
  Grid, List, ArrowRight, ArrowLeft, ArrowUpRight, Hash,
  Tag, Clock, Award, MoveRight, MoveLeft, Moon, Sun,
  Image as ImageIcon, Type, X
} from 'lucide-react';
import { SURAHS_INDEX, SURAH_DETAILS, fetchSurahData } from '../data/quranData';
import { ALL_114_SURAHS, getSurahByNumber } from '../data/allSurahs';
import { QURAN_PARTS_30 } from '../data/quranParts';
import { SURAH_START_PAGES, fetchMushafPage, getMushafPageImageUrl, preloadAdjacentPageImages } from '../data/mushafPageService';

export default function MushafReader({
  activeSurahId,
  setActiveSurahId,
  currentAyahNumber,
  setCurrentAyahNumber,
  isPlaying,
  setIsPlaying,
  bookmarks,
  toggleBookmark
}) {
  // Main Section Screen: 'reader' (قراءة وتلاوة) or 'fahris' (فهرس المصحف الشريف)
  const [sectionScreen, setSectionScreen] = useState('reader');

  // Fahris Hub state
  const [fahrisTab, setFahrisTab] = useState('surahs'); // 'surahs' | 'juz' | 'bookmarks'
  const [fahrisViewType, setFahrisViewType] = useState('grid'); // 'grid' | 'table'
  const [fahrisSearch, setFahrisSearch] = useState('');
  const [fahrisFilter, setFahrisFilter] = useState('all'); // 'all' | 'Meccan' | 'Medinan' | 'juz_amma' | 'tiwal' | 'musabbihat'

  // Real Mushaf 604-Page Pagination state
  const [currentPageNumber, setCurrentPageNumber] = useState(() => {
    return SURAH_START_PAGES[activeSurahId] || 1;
  });
  const [currentPageData, setCurrentPageData] = useState(null);
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [isPageImageLoading, setIsPageImageLoading] = useState(false);
  const [pageImageError, setPageImageError] = useState(false);
  const [pageJumpInput, setPageJumpInput] = useState('');

  // Reader Settings
  const [viewMode, setViewMode] = useState('page'); // 'page' (الصفحة المصحفية الطبيعية) or 'list'
  const [pageDisplayMode, setPageDisplayMode] = useState('printed'); // 'printed' (المصحف الورقي المطبوع) | 'digital' (النص الرقمي)
  const [nightReadingMode, setNightReadingMode] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);
  const [showPageCompanion, setShowPageCompanion] = useState(true);
  const [showTranslation, setShowTranslation] = useState(true);
  const [showTajweedColors, setShowTajweedColors] = useState(true);
  const [fontSize, setFontSize] = useState(26);
  const [selectedTafsirAyah, setSelectedTafsirAyah] = useState(null);
  const [activeTafsirTab, setActiveTafsirTab] = useState('saadi');
  const [copiedAyahNumber, setCopiedAyahNumber] = useState(null);

  // Quick Surah Switcher Drawer
  const [isQuickDrawerOpen, setIsQuickDrawerOpen] = useState(false);
  const [drawerSearch, setDrawerSearch] = useState('');

  // Reflection / Tadabbur Notes state
  const [activeNoteAyah, setActiveNoteAyah] = useState(null);
  const [notes, setNotes] = useState(() => {
    try {
      const saved = localStorage.getItem('aiquran_user_reflections');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [currentNoteText, setCurrentNoteText] = useState('');

  // Dynamic Surah state for list view
  const [surahData, setSurahData] = useState(SURAH_DETAILS[activeSurahId] || SURAH_DETAILS[1]);
  const [isLoadingSurah, setIsLoadingSurah] = useState(false);

  // User Voice Notes recorded on Ayahs: { [ayahKey]: audioUrl }
  const [userAyahRecordings, setUserAyahRecordings] = useState(() => {
    try {
      const saved = localStorage.getItem('aiquran_ayah_recordings_meta');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [activeRecordingAyah, setActiveRecordingAyah] = useState(null);
  const [playingUserAudioKey, setPlayingUserAudioKey] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const userAudioPlayerRef = useRef(null);
  const ayahRefs = useRef({});
  const readerScrollRef = useRef(null);

  // Convert numbers to authentic Arabic calligraphy numerals (e.g. 293 -> ٢٩٣)
  const toArabicNumerals = (n) => {
    return String(n).replace(/[0-9]/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
  };

  // Auto-scroll reader to top whenever page changes
  useEffect(() => {
    if (readerScrollRef.current) {
      readerScrollRef.current.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [currentPageNumber, sectionScreen]);

  // Sync starting page when activeSurahId changes from outside
  useEffect(() => {
    const startPage = SURAH_START_PAGES[activeSurahId] || 1;
    setCurrentPageNumber(startPage);
  }, [activeSurahId]);

  // Fetch page data whenever currentPageNumber changes
  useEffect(() => {
    let isMounted = true;
    setIsLoadingPage(true);
    setIsPageImageLoading(true);
    setPageImageError(false);

    fetchMushafPage(currentPageNumber).then(page => {
      if (isMounted && page) {
        setCurrentPageData(page);
        setIsLoadingPage(false);

        // Also sync activeSurahId to the first Surah on this page if changed
        if (page.ayahs && page.ayahs.length > 0) {
          const firstAyahSurah = page.ayahs[0].surahNumber;
          if (firstAyahSurah && firstAyahSurah !== activeSurahId) {
            setActiveSurahId(firstAyahSurah);
          }
        }
      }
    }).catch(() => {
      if (isMounted) setIsLoadingPage(false);
    });

    return () => { isMounted = false; };
  }, [currentPageNumber]);

  // Load Surah dynamically for List View
  useEffect(() => {
    let isMounted = true;
    setIsLoadingSurah(true);

    fetchSurahData(activeSurahId).then(data => {
      if (isMounted && data) {
        setSurahData(data);
        setIsLoadingSurah(false);
      }
    }).catch(() => {
      if (isMounted) setIsLoadingSurah(false);
    });

    return () => { isMounted = false; };
  }, [activeSurahId]);

  // Keyboard arrow listener for page turning
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Avoid turning pages if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;

      if (viewMode === 'page' && sectionScreen === 'reader') {
        if (e.key === 'ArrowLeft') {
          // Next page in RTL
          if (currentPageNumber < 604) setCurrentPageNumber(prev => prev + 1);
        } else if (e.key === 'ArrowRight') {
          // Prev page in RTL
          if (currentPageNumber > 1) setCurrentPageNumber(prev => prev - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode, sectionScreen, currentPageNumber]);

  // Auto-scroll to active ayah when playing in list mode
  useEffect(() => {
    if (isPlaying && currentAyahNumber && ayahRefs.current[currentAyahNumber]) {
      ayahRefs.current[currentAyahNumber]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [currentAyahNumber, isPlaying]);

  // Filter 114 Surahs in Fahris
  const filteredFahrisSurahs = ALL_114_SURAHS.filter(s => {
    if (fahrisSearch.trim()) {
      const q = fahrisSearch.toLowerCase().trim();
      const matchText = s.arabic.includes(q) || s.english.toLowerCase().includes(q) || s.number.toString() === q;
      if (!matchText) return false;
    }

    if (fahrisFilter === 'Meccan') return s.type === 'Meccan';
    if (fahrisFilter === 'Medinan') return s.type === 'Medinan';
    if (fahrisFilter === 'juz_amma') return s.number >= 78 && s.number <= 114;
    if (fahrisFilter === 'tiwal') return [2, 3, 4, 5, 6, 7, 9].includes(s.number);
    if (fahrisFilter === 'musabbihat') return [57, 59, 61, 62, 64, 87].includes(s.number);
    return true;
  });

  // Filter surahs in quick drawer
  const filteredDrawerSurahs = ALL_114_SURAHS.filter(s => {
    if (!drawerSearch.trim()) return true;
    const q = drawerSearch.toLowerCase().trim();
    return s.arabic.includes(q) || s.english.toLowerCase().includes(q) || s.number.toString() === q;
  });

  const goToNextPage = () => {
    if (currentPageNumber < 604) {
      setCurrentPageNumber(prev => prev + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPageNumber > 1) {
      setCurrentPageNumber(prev => prev - 1);
    }
  };

  const handleTouchStart = (e) => {
    if (e.touches && e.touches.length === 1) {
      setTouchStartX(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null || !e.changedTouches || e.changedTouches.length === 0) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartX;
    if (diff > 50) {
      // Swiped right -> In RTL layout, this turns to previous page
      goToPrevPage();
    } else if (diff < -50) {
      // Swiped left -> In RTL layout, this turns to next page
      goToNextPage();
    }
    setTouchStartX(null);
  };

  const handlePageJumpSubmit = (e) => {
    e.preventDefault();
    const p = parseInt(pageJumpInput, 10);
    if (!isNaN(p) && p >= 1 && p <= 604) {
      setCurrentPageNumber(p);
      setPageJumpInput('');
    }
  };

  const handleSelectSurahFromFahris = (surahNum, targetAyah = 1) => {
    setActiveSurahId(surahNum);
    const startPage = SURAH_START_PAGES[surahNum] || 1;
    setCurrentPageNumber(startPage);
    setCurrentAyahNumber(targetAyah);
    setSectionScreen('reader');
  };

  const copyAyahToClipboard = (ayah) => {
    const textToCopy = `﴿${ayah.arabic}﴾ [سورة ${surahData.arabic}: ${ayah.numberInSurah}]`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopiedAyahNumber(ayah.numberInSurah);
      setTimeout(() => setCopiedAyahNumber(null), 2500);
    });
  };

  const openNoteEditor = (ayah) => {
    setActiveNoteAyah(ayah);
    const key = `${activeSurahId}:${ayah.numberInSurah}`;
    setCurrentNoteText(notes[key] || '');
  };

  const saveNote = () => {
    if (!activeNoteAyah) return;
    const key = `${activeSurahId}:${activeNoteAyah.numberInSurah}`;
    const updated = { ...notes };
    if (currentNoteText.trim()) {
      updated[key] = currentNoteText.trim();
    } else {
      delete updated[key];
    }
    setNotes(updated);
    try {
      localStorage.setItem('aiquran_user_reflections', JSON.stringify(updated));
    } catch (e) {
      console.warn(e);
    }
    setActiveNoteAyah(null);
  };

  // Determine current page primary Surah & Juz names
  const pageFirstAyah = currentPageData?.ayahs?.[0];
  const pageSurahName = pageFirstAyah?.surahName || surahData.arabic;
  const pageJuzNumber = pageFirstAyah?.juz || Math.ceil(activeSurahId / 4);

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden" dir="rtl">
      <audio
        ref={userAudioPlayerRef}
        onEnded={() => setPlayingUserAudioKey(null)}
      />

      {/* ========================================================================= */}
      {/* 1. FAHRIS HUB (فهرس المصحف الشريف الشامل)                                   */}
      {/* ========================================================================= */}
      {sectionScreen === 'fahris' ? (
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 max-w-7xl mx-auto w-full pb-36 animate-fade-in space-y-6">
          
          {/* Fahris Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200/80 dark:border-emerald-900/40">
            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 px-3.5 py-1.5 rounded-full text-xs font-bold font-arabic mb-2">
                <Book className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>فهرس المصحف الشريف المعتمد</span>
                <span className="font-sans text-[10px]" dir="ltr">604 Pages Medina Mushaf</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold font-arabic text-stone-900 dark:text-stone-100">
                فهرس السور والأجزاء وصفحات المصحف
              </h1>
              <p className="text-xs text-stone-500 dark:text-stone-400 font-arabic mt-1">
                دليل كامل للـ 114 سورة والـ 30 جزءاً والـ 604 صفحات بحسب مصحف مجمع الملك فهد لطباعة المصحف الشريف.
              </p>
            </div>

            {/* Return to Reader Button */}
            <button
              onClick={() => setSectionScreen('reader')}
              className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold font-arabic text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/20 transition shrink-0"
            >
              <BookOpen size={16} />
              <span>العودة لصفحة {currentPageNumber} بالمصحف</span>
              <ChevronLeft size={16} />
            </button>
          </div>

          {/* Fahris Navigation Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-[#121E1A] p-2 rounded-2xl border border-stone-200/80 dark:border-emerald-900/50 shadow-sm">
            <div className="flex items-center gap-1.5 text-xs font-arabic">
              <button
                onClick={() => setFahrisTab('surahs')}
                className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 ${
                  fahrisTab === 'surahs'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-emerald-950/40'
                }`}
              >
                <Layers size={15} />
                <span>فهرس السور (114)</span>
              </button>
              <button
                onClick={() => setFahrisTab('juz')}
                className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 ${
                  fahrisTab === 'juz'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-emerald-950/40'
                }`}
              >
                <Hash size={15} />
                <span>الأجزاء والأحزاب (30)</span>
              </button>
              <button
                onClick={() => setFahrisTab('bookmarks')}
                className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 ${
                  fahrisTab === 'bookmarks'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-emerald-950/40'
                }`}
              >
                <Bookmark size={15} />
                <span>العلامات والوقفات ({bookmarks.length})</span>
              </button>
            </div>

            {/* View Mode Switcher (Grid vs Table) when on Surahs tab */}
            {fahrisTab === 'surahs' && (
              <div className="flex items-center gap-1 bg-stone-100 dark:bg-emerald-950/40 p-1 rounded-xl">
                <button
                  onClick={() => setFahrisViewType('grid')}
                  className={`p-1.5 rounded-lg transition ${
                    fahrisViewType === 'grid' 
                      ? 'bg-white dark:bg-emerald-800 text-emerald-700 dark:text-emerald-100 shadow-sm' 
                      : 'text-stone-400 hover:text-stone-600'
                  }`}
                  title="عرض شبكي للبطاقات"
                >
                  <Grid size={15} />
                </button>
                <button
                  onClick={() => setFahrisViewType('table')}
                  className={`p-1.5 rounded-lg transition ${
                    fahrisViewType === 'table' 
                      ? 'bg-white dark:bg-emerald-800 text-emerald-700 dark:text-emerald-100 shadow-sm' 
                      : 'text-stone-400 hover:text-stone-600'
                  }`}
                  title="عرض قائمة تفصيلية"
                >
                  <List size={15} />
                </button>
              </div>
            )}
          </div>

          {/* TAB 1: FAHRIS SURAHS */}
          {fahrisTab === 'surahs' && (
            <div className="space-y-4">
              
              {/* Search & Filter Pills */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="relative flex-1 max-w-md">
                  <input
                    type="text"
                    value={fahrisSearch}
                    onChange={(e) => setFahrisSearch(e.target.value)}
                    placeholder="ابحث باسم السورة، رقمها، معناها..."
                    className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-2xl bg-white dark:bg-[#121E1A] border border-stone-200/80 dark:border-emerald-900/60 font-arabic text-stone-800 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 shadow-sm"
                  />
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                </div>

                <div className="flex flex-wrap gap-1.5 text-xs font-arabic">
                  {[
                    { id: 'all', label: 'الكل (114)' },
                    { id: 'Meccan', label: 'مكية' },
                    { id: 'Medinan', label: 'مدنية' },
                    { id: 'juz_amma', label: 'جزء عم' },
                    { id: 'tiwal', label: 'السبع الطوال' },
                    { id: 'musabbihat', label: 'المسبحات' }
                  ].map(f => (
                    <button
                      key={f.id}
                      onClick={() => setFahrisFilter(f.id)}
                      className={`px-3 py-1.5 rounded-xl transition font-medium ${
                        fahrisFilter === f.id
                          ? 'bg-emerald-700 text-white shadow-sm font-bold'
                          : 'bg-white dark:bg-[#121E1A] border border-stone-200/80 dark:border-emerald-900/40 text-stone-600 dark:text-stone-300 hover:bg-stone-50'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* GRID VIEW */}
              {fahrisViewType === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
                  {filteredFahrisSurahs.map(s => {
                    const startPage = SURAH_START_PAGES[s.number] || 1;
                    const isCurrent = s.number === activeSurahId;
                    return (
                      <div
                        key={s.number}
                        onClick={() => handleSelectSurahFromFahris(s.number)}
                        className={`p-4 rounded-3xl border-2 cursor-pointer transition-all hover:scale-[1.02] flex items-center justify-between group ${
                          isCurrent
                            ? 'border-emerald-600 bg-emerald-50/80 dark:bg-emerald-950/60 shadow-md shadow-emerald-700/10'
                            : 'border-stone-200/80 dark:border-emerald-900/40 bg-white dark:bg-[#121E1A] hover:border-emerald-400'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-xs font-sans shadow-sm ${
                            isCurrent
                              ? 'bg-emerald-600 text-white'
                              : 'bg-stone-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 group-hover:bg-emerald-600 group-hover:text-white transition'
                          }`}>
                            {s.number}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-base font-arabic text-stone-900 dark:text-stone-100">
                                سورة {s.arabic}
                              </h4>
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-stone-100 dark:bg-emerald-950/60 text-stone-500 dark:text-stone-400 font-arabic">
                                {s.type === 'Meccan' ? 'مكية' : 'مدنية'}
                              </span>
                            </div>
                            <div className="text-[11px] text-stone-400 font-sans mt-0.5" dir="ltr">
                              {s.english} • {s.ayahs} Verses
                            </div>
                          </div>
                        </div>

                        <div className="text-left">
                          <span className="text-[11px] font-arabic font-bold text-emerald-700 dark:text-emerald-300 block">
                            صفحة {startPage}
                          </span>
                          <span className="text-[10px] text-stone-400 font-arabic block mt-0.5">
                            جزء {s.juz}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* TABLE VIEW */
                <div className="bg-white dark:bg-[#121E1A] rounded-3xl border border-stone-200/80 dark:border-emerald-900/40 overflow-hidden shadow-sm">
                  <div className="grid grid-cols-12 p-3.5 bg-stone-50 dark:bg-emerald-950/40 border-b border-stone-200/80 dark:border-emerald-900/40 text-xs font-bold font-arabic text-stone-500 dark:text-stone-400">
                    <span className="col-span-1 text-center font-sans">#</span>
                    <span className="col-span-4">اسم السورة المباركة</span>
                    <span className="col-span-2 text-center">النزول</span>
                    <span className="col-span-2 text-center">عدد الآيات</span>
                    <span className="col-span-2 text-center">الصفحة</span>
                    <span className="col-span-1 text-left">قراءة</span>
                  </div>

                  <div className="divide-y divide-stone-100 dark:divide-emerald-950/40 max-h-[60vh] overflow-y-auto">
                    {filteredFahrisSurahs.map(s => {
                      const startPage = SURAH_START_PAGES[s.number] || 1;
                      return (
                        <div
                          key={s.number}
                          onClick={() => handleSelectSurahFromFahris(s.number)}
                          className="grid grid-cols-12 p-3.5 items-center hover:bg-emerald-50/70 dark:hover:bg-emerald-950/40 cursor-pointer transition text-xs font-arabic text-stone-800 dark:text-stone-200"
                        >
                          <span className="col-span-1 text-center font-sans font-bold text-stone-400">
                            {s.number}
                          </span>
                          <div className="col-span-4">
                            <strong className="text-sm font-bold font-arabic block text-stone-900 dark:text-stone-100">
                              سورة {s.arabic}
                            </strong>
                            <span className="text-[10px] text-stone-400 font-sans" dir="ltr">
                              {s.english} - {s.meaning}
                            </span>
                          </div>
                          <span className="col-span-2 text-center">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              s.type === 'Meccan' 
                                ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300' 
                                : 'bg-teal-100 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300'
                            }`}>
                              {s.type === 'Meccan' ? 'مكية' : 'مدنية'}
                            </span>
                          </span>
                          <span className="col-span-2 text-center font-sans font-bold">
                            {s.ayahs} آية
                          </span>
                          <span className="col-span-2 text-center font-bold text-emerald-700 dark:text-emerald-300">
                            صفحة {startPage}
                          </span>
                          <div className="col-span-1 text-left">
                            <button className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-600 hover:text-white transition">
                              <BookOpen size={14} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 2: FAHRIS AJZA' (30 JUZ) */}
          {fahrisTab === 'juz' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {QURAN_PARTS_30.map(part => {
                const partStartPage = SURAH_START_PAGES[part.startSurahId] || 1;
                return (
                  <div
                    key={part.juz}
                    onClick={() => {
                      setCurrentPageNumber(partStartPage);
                      setActiveSurahId(part.startSurahId);
                      setCurrentAyahNumber(part.startAyah);
                      setSectionScreen('reader');
                    }}
                    className="p-5 rounded-3xl bg-white dark:bg-[#121E1A] border border-stone-200/80 dark:border-emerald-900/40 hover:border-emerald-500 hover:shadow-md cursor-pointer transition group"
                  >
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-100 dark:border-emerald-950/50">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-2xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-bold text-sm font-sans">
                          {part.juz}
                        </div>
                        <div>
                          <h4 className="font-bold text-base font-arabic text-stone-900 dark:text-stone-100">
                            الجزء {part.juz}
                          </h4>
                          <span className="text-[10px] text-stone-400 font-sans" dir="ltr">
                            Starts at Page {partStartPage}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs px-2.5 py-1 rounded-full bg-stone-100 dark:bg-emerald-950/60 text-stone-600 dark:text-stone-300 font-arabic">
                        الحزب {part.juz * 2 - 1}
                      </span>
                    </div>

                    <p className="font-arabic font-bold text-sm text-emerald-900 dark:text-emerald-200 mb-2 leading-relaxed">
                      «{part.nameAr}»
                    </p>

                    <div className="text-xs text-stone-500 dark:text-stone-400 font-arabic space-y-1">
                      <div className="flex justify-between">
                        <span>بداية الجزء:</span>
                        <strong className="text-stone-800 dark:text-stone-200">سورة {part.startSurahName} (صفحة {partStartPage})</strong>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-stone-100 dark:border-emerald-950/40 flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400 font-arabic group-hover:text-emerald-500">
                      <span>فتح بداية الجزء بالمصحف</span>
                      <ArrowLeft size={14} className="group-hover:-translate-x-1 transition" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 3: BOOKMARKS & NOTES */}
          {fahrisTab === 'bookmarks' && (
            <div className="space-y-4">
              {bookmarks.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {bookmarks.map((bmKey, i) => {
                    const [sId, aNum] = bmKey.split(':').map(Number);
                    const sMeta = getSurahByNumber(sId);
                    const startPage = SURAH_START_PAGES[sId] || 1;
                    const noteKey = `${sId}:${aNum}`;
                    const noteText = notes[noteKey];

                    return (
                      <div
                        key={i}
                        onClick={() => {
                          setCurrentPageNumber(startPage);
                          setActiveSurahId(sId);
                          setCurrentAyahNumber(aNum);
                          setSectionScreen('reader');
                        }}
                        className="p-5 rounded-3xl bg-white dark:bg-[#121E1A] border border-stone-200/80 dark:border-emerald-900/40 hover:border-amber-400 cursor-pointer transition group"
                      >
                        <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-100 dark:border-emerald-950/40">
                          <div className="flex items-center gap-2">
                            <Bookmark className="w-5 h-5 text-amber-500 fill-amber-500" />
                            <h4 className="font-bold text-base font-arabic text-stone-900 dark:text-stone-100">
                              سورة {sMeta.arabic} - الآية {aNum}
                            </h4>
                          </div>
                          <span className="text-[10px] text-stone-400 font-sans" dir="ltr">
                            {sId}:{aNum}
                          </span>
                        </div>

                        {noteText ? (
                          <div className="p-3 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-900/40 text-xs text-amber-950 dark:text-amber-200 font-arabic mb-3">
                            <span className="font-bold block mb-0.5">ملاحظة التدبر:</span>
                            {noteText}
                          </div>
                        ) : (
                          <p className="text-xs text-stone-400 font-arabic mb-3">
                            علامة مرجعية محفوظة للرجوع للقراءة والتلاوة.
                          </p>
                        )}

                        <div className="flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400 font-arabic">
                          <span>انتقل إلى الآية بصفحة {startPage}</span>
                          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-16 bg-white dark:bg-[#121E1A] rounded-3xl border border-stone-200/80 dark:border-emerald-900/40">
                  <Bookmark className="w-12 h-12 mx-auto text-amber-500 opacity-40 mb-3" />
                  <h4 className="font-bold text-base font-arabic text-stone-900 dark:text-stone-100 mb-1">
                    لا توجد علامات مرجعية محفوظة بعد
                  </h4>
                  <p className="text-xs text-stone-400 font-arabic max-w-sm mx-auto">
                    اضغط على أيقونة الإشارة المرجعية بجانب أي آية لحفظها هنا.
                  </p>
                </div>
              )}
            </div>
          )}

        </div>
      ) : (
        /* ========================================================================= */
        /* 2. REAL NORMAL MUSHAF READING VIEW (الصفحة المصحفية الحقيقية 1 - 604)        */
        /* ========================================================================= */
        <div ref={readerScrollRef} className="flex-1 flex flex-col h-full overflow-y-auto pb-36 scroll-smooth">
          
          {/* Top Reading Toolbar */}
          <div className="sticky top-0 z-20 bg-white/95 dark:bg-[#111A17]/95 backdrop-blur-md border-b border-stone-200/80 dark:border-emerald-900/40 px-3 sm:px-8 py-2.5 flex items-center justify-between gap-3 shadow-sm">
            
            {/* Right: Fahris Button & Quick Switcher */}
            <div className="flex items-center gap-2">
              
              {/* FAHRIS BUTTON */}
              <button
                onClick={() => setSectionScreen('fahris')}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-arabic font-bold text-xs flex items-center gap-1.5 shadow-sm active:scale-95 transition"
                title="فتح فهرس المصحف الشريف"
              >
                <Layers size={15} />
                <span className="hidden sm:inline">فهرس المصحف</span>
                <span className="sm:hidden">الفهرس</span>
              </button>

              {/* Quick Surah Drawer */}
              <button
                onClick={() => setIsQuickDrawerOpen(true)}
                className="p-1.5 rounded-xl bg-stone-100 dark:bg-emerald-950/60 text-stone-700 dark:text-stone-200 hover:bg-stone-200 transition"
                title="قائمة السور السريعة"
              >
                <Book size={16} />
              </button>

              {/* Header Details */}
              <div className="hidden md:flex items-center gap-2 mr-2">
                <span className="font-bold font-arabic text-sm text-stone-800 dark:text-stone-100">
                  سورة {pageSurahName}
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-arabic font-bold">
                  الجزء {pageJuzNumber}
                </span>
              </div>
            </div>

            {/* Page Jumping Form (1 to 604) */}
            <div className="flex items-center gap-1.5 bg-stone-100 dark:bg-emerald-950/50 px-2.5 py-1 rounded-2xl text-xs font-arabic">
              <span className="text-stone-500 text-[11px]">صفحة</span>
              <form onSubmit={handlePageJumpSubmit} className="flex items-center">
                <input
                  type="number"
                  min={1}
                  max={604}
                  value={pageJumpInput !== '' ? pageJumpInput : currentPageNumber}
                  onFocus={() => setPageJumpInput(currentPageNumber.toString())}
                  onChange={(e) => setPageJumpInput(e.target.value)}
                  onBlur={() => {
                    const p = parseInt(pageJumpInput, 10);
                    if (!isNaN(p) && p >= 1 && p <= 604) {
                      setCurrentPageNumber(p);
                    }
                    setPageJumpInput('');
                  }}
                  className="w-12 text-center font-bold font-sans rounded-lg bg-white dark:bg-emerald-900/60 border border-stone-200 dark:border-emerald-800 text-stone-800 dark:text-stone-100 py-0.5 focus:outline-none"
                  title="اكتب رقم الصفحة ثم اضغط Enter (1 - 604)"
                />
              </form>
              <span className="text-stone-400 text-[11px] font-sans" dir="ltr">/ 604</span>
            </div>

            {/* View Mode & Text preferences */}
            <div className="flex items-center gap-2">
              
              {/* Primary View Switcher (Page Mode vs List Cards) */}
              <div className="flex items-center bg-stone-100 dark:bg-emerald-950/60 p-1 rounded-xl text-xs font-arabic">
                <button
                  onClick={() => setViewMode('page')}
                  className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
                    viewMode === 'page' 
                      ? 'bg-white dark:bg-emerald-800 text-emerald-800 dark:text-emerald-100 font-bold shadow-sm' 
                      : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
                  }`}
                  title="عرض صفحات المصحف الشريف"
                >
                  <Book size={13} />
                  <span>صفحات المصحف</span>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
                    viewMode === 'list' 
                      ? 'bg-white dark:bg-emerald-800 text-emerald-800 dark:text-emerald-100 font-bold shadow-sm' 
                      : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
                  }`}
                  title="عرض الآيات مع الترجمة الإنجليزية والتفسير"
                >
                  <LayoutList size={13} />
                  <span className="hidden sm:inline">آيات وترجمة</span>
                </button>
              </div>

              {/* Sub-mode for Page View: Printed Real Page vs Digital Text */}
              {viewMode === 'page' && (
                <div className="flex items-center bg-stone-100 dark:bg-emerald-950/60 p-1 rounded-xl text-xs font-arabic">
                  <button
                    onClick={() => setPageDisplayMode('printed')}
                    className={`px-2 py-1 rounded-lg transition-all flex items-center gap-1 ${
                      pageDisplayMode === 'printed'
                        ? 'bg-white dark:bg-emerald-800 text-emerald-800 dark:text-emerald-100 font-bold shadow-sm'
                        : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
                    }`}
                    title="المصحف الورقي المطبوع (الصفحات الأصلية لمصحف المدينة)"
                  >
                    <ImageIcon size={13} />
                    <span className="hidden xs:inline sm:inline">المصحف المطبوع</span>
                  </button>
                  <button
                    onClick={() => setPageDisplayMode('digital')}
                    className={`px-2 py-1 rounded-lg transition-all flex items-center gap-1 ${
                      pageDisplayMode === 'digital'
                        ? 'bg-white dark:bg-emerald-800 text-emerald-800 dark:text-emerald-100 font-bold shadow-sm'
                        : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
                    }`}
                    title="المصحف الرقمي (نص تفاعلي بالخط العثماني)"
                  >
                    <Type size={13} />
                    <span className="hidden xs:inline sm:inline">رسم عثماني</span>
                  </button>
                </div>
              )}

              {/* Night Reading Mode Toggle */}
              {viewMode === 'page' && (
                <button
                  onClick={() => setNightReadingMode(!nightReadingMode)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-arabic font-semibold flex items-center gap-1.5 transition ${
                    nightReadingMode 
                      ? 'bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-800' 
                      : 'bg-stone-100 dark:bg-emerald-950/40 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
                  }`}
                  title="تبديل وضع القراءة الليلية الهادئة"
                >
                  {nightReadingMode ? <Sun size={13} className="text-amber-500" /> : <Moon size={13} className="text-stone-500" />}
                  <span className="hidden md:inline">{nightReadingMode ? 'نهاري' : 'قراءة ليلية'}</span>
                </button>
              )}

              {/* Font Size Adjuster (for Digital Text & List view) */}
              {(viewMode === 'list' || (viewMode === 'page' && pageDisplayMode === 'digital')) && (
                <div className="hidden sm:flex items-center gap-1 bg-stone-100 dark:bg-emerald-950/50 p-1 rounded-xl text-xs">
                  <button
                    onClick={() => setFontSize(Math.max(18, fontSize - 2))}
                    className="w-6 h-6 rounded-lg flex items-center justify-center font-bold text-stone-600 dark:text-stone-300 hover:bg-white dark:hover:bg-emerald-900/60"
                  >
                    -
                  </button>
                  <span className="text-[11px] font-sans px-1 text-stone-500" dir="ltr">{fontSize}px</span>
                  <button
                    onClick={() => setFontSize(Math.min(38, fontSize + 2))}
                    className="w-6 h-6 rounded-lg flex items-center justify-center font-bold text-stone-600 dark:text-stone-300 hover:bg-white dark:hover:bg-emerald-900/60"
                  >
                    +
                  </button>
                </div>
              )}

              {/* Tajweed Toggle (for Digital Text) */}
              {(viewMode === 'list' || (viewMode === 'page' && pageDisplayMode === 'digital')) && (
                <button
                  onClick={() => setShowTajweedColors(!showTajweedColors)}
                  className={`px-2 py-1 rounded-xl text-xs font-arabic font-semibold flex items-center gap-1 transition ${
                    showTajweedColors 
                      ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800' 
                      : 'bg-stone-100 dark:bg-emerald-950/40 text-stone-500'
                  }`}
                  title="تلوين أحكام التجويد"
                >
                  <Sparkles size={13} className="text-amber-500" />
                  <span className="hidden md:inline">التجويد</span>
                </button>
              )}
            </div>
          </div>

          {/* Copy Notification Toast */}
          {copiedAyahNumber && (
            <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-emerald-700 text-white px-4 py-2 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-arabic animate-fade-in">
              <CheckCheck size={16} />
              <span>تم نسخ الآية {copiedAyahNumber} مع التوثيق إلى الحافظة بنجاح</span>
            </div>
          )}

          {/* ========================================================================= */}
          {/* AUTHENTIC NORMAL MUSHAF PAGE (1 TO 604)                                   */}
          {/* ========================================================================= */}
          {viewMode === 'page' ? (
            <div className="flex-1 flex flex-col items-center justify-center p-3 sm:p-6 w-full max-w-4xl mx-auto">
              
              {/* Main Page Flipping Frame Container */}
              <div className="w-full relative flex items-center justify-center gap-2 sm:gap-4">
                
                {/* PREV PAGE FLIP BUTTON (Right in RTL = Previous Page) */}
                <button
                  onClick={goToPrevPage}
                  disabled={currentPageNumber <= 1}
                  className="hidden sm:flex flex-col items-center justify-center w-12 h-28 rounded-2xl bg-white/80 dark:bg-emerald-950/40 hover:bg-emerald-50 dark:hover:bg-emerald-900/40 border border-stone-200/80 dark:border-emerald-900/50 text-stone-600 dark:text-stone-300 disabled:opacity-20 shadow-md transition-all hover:scale-105 active:scale-95 group shrink-0"
                  title="الصفحة السابقة (Arrow Right)"
                >
                  <ChevronRight size={24} className="group-hover:text-emerald-600 transition" />
                  <span className="text-[10px] font-arabic mt-1">السابقة</span>
                </button>

                {/* THE REAL NORMAL MUSHAF PAGE CANVAS (PRINTED OR DIGITAL) */}
                {pageDisplayMode === 'printed' ? (
                  <div 
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    className={`w-full max-w-xl sm:max-w-2xl ${
                      nightReadingMode 
                        ? 'bg-[#0C1512] border-emerald-800/80 text-emerald-100' 
                        : 'bg-[#FFFDF8] border-[#C8A97E] text-stone-900'
                    } border-4 sm:border-[6px] rounded-3xl shadow-2xl p-3.5 sm:p-7 relative overflow-hidden flex flex-col justify-between transition-all duration-300 select-none`}
                    style={{
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), inset 0 0 35px rgba(200, 169, 126, 0.12)'
                    }}
                  >
                    {/* Decorative Corner Flourishes */}
                    <div className="absolute top-2 right-2 w-7 h-7 border-t-2 border-r-2 border-[#C8A97E] dark:border-emerald-700 rounded-tr-lg pointer-events-none" />
                    <div className="absolute top-2 left-2 w-7 h-7 border-t-2 border-l-2 border-[#C8A97E] dark:border-emerald-700 rounded-tl-lg pointer-events-none" />
                    <div className="absolute bottom-2 right-2 w-7 h-7 border-b-2 border-r-2 border-[#C8A97E] dark:border-emerald-700 rounded-br-lg pointer-events-none" />
                    <div className="absolute bottom-2 left-2 w-7 h-7 border-b-2 border-l-2 border-[#C8A97E] dark:border-emerald-700 rounded-bl-lg pointer-events-none" />

                    {/* Inner Fine Border */}
                    <div className="absolute inset-2 sm:inset-3 border border-[#C8A97E]/40 dark:border-emerald-800/40 rounded-2xl pointer-events-none" />

                    {/* TOP HEADER OF NORMAL MUSHAF PAGE */}
                    <div className="relative z-10 flex items-center justify-between pb-2.5 border-b-2 border-[#C8A97E]/50 dark:border-emerald-800/50 mb-3 text-[#8C6D38] dark:text-emerald-400 font-arabic text-xs sm:text-sm font-bold">
                      <div className="flex items-center gap-1.5">
                        <span className="opacity-80">سُورَةُ</span>
                        <span className="text-stone-900 dark:text-emerald-200">{pageSurahName}</span>
                      </div>

                      {/* Mode switch pill directly on the page header */}
                      <div className="flex items-center gap-1 bg-[#F3EAD7] dark:bg-emerald-950/80 p-0.5 rounded-full border border-[#C8A97E]/40 text-[10px]">
                        <button
                          onClick={() => setPageDisplayMode('printed')}
                          className={`px-2.5 py-0.5 rounded-full font-bold transition-all ${
                            pageDisplayMode === 'printed'
                              ? 'bg-[#8C6D38] text-white shadow-xs'
                              : 'text-[#8C6D38] dark:text-emerald-400'
                          }`}
                        >
                          مصحف المدينة
                        </button>
                        <button
                          onClick={() => setPageDisplayMode('digital')}
                          className={`px-2.5 py-0.5 rounded-full font-bold transition-all ${
                            pageDisplayMode === 'digital'
                              ? 'bg-[#8C6D38] text-white shadow-xs'
                              : 'text-[#8C6D38] dark:text-emerald-400'
                          }`}
                        >
                          رسم عثماني
                        </button>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="opacity-80">الجُزْءُ</span>
                        <span className="text-stone-900 dark:text-emerald-200">{pageJuzNumber}</span>
                      </div>
                    </div>

                    {/* AUTHENTIC NORMAL MUSHAF PAGE IMAGE PLATE OR FALLBACK */}
                    <div className="relative z-10 flex items-center justify-center my-2 min-h-[380px] sm:min-h-[480px]">
                      {isPageImageLoading && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#FAF7EE]/90 dark:bg-[#0C1512]/90 z-20 backdrop-blur-xs">
                          <Loader2 className="w-9 h-9 text-[#C8A97E] dark:text-emerald-500 animate-spin mb-2" />
                          <span className="text-xs font-arabic text-[#8C6D38] dark:text-emerald-400 font-bold">
                            جاري فتح الصفحة {toArabicNumerals(currentPageNumber)} بالرسم العثماني...
                          </span>
                        </div>
                      )}

                      {pageImageError ? (
                        /* Graceful immediate fallback if plate fails to load */
                        <div className="w-full py-4 text-center">
                          <div className="mb-4 p-2.5 bg-amber-50 dark:bg-amber-950/40 rounded-2xl border border-amber-200 dark:border-amber-800/50 max-w-sm mx-auto flex items-center justify-between gap-2 text-xs font-arabic">
                            <span className="text-amber-800 dark:text-amber-300 font-bold">
                              تم عرض الآيات بالرسم العثماني التفاعلي
                            </span>
                            <button
                              onClick={() => {
                                setPageImageError(false);
                                setIsPageImageLoading(true);
                              }}
                              className="px-2.5 py-1 bg-amber-600 text-white rounded-lg text-[10px] font-bold"
                            >
                              إعادة المحاولة
                            </button>
                          </div>

                          <div 
                            className="text-justify font-arabic text-[#2A1E11] dark:text-stone-100 leading-[2.8] sm:leading-[3.2] px-2"
                            style={{ 
                              fontSize: `${fontSize}px`, 
                              fontFamily: "'Amiri', 'Cairo', serif",
                              textAlignLast: currentPageData?.ayahs?.length && currentPageData.ayahs.length <= 5 ? 'center' : 'justify'
                            }}
                          >
                            {currentPageData?.ayahs?.map((ayah) => {
                              const isCurrentPlaying = isPlaying && currentAyahNumber === ayah.numberInSurah && activeSurahId === ayah.surahNumber;
                              const isBookmarked = bookmarks.includes(`${ayah.surahNumber}:${ayah.numberInSurah}`);

                              return (
                                <span key={ayah.number}>
                                  <span className={isCurrentPlaying ? 'bg-emerald-200/60 dark:bg-emerald-800/50 rounded-lg px-1 transition-colors' : ''}>
                                    {ayah.arabic}
                                  </span>
                                  <span
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedTafsirAyah(ayah);
                                    }}
                                    className={`inline-flex items-center justify-center mx-1 px-1.5 py-0.5 rounded-full text-xs font-sans font-bold border transition-transform hover:scale-110 cursor-pointer select-none ${
                                      isCurrentPlaying
                                        ? 'border-emerald-600 bg-emerald-600 text-white'
                                        : isBookmarked
                                        ? 'border-amber-500 bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200'
                                        : 'border-[#C8A97E] dark:border-emerald-700 bg-[#EFE6D2] dark:bg-emerald-950/80 text-[#8C6D38] dark:text-emerald-300'
                                    }`}
                                  >
                                    ۝ {toArabicNumerals(ayah.numberInSurah)}
                                  </span>{' '}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        <img
                          key={currentPageNumber}
                          src={getMushafPageImageUrl(currentPageNumber)}
                          alt={`الصفحة ${currentPageNumber} - مصحف المدينة المنورة`}
                          onLoad={() => {
                            setIsPageImageLoading(false);
                            setPageImageError(false);
                          }}
                          onError={() => {
                            setIsPageImageLoading(false);
                            setPageImageError(true);
                          }}
                          className="w-full h-auto max-h-[75vh] object-contain transition-all duration-300 pointer-events-none select-none"
                          style={{
                            filter: nightReadingMode 
                              ? 'invert(0.92) hue-rotate(180deg) contrast(1.15) brightness(0.95)' 
                              : 'none',
                            mixBlendMode: 'normal'
                          }}
                          loading="eager"
                        />
                      )}
                    </div>

                    {/* BOTTOM FOOTER OF NORMAL MUSHAF PAGE */}
                    <div className="relative z-10 flex items-center justify-between pt-2.5 border-t-2 border-[#C8A97E]/50 dark:border-emerald-800/50 mt-3 text-[#8C6D38] dark:text-emerald-400 font-arabic text-xs font-bold">
                      {/* Hizb quarter on right in RTL */}
                      <span className="text-[11px] opacity-80">
                        الحزب {Math.ceil(pageJuzNumber * 2 - 1)}
                      </span>

                      {/* AUTHENTIC CENTERED PAGE NUMBER */}
                      <div className="flex items-center gap-1.5 text-stone-900 dark:text-emerald-200 text-sm sm:text-base font-bold font-sans" dir="ltr">
                        <span className="text-[#C8A97E] dark:text-emerald-600">—</span>
                        <span>{toArabicNumerals(currentPageNumber)}</span>
                        <span className="text-xs text-stone-400 font-normal">({currentPageNumber})</span>
                        <span className="text-[#C8A97E] dark:text-emerald-600">—</span>
                      </div>

                      {/* Surah name on left in RTL */}
                      <span className="text-[11px] opacity-80">
                        سورة {pageSurahName}
                      </span>
                    </div>

                  </div>
                ) : (
                  /* DIGITAL FLOW TEXT CANVAS */
                  <div className="w-full max-w-2xl bg-[#FAF7EE] dark:bg-[#0C1411] border-4 sm:border-[6px] border-[#C8A97E] dark:border-emerald-800/80 rounded-3xl shadow-2xl p-5 sm:p-9 relative overflow-hidden flex flex-col justify-between min-h-[680px] sm:min-h-[750px] transition-all">
                    
                    {/* Decorative Corner Flourishes */}
                    <div className="absolute top-2 right-2 w-7 h-7 border-t-2 border-r-2 border-[#C8A97E] dark:border-emerald-700 rounded-tr-lg pointer-events-none" />
                    <div className="absolute top-2 left-2 w-7 h-7 border-t-2 border-l-2 border-[#C8A97E] dark:border-emerald-700 rounded-tl-lg pointer-events-none" />
                    <div className="absolute bottom-2 right-2 w-7 h-7 border-b-2 border-r-2 border-[#C8A97E] dark:border-emerald-700 rounded-br-lg pointer-events-none" />
                    <div className="absolute bottom-2 left-2 w-7 h-7 border-b-2 border-l-2 border-[#C8A97E] dark:border-emerald-700 rounded-bl-lg pointer-events-none" />

                    {/* Inner Fine Border */}
                    <div className="absolute inset-2 sm:inset-3 border border-[#C8A97E]/40 dark:border-emerald-800/40 rounded-2xl pointer-events-none" />

                    {/* TOP HEADER OF NORMAL MUSHAF PAGE */}
                    <div className="relative z-10 flex items-center justify-between pb-3 border-b-2 border-[#C8A97E]/50 dark:border-emerald-800/50 mb-4 text-[#8C6D38] dark:text-emerald-400 font-arabic text-xs sm:text-sm font-bold">
                      <div className="flex items-center gap-1.5">
                        <span className="opacity-80">سُورَةُ</span>
                        <span className="text-stone-900 dark:text-emerald-200">{pageSurahName}</span>
                      </div>

                      <span className="text-[10px] sm:text-xs text-stone-400 font-arabic opacity-70">
                        المصحف الرقمي التفاعلي
                      </span>

                      <div className="flex items-center gap-1.5">
                        <span className="opacity-80">الجُزْءُ</span>
                        <span className="text-stone-900 dark:text-emerald-200">{pageJuzNumber}</span>
                      </div>
                    </div>

                    {/* PAGE BODY (AYAH CONTENT & SURAH HEADERS) */}
                    <div className="flex-1 flex flex-col justify-center relative z-10 py-2">
                      {isLoadingPage ? (
                        <div className="py-24 text-center">
                          <Loader2 className="w-10 h-10 mx-auto text-emerald-600 animate-spin mb-3" />
                          <p className="text-xs font-bold font-arabic text-[#8C6D38] dark:text-emerald-400">
                            جاري استحضار الصفحة {currentPageNumber} بالرسم العثماني...
                          </p>
                        </div>
                      ) : (
                        <div 
                          className="text-justify font-arabic text-[#2A1E11] dark:text-stone-100 leading-[2.8] sm:leading-[3.2]"
                          style={{ 
                            fontSize: `${fontSize}px`, 
                            fontFamily: "'Amiri', 'Cairo', serif",
                            textAlignLast: currentPageData?.ayahs?.length && currentPageData.ayahs.length <= 5 ? 'center' : 'justify'
                          }}
                        >
                          {currentPageData?.ayahs?.map((ayah, idx) => {
                            const isFirstAyahInSurah = ayah.numberInSurah === 1;
                            const isCurrentPlaying = isPlaying && currentAyahNumber === ayah.numberInSurah && activeSurahId === ayah.surahNumber;
                            const isBookmarked = bookmarks.includes(`${ayah.surahNumber}:${ayah.numberInSurah}`);

                            return (
                              <React.Fragment key={ayah.number}>
                                
                                {/* SURAH HEADER PLAQUE */}
                                {isFirstAyahInSurah && (
                                  <div className="my-5 select-none">
                                    <div className="mx-auto max-w-md p-3 rounded-2xl border-2 border-[#C8A97E] dark:border-emerald-700 bg-gradient-to-r from-[#F0E6D2] via-[#FFFDF8] to-[#F0E6D2] dark:from-[#0F1E19] dark:via-[#162B24] dark:to-[#0F1E19] text-center shadow-sm">
                                      <h3 className="text-base sm:text-lg font-bold font-arabic text-[#684B22] dark:text-emerald-300 leading-tight">
                                        سُورَةُ {ayah.surahName}
                                      </h3>
                                      <div className="text-[10px] text-[#8C6D38] dark:text-emerald-400 font-arabic mt-0.5">
                                        {ayah.revelationType === 'Meccan' ? 'مكية' : 'مدنية'} • آيَاتُهَا {ayah.numberOfAyahs}
                                      </div>
                                    </div>

                                    {/* Basmalah */}
                                    {ayah.surahNumber !== 9 && ayah.surahNumber !== 1 && (
                                      <div className="text-center my-4">
                                        <span 
                                          className="text-xl sm:text-2xl font-arabic text-[#5A4325] dark:text-emerald-200 inline-block px-6 py-1 border-b border-[#C8A97E]/40 dark:border-emerald-800/40"
                                          style={{ fontFamily: "'Amiri', serif" }}
                                        >
                                          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                )}

                                {/* Ayah Text and Verse Medallion */}
                                <span
                                  onClick={() => {
                                    setActiveSurahId(ayah.surahNumber);
                                    setCurrentAyahNumber(ayah.numberInSurah);
                                    setIsPlaying(true);
                                  }}
                                  className={`inline cursor-pointer px-1 py-0.5 rounded-lg transition-colors group relative ${
                                    isCurrentPlaying 
                                      ? 'bg-emerald-200/80 dark:bg-emerald-800/60 text-emerald-950 dark:text-emerald-100 font-bold shadow-sm' 
                                      : 'hover:bg-amber-100/70 dark:hover:bg-emerald-950/50'
                                  }`}
                                  title={`سورة ${ayah.surahName} - الآية ${ayah.numberInSurah} (انقر للاستماع)`}
                                >
                                  <span>{ayah.arabic}</span>
                                  {' '}
                                  
                                  {/* Ornamental Ayah End Medallion ۝ */}
                                  <span 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedTafsirAyah(ayah);
                                    }}
                                    className={`inline-flex items-center justify-center mx-1 px-1.5 py-0.5 rounded-full text-xs sm:text-sm font-sans font-bold border transition-transform hover:scale-110 cursor-pointer select-none ${
                                      isCurrentPlaying
                                        ? 'border-emerald-600 bg-emerald-600 text-white'
                                        : isBookmarked
                                        ? 'border-amber-500 bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200'
                                        : 'border-[#C8A97E] dark:border-emerald-700 bg-[#EFE6D2] dark:bg-emerald-950/80 text-[#8C6D38] dark:text-emerald-300'
                                    }`}
                                    title={`الآية ${ayah.numberInSurah} - انقر لعرض التفسير`}
                                  >
                                    ۝ {toArabicNumerals(ayah.numberInSurah)}
                                  </span>
                                  {' '}
                                </span>
                              </React.Fragment>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* BOTTOM FOOTER OF NORMAL MUSHAF PAGE */}
                    <div className="relative z-10 flex items-center justify-between pt-3 border-t-2 border-[#C8A97E]/50 dark:border-emerald-800/50 mt-4 text-[#8C6D38] dark:text-emerald-400 font-arabic text-xs font-bold">
                      <span className="text-[11px] opacity-80">
                        الحزب {Math.ceil(pageJuzNumber * 2 - 1)}
                      </span>

                      <div className="flex items-center gap-1 text-stone-900 dark:text-emerald-200 text-sm sm:text-base font-bold font-sans" dir="ltr">
                        <span className="text-[#C8A97E] dark:text-emerald-600">—</span>
                        <span>{toArabicNumerals(currentPageNumber)}</span>
                        <span className="text-xs text-stone-400 font-normal">({currentPageNumber})</span>
                        <span className="text-[#C8A97E] dark:text-emerald-600">—</span>
                      </div>

                      <span className="text-[11px] opacity-80">
                        سورة {pageSurahName}
                      </span>
                    </div>

                  </div>
                )}

                {/* NEXT PAGE FLIP BUTTON (Left in RTL = Next Page) */}
                <button
                  onClick={goToNextPage}
                  disabled={currentPageNumber >= 604}
                  className="hidden sm:flex flex-col items-center justify-center w-12 h-28 rounded-2xl bg-white/80 dark:bg-emerald-950/40 hover:bg-emerald-50 dark:hover:bg-emerald-900/40 border border-stone-200/80 dark:border-emerald-900/50 text-stone-600 dark:text-stone-300 disabled:opacity-20 shadow-md transition-all hover:scale-105 active:scale-95 group shrink-0"
                  title="الصفحة التالية (Arrow Left)"
                >
                  <ChevronLeft size={24} className="group-hover:text-emerald-600 transition" />
                  <span className="text-[10px] font-arabic mt-1">التالية</span>
                </button>

              </div>

              {/* PAGE NAVIGATION CONTROLS BAR (MOVED RIGHT NEXT TO THE PAGE) */}
              <div className="flex items-center justify-between w-full max-w-xl sm:max-w-2xl mt-3 px-3 sm:px-4 py-2 bg-white/90 dark:bg-[#121E1A]/90 backdrop-blur-md rounded-2xl border border-stone-200/80 dark:border-emerald-900/60 shadow-sm transition-all">
                <button
                  onClick={goToPrevPage}
                  disabled={currentPageNumber <= 1}
                  className="px-3.5 sm:px-4 py-2 rounded-xl bg-stone-100 hover:bg-emerald-50 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/60 border border-stone-200/80 dark:border-emerald-900/60 text-xs font-arabic font-bold flex items-center gap-1.5 text-stone-700 dark:text-stone-200 disabled:opacity-25 transition-all hover:scale-105 active:scale-95 shadow-xs"
                >
                  <ChevronRight size={16} />
                  <span>الصفحة السابقة</span>
                </button>

                <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-stone-100/90 dark:bg-emerald-950/50 border border-stone-200/60 dark:border-emerald-900/40">
                  <span className="text-xs font-bold font-sans text-stone-700 dark:text-stone-200" dir="ltr">
                    Page {currentPageNumber} / 604
                  </span>
                </div>

                <button
                  onClick={goToNextPage}
                  disabled={currentPageNumber >= 604}
                  className="px-3.5 sm:px-4 py-2 rounded-xl bg-stone-100 hover:bg-emerald-50 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/60 border border-stone-200/80 dark:border-emerald-900/60 text-xs font-arabic font-bold flex items-center gap-1.5 text-stone-700 dark:text-stone-200 disabled:opacity-25 transition-all hover:scale-105 active:scale-95 shadow-xs"
                >
                  <span>الصفحة التالية</span>
                  <ChevronLeft size={16} />
                </button>
              </div>

              {/* INTERACTIVE PAGE COMPANION: RECITATION & AYAH SHORTCUTS */}
              {showPageCompanion ? (
                <div className="w-full max-w-xl sm:max-w-2xl mt-6 bg-white/90 dark:bg-[#111C18]/90 backdrop-blur-md rounded-3xl border border-stone-200/80 dark:border-emerald-900/50 p-4 sm:p-5 shadow-lg relative animate-fade-in">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100 dark:border-emerald-950/60 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-700 dark:text-emerald-300">
                        <Volume2 size={16} />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs sm:text-sm font-arabic text-stone-900 dark:text-stone-100">
                          تلاوة وتفسير آيات الصفحة {toArabicNumerals(currentPageNumber)}
                        </h4>
                        <p className="text-[10px] text-stone-400 font-arabic">
                          اضغط على أي آية للاستماع المباشر أو تصفح التفسير المعتمد
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      {/* Play Full Page Audio */}
                      <button
                        onClick={() => {
                          if (!currentPageData?.ayahs?.length) return;
                          const firstAyah = currentPageData.ayahs[0];
                          setActiveSurahId(firstAyah.surahNumber);
                          setCurrentAyahNumber(firstAyah.numberInSurah);
                          setIsPlaying(true);
                        }}
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-arabic font-bold flex items-center justify-center gap-1.5 shadow-md shadow-emerald-700/20 transition active:scale-95 shrink-0"
                        title="استمع إلى تلاوة آيات هذه الصفحة بالترتيب"
                      >
                        <PlayCircle size={15} />
                        <span>تلاوة الصفحة</span>
                      </button>

                      {/* Close / Dismiss Companion Bar */}
                      <button
                        onClick={() => setShowPageCompanion(false)}
                        className="p-1.5 rounded-xl text-stone-400 hover:text-rose-600 hover:bg-stone-100 dark:hover:bg-emerald-950/50 transition-colors"
                        title="إغلاق قسم تلاوة الآيات"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Verses Chips List */}
                  <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-1">
                    {currentPageData?.ayahs?.map((ayah) => {
                      const isCurrentPlaying = isPlaying && currentAyahNumber === ayah.numberInSurah && activeSurahId === ayah.surahNumber;
                      const ayahKey = `${ayah.surahNumber}:${ayah.numberInSurah}`;
                      const isBookmarked = bookmarks.includes(ayahKey);

                      return (
                        <div
                          key={ayah.number}
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl border text-xs font-arabic transition-all select-none ${
                            isCurrentPlaying
                              ? 'bg-emerald-600 border-emerald-600 text-white font-bold shadow-sm'
                              : 'bg-stone-50/90 dark:bg-emerald-950/40 border-stone-200/70 dark:border-emerald-900/50 text-stone-700 dark:text-stone-200 hover:border-emerald-400'
                          }`}
                        >
                          {/* Play/Listen Button */}
                          <button
                            onClick={() => {
                              setActiveSurahId(ayah.surahNumber);
                              setCurrentAyahNumber(ayah.numberInSurah);
                              setIsPlaying(!isCurrentPlaying);
                            }}
                            className="flex items-center gap-1 hover:opacity-80 transition"
                            title="استمع للآية"
                          >
                            {isCurrentPlaying ? <PauseCircle size={14} /> : <PlayCircle size={14} />}
                            <span>الآية {toArabicNumerals(ayah.numberInSurah)}</span>
                          </button>

                          <span className="opacity-30">|</span>

                          {/* Tafsir */}
                          <button
                            onClick={() => setSelectedTafsirAyah(ayah)}
                            className="p-1 hover:text-emerald-500 dark:hover:text-emerald-300 transition"
                            title="تفسير الآية"
                          >
                            <BookOpen size={13} />
                          </button>

                          {/* Bookmark */}
                          <button
                            onClick={() => toggleBookmark(ayahKey)}
                            className={`p-1 transition ${isBookmarked ? 'text-amber-400' : 'opacity-50 hover:opacity-100'}`}
                            title="حفظ الآية"
                          >
                            {isBookmarked ? <BookmarkCheck size={13} /> : <Bookmark size={13} />}
                          </button>

                          {/* Copy */}
                          <button
                            onClick={() => copyAyahToClipboard(ayah)}
                            className="p-1 opacity-50 hover:opacity-100 transition"
                            title="نسخ الآية"
                          >
                            <Copy size={13} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowPageCompanion(true)}
                  className="mt-4 px-4 py-2 rounded-2xl bg-white/90 dark:bg-[#111C18]/90 border border-stone-200/80 dark:border-emerald-900/50 text-xs font-arabic text-emerald-700 dark:text-emerald-300 flex items-center gap-2 shadow-sm hover:scale-105 transition"
                >
                  <Volume2 size={15} />
                  <span>إظهار تلاوة وتفسير آيات الصفحة {toArabicNumerals(currentPageNumber)}</span>
                </button>
              )}

            </div>
          ) : (
            /* ========================================================================= */
            /* LIST VIEW (CARDS WITH ENGLISH TRANSLATION & RECORDINGS)                   */
            /* ========================================================================= */
            <div className="max-w-4xl mx-auto w-full px-4 lg:px-8 mt-4 space-y-4">
              
              {/* Surah Header / Bismillah */}
              <div className="text-center py-6 border-b border-stone-200/60 dark:border-emerald-900/40">
                <h1 className="text-3xl font-bold font-arabic text-emerald-950 dark:text-emerald-100 mb-2">
                  سورة {surahData.arabic}
                </h1>
                <p className="text-xs text-stone-500 dark:text-stone-400 font-arabic">
                  {surahData.type} • ترتيبها بالمصحف: {surahData.number} • آياتها: {surahData.ayahs?.length || 0} • صفحتها: {SURAH_START_PAGES[surahData.number] || 1}
                </p>
                {surahData.bismillahPre && (
                  <p className="text-2xl font-arabic text-emerald-800 dark:text-emerald-300 mt-4" style={{ fontFamily: "Amiri, serif" }}>
                    بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                  </p>
                )}
              </div>

              {surahData.ayahs?.map(ayah => {
                const isCurrentPlaying = isPlaying && currentAyahNumber === ayah.numberInSurah;
                const isBookmarked = bookmarks.includes(`${surahData.number}:${ayah.numberInSurah}`);
                const ayahKey = `${surahData.number}:${ayah.numberInSurah}`;
                const hasUserRecording = !!userAyahRecordings[ayahKey];
                const isRecordingThis = activeRecordingAyah === ayah.numberInSurah;
                const isPlayingUserAudio = playingUserAudioKey === ayahKey;
                const hasNote = !!notes[ayahKey];

                return (
                  <div
                    key={ayah.id || ayah.numberInSurah}
                    ref={el => ayahRefs.current[ayah.numberInSurah] = el}
                    className={`
                      p-5 lg:p-6 rounded-3xl border transition-all duration-300
                      ${isCurrentPlaying 
                        ? 'bg-emerald-50/90 dark:bg-emerald-950/60 border-emerald-400 dark:border-emerald-600 shadow-lg shadow-emerald-700/10 scale-[1.01]' 
                        : 'bg-white dark:bg-[#121E1A] border-stone-100 dark:border-emerald-950/60 shadow-sm hover:border-emerald-200'
                      }
                    `}
                  >
                    {/* Ayah Header & Actions */}
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-100 dark:border-emerald-950/50">
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center text-xs font-bold font-sans">
                          {ayah.numberInSurah}
                        </span>
                        <span className="text-[11px] text-stone-400 font-sans" dir="ltr">
                          {surahData.number}:{ayah.numberInSurah}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        
                        {/* Copy Ayah text */}
                        <button
                          onClick={() => copyAyahToClipboard(ayah)}
                          className="p-2 rounded-xl text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-emerald-950/60 transition"
                          title="نسخ الآية"
                        >
                          <Copy size={16} />
                        </button>

                        {/* Personal Tadabbur / Note */}
                        <button
                          onClick={() => openNoteEditor(ayah)}
                          className={`p-2 rounded-xl transition ${
                            hasNote 
                              ? 'text-amber-600 bg-amber-50 dark:bg-amber-950/40' 
                              : 'text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-emerald-950/60'
                          }`}
                          title={hasNote ? "عرض ملاحظة التدبر" : "إضافة تدبر / ملاحظة"}
                        >
                          <Edit3 size={16} />
                        </button>

                        {/* Play Ayah Audio from Sheikh */}
                        <button
                          onClick={() => {
                            setCurrentAyahNumber(ayah.numberInSurah);
                            setIsPlaying(!isCurrentPlaying);
                          }}
                          className={`p-2 rounded-xl transition-colors ${
                            isCurrentPlaying 
                              ? 'bg-emerald-600 text-white' 
                              : 'text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-emerald-950/60'
                          }`}
                          title="استمع لتلاوة الشيخ"
                        >
                          {isCurrentPlaying ? <PauseCircle size={18} /> : <PlayCircle size={18} />}
                        </button>

                        {/* Tafsir Drawer button */}
                        <button
                          onClick={() => setSelectedTafsirAyah(ayah)}
                          className="p-2 rounded-xl text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-emerald-950/60 transition-colors"
                          title="عرض التفسير"
                        >
                          <BookOpen size={18} />
                        </button>

                        {/* Bookmark button */}
                        <button
                          onClick={() => toggleBookmark(ayahKey)}
                          className={`p-2 rounded-xl transition-colors ${
                            isBookmarked 
                              ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/40' 
                              : 'text-stone-400 hover:text-stone-600 dark:hover:text-stone-300'
                          }`}
                          title="حفظ الآية"
                        >
                          {isBookmarked ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
                        </button>
                      </div>
                    </div>

                    {/* Uthmani Verse Text */}
                    <p 
                      className="font-arabic font-bold text-stone-800 dark:text-stone-100 leading-[2.6] text-right mb-4"
                      style={{ fontSize: `${fontSize}px`, fontFamily: "'Amiri', 'Cairo', serif" }}
                    >
                      {ayah.arabic}
                    </p>

                    {/* Saved Note Badge if exists */}
                    {hasNote && (
                      <div className="mb-3 p-3 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/40 flex items-start gap-2">
                        <FileText size={15} className="text-amber-600 shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <span className="text-[10px] font-bold text-amber-800 dark:text-amber-300 block mb-0.5">
                            ملاحظة تدبر شخصية
                          </span>
                          <p className="text-xs text-amber-900 dark:text-amber-100 font-arabic">
                            {notes[ayahKey]}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* English Translation */}
                    {showTranslation && (
                      <div className="border-t border-stone-100 dark:border-emerald-950/60 pt-3 text-left" dir="ltr">
                        <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block mb-1">
                          Sahih International
                        </span>
                        <p className="text-stone-600 dark:text-stone-300 text-sm font-sans leading-relaxed">
                          {ayah.english}
                        </p>
                      </div>
                    )}

                  </div>
                );
              })}
            </div>
          )}

        </div>
      )}

      {/* QUICK SURAH SWITCHER DRAWER */}
      {isQuickDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
          <div 
            className="w-full max-w-sm bg-white dark:bg-[#121E1A] h-full shadow-2xl flex flex-col p-4 animate-slide-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-100 dark:border-emerald-900/40">
              <div className="flex items-center gap-2">
                <Book className="w-4 h-4 text-emerald-600" />
                <h3 className="font-bold text-base text-stone-900 dark:text-stone-100 font-arabic">
                  الانتقال السريع لسورة (114)
                </h3>
              </div>
              <button
                onClick={() => setIsQuickDrawerOpen(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-600"
              >
                ✕
              </button>
            </div>

            <input
              type="text"
              value={drawerSearch}
              onChange={(e) => setDrawerSearch(e.target.value)}
              placeholder="ابحث برقم أو اسم السورة..."
              className="w-full px-3 py-2 text-xs rounded-xl bg-stone-100 dark:bg-emerald-950/40 border border-stone-200 dark:border-emerald-900/60 font-arabic text-stone-800 dark:text-stone-100 mb-3 focus:outline-none"
            />

            <div className="flex-1 overflow-y-auto divide-y divide-stone-100 dark:divide-emerald-950/40">
              {filteredDrawerSurahs.map(s => {
                const isSelected = s.number === activeSurahId;
                const startP = SURAH_START_PAGES[s.number] || 1;
                return (
                  <div
                    key={s.number}
                    onClick={() => {
                      setActiveSurahId(s.number);
                      setCurrentPageNumber(startP);
                      setCurrentAyahNumber(1);
                      setIsQuickDrawerOpen(false);
                    }}
                    className={`p-3 flex items-center justify-between cursor-pointer transition ${
                      isSelected ? 'bg-emerald-50 dark:bg-emerald-950/60 border-r-4 border-emerald-600' : 'hover:bg-stone-50 dark:hover:bg-emerald-950/30'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-xl bg-stone-100 dark:bg-emerald-900/40 text-stone-600 dark:text-stone-300 flex items-center justify-center font-bold text-xs font-sans">
                        {s.number}
                      </span>
                      <div>
                        <strong className="text-xs font-bold font-arabic block text-stone-800 dark:text-stone-200">
                          سورة {s.arabic}
                        </strong>
                        <span className="text-[10px] text-stone-400 font-sans" dir="ltr">
                          {s.english} • Page {startP}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] text-stone-400 font-arabic">
                      {s.ayahs} آية
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tafsir Modal */}
      {selectedTafsirAyah && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#121E1A] w-full max-w-2xl rounded-3xl p-6 shadow-2xl border border-stone-200 dark:border-emerald-900/60 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-emerald-950/60 mb-4">
              <div>
                <h3 className="font-bold text-base text-stone-900 dark:text-stone-100 font-arabic">
                  تفسير الآية {selectedTafsirAyah.numberInSurah} {selectedTafsirAyah.surahName ? `(سورة ${selectedTafsirAyah.surahName})` : `(سورة ${surahData.arabic})`}
                </h3>
                <span className="text-xs text-stone-400 font-sans" dir="ltr">
                  Ayah {selectedTafsirAyah.numberInSurah} Tafsir
                </span>
              </div>
              <button
                onClick={() => setSelectedTafsirAyah(null)}
                className="p-2 rounded-xl text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
              >
                ✕
              </button>
            </div>

            <div className="bg-emerald-50/60 dark:bg-emerald-950/40 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-900/40 mb-4">
              <p className="text-xl font-arabic font-bold text-emerald-950 dark:text-emerald-200 text-center leading-relaxed">
                {selectedTafsirAyah.arabic}
              </p>
            </div>

            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setActiveTafsirTab('saadi')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold font-arabic transition-colors ${
                  activeTafsirTab === 'saadi' 
                    ? 'bg-emerald-600 text-white shadow-sm' 
                    : 'bg-stone-100 dark:bg-emerald-950/50 text-stone-600 dark:text-stone-300'
                }`}
              >
                تفسير السعدي (تيسير الكريم الرحمن)
              </button>
              <button
                onClick={() => setActiveTafsirTab('kathir')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold font-arabic transition-colors ${
                  activeTafsirTab === 'kathir' 
                    ? 'bg-emerald-600 text-white shadow-sm' 
                    : 'bg-stone-100 dark:bg-emerald-950/50 text-stone-600 dark:text-stone-300'
                }`}
              >
                تفسير ابن كثير (تفسير القرآن العظيم)
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pr-1">
              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-emerald-950/20 border border-stone-100 dark:border-emerald-900/30">
                <p className="text-sm font-arabic font-medium text-stone-800 dark:text-stone-200 leading-loose">
                  {selectedTafsirAyah.tafsirSaadi || `تفسير الآية ${selectedTafsirAyah.numberInSurah} من كلام الله عز وجل يوضح المعاني الجليلة والدروس الإيمانية العظيمة.`}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tadabbur Note Editor Modal */}
      {activeNoteAyah && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#121E1A] w-full max-w-lg rounded-3xl p-6 shadow-2xl border border-stone-200 dark:border-emerald-900/60 flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-emerald-950/60 mb-4">
              <div className="flex items-center gap-2">
                <Edit3 className="text-amber-500 w-5 h-5" />
                <h3 className="font-bold text-stone-900 dark:text-stone-100 font-arabic">
                  تدبر شخصي: الآية {activeNoteAyah.numberInSurah} ({surahData.arabic})
                </h3>
              </div>
              <button
                onClick={() => setActiveNoteAyah(null)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-600"
              >
                ✕
              </button>
            </div>

            <p className="text-sm font-arabic font-bold text-emerald-900 dark:text-emerald-200 bg-emerald-50/70 dark:bg-emerald-950/40 p-3 rounded-2xl mb-3 leading-relaxed">
              {activeNoteAyah.arabic}
            </p>

            <textarea
              rows={4}
              value={currentNoteText}
              onChange={(e) => setCurrentNoteText(e.target.value)}
              placeholder="اكتب تأملاتك، الدروس المستفادة، أو فوائد تدبر هذه الآية الكريمة..."
              className="w-full p-3 rounded-2xl bg-stone-50 dark:bg-emerald-950/20 border border-stone-200 dark:border-emerald-900/50 font-arabic text-sm text-stone-800 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
            />

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setActiveNoteAyah(null)}
                className="px-4 py-2 rounded-xl bg-stone-100 dark:bg-emerald-950/50 text-stone-600 dark:text-stone-300 text-xs font-arabic"
              >
                إلغاء
              </button>
              <button
                onClick={saveNote}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-arabic font-bold shadow-md shadow-emerald-700/20"
              >
                حفظ الملاحظة
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
