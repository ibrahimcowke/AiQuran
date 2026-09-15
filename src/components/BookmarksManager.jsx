import React, { useState } from 'react';
import { Bookmark, BookOpen, Trash2, Plus, Edit3, Check, X, Heart, ChevronLeft } from 'lucide-react';
import { SURAHS_INDEX } from '../data/quranData';

export default function BookmarksManager({
  bookmarks = [],
  toggleBookmark,
  setView,
  setActiveSurahId,
  setCurrentAyahNumber
}) {
  const [notes, setNotes] = useState(() => {
    try {
      const saved = localStorage.getItem('aiquran_bookmark_notes');
      return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
  });

  const [editingKey, setEditingKey] = useState(null);
  const [editText, setEditText] = useState('');
  const [filter, setFilter] = useState('all');

  const saveNote = (key, text) => {
    const updated = { ...notes, [key]: text };
    setNotes(updated);
    localStorage.setItem('aiquran_bookmark_notes', JSON.stringify(updated));
    setEditingKey(null);
  };

  const deleteNote = (key) => {
    const updated = { ...notes };
    delete updated[key];
    setNotes(updated);
    localStorage.setItem('aiquran_bookmark_notes', JSON.stringify(updated));
  };

  const navigateToAyah = (surahId, ayahNum) => {
    if (setActiveSurahId) setActiveSurahId(surahId);
    if (setCurrentAyahNumber) setCurrentAyahNumber(ayahNum);
    if (setView) setView('mushaf');
  };

  const displayBookmarks = bookmarks.filter(bm => {
    if (filter === 'notes') return !!notes[`${bm.surahId}:${bm.ayahNumber}`];
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto w-full px-4 lg:px-8 py-6 space-y-6" dir="rtl">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200/80 dark:border-emerald-900/40">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 px-3 py-1 rounded-full text-xs font-bold font-arabic mb-2">
            <Bookmark size={14} />
            <span>علاماتي المرجعية</span>
            <span className="font-sans text-[10px]" dir="ltr">Bookmarks</span>
          </div>
          <h1 className="text-2xl font-bold font-arabic text-stone-900 dark:text-stone-100">مدير الإشارات المرجعية</h1>
          <p className="text-xs text-stone-500 dark:text-stone-400 font-arabic mt-1">
            جميع إشاراتك المرجعية في مكان واحد مع إمكانية إضافة ملاحظاتك الشخصية.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 px-4 py-2.5 rounded-2xl">
          <Heart size={18} className="text-rose-500 fill-rose-500" />
          <div className="text-right">
            <span className="text-[10px] text-rose-700 dark:text-rose-400 font-arabic block">إجمالي المرجعيات</span>
            <span className="text-xl font-bold text-rose-900 dark:text-rose-200 font-sans">{bookmarks.length}</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {[
          { id: 'all', label: 'الكل' },
          { id: 'notes', label: 'ذات ملاحظات' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold font-arabic transition-all ${
              filter === tab.id
                ? 'bg-rose-600 text-white shadow-md'
                : 'bg-stone-100 dark:bg-emerald-950/40 text-stone-500 dark:text-stone-400 hover:bg-stone-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Bookmarks List */}
      {displayBookmarks.length === 0 ? (
        <div className="text-center py-20">
          <Bookmark size={40} className="mx-auto text-stone-300 dark:text-stone-600 mb-4" />
          <h3 className="text-lg font-bold font-arabic text-stone-500 dark:text-stone-400 mb-2">
            {filter === 'notes' ? 'لا توجد إشارات ذات ملاحظات' : 'لا توجد إشارات مرجعية بعد'}
          </h3>
          <p className="text-sm font-arabic text-stone-400">
            أضف إشارات مرجعية من المصحف الشريف بالضغط على أيقونة الإشارة بجانب أي آية.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {displayBookmarks.map(bm => {
            const key = `${bm.surahId}:${bm.ayahNumber}`;
            const hasNote = !!notes[key];
            const isEditing = editingKey === key;

            return (
              <div
                key={key}
                className="bg-white dark:bg-[#121E1A] rounded-3xl border border-stone-200/80 dark:border-emerald-900/40 shadow-sm hover:shadow-md transition-all overflow-hidden"
              >
                {/* Top: Surah Info */}
                <div className="flex items-center justify-between p-4 pb-3 border-b border-stone-100 dark:border-emerald-950/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-rose-100 dark:bg-rose-950/50 flex items-center justify-center">
                      <Heart size={16} className="text-rose-500 fill-rose-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm font-arabic text-stone-900 dark:text-stone-100">
                        سورة {bm.surahName}
                      </h3>
                      <span className="text-[10px] text-stone-400 font-arabic">الآية {bm.ayahNumber}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleBookmark && toggleBookmark(key)}
                    className="p-2 rounded-xl text-stone-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                    title="إزالة الإشارة"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>

                {/* Ayah text */}
                <div className="px-4 py-3">
                  <p className="text-sm font-arabic text-stone-600 dark:text-stone-400 leading-relaxed" style={{ fontFamily: 'Amiri, serif' }}>
                    {bm.text}
                  </p>
                </div>

                {/* Note section */}
                <div className="px-4 pb-4">
                  {isEditing ? (
                    <div className="space-y-2">
                      <textarea
                        autoFocus
                        value={editText}
                        onChange={e => setEditText(e.target.value)}
                        placeholder="اكتب ملاحظتك هنا..."
                        rows={3}
                        className="w-full px-3 py-2 rounded-xl bg-stone-100 dark:bg-emerald-950/40 border border-stone-200/80 dark:border-emerald-900/40 text-xs font-arabic focus:outline-none focus:ring-2 focus:ring-rose-500 resize-none"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => saveNote(key, editText)}
                          className="flex-1 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold font-arabic flex items-center justify-center gap-1"
                        >
                          <Check size={13} /> حفظ
                        </button>
                        <button
                          onClick={() => setEditingKey(null)}
                          className="px-3 py-2 rounded-xl bg-stone-100 dark:bg-emerald-950/40 text-stone-500 text-xs"
                        >
                          <X size={13} />
                        </button>
                      </div>
                    </div>
                  ) : hasNote ? (
                    <div className="bg-rose-50 dark:bg-rose-950/20 rounded-2xl p-3 border border-rose-100 dark:border-rose-900/30">
                      <p className="text-xs font-arabic text-stone-600 dark:text-stone-400 leading-relaxed mb-2">{notes[key]}</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => { setEditingKey(key); setEditText(notes[key]); }}
                          className="text-[10px] text-rose-600 dark:text-rose-400 font-arabic flex items-center gap-1"
                        >
                          <Edit3 size={11} /> تعديل
                        </button>
                        <button
                          onClick={() => deleteNote(key)}
                          className="text-[10px] text-stone-400 font-arabic flex items-center gap-1"
                        >
                          <Trash2 size={11} /> حذف
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => { setEditingKey(key); setEditText(''); }}
                      className="w-full py-2.5 rounded-xl border border-dashed border-stone-300 dark:border-emerald-900/50 text-stone-400 dark:text-stone-500 text-xs font-arabic flex items-center justify-center gap-1.5 hover:border-rose-300 hover:text-rose-500 transition-colors"
                    >
                      <Plus size={13} />
                      <span>إضافة ملاحظة شخصية</span>
                    </button>
                  )}
                </div>

                {/* Footer Action */}
                <div className="px-4 pb-4">
                  <button
                    onClick={() => navigateToAyah(bm.surahId, bm.ayahNumber)}
                    className="w-full py-2.5 rounded-xl bg-stone-100 dark:bg-emerald-950/40 text-stone-700 dark:text-stone-300 text-xs font-bold font-arabic flex items-center justify-center gap-2 hover:bg-stone-200 transition-colors"
                  >
                    <BookOpen size={13} />
                    <span>فتح في المصحف</span>
                    <ChevronLeft size={13} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
