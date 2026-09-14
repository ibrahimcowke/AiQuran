import React, { useState, useEffect, useRef } from 'react';
import { Search, Book, X, ArrowLeft, Bookmark, Sparkles } from 'lucide-react';
import { SURAHS_INDEX } from '../data/quranData';

export default function GlobalSearchModal({ 
  isOpen, 
  onClose, 
  onSelectSurah, 
  onSelectAyah,
  bookmarks = [] 
}) {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('surahs'); // 'surahs' | 'bookmarks' | 'quick'
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const normalizedQuery = query.trim().toLowerCase();

  const filteredSurahs = SURAHS_INDEX.filter((s) => {
    if (!normalizedQuery) return true;
    return (
      s.arabic.includes(normalizedQuery) ||
      s.english.toLowerCase().includes(normalizedQuery) ||
      s.translation.toLowerCase().includes(normalizedQuery) ||
      s.number.toString() === normalizedQuery
    );
  });

  const popularSurahs = [1, 2, 18, 36, 55, 67, 112, 113, 114];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header / Input */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث عن سورة بالاسم، الرقم، المعنى، أو اضغط Esc للإغلاق..."
            className="flex-1 bg-transparent text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none text-base sm:text-lg font-arabic"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-xs font-mono text-slate-400 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
            ESC
          </kbd>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('surahs')}
            className={`px-3 py-1 rounded-full font-medium transition ${
              activeTab === 'surahs'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            السور ({filteredSurahs.length})
          </button>
          <button
            onClick={() => setActiveTab('bookmarks')}
            className={`px-3 py-1 rounded-full font-medium transition flex items-center gap-1 ${
              activeTab === 'bookmarks'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            <Bookmark className="w-3 h-3" />
            العلامات المرجعية ({bookmarks.length})
          </button>
          <button
            onClick={() => setActiveTab('quick')}
            className={`px-3 py-1 rounded-full font-medium transition flex items-center gap-1 ${
              activeTab === 'quick'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-3 h-3 text-amber-500" />
            السور الشائعة
          </button>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-3 space-y-1 divide-y divide-slate-100 dark:divide-slate-800/60 max-h-[50vh]">
          {activeTab === 'surahs' && (
            filteredSurahs.length > 0 ? (
              filteredSurahs.map((surah) => (
                <div
                  key={surah.id}
                  onClick={() => {
                    onSelectSurah(surah.id);
                    onClose();
                  }}
                  className="pt-2 pb-2 px-3 rounded-2xl hover:bg-emerald-50/70 dark:hover:bg-emerald-950/30 cursor-pointer flex items-center justify-between group transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-sm">
                      {surah.number}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800 dark:text-slate-100 font-arabic text-base">
                          سورة {surah.arabic}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                          {surah.type === 'Meccan' ? 'مكية' : 'مدنية'}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-2">
                        <span>{surah.english}</span>
                        <span>•</span>
                        <span>{surah.ayahs} آية</span>
                        <span>•</span>
                        <span>{surah.translation}</span>
                      </div>
                    </div>
                  </div>
                  <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:-translate-x-1 transition" />
                </div>
              ))
            ) : (
              <div className="py-12 text-center text-slate-400 dark:text-slate-500">
                <p className="text-sm">لم يتم العثور على أي سورة مطابقة لـ "{query}"</p>
              </div>
            )
          )}

          {activeTab === 'bookmarks' && (
            bookmarks.length > 0 ? (
              bookmarks.map((bm, i) => (
                <div
                  key={i}
                  onClick={() => {
                    onSelectSurah(bm.surahId);
                    if (onSelectAyah && bm.ayahNumber) {
                      onSelectAyah(bm.ayahNumber);
                    }
                    onClose();
                  }}
                  className="pt-2 pb-2 px-3 rounded-2xl hover:bg-emerald-50/70 dark:hover:bg-emerald-950/30 cursor-pointer flex items-center justify-between group transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 flex items-center justify-center font-bold text-sm">
                      <Bookmark className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-800 dark:text-slate-100 font-arabic text-base">
                        {bm.surahName} - الآية {bm.ayahNumber}
                      </span>
                      <p className="text-xs text-slate-400 font-arabic line-clamp-1">
                        {bm.text || 'علامة مرجعية محفوظة'}
                      </p>
                    </div>
                  </div>
                  <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition" />
                </div>
              ))
            ) : (
              <div className="py-12 text-center text-slate-400 dark:text-slate-500">
                <Bookmark className="w-8 h-8 mx-auto mb-2 opacity-40 text-amber-500" />
                <p className="text-sm">لا توجد علامات مرجعية محفوظة بعد</p>
                <p className="text-xs mt-1">اضغط على أيقونة الإشارة المرجعية بجانب أي آية في المصحف لحفظها هنا.</p>
              </div>
            )
          )}

          {activeTab === 'quick' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
              {SURAHS_INDEX.filter((s) => popularSurahs.includes(s.number)).map((surah) => (
                <div
                  key={surah.id}
                  onClick={() => {
                    onSelectSurah(surah.id);
                    onClose();
                  }}
                  className="p-3 rounded-2xl border border-slate-100 dark:border-slate-800/80 hover:border-emerald-500/40 hover:bg-emerald-50/60 dark:hover:bg-emerald-950/20 cursor-pointer flex items-center justify-between group transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-xs">
                      {surah.number}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 dark:text-slate-100 font-arabic text-sm">
                        سورة {surah.arabic}
                      </h4>
                      <span className="text-xs text-slate-400">{surah.ayahs} آية</span>
                    </div>
                  </div>
                  <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:-translate-x-1 transition" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <span>التنقل السريع بالقرآن الكريم</span>
            <span>•</span>
            <span>114 سورة كاملة</span>
          </div>
          <button 
            onClick={onClose}
            className="px-3 py-1 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
}
