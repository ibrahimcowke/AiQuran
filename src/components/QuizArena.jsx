import React, { useState, useEffect } from 'react';
import { 
  HelpCircle, CheckCircle2, AlertTriangle, Lightbulb, 
  ShieldCheck, Award, ArrowLeft, ArrowRight, RotateCcw, 
  Flame, Sparkles, ChevronLeft, BarChart2, Check, BookOpen,
  Search, Layers, Book, Compass, ListOrdered, Grid
} from 'lucide-react';
import { ALL_114_SURAHS, getSurahByNumber } from '../data/allSurahs';
import { QUIZ_COLLECTIONS, getQuizQuestions } from '../data/quizData';

export default function QuizArena({ setView }) {
  // Quiz Modes: 'collection' | 'surah' | 'category'
  const [activeMode, setActiveMode] = useState('collection');

  // Selection states
  const [selectedCollectionId, setSelectedCollectionId] = useState('juz_amma');
  const [selectedSurahNumber, setSelectedSurahNumber] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [surahSearchQuery, setSurahSearchQuery] = useState('');

  // Quiz Gameplay States
  const [inQuiz, setInQuiz] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [missedQuestions, setMissedQuestions] = useState([]);
  const [isReviewMode, setIsReviewMode] = useState(false);

  // Load questions when starting quiz
  const startQuiz = (overrideParams = {}) => {
    const params = {
      mode: activeMode,
      collectionId: selectedCollectionId,
      surahNumber: selectedSurahNumber,
      category: selectedCategory,
      difficulty: selectedDifficulty,
      ...overrideParams
    };
    const loaded = getQuizQuestions(params);
    setQuestions(loaded);
    setCurrentQuestionIndex(0);
    setSelectedAnswerIndex(null);
    setIsAnswered(false);
    setScore(0);
    setStreak(0);
    setQuizCompleted(false);
    setMissedQuestions([]);
    setIsReviewMode(false);
    setInQuiz(true);
  };

  const questionList = isReviewMode ? missedQuestions : questions;
  const question = questionList[currentQuestionIndex] || questions[0];
  const isLastQuestion = currentQuestionIndex === questionList.length - 1;

  const handleAnswer = (index) => {
    if (isAnswered) return;
    setSelectedAnswerIndex(index);
    setIsAnswered(true);

    if (index === question.correctAnswerIndex) {
      const multiplier = streak >= 3 ? 2 : 1;
      setScore(s => s + (10 * multiplier));
      setStreak(st => st + 1);
    } else {
      setStreak(0);
      if (!isReviewMode && !missedQuestions.some(m => m.id === question.id)) {
        setMissedQuestions(prev => [...prev, question]);
      }
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setQuizCompleted(true);
    } else {
      setCurrentQuestionIndex(i => i + 1);
      setSelectedAnswerIndex(null);
      setIsAnswered(false);
    }
  };

  const exitQuiz = () => {
    setInQuiz(false);
    setQuizCompleted(false);
    setIsReviewMode(false);
  };

  const startMissedReview = () => {
    setIsReviewMode(true);
    setCurrentQuestionIndex(0);
    setSelectedAnswerIndex(null);
    setIsAnswered(false);
    setQuizCompleted(false);
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
            <span>ساحة التحدي والمسابقات القرآنية الشاملة</span>
            <span className="font-sans text-[10px]" dir="ltr">114 Surahs Quiz Arena</span>
          </div>
          <h1 className="text-2xl font-bold font-arabic text-stone-900 dark:text-stone-100">
            تحديات سور القرآن الكريم الـ 114 والمجموعات
          </h1>
          <p className="text-xs text-stone-500 dark:text-stone-400 font-arabic mt-1">
            اختر أي سورة من الـ 114 سورة لاختبار إتقانها، أو نافس في مجموعات المسابقات القرآنية المتخصصة.
          </p>
        </div>

        {/* Score & Streak Counters (visible during quiz) */}
        {inQuiz && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/40 text-amber-800 dark:text-amber-300 font-bold text-xs font-arabic">
              <Flame size={16} className="text-amber-500 fill-amber-500" />
              <span>الحماس: {streak} {streak >= 3 ? '🔥 (x2)' : ''}</span>
            </div>
            <div className="px-4 py-1.5 rounded-2xl bg-emerald-600 text-white font-bold text-sm font-sans shadow-md shadow-emerald-700/20" dir="ltr">
              {score} XP
            </div>
            <button
              onClick={exitQuiz}
              className="px-3 py-1.5 rounded-2xl bg-stone-100 dark:bg-emerald-950/60 text-stone-600 dark:text-stone-300 text-xs font-arabic hover:bg-stone-200"
            >
              خروج
            </button>
          </div>
        )}
      </div>

      {/* QUIZ SELECTION HUB (When not actively in a quiz) */}
      {!inQuiz && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Top Mode Tabs */}
          <div className="flex bg-stone-100 dark:bg-emerald-950/50 p-1.5 rounded-2xl gap-1">
            {[
              { id: 'collection', label: 'مجموعات المسابقات القرآنية (Collections)', icon: Layers },
              { id: 'surah', label: 'مسابقة سورة محددة (114 سورة)', icon: Book },
              { id: 'category', label: 'بنك العلوم العام (التجويد، التفسير، النزول)', icon: Compass }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveMode(tab.id)}
                  className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-arabic font-bold flex items-center justify-center gap-2 transition-all ${
                    activeMode === tab.id
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-700/20'
                      : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
                  }`}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* MODE 1: QURANIC COLLECTIONS */}
          {activeMode === 'collection' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base font-arabic text-stone-900 dark:text-stone-100">
                  اختر مجموعة المسابقة القرآنية
                </h3>
                <span className="text-xs text-stone-400 font-arabic">
                  8 مجموعات متخصصة
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {QUIZ_COLLECTIONS.map(col => {
                  const isSelected = selectedCollectionId === col.id;
                  return (
                    <div
                      key={col.id}
                      onClick={() => setSelectedCollectionId(col.id)}
                      className={`p-5 rounded-3xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                        isSelected 
                          ? 'border-emerald-600 bg-emerald-50/60 dark:bg-emerald-950/40 shadow-md shadow-emerald-700/10 scale-[1.01]' 
                          : 'border-stone-200/80 dark:border-emerald-900/40 bg-white dark:bg-[#121E1A] hover:border-emerald-300'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold font-arabic bg-gradient-to-r ${col.gradient} text-white`}>
                            {col.badge}
                          </span>
                          <span className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            isSelected ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-stone-300'
                          }`}>
                            {isSelected && <Check size={12} />}
                          </span>
                        </div>
                        <h4 className="font-bold text-base font-arabic text-stone-900 dark:text-stone-100 mb-1">
                          {col.titleAr}
                        </h4>
                        <p className="text-xs text-stone-500 dark:text-stone-400 font-arabic leading-relaxed mb-4">
                          {col.description}
                        </p>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCollectionId(col.id);
                          startQuiz({ mode: 'collection', collectionId: col.id });
                        }}
                        className={`w-full py-2.5 rounded-xl font-bold font-arabic text-xs flex items-center justify-center gap-1.5 transition ${
                          isSelected
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : 'bg-stone-100 dark:bg-emerald-950/60 text-stone-700 dark:text-stone-300 hover:bg-emerald-600 hover:text-white'
                        }`}
                      >
                        <span>بدء مسابقة {col.titleAr}</span>
                        <ChevronLeft size={16} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* MODE 2: ALL 114 SURAHS SELECTOR */}
          {activeMode === 'surah' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-bold text-base font-arabic text-stone-900 dark:text-stone-100">
                    تحدي أي سورة من سور القرآن الـ 114
                  </h3>
                  <p className="text-xs text-stone-400 font-arabic">
                    اختر السورة لبدء اختبار مخصص في آياتها، وترتيبها، وتصنيفها المكي/المدني
                  </p>
                </div>

                {/* Search in 114 Surahs */}
                <div className="relative w-full sm:w-64">
                  <input
                    type="text"
                    value={surahSearchQuery}
                    onChange={(e) => setSurahSearchQuery(e.target.value)}
                    placeholder="ابحث برقم أو اسم السورة..."
                    className="w-full px-3 py-2 text-xs rounded-xl bg-stone-100 dark:bg-emerald-950/40 border border-stone-200 dark:border-emerald-900/60 font-arabic text-stone-800 dark:text-stone-100 focus:outline-none"
                  />
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                </div>
              </div>

              {/* Selected Surah Highlight Card */}
              {currentSurah && (
                <div className="p-4 rounded-3xl bg-gradient-to-r from-emerald-800 to-teal-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white/20 text-white flex items-center justify-center font-bold text-base font-sans">
                      {currentSurah.number}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-lg font-arabic">
                          سورة {currentSurah.arabic}
                        </h4>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-white/20 font-arabic">
                          {currentSurah.type === 'Meccan' ? 'مكية' : 'مدنية'}
                        </span>
                      </div>
                      <p className="text-xs text-emerald-200 font-sans mt-0.5" dir="ltr">
                        {currentSurah.english} • {currentSurah.ayahs} Ayahs • Juz {currentSurah.juz}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => startQuiz({ mode: 'surah', surahNumber: currentSurah.number })}
                    className="px-6 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold font-arabic text-xs flex items-center justify-center gap-2 shadow-md transition shrink-0"
                  >
                    <span>ابدأ اختبار سورة {currentSurah.arabic} الآن</span>
                    <ChevronLeft size={16} />
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
                اختبار عام في علوم القرآن الكريم
              </h3>

              <div className="space-y-3">
                <div>
                  <span className="text-xs font-bold text-stone-500 dark:text-stone-400 font-arabic block mb-2">التصنيف العلمي:</span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'all', label: 'كافة العلوم القرآنية' },
                      { id: 'tajweed', label: 'أحكام التجويد ومخارج الحروف' },
                      { id: 'tafsir', label: 'التفسير والبيان' },
                      { id: 'history', label: 'أسباب النزول والمعاني' }
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

      {/* ACTIVE QUIZ GAMEPLAY VIEW */}
      {inQuiz && !quizCompleted && questionList.length > 0 && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Active Quiz Context Banner */}
          <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 p-3.5 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="text-emerald-600 dark:text-emerald-400" size={18} />
              <span className="text-xs font-bold font-arabic text-emerald-900 dark:text-emerald-200">
                {activeMode === 'surah' ? `مسابقة سورة ${currentSurah.arabic}` : activeMode === 'collection' ? `${currentCollection?.titleAr || 'مجموعة قرآنية'}` : 'اختبار علوم القرآن العام'}
              </span>
            </div>
            <button
              onClick={exitQuiz}
              className="text-xs text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 font-arabic underline"
            >
              تغيير المسابقة
            </button>
          </div>

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
              <span className="px-2.5 py-0.5 rounded-full bg-stone-100 dark:bg-emerald-950/60 text-[10px] text-stone-500 dark:text-stone-400 font-arabic">
                {question.difficulty === 'beginner' ? 'مستوى مبتدئ' : question.difficulty === 'intermediate' ? 'مستوى متوسط' : 'مستوى متقدم'}
              </span>
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
          </div>

          {/* Multiple Choice Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {question.optionsAr?.map((optAr, idx) => {
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

      {/* QUIZ COMPLETION SUMMARY CARD */}
      {quizCompleted && (
        <div className="bg-white dark:bg-[#121E1A] rounded-3xl p-8 border border-stone-200/80 dark:border-emerald-900/40 text-center shadow-lg animate-fade-in max-w-lg mx-auto">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 to-amber-200 text-amber-950 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/20">
            <Award size={42} />
          </div>

          <h2 className="text-2xl font-bold font-arabic text-stone-900 dark:text-stone-100 mb-1">
            مبارك! أكملت التحدي بنجاح
          </h2>
          <p className="text-xs text-stone-400 font-arabic mb-6">
            زادك الله علماً وفقهاً في كتاب الله وسنة رسوله الكريم
          </p>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-emerald-950/30 border border-stone-100 dark:border-emerald-900/30">
              <span className="text-xs text-stone-400 font-arabic block mb-1">مجموع النقاط</span>
              <span className="text-xl font-bold text-emerald-600 font-sans" dir="ltr">{score} XP</span>
            </div>
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-emerald-950/30 border border-stone-100 dark:border-emerald-900/30">
              <span className="text-xs text-stone-400 font-arabic block mb-1">الأخطاء القابلة للمراجعة</span>
              <span className="text-xl font-bold text-amber-500 font-sans" dir="ltr">{missedQuestions.length}</span>
            </div>
          </div>

          <div className="space-y-2">
            {missedQuestions.length > 0 && (
              <button
                onClick={startMissedReview}
                className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold font-arabic flex items-center justify-center gap-2 shadow-md shadow-amber-500/20"
              >
                <BookOpen size={16} />
                <span>مراجعة وتصحيح الأسئلة الخاطئة ({missedQuestions.length})</span>
              </button>
            )}

            <div className="flex gap-2">
              <button
                onClick={() => startQuiz()}
                className="flex-1 py-3.5 rounded-2xl bg-emerald-600 text-white font-bold font-arabic flex items-center justify-center gap-2 hover:bg-emerald-700 shadow-md shadow-emerald-700/20"
              >
                <RotateCcw size={16} />
                <span>إعادة الاختبار</span>
              </button>
              <button
                onClick={exitQuiz}
                className="flex-1 py-3.5 rounded-2xl bg-stone-100 dark:bg-emerald-950 text-stone-700 dark:text-stone-200 font-bold font-arabic hover:bg-stone-200"
              >
                اختيار مسابقة أخرى
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
