import React, { useState, useEffect, useRef } from 'react';
import { 
  HelpCircle, CheckCircle2, AlertTriangle, Lightbulb, 
  ShieldCheck, Award, ArrowLeft, ArrowRight, RotateCcw, 
  Flame, Sparkles, ChevronLeft, BarChart2, Check, BookOpen,
  Search, Layers, Book, Compass, ListOrdered, Grid, Volume2,
  VolumeX, Clock, Heart, Zap, Play, Pause, Share2, Copy
} from 'lucide-react';
import { ALL_114_SURAHS, getSurahByNumber } from '../data/allSurahs';
import { QUIZ_COLLECTIONS, getQuizQuestions } from '../data/quizData';

// Web Audio API Synthesizer for pleasant sound effects without external file dependencies
const playSynthSound = (type) => {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    if (type === 'correct') {
      // Pleasant ascendant harmonic chime
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.1); // E5
      osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.2); // G5
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } else if (type === 'wrong') {
      // Soft gentle low buzz
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(160, ctx.currentTime + 0.25);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } else if (type === 'lifeline') {
      // Magic sparkle sound
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    }
  } catch (e) {
    // AudioContext blocked or not allowed - ignore silently
  }
};

// Shuffle an array using Fisher-Yates algorithm
const shuffleArray = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// Shuffle a question's answer options while keeping correctAnswerIndex in sync
const shuffleQuestionOptions = (question) => {
  if (!question.optionsAr || question.optionsAr.length === 0) return question;

  const indices = question.optionsAr.map((_, i) => i);
  const shuffledIndices = shuffleArray(indices);

  return {
    ...question,
    optionsAr: shuffledIndices.map(i => question.optionsAr[i]),
    optionsEn: question.optionsEn ? shuffledIndices.map(i => question.optionsEn[i]) : undefined,
    correctAnswerIndex: shuffledIndices.indexOf(question.correctAnswerIndex),
  };
};

// Remove duplicate questions by id, then shuffle options on each
const prepareQuestions = (rawQuestions) => {
  const seen = new Set();
  const unique = rawQuestions.filter(q => {
    if (!q || !q.id) return false;
    if (seen.has(q.id)) return false;
    seen.add(q.id);
    return true;
  });
  return unique.map(shuffleQuestionOptions);
};

export default function QuizArena({ setView }) {
  // Quiz Selection Modes: 'collection' | 'surah' | 'category'
  const [activeMode, setActiveMode] = useState('collection');

  // Game Rule Mode: 'classic' | 'timed' | 'survival'
  const [gameMode, setGameMode] = useState('classic');

  // Selection states
  const [selectedCollectionId, setSelectedCollectionId] = useState('juz_amma');
  const [selectedSurahNumber, setSelectedSurahNumber] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [surahSearchQuery, setSurahSearchQuery] = useState('');

  // Sound effects toggle
  const [soundEnabled, setSoundEnabled] = useState(true);

  // High score tracking
  const [highScore, setHighScore] = useState(() => {
    try {
      return parseInt(localStorage.getItem('aiquran_quiz_high_score') || '0', 10);
    } catch {
      return 0;
    }
  });

  // Quiz Gameplay States
  const [inQuiz, setInQuiz] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [missedQuestions, setMissedQuestions] = useState([]);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  // Survival Mode Hearts (3 Lives)
  const [lives, setLives] = useState(3);

  // Timed Blitz Mode (20s countdown per question)
  const [timeLeft, setTimeLeft] = useState(20);
  const timerRef = useRef(null);

  // Lifelines: 50:50, Hint, Skip (1 use each per quiz)
  const [lifelines, setLifelines] = useState({
    fiftyFiftyUsed: false,
    hintUsed: false,
    skipUsed: false
  });
  const [hiddenOptionIndices, setHiddenOptionIndices] = useState([]);
  const [showHintBox, setShowHintBox] = useState(false);

  // Audio clue playback state
  const [audioPlaying, setAudioPlaying] = useState(false);
  const audioRef = useRef(null);

  // Share message copied alert
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Start / restart quiz
  const startQuiz = (overrideParams = {}) => {
    // Stop any active audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setAudioPlaying(false);

    const params = {
      mode: activeMode,
      collectionId: selectedCollectionId,
      surahNumber: selectedSurahNumber,
      category: selectedCategory,
      difficulty: selectedDifficulty,
      ...overrideParams
    };
    const raw = getQuizQuestions(params);
    const loaded = prepareQuestions(raw);
    setQuestions(loaded);
    setCurrentQuestionIndex(0);
    setSelectedAnswerIndex(null);
    setIsAnswered(false);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setCorrectAnswersCount(0);
    setQuizCompleted(false);
    setGameOver(false);
    setMissedQuestions([]);
    setIsReviewMode(false);
    setLives(3);
    setTimeLeft(20);
    setLifelines({
      fiftyFiftyUsed: false,
      hintUsed: false,
      skipUsed: false
    });
    setHiddenOptionIndices([]);
    setShowHintBox(false);
    setInQuiz(true);
  };

  const questionList = isReviewMode ? missedQuestions : questions;
  const question = questionList[currentQuestionIndex] || questions[0];
  const isLastQuestion = currentQuestionIndex === questionList.length - 1;

  // Countdown timer effect for Timed Blitz Mode
  useEffect(() => {
    if (!inQuiz || quizCompleted || gameOver || isAnswered || gameMode !== 'timed') {
      clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [inQuiz, currentQuestionIndex, isAnswered, quizCompleted, gameOver, gameMode]);

  // Reset timer on new question
  useEffect(() => {
    if (inQuiz && !isAnswered && gameMode === 'timed') {
      setTimeLeft(20);
    }
  }, [currentQuestionIndex, inQuiz]);

  // Handle time expiration in timed mode
  const handleTimeOut = () => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedAnswerIndex(-1); // Marked as timed out
    setStreak(0);
    if (soundEnabled) playSynthSound('wrong');

    if (!isReviewMode && !missedQuestions.some(m => m.id === question.id)) {
      setMissedQuestions(prev => [...prev, question]);
    }
  };

  // Lifeline 1: 50:50 - Hide two wrong options
  const useFiftyFifty = () => {
    if (lifelines.fiftyFiftyUsed || isAnswered || !question) return;
    if (soundEnabled) playSynthSound('lifeline');

    const wrongIndices = question.optionsAr
      .map((_, idx) => idx)
      .filter(idx => idx !== question.correctAnswerIndex);

    // Shuffle and pick 2 wrong options to hide
    const shuffledWrong = [...wrongIndices].sort(() => Math.random() - 0.5);
    const toHide = shuffledWrong.slice(0, 2);

    setHiddenOptionIndices(toHide);
    setLifelines(prev => ({ ...prev, fiftyFiftyUsed: true }));
  };

  // Lifeline 2: AI Hint
  const useHint = () => {
    if (lifelines.hintUsed || isAnswered) return;
    if (soundEnabled) playSynthSound('lifeline');
    setShowHintBox(true);
    setLifelines(prev => ({ ...prev, hintUsed: true }));
  };

  // Lifeline 3: Skip Question
  const useSkip = () => {
    if (lifelines.skipUsed || isAnswered) return;
    if (soundEnabled) playSynthSound('lifeline');
    setLifelines(prev => ({ ...prev, skipUsed: true }));

    if (isLastQuestion) {
      finishQuiz();
    } else {
      setCurrentQuestionIndex(i => i + 1);
      setSelectedAnswerIndex(null);
      setIsAnswered(false);
      setHiddenOptionIndices([]);
      setShowHintBox(false);
      setTimeLeft(20);
    }
  };

  // Answer handler
  const handleAnswer = (index) => {
    if (isAnswered) return;
    clearInterval(timerRef.current);
    setSelectedAnswerIndex(index);
    setIsAnswered(true);

    const isCorrect = index === question.correctAnswerIndex;

    if (isCorrect) {
      if (soundEnabled) playSynthSound('correct');
      const multiplier = streak >= 3 ? 2 : 1;
      // Bonus speed points for timed mode
      const speedBonus = gameMode === 'timed' ? (timeLeft > 12 ? 10 : timeLeft > 6 ? 5 : 0) : 0;
      const points = (10 * multiplier) + speedBonus;

      setScore(s => s + points);
      setStreak(st => {
        const nextStreak = st + 1;
        setMaxStreak(ms => Math.max(ms, nextStreak));
        return nextStreak;
      });
      setCorrectAnswersCount(c => c + 1);
    } else {
      if (soundEnabled) playSynthSound('wrong');
      setStreak(0);

      // Survival Mode Life deduction
      if (gameMode === 'survival') {
        const nextLives = lives - 1;
        setLives(nextLives);
        if (nextLives <= 0) {
          setGameOver(true);
          return;
        }
      }

      if (!isReviewMode && !missedQuestions.some(m => m.id === question.id)) {
        setMissedQuestions(prev => [...prev, question]);
      }
    }
  };

  const handleNext = () => {
    // Stop audio clue if running
    if (audioRef.current) {
      audioRef.current.pause();
      setAudioPlaying(false);
    }

    if (isLastQuestion) {
      finishQuiz();
    } else {
      setCurrentQuestionIndex(i => i + 1);
      setSelectedAnswerIndex(null);
      setIsAnswered(false);
      setHiddenOptionIndices([]);
      setShowHintBox(false);
      setTimeLeft(20);
    }
  };

  const finishQuiz = () => {
    setQuizCompleted(true);
    // Update high score
    if (score > highScore) {
      setHighScore(score);
      try {
        localStorage.setItem('aiquran_quiz_high_score', score.toString());
      } catch (e) {}
    }
  };

  const exitQuiz = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setInQuiz(false);
    setQuizCompleted(false);
    setGameOver(false);
    setIsReviewMode(false);
  };

  const startMissedReview = () => {
    setIsReviewMode(true);
    setCurrentQuestionIndex(0);
    setSelectedAnswerIndex(null);
    setIsAnswered(false);
    setQuizCompleted(false);
    setGameOver(false);
    setHiddenOptionIndices([]);
    setShowHintBox(false);
  };

  // Audio Recitation Clue helper
  const toggleAudioClue = () => {
    if (!question) return;

    if (audioPlaying && audioRef.current) {
      audioRef.current.pause();
      setAudioPlaying(false);
      return;
    }

    let surahNum = question.audioAyah ? question.audioAyah.surah : (question.surahNumber || 1);
    let ayahNum = question.audioAyah ? question.audioAyah.ayah : 1;

    // Pad with 3 zeros
    const sPadded = String(surahNum).padStart(3, '0');
    const aPadded = String(ayahNum).padStart(3, '0');
    const audioUrl = `https://everyayah.com/data/Alafasy_128kbps/${sPadded}${aPadded}.mp3`;

    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audio = new Audio(audioUrl);
    audioRef.current = audio;
    audio.play()
      .then(() => setAudioPlaying(true))
      .catch(() => setAudioPlaying(false));

    audio.onended = () => {
      setAudioPlaying(false);
    };
  };

  // Share score generator
  const shareScore = () => {
    const accuracy = questionList.length > 0 ? Math.round((correctAnswersCount / questionList.length) * 100) : 100;
    const text = `🏆 حققتُ ${score} XP بنسبة دقة ${accuracy}% في ساحة التحدي القرآني على منصة AiQuran! ✨\nجرّب اختبار إتقانك لكتاب الله الكريم.`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 3000);
    }
  };

  // Scholar rank calculation
  const getScholarRank = () => {
    const accuracy = questionList.length > 0 ? Math.round((correctAnswersCount / questionList.length) * 100) : 100;
    if (accuracy >= 90) return { title: 'علّامة ومتقن لكتاب الله', icon: '👑', color: 'text-amber-500' };
    if (accuracy >= 75) return { title: 'حافظ مجيد ومجوّد', icon: '🌟', color: 'text-emerald-500' };
    if (accuracy >= 55) return { title: 'قارئ وباحث قرآني متميز', icon: '📜', color: 'text-blue-500' };
    return { title: 'طالب علم ومثابر', icon: '🌱', color: 'text-stone-400' };
  };

  const filteredSurahsList = ALL_114_SURAHS.filter(s => {
    if (!surahSearchQuery.trim()) return true;
    const q = surahSearchQuery.toLowerCase().trim();
    return s.arabic.includes(q) || s.english.toLowerCase().includes(q) || s.number.toString() === q;
  });

  const currentSurah = getSurahByNumber(selectedSurahNumber);
  const currentCollection = QUIZ_COLLECTIONS.find(c => c.id === selectedCollectionId);

  return (
    <div className="max-w-5xl mx-auto w-full px-4 lg:px-8 py-6 space-y-6" dir="rtl">
      
      {/* Top Arena Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200/80 dark:border-emerald-900/40">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 px-3 py-1 rounded-full text-xs font-bold font-arabic mb-2">
            <Award size={14} className="text-amber-500" />
            <span>ساحة التحديات والمسابقات القرآنية الشاملة</span>
            <span className="font-sans text-[10px]" dir="ltr">Quranic Master Quiz Arena</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-arabic text-stone-900 dark:text-stone-100">
            تحديات سور القرآن الـ 114 وعلوم التنزيل
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 font-arabic mt-1">
            نافس في المتشابهات، غريب الكلمات، إكمال الآيات، وأحكام التجويد بمستويات تفاعلية متقدمة.
          </p>
        </div>

        {/* Top Controls: Sound, High Score & Active Quiz Indicators */}
        <div className="flex items-center gap-2.5">
          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-2xl border transition ${
              soundEnabled 
                ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300' 
                : 'bg-stone-100 dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-400'
            }`}
            title={soundEnabled ? 'كتم المؤثرات الصوتية' : 'تشغيل المؤثرات الصوتية'}
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          {/* High Score Badge */}
          {highScore > 0 && !inQuiz && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/40 text-amber-800 dark:text-amber-300 font-bold text-xs font-arabic">
              <Award size={14} className="text-amber-500" />
              <span>أعلى رصيد: {highScore} XP</span>
            </div>
          )}

          {/* Score & Streak (During Active Quiz) */}
          {inQuiz && (
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Survival Hearts */}
              {gameMode === 'survival' && (
                <div className="flex items-center gap-1 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/40 px-2.5 py-1.5 rounded-2xl">
                  {[1, 2, 3].map(heartIdx => (
                    <Heart
                      key={heartIdx}
                      size={16}
                      className={heartIdx <= lives ? "text-red-500 fill-red-500 transition-all scale-110" : "text-stone-300 dark:text-stone-700"}
                    />
                  ))}
                </div>
              )}

              {/* Streak */}
              <div className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/40 text-amber-800 dark:text-amber-300 font-bold text-xs font-arabic">
                <Flame size={15} className="text-amber-500 fill-amber-500" />
                <span>{streak} {streak >= 3 ? '🔥' : ''}</span>
              </div>

              {/* Score XP */}
              <div className="px-3.5 py-1.5 rounded-2xl bg-emerald-600 text-white font-bold text-xs sm:text-sm font-sans shadow-md shadow-emerald-700/20" dir="ltr">
                {score} XP
              </div>

              {/* Exit Button */}
              <button
                onClick={exitQuiz}
                className="px-2.5 py-1.5 rounded-2xl bg-stone-100 dark:bg-emerald-950/60 text-stone-600 dark:text-stone-300 text-xs font-arabic hover:bg-stone-200"
              >
                خروج
              </button>
            </div>
          )}
        </div>
      </div>

      {/* QUIZ SELECTION HUB (When not actively in a quiz) */}
      {!inQuiz && (
        <div className="space-y-6">

          {/* STEP 1: CHOOSE GAME RULE MODE (Classic vs Timed vs Survival) */}
          <div className="bg-gradient-to-br from-emerald-50/70 via-stone-50 to-teal-50/50 dark:from-emerald-950/30 dark:via-[#121E1A] dark:to-teal-950/20 p-5 rounded-3xl border border-emerald-200/80 dark:border-emerald-800/40 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 font-arabic flex items-center gap-1.5">
                <Zap size={15} className="text-amber-500" />
                <span>نظام التحدي وقواعد اللعب:</span>
              </span>
              <span className="text-[11px] text-stone-400 font-arabic">اختر أسلوب الاختبار المفضل لديك</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Mode 1: Classic Learning */}
              <button
                onClick={() => setGameMode('classic')}
                className={`p-3.5 rounded-2xl border text-right transition-all flex flex-col justify-between ${
                  gameMode === 'classic'
                    ? 'border-emerald-600 bg-white dark:bg-emerald-950/80 shadow-md shadow-emerald-700/10 ring-2 ring-emerald-500/20'
                    : 'border-stone-200 dark:border-emerald-950/60 bg-white/70 dark:bg-[#121E1A]/80 hover:border-emerald-400'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-sm font-arabic text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                    <BookOpen size={16} className="text-emerald-600" />
                    <span>الوضع التعليمي الهادئ</span>
                  </span>
                  {gameMode === 'classic' && <CheckCircle2 size={16} className="text-emerald-600" />}
                </div>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 font-arabic leading-relaxed">
                  تعلّم وتدبر بهدوء بدون ضغط وقت مع تفسير فوري وأدلة علمية.
                </p>
              </button>

              {/* Mode 2: Timed Blitz */}
              <button
                onClick={() => setGameMode('timed')}
                className={`p-3.5 rounded-2xl border text-right transition-all flex flex-col justify-between ${
                  gameMode === 'timed'
                    ? 'border-amber-500 bg-white dark:bg-amber-950/40 shadow-md shadow-amber-500/10 ring-2 ring-amber-500/20'
                    : 'border-stone-200 dark:border-emerald-950/60 bg-white/70 dark:bg-[#121E1A]/80 hover:border-amber-400'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-sm font-arabic text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                    <Clock size={16} className="text-amber-500" />
                    <span>تحدي الوقت والسرعة</span>
                  </span>
                  {gameMode === 'timed' && <CheckCircle2 size={16} className="text-amber-500" />}
                </div>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 font-arabic leading-relaxed">
                  20 ثانية لكل سؤال مع نقاط مضاعفة للإجابات الخاطفة والسريعة.
                </p>
              </button>

              {/* Mode 3: Survival (3 Lives) */}
              <button
                onClick={() => setGameMode('survival')}
                className={`p-3.5 rounded-2xl border text-right transition-all flex flex-col justify-between ${
                  gameMode === 'survival'
                    ? 'border-rose-500 bg-white dark:bg-rose-950/40 shadow-md shadow-rose-500/10 ring-2 ring-rose-500/20'
                    : 'border-stone-200 dark:border-emerald-950/60 bg-white/70 dark:bg-[#121E1A]/80 hover:border-rose-400'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-sm font-arabic text-rose-900 dark:text-rose-200 flex items-center gap-1.5">
                    <Heart size={16} className="text-rose-500 fill-rose-500" />
                    <span>تحدي البقاء (3 قلوب)</span>
                  </span>
                  {gameMode === 'survival' && <CheckCircle2 size={16} className="text-rose-500" />}
                </div>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 font-arabic leading-relaxed">
                  3 فرص فقط للخطأ؛ نفاد القلوب يعني نهاية التحدي الفورية!
                </p>
              </button>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex p-1.5 bg-stone-100 dark:bg-emerald-950/50 rounded-2xl max-w-xl mx-auto">
            <button
              onClick={() => setActiveMode('collection')}
              className={`flex-1 py-2.5 rounded-xl font-bold font-arabic text-xs sm:text-sm flex items-center justify-center gap-2 transition ${
                activeMode === 'collection'
                  ? 'bg-white dark:bg-[#121E1A] text-emerald-800 dark:text-emerald-300 shadow-sm'
                  : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
              }`}
            >
              <Award size={16} />
              <span>المجموعات المتخصصة</span>
            </button>
            <button
              onClick={() => setActiveMode('surah')}
              className={`flex-1 py-2.5 rounded-xl font-bold font-arabic text-xs sm:text-sm flex items-center justify-center gap-2 transition ${
                activeMode === 'surah'
                  ? 'bg-white dark:bg-[#121E1A] text-emerald-800 dark:text-emerald-300 shadow-sm'
                  : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
              }`}
            >
              <Grid size={16} />
              <span>سور القرآن الـ 114</span>
            </button>
            <button
              onClick={() => setActiveMode('category')}
              className={`flex-1 py-2.5 rounded-xl font-bold font-arabic text-xs sm:text-sm flex items-center justify-center gap-2 transition ${
                activeMode === 'category'
                  ? 'bg-white dark:bg-[#121E1A] text-emerald-800 dark:text-emerald-300 shadow-sm'
                  : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
              }`}
            >
              <BookOpen size={16} />
              <span>علوم القرآن العامة</span>
            </button>
          </div>

          {/* MODE 1: CURATED COLLECTIONS GRID */}
          {activeMode === 'collection' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {QUIZ_COLLECTIONS.map(col => {
                  const isSelected = selectedCollectionId === col.id;
                  return (
                    <div
                      key={col.id}
                      onClick={() => setSelectedCollectionId(col.id)}
                      className={`p-5 rounded-3xl border-2 cursor-pointer transition-all hover:scale-[1.01] relative overflow-hidden flex flex-col justify-between ${
                        isSelected 
                          ? 'border-emerald-600 bg-white dark:bg-[#121E1A] shadow-lg shadow-emerald-700/10' 
                          : 'border-stone-200/80 dark:border-emerald-950/60 bg-white dark:bg-[#121E1A] hover:border-emerald-300'
                      }`}
                    >
                      {/* Badge */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold font-arabic bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                          {col.badge}
                        </span>
                        {isSelected && (
                          <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-sm">
                            <Check size={14} />
                          </div>
                        )}
                      </div>

                      <div className="space-y-1.5 mb-4">
                        <h3 className="font-bold text-base font-arabic text-stone-900 dark:text-stone-100">
                          {col.titleAr}
                        </h3>
                        <p className="text-xs text-stone-500 dark:text-stone-400 font-arabic line-clamp-2 leading-relaxed">
                          {col.description}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-stone-100 dark:border-emerald-950/50 flex items-center justify-between text-[11px] font-sans text-stone-400" dir="ltr">
                        <span>{col.titleEn}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Start Collection Quiz Button */}
              <div className="pt-4">
                <button
                  onClick={() => startQuiz({ mode: 'collection' })}
                  className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold font-arabic text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/25 transition active:scale-98"
                >
                  <Sparkles size={20} />
                  <span>بدء مسابقة: {currentCollection?.titleAr}</span>
                </button>
              </div>
            </div>
          )}

          {/* MODE 2: 114 SURAHS SELECTOR */}
          {activeMode === 'surah' && (
            <div className="bg-white dark:bg-[#121E1A] p-6 rounded-3xl border border-stone-200/80 dark:border-emerald-900/40 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h3 className="font-bold text-base font-arabic text-stone-900 dark:text-stone-100">
                  اختر سورة من الـ 114 سورة للاختبار الفوري
                </h3>
                {/* Search input */}
                <div className="relative w-full sm:w-64">
                  <input
                    type="text"
                    value={surahSearchQuery}
                    onChange={(e) => setSurahSearchQuery(e.target.value)}
                    placeholder="ابحث باسم السورة أو رقمها..."
                    className="w-full pr-9 pl-3 py-2 rounded-xl bg-stone-50 dark:bg-emerald-950/40 border border-stone-200 dark:border-emerald-900/40 text-xs font-arabic text-stone-800 dark:text-stone-200 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <Search size={14} className="absolute right-3 top-3 text-stone-400" />
                </div>
              </div>

              {/* Selected Surah Preview Card */}
              {currentSurah && (
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-bold flex items-center justify-center font-sans">
                      {currentSurah.number}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm font-arabic text-stone-900 dark:text-stone-100">
                        سورة {currentSurah.arabic} ({currentSurah.english})
                      </h4>
                      <span className="text-xs text-stone-500 dark:text-stone-400 font-arabic">
                        {currentSurah.type === 'Meccan' ? 'مكية' : 'مدنية'} • {currentSurah.ayahs} آية • الجزء {currentSurah.juz}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => startQuiz({ mode: 'surah', surahNumber: currentSurah.number })}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold font-arabic text-xs shadow-md shadow-emerald-700/20"
                  >
                    بدء اختبار السورة
                  </button>
                </div>
              )}

              {/* 114 Surahs Grid Selector */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5 max-h-96 overflow-y-auto p-1">
                {filteredSurahsList.map(s => {
                  const isSelected = selectedSurahNumber === s.number;
                  return (
                    <div
                      key={s.number}
                      onClick={() => setSelectedSurahNumber(s.number)}
                      className={`p-2.5 rounded-2xl border text-center cursor-pointer transition-all hover:scale-105 ${
                        isSelected 
                          ? 'border-emerald-600 bg-emerald-600 text-white shadow-md shadow-emerald-700/20' 
                          : 'border-stone-200 dark:border-emerald-950/60 bg-white dark:bg-[#121E1A] text-stone-800 dark:text-stone-200 hover:border-emerald-400'
                      }`}
                    >
                      <span className={`text-[10px] font-sans font-bold block opacity-75 ${isSelected ? 'text-white' : 'text-stone-400'}`}>
                        #{s.number}
                      </span>
                      <span className="text-xs font-bold font-arabic block mt-0.5">
                        {s.arabic}
                      </span>
                      <span className={`text-[9px] font-arabic block mt-0.5 ${isSelected ? 'text-emerald-100' : 'text-stone-400'}`}>
                        {s.ayahs} آية
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* MODE 3: GENERAL SCIENCES & CATEGORIES */}
          {activeMode === 'category' && (
            <div className="bg-white dark:bg-[#121E1A] p-6 rounded-3xl border border-stone-200/80 dark:border-emerald-900/40 shadow-sm space-y-4">
              <h3 className="font-bold text-base font-arabic text-stone-900 dark:text-stone-100">
                اختبار عام بحسب فروع علوم القرآن الكريم
              </h3>

              <div className="space-y-3">
                <div>
                  <span className="text-xs font-bold text-stone-500 dark:text-stone-400 font-arabic block mb-2">التصنيف العلمي:</span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'all', label: 'كافة العلوم القرآنية' },
                      { id: 'mutashabihat', label: 'متشابهات القرآن والفواصل' },
                      { id: 'gharib_quran', label: 'غريب القرآن والمفردات' },
                      { id: 'ayah_completion', label: 'تحدي إكمال الآيات' },
                      { id: 'tajweed', label: 'أحكام التجويد والمخارج' },
                      { id: 'asbab_nuzul', label: 'أسباب النزول وفضائل السور' },
                      { id: 'tiwal', label: 'السبع الطوال' }
                    ].map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`px-3.5 py-1.5 rounded-2xl text-xs font-arabic font-bold transition ${
                          selectedCategory === cat.id 
                            ? 'bg-emerald-600 text-white shadow-sm' 
                            : 'bg-stone-100 dark:bg-emerald-950/40 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-xs font-bold text-stone-500 dark:text-stone-400 font-arabic block mb-2">مستوى الصعوبة:</span>
                  <div className="flex gap-2">
                    {[
                      { id: 'all', label: 'الكل' },
                      { id: 'beginner', label: 'مبتدئ' },
                      { id: 'intermediate', label: 'متوسط' },
                      { id: 'advanced', label: 'متقدم / حفاظ' }
                    ].map(dif => (
                      <button
                        key={dif.id}
                        onClick={() => setSelectedDifficulty(dif.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-arabic transition ${
                          selectedDifficulty === dif.id 
                            ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-bold border border-amber-300' 
                            : 'bg-stone-100 dark:bg-emerald-950/40 text-stone-500 hover:bg-stone-200'
                        }`}
                      >
                        {dif.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => startQuiz({ mode: 'category' })}
                  className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold font-arabic text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/20 transition"
                >
                  <Sparkles size={18} />
                  <span>بدء الاختبار بحسب الفلتر المختار</span>
                </button>
              </div>
            </div>
          )}

        </div>
      )}

      {/* GAME OVER (SURVIVAL MODE 0 LIVES) */}
      {inQuiz && gameOver && (
        <div className="bg-white dark:bg-[#121E1A] rounded-3xl p-8 border border-stone-200/80 dark:border-emerald-900/40 text-center shadow-lg animate-fade-in max-w-lg mx-auto">
          <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-red-500/10">
            <Heart size={40} className="fill-red-600" />
          </div>

          <h2 className="text-2xl font-bold font-arabic text-stone-900 dark:text-stone-100 mb-1">
            انتهت القلوب والمحاولات!
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 font-arabic mb-6">
            في تحدي البقاء، كل إجابة خاطئة تستهلك قلباً. لقد حققت {score} XP في هذه الجولة.
          </p>

          <div className="flex gap-2">
            <button
              onClick={() => startQuiz()}
              className="flex-1 py-3.5 rounded-2xl bg-emerald-600 text-white font-bold font-arabic flex items-center justify-center gap-2 hover:bg-emerald-700 shadow-md shadow-emerald-700/20"
            >
              <RotateCcw size={16} />
              <span>إعادة المحاولة من جديد</span>
            </button>
            <button
              onClick={exitQuiz}
              className="flex-1 py-3.5 rounded-2xl bg-stone-100 dark:bg-emerald-950 text-stone-700 dark:text-stone-200 font-bold font-arabic hover:bg-stone-200"
            >
              العودة للقائمة
            </button>
          </div>
        </div>
      )}

      {/* ACTIVE QUIZ GAMEPLAY VIEW */}
      {inQuiz && !quizCompleted && !gameOver && questionList.length > 0 && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Active Quiz Context Banner */}
          <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 p-3.5 rounded-2xl flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Award className="text-emerald-600 dark:text-emerald-400" size={18} />
              <span className="text-xs font-bold font-arabic text-emerald-900 dark:text-emerald-200">
                {activeMode === 'surah' ? `مسابقة سورة ${currentSurah?.arabic}` : activeMode === 'collection' ? `${currentCollection?.titleAr || 'مجموعة قرآنية'}` : 'اختبار علوم القرآن العام'}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200">
                {gameMode === 'timed' ? '⏱️ ضد الوقت' : gameMode === 'survival' ? '❤️ تحدي البقاء' : '📖 الوضع التعليمي'}
              </span>
            </div>

            {/* LIFELINES BAR */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-stone-400 font-arabic hidden sm:inline">وسائل المساعدة:</span>
              
              {/* 50:50 Lifeline */}
              <button
                onClick={useFiftyFifty}
                disabled={lifelines.fiftyFiftyUsed || isAnswered}
                className={`px-2.5 py-1 rounded-xl text-xs font-bold font-arabic transition flex items-center gap-1 ${
                  lifelines.fiftyFiftyUsed 
                    ? 'bg-stone-200 dark:bg-stone-800 text-stone-400 cursor-not-allowed opacity-50' 
                    : 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 hover:bg-indigo-200 border border-indigo-200 dark:border-indigo-800'
                }`}
                title="حذف إجابتين خاطئتين"
              >
                <span>50:50</span>
              </button>

              {/* AI Hint Lifeline */}
              <button
                onClick={useHint}
                disabled={lifelines.hintUsed || isAnswered}
                className={`px-2.5 py-1 rounded-xl text-xs font-bold font-arabic transition flex items-center gap-1 ${
                  lifelines.hintUsed 
                    ? 'bg-stone-200 dark:bg-stone-800 text-stone-400 cursor-not-allowed opacity-50' 
                    : 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 hover:bg-amber-200 border border-amber-200 dark:border-amber-800'
                }`}
                title="طلب تلميح ذكي"
              >
                <Lightbulb size={13} />
                <span>تلميح</span>
              </button>

              {/* Skip Lifeline */}
              <button
                onClick={useSkip}
                disabled={lifelines.skipUsed || isAnswered}
                className={`px-2.5 py-1 rounded-xl text-xs font-bold font-arabic transition flex items-center gap-1 ${
                  lifelines.skipUsed 
                    ? 'bg-stone-200 dark:bg-stone-800 text-stone-400 cursor-not-allowed opacity-50' 
                    : 'bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 hover:bg-teal-200 border border-teal-200 dark:border-teal-800'
                }`}
                title="تخطي هذا السؤال"
              >
                <span>تخطي ⏭️</span>
              </button>
            </div>
          </div>

          {/* TIMED BLITZ COUNTDOWN TIMER BAR */}
          {gameMode === 'timed' && (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs font-bold font-arabic">
                <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
                  <Clock size={14} />
                  <span>الوقت المتبقي: {timeLeft} ثانية</span>
                </span>
                <span className="text-[11px] text-stone-400">
                  {timeLeft > 12 ? '🔥 سرعة فائقة (+10 XP)' : timeLeft > 6 ? '⚡ سرعة جيدة (+5 XP)' : '⚠️ انتبه قبل انتهاء الوقت'}
                </span>
              </div>
              <div className="h-2.5 w-full bg-stone-100 dark:bg-emerald-950 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ${
                    timeLeft > 10 
                      ? 'bg-emerald-500' 
                      : timeLeft > 5 
                        ? 'bg-amber-500' 
                        : 'bg-red-500 animate-pulse'
                  }`}
                  style={{ width: `${(timeLeft / 20) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Progress bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs text-stone-400 font-sans" dir="ltr">
              <span>السؤال {currentQuestionIndex + 1} من {questionList.length}</span>
              <span>{Math.round(((currentQuestionIndex + 1) / questionList.length) * 100)}%</span>
            </div>
            <div className="h-2 w-full bg-stone-100 dark:bg-emerald-950 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
                style={{ width: `${((currentQuestionIndex + 1) / questionList.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white dark:bg-[#121E1A] rounded-3xl p-6 sm:p-8 border border-stone-200/80 dark:border-emerald-900/40 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-arabic font-bold">
                {question.categoryNameAr || 'علوم القرآن'}
              </span>

              <div className="flex items-center gap-2">
                {/* Audio Clue Recitation Button */}
                {(question.audioAyah || question.surahNumber) && (
                  <button
                    onClick={toggleAudioClue}
                    className={`px-3 py-1 rounded-full text-xs font-bold font-arabic transition flex items-center gap-1.5 ${
                      audioPlaying 
                        ? 'bg-emerald-600 text-white animate-pulse' 
                        : 'bg-stone-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50'
                    }`}
                    title="استمع لتلاوة الآية كتلميح صوتي"
                  >
                    {audioPlaying ? <Pause size={13} /> : <Play size={13} />}
                    <span>{audioPlaying ? 'إيقاف التلاوة' : 'تلميح صوتي 🎧'}</span>
                  </button>
                )}

                <span className="px-2.5 py-0.5 rounded-full bg-stone-100 dark:bg-emerald-950/60 text-[10px] text-stone-500 dark:text-stone-400 font-arabic">
                  {question.difficulty === 'beginner' ? 'مستوى مبتدئ' : question.difficulty === 'intermediate' ? 'مستوى متوسط' : 'مستوى متقدم'}
                </span>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold font-arabic text-stone-900 dark:text-stone-100 leading-relaxed mb-4">
              {question.questionAr}
            </h3>

            {question.questionEn && (
              <>
                <div className="w-12 h-px bg-stone-200 dark:bg-emerald-900/60 mb-3"></div>
                <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 font-sans font-medium" dir="ltr">
                  {question.questionEn}
                </p>
              </>
            )}

            {/* AI Hint Reveal Box */}
            {showHintBox && (
              <div className="mt-4 p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-200 flex items-start gap-2 text-xs font-arabic animate-fade-in">
                <Lightbulb size={16} className="text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block mb-0.5">تلميح قرآني:</span>
                  <span>{question.hintAr || 'تأمل في سياق الآيات والمعنى اللغوي الدقيق.'}</span>
                </div>
              </div>
            )}
          </div>

          {/* Multiple Choice Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {question.optionsAr?.map((optAr, idx) => {
              // If hidden by 50:50 lifeline
              if (hiddenOptionIndices.includes(idx)) {
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl border-2 border-dashed border-stone-200/50 dark:border-stone-800/40 bg-stone-50/30 dark:bg-stone-950/20 text-stone-300 dark:text-stone-700 text-center font-arabic text-xs flex items-center justify-center"
                  >
                    <span>(تم حذف الإجابة بواسطة 50:50)</span>
                  </div>
                );
              }

              const optEn = question.optionsEn ? question.optionsEn[idx] : null;
              let btnClass = "bg-white dark:bg-[#121E1A] border-stone-200/80 dark:border-emerald-900/40 text-stone-800 dark:text-stone-200 hover:border-emerald-400 hover:bg-emerald-50/50";
              let icon = null;

              if (isAnswered) {
                if (idx === question.correctAnswerIndex) {
                  btnClass = "bg-emerald-50 dark:bg-emerald-950/80 border-emerald-500 text-emerald-950 dark:text-emerald-200 shadow-md shadow-emerald-700/10";
                  icon = <CheckCircle2 className="text-emerald-600 dark:text-emerald-400 shrink-0" size={22} />;
                } else if (idx === selectedAnswerIndex) {
                  btnClass = "bg-red-50 dark:bg-red-950/70 border-red-500 text-red-950 dark:text-red-200";
                  icon = <AlertTriangle className="text-red-500 shrink-0" size={22} />;
                } else {
                  btnClass = "bg-stone-50/60 dark:bg-[#0E1715] border-stone-200/50 dark:border-emerald-950/30 text-stone-400 opacity-60";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  disabled={isAnswered}
                  className={`p-4 sm:p-5 rounded-2xl border-2 text-right transition-all flex items-center justify-between gap-3 ${btnClass}`}
                >
                  <div>
                    <span className="font-bold text-base sm:text-lg font-arabic block leading-tight mb-1">
                      {optAr}
                    </span>
                    {optEn && (
                      <span className="text-xs text-stone-400 font-sans block" dir="ltr">
                        {optEn}
                      </span>
                    )}
                  </div>
                  {icon}
                </button>
              );
            })}
          </div>

          {/* Explanation Card */}
          {isAnswered && (
            <div className="p-5 rounded-3xl bg-white dark:bg-[#121E1A] border-2 border-emerald-200 dark:border-emerald-800 shadow-sm animate-fade-in text-right relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-100 dark:border-emerald-950/50">
                <div className="flex items-center gap-2">
                  <Lightbulb size={18} className="text-amber-500" />
                  <h4 className="font-bold text-sm font-arabic text-stone-900 dark:text-stone-100">
                    الشرح والتفسير العلمي المعتمد
                  </h4>
                </div>
                <div className="flex items-center gap-1.5 bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 px-2.5 py-1 rounded-lg text-[10px] font-bold">
                  <ShieldCheck size={14} className="text-blue-600 dark:text-blue-400" />
                  <span className="font-arabic">{question.source || 'مصحف المدينة المنورة'}</span>
                </div>
              </div>

              <p className="text-sm font-arabic font-medium text-stone-800 dark:text-stone-200 leading-relaxed">
                {question.explanationAr}
              </p>
            </div>
          )}

          {/* Next Button */}
          <div className="pt-2">
            <button
              onClick={handleNext}
              disabled={!isAnswered}
              className={`w-full py-4 rounded-2xl font-bold font-arabic text-base sm:text-lg flex items-center justify-center gap-2 transition-all ${
                isAnswered 
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-700/25 active:scale-98' 
                  : 'bg-stone-200 dark:bg-emerald-950/50 text-stone-400 cursor-not-allowed'
              }`}
            >
              <span>{isLastQuestion ? 'إنهاء التحدي وعرض النتيجة' : 'السؤال التالي'}</span>
              <ChevronLeft size={20} />
            </button>
          </div>

        </div>
      )}

      {/* QUIZ COMPLETION SUMMARY & ADVANCED SCORECARD */}
      {quizCompleted && (
        <div className="bg-white dark:bg-[#121E1A] rounded-3xl p-6 sm:p-8 border border-stone-200/80 dark:border-emerald-900/40 text-center shadow-lg animate-fade-in max-w-xl mx-auto space-y-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-400 to-amber-200 text-amber-950 flex items-center justify-center mx-auto mb-2 shadow-xl shadow-amber-500/25 text-3xl">
            {getScholarRank().icon}
          </div>

          <div>
            <div className={`text-sm font-bold font-arabic mb-1 ${getScholarRank().color}`}>
              {getScholarRank().title}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-arabic text-stone-900 dark:text-stone-100">
              مبارك! أكملت التحدي بنجاح
            </h2>
            <p className="text-xs text-stone-400 font-arabic mt-1">
              زادك الله علماً وفقهاً وتثبيتاً لكتابه الكريم
            </p>
          </div>

          {/* Detailed Statistics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
            <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-emerald-950/30 border border-stone-100 dark:border-emerald-900/30">
              <span className="text-[11px] text-stone-400 font-arabic block mb-0.5">الرصيد النهائي</span>
              <span className="text-xl font-bold text-emerald-600 font-sans" dir="ltr">{score} XP</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-emerald-950/30 border border-stone-100 dark:border-emerald-900/30">
              <span className="text-[11px] text-stone-400 font-arabic block mb-0.5">نسبة الدقة</span>
              <span className="text-xl font-bold text-teal-600 font-sans" dir="ltr">
                {questionList.length > 0 ? Math.round((correctAnswersCount / questionList.length) * 100) : 100}%
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-emerald-950/30 border border-stone-100 dark:border-emerald-900/30">
              <span className="text-[11px] text-stone-400 font-arabic block mb-0.5">أعلى تتابع 🔥</span>
              <span className="text-xl font-bold text-amber-500 font-sans" dir="ltr">{maxStreak}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-emerald-950/30 border border-stone-100 dark:border-emerald-900/30">
              <span className="text-[11px] text-stone-400 font-arabic block mb-0.5">للمراجعة</span>
              <span className="text-xl font-bold text-rose-500 font-sans" dir="ltr">{missedQuestions.length}</span>
            </div>
          </div>

          {/* New High Score Badge */}
          {score >= highScore && score > 0 && (
            <div className="py-2 px-4 rounded-2xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-400/40 text-amber-900 dark:text-amber-200 text-xs font-bold font-arabic flex items-center justify-center gap-2">
              <Award size={16} className="text-amber-500" />
              <span>رقم قياسي شخصي جديد في ساحة التحدي! 🏆</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-2">
            {missedQuestions.length > 0 && (
              <button
                onClick={startMissedReview}
                className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold font-arabic text-sm flex items-center justify-center gap-2 shadow-md shadow-amber-500/20"
              >
                <BookOpen size={16} />
                <span>مراجعة وتصحيح الأسئلة الخاطئة ({missedQuestions.length})</span>
              </button>
            )}

            <div className="flex gap-2">
              <button
                onClick={() => startQuiz()}
                className="flex-1 py-3.5 rounded-2xl bg-emerald-600 text-white font-bold font-arabic text-sm flex items-center justify-center gap-2 hover:bg-emerald-700 shadow-md shadow-emerald-700/20"
              >
                <RotateCcw size={16} />
                <span>إعادة الاختبار</span>
              </button>
              
              <button
                onClick={shareScore}
                className="px-4 py-3.5 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 font-bold font-arabic text-sm flex items-center justify-center gap-1.5 hover:bg-teal-100 border border-teal-200 dark:border-teal-800"
                title="مشاركة النتيجة"
              >
                <Share2 size={16} />
                <span>مشاركة النتيجة</span>
              </button>

              <button
                onClick={exitQuiz}
                className="flex-1 py-3.5 rounded-2xl bg-stone-100 dark:bg-emerald-950 text-stone-700 dark:text-stone-200 font-bold font-arabic text-sm hover:bg-stone-200"
              >
                اختيار مسابقة أخرى
              </button>
            </div>

            {copiedNotification && (
              <div className="text-xs text-emerald-600 dark:text-emerald-400 font-arabic animate-fade-in">
                ✓ تم نسخ ملخص النتيجة إلى الحافظة للمشاركة!
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
