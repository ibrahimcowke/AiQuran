import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import AudioPlayerBar from './components/AudioPlayerBar';
import BottomNav from './components/BottomNav';
import DashboardView from './components/DashboardView';
import MushafReader from './components/MushafReader';
import VoiceLab from './components/VoiceLab';
import HifzPlanner from './components/HifzPlanner';
import QuizArena from './components/QuizArena';
import ProfileSettings from './components/ProfileSettings';
import QuranListener from './components/QuranListener';
import GlobalSearchModal from './components/GlobalSearchModal';
import { SURAHS_INDEX, SURAH_DETAILS, RECITERS } from './data/quranData';

export default function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('aiquran_theme');
    const valid = ['emerald','dark','amber','blue','sepia','rose','purple'];
    return valid.includes(saved) ? saved : 'emerald';
  });
  const [currentView, setCurrentView] = useState('dashboard');
  const [activeSurahId, setActiveSurahId] = useState(1);
  const [currentAyahNumber, setCurrentAyahNumber] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  // User Profile state with localStorage persistence
  const [userProfile, setUserProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('aiquran_profile');
      return saved ? JSON.parse(saved) : {
        name: 'إبراهيم أحمد',
        email: 'ibrahim@example.com',
        level: 'مبتدئ (جزء عم)',
        dailyAyahGoal: 5,
        bio: 'حفظ وتدبر كتاب الله لابتغاء مرضاته وثوابه.',
        avatarId: 'initial'
      };
    } catch {
      return {
        name: 'إبراهيم أحمد',
        email: 'ibrahim@example.com',
        level: 'مبتدئ (جزء عم)',
        dailyAyahGoal: 5,
        bio: 'حفظ وتدبر كتاب الله لابتغاء مرضاته وثوابه.',
        avatarId: 'initial'
      };
    }
  });

  // App Settings state with localStorage persistence
  const [appSettings, setAppSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('aiquran_settings');
      return saved ? JSON.parse(saved) : {
        defaultReciterId: 'mishary',
        ayahRepeatCount: 1,
        autoAdvance: true,
        mushafFont: 'Amiri',
        translationLanguage: 'en',
        showTajweedByDefault: true
      };
    } catch {
      return {
        defaultReciterId: 'mishary',
        ayahRepeatCount: 1,
        autoAdvance: true,
        mushafFont: 'Amiri',
        translationLanguage: 'en',
        showTajweedByDefault: true
      };
    }
  });

  // Selected Reciter derived from settings or manual choice
  const [selectedReciter, setSelectedReciter] = useState(() => {
    return RECITERS.find(r => r.id === appSettings.defaultReciterId) || RECITERS[0];
  });

  // Bookmarks persisted in localStorage
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem('aiquran_bookmarks');
      return saved ? JSON.parse(saved) : ['1:1', '1:7'];
    } catch {
      return ['1:1', '1:7'];
    }
  });

  const toggleBookmark = (key) => {
    setBookmarks(prev => {
      const next = prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key];
      localStorage.setItem('aiquran_bookmarks', JSON.stringify(next));
      return next;
    });
  };

  useEffect(() => {
    localStorage.setItem('aiquran_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    // Add .dark class for themes that use dark color-scheme so
    // Tailwind dark: variants and native browser chrome behave correctly
    const darkThemes = ['dark', 'purple'];
    if (darkThemes.includes(theme)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Global Ctrl+K shortcut listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchModalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const currentSurahMeta = SURAHS_INDEX.find(s => s.number === activeSurahId) || SURAHS_INDEX[0];
  const currentSurah = SURAH_DETAILS[activeSurahId] || {
    number: activeSurahId,
    arabic: currentSurahMeta.arabic,
    english: currentSurahMeta.english,
    meaning: currentSurahMeta.meaning,
    type: currentSurahMeta.type,
    ayahs: Array.from({ length: currentSurahMeta.ayahs || 7 }, (_, i) => ({
      id: i + 1,
      numberInSurah: i + 1,
      arabic: `آية ${i + 1}`,
      english: `Verse ${i + 1}`
    }))
  };

  const memorizationStats = {
    overall: 48,
    memorizedSurahs: 14,
    totalSurahs: 114,
    accuracy: 96
  };

  // Convert raw bookmark keys (e.g. "1:7") into rich metadata objects
  const parsedBookmarks = bookmarks.map(bKey => {
    const [sId, aNum] = bKey.split(':').map(Number);
    const surah = SURAHS_INDEX.find(s => s.number === sId);
    return {
      surahId: sId,
      surahName: surah?.arabic || `سورة ${sId}`,
      ayahNumber: aNum,
      text: `الآية رقم ${aNum} من سورة ${surah?.arabic || sId}`
    };
  });

  return (
    <div
      className="min-h-screen flex flex-col theme-transition"
      style={{ backgroundColor: 'var(--t-bg)', color: 'var(--t-text)' }}
      dir="rtl"
    >
      <div className="flex-1 flex flex-row w-full relative">
        
        {/* Responsive Desktop Sidebar & Mobile Drawer */}
        <Sidebar
          currentView={currentView}
          setView={setCurrentView}
          isMobileMenuOpen={isMobileMenuOpen}
          closeMobileMenu={() => setIsMobileMenuOpen(false)}
          userProfile={userProfile}
          memorizationStats={memorizationStats}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 min-h-screen">
          
          {/* Top Header */}
          <Header
            theme={theme}
            setTheme={setTheme}
            selectedReciter={selectedReciter}
            setSelectedReciter={setSelectedReciter}
            toggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            onOpenSearchModal={() => setIsSearchModalOpen(true)}
            surahsIndex={SURAHS_INDEX}
          />

          {/* View Container with bottom padding for audio bar and bottom nav */}
          <main className="flex-1 pb-36 lg:pb-28">
            {currentView === 'dashboard' && (
              <DashboardView
                setView={setCurrentView}
                setActiveSurahId={setActiveSurahId}
                setCurrentAyahNumber={setCurrentAyahNumber}
                setIsPlaying={setIsPlaying}
              />
            )}

            {currentView === 'mushaf' && (
              <MushafReader
                activeSurahId={activeSurahId}
                setActiveSurahId={setActiveSurahId}
                currentAyahNumber={currentAyahNumber}
                setCurrentAyahNumber={setCurrentAyahNumber}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                bookmarks={bookmarks}
                toggleBookmark={toggleBookmark}
              />
            )}

            {currentView === 'listener' && (
              <QuranListener
                activeSurahId={activeSurahId}
                setActiveSurahId={setActiveSurahId}
                currentAyahNumber={currentAyahNumber}
                setCurrentAyahNumber={setCurrentAyahNumber}
                currentSurah={currentSurah}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                selectedReciter={selectedReciter}
                setSelectedReciter={setSelectedReciter}
              />
            )}

            {currentView === 'voicelab' && (
              <VoiceLab setView={setCurrentView} />
            )}

            {currentView === 'hifz' && (
              <HifzPlanner
                setView={setCurrentView}
                setActiveSurahId={setActiveSurahId}
              />
            )}

            {currentView === 'quiz' && (
              <QuizArena setView={setCurrentView} />
            )}

            {currentView === 'profile' && (
              <ProfileSettings
                userProfile={userProfile}
                setUserProfile={setUserProfile}
                appSettings={appSettings}
                setAppSettings={setAppSettings}
                theme={theme}
                setTheme={setTheme}
              />
            )}
          </main>

        </div>

      </div>

      {/* Global Persistent Audio Recitation Player */}
      <AudioPlayerBar
        currentSurah={currentSurah}
        currentAyahNumber={currentAyahNumber}
        setCurrentAyahNumber={setCurrentAyahNumber}
        selectedReciter={selectedReciter}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />

      {/* Mobile Bottom Navigation Bar */}
      <BottomNav
        currentView={currentView}
        setView={setCurrentView}
      />

      {/* Global Search Modal (Ctrl+K) */}
      <GlobalSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSelectSurah={(sId) => {
          setActiveSurahId(sId);
          setCurrentAyahNumber(1);
          setCurrentView('mushaf');
        }}
        onSelectAyah={(aNum) => {
          setCurrentAyahNumber(aNum);
        }}
        bookmarks={parsedBookmarks}
      />
    </div>
  );
}
