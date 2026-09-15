import React, { useState } from 'react';
import { BookOpen, Info, ChevronDown, ChevronUp, Search, Sparkles } from 'lucide-react';

const TAJWEED_RULES = [
  {
    id: 'ikhfa',
    nameAr: 'الإخفاء',
    nameEn: 'Ikhfa (Concealment)',
    color: 'bg-blue-500',
    textColor: 'text-blue-700 dark:text-blue-300',
    bgLight: 'bg-blue-50 dark:bg-blue-950/40',
    border: 'border-blue-200 dark:border-blue-800/60',
    descAr: 'إخفاء النون الساكنة أو التنوين عند أحرف الإخفاء الخمسة عشر مع بقاء الغنة.',
    letters: ['ت', 'ث', 'ج', 'د', 'ذ', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ف', 'ق', 'ك'],
    example: { arabic: 'مِن تَحْتِهَا', highlight: 'ن ت', descAr: 'النون الساكنة قبل التاء: إخفاء' },
    tip: 'اجعل لسانك في وضع حرف الإخفاء مع استمرار الغنة لمدة حركتين.'
  },
  {
    id: 'idgham',
    nameAr: 'الإدغام',
    nameEn: 'Idgham (Assimilation)',
    color: 'bg-emerald-500',
    textColor: 'text-emerald-700 dark:text-emerald-300',
    bgLight: 'bg-emerald-50 dark:bg-emerald-950/40',
    border: 'border-emerald-200 dark:border-emerald-800/60',
    descAr: 'إدغام النون الساكنة أو التنوين في الحروف (ي،ن،م،و،ل،ر) بغنة أو بغير غنة.',
    letters: ['ي', 'ن', 'م', 'و', 'ل', 'ر'],
    example: { arabic: 'مَن يَعْمَلْ', highlight: 'ن ي', descAr: 'النون الساكنة قبل الياء: إدغام بغنة' },
    tip: 'عند الإدغام بغنة (ي،ن،م،و) تختفي النون مع بقاء الغنة. وعند الإدغام بغير غنة (ل،ر) تختفي كلياً.'
  },
  {
    id: 'iqlab',
    nameAr: 'الإقلاب',
    nameEn: 'Iqlab (Conversion)',
    color: 'bg-rose-500',
    textColor: 'text-rose-700 dark:text-rose-300',
    bgLight: 'bg-rose-50 dark:bg-rose-950/40',
    border: 'border-rose-200 dark:border-rose-800/60',
    descAr: 'قلب النون الساكنة أو التنوين ميماً مخفاة عند حرف الباء مع مراعاة الغنة.',
    letters: ['ب'],
    example: { arabic: 'أَنبِئْهُم', highlight: 'ن ب', descAr: 'النون الساكنة قبل الباء: إقلاب' },
    tip: 'اقلب النون إلى ميم مخفاة عند الباء، مع إطباق الشفتين والغنة.'
  },
  {
    id: 'izhar',
    nameAr: 'الإظهار الحلقي',
    nameEn: 'Izhar (Clear Pronunciation)',
    color: 'bg-amber-500',
    textColor: 'text-amber-700 dark:text-amber-300',
    bgLight: 'bg-amber-50 dark:bg-amber-950/40',
    border: 'border-amber-200 dark:border-amber-800/60',
    descAr: 'إظهار النون الساكنة أو التنوين بوضوح تام عند الأحرف الحلقية الستة.',
    letters: ['ء', 'ه', 'ع', 'ح', 'غ', 'خ'],
    example: { arabic: 'مَنْ آمَنَ', highlight: 'ن آ', descAr: 'النون الساكنة قبل الهمزة: إظهار' },
    tip: 'انطق النون بوضوح تام ولا تدغمها ولا تخفيها عند الحروف الحلقية.'
  },
  {
    id: 'qalqalah',
    nameAr: 'القلقلة',
    nameEn: 'Qalqalah (Echoing)',
    color: 'bg-purple-500',
    textColor: 'text-purple-700 dark:text-purple-300',
    bgLight: 'bg-purple-50 dark:bg-purple-950/40',
    border: 'border-purple-200 dark:border-purple-800/60',
    descAr: 'اضطراب المخرج عند النطق بالحروف الخمسة ساكنةً، وأقواها عند الوقف.',
    letters: ['ق', 'ط', 'ب', 'ج', 'د'],
    example: { arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ', highlight: 'ق', descAr: 'القاف مع القلقلة الكبرى عند الوقف' },
    tip: 'الحروف: قطب جد. القلقلة الصغرى عند الوصل والكبرى عند الوقف.'
  },
  {
    id: 'madd-tabii',
    nameAr: 'المد الطبيعي',
    nameEn: "Madd Tabi'i (Natural Lengthening)",
    color: 'bg-teal-500',
    textColor: 'text-teal-700 dark:text-teal-300',
    bgLight: 'bg-teal-50 dark:bg-teal-950/40',
    border: 'border-teal-200 dark:border-teal-800/60',
    descAr: 'المد الأصلي الذي لا تقوم ذات الحرف إلا به، مقداره حركتان.',
    letters: ['ا', 'و', 'ي'],
    example: { arabic: 'قَالَ', highlight: 'الألف', descAr: 'الألف بعد حرف مفتوح: مد طبيعي حركتان' },
    tip: 'المد الطبيعي حركتان دائماً. لا زيادة ولا نقصان.'
  },
  {
    id: 'madd-muttasil',
    nameAr: 'المد المتصل',
    nameEn: "Madd Muttasil (Connected Lengthening)",
    color: 'bg-orange-500',
    textColor: 'text-orange-700 dark:text-orange-300',
    bgLight: 'bg-orange-50 dark:bg-orange-950/40',
    border: 'border-orange-200 dark:border-orange-800/60',
    descAr: 'أن يأتي حرف المد والهمزة في كلمة واحدة، ومقداره 4 أو 5 حركات وجوباً.',
    letters: ['ا + ء', 'و + ء', 'ي + ء'],
    example: { arabic: 'جَاءَ', highlight: 'اء', descAr: 'المد قبل الهمزة في كلمة واحدة: 4-5 حركات' },
    tip: 'المد المتصل واجب ومقداره أربع أو خمس حركات عند الوصل.'
  },
  {
    id: 'ghunna',
    nameAr: 'الغنة',
    nameEn: 'Ghunna (Nasalization)',
    color: 'bg-indigo-500',
    textColor: 'text-indigo-700 dark:text-indigo-300',
    bgLight: 'bg-indigo-50 dark:bg-indigo-950/40',
    border: 'border-indigo-200 dark:border-indigo-800/60',
    descAr: 'صوت يخرج من الخيشوم، يلازم حرفي النون والميم، ومقداره حركتان.',
    letters: ['ن', 'م'],
    example: { arabic: 'إِنَّ اللَّهَ', highlight: 'نّ', descAr: 'النون المشددة: غنة كاملة حركتان' },
    tip: 'الغنة تظهر في النون والميم المشددتين، وفي الإخفاء والإدغام بغنة.'
  },
];

export default function TajweedGuide() {
  const [expandedId, setExpandedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = TAJWEED_RULES.filter(r =>
    r.nameAr.includes(searchQuery) ||
    r.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.descAr.includes(searchQuery)
  );

  return (
    <div className="max-w-5xl mx-auto w-full px-4 lg:px-8 py-6 space-y-6" dir="rtl">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200/80 dark:border-emerald-900/40">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 px-3 py-1 rounded-full text-xs font-bold font-arabic mb-2">
            <BookOpen size={14} />
            <span>أحكام التجويد</span>
            <span className="font-sans text-[10px]" dir="ltr">Tajweed Rules</span>
          </div>
          <h1 className="text-2xl font-bold font-arabic text-stone-900 dark:text-stone-100">مرجع أحكام التجويد</h1>
          <p className="text-xs text-stone-500 dark:text-stone-400 font-arabic mt-1">
            دليل شامل ومبسط لأحكام تجويد القرآن الكريم مع أمثلة تطبيقية ونصائح النطق.
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400" />
        <input
          type="text"
          placeholder="ابحث عن حكم تجويدي..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full pr-11 pl-4 py-3 rounded-2xl bg-white dark:bg-[#121E1A] border border-stone-200/80 dark:border-emerald-900/40 text-sm font-arabic focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
        />
      </div>

      {/* Color Legend */}
      <div className="flex flex-wrap gap-2">
        {TAJWEED_RULES.map(rule => (
          <button
            key={rule.id}
            onClick={() => setExpandedId(expandedId === rule.id ? null : rule.id)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border ${rule.bgLight} ${rule.border} ${rule.textColor} transition-all hover:opacity-80 text-xs font-bold font-arabic`}
          >
            <div className={`w-2.5 h-2.5 rounded-full ${rule.color}`} />
            {rule.nameAr}
          </button>
        ))}
      </div>

      {/* Rules List */}
      <div className="space-y-3">
        {filtered.map(rule => {
          const isExpanded = expandedId === rule.id;
          return (
            <div
              key={rule.id}
              className={`bg-white dark:bg-[#121E1A] rounded-3xl border transition-all shadow-sm overflow-hidden ${
                isExpanded ? `${rule.border}` : 'border-stone-200/80 dark:border-emerald-900/40'
              }`}
            >
              {/* Rule Header */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : rule.id)}
                className="w-full flex items-center justify-between p-5 text-right hover:bg-stone-50 dark:hover:bg-emerald-950/20 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl ${rule.color} flex items-center justify-center text-white font-bold text-lg font-arabic shadow-sm`}>
                    {rule.nameAr.slice(0, 1)}
                  </div>
                  <div className="text-right">
                    <h3 className={`font-bold text-base font-arabic ${rule.textColor}`}>{rule.nameAr}</h3>
                    <p className="text-[10px] text-stone-400 font-sans" dir="ltr">{rule.nameEn}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex gap-1">
                    {rule.letters.slice(0, 5).map((letter, li) => (
                      <span
                        key={li}
                        className={`w-7 h-7 rounded-lg ${rule.bgLight} ${rule.textColor} flex items-center justify-center text-xs font-bold font-arabic`}
                      >
                        {letter}
                      </span>
                    ))}
                    {rule.letters.length > 5 && (
                      <span className="text-[10px] text-stone-400 font-sans self-center">+{rule.letters.length - 5}</span>
                    )}
                  </div>
                  {isExpanded ? <ChevronUp size={18} className="text-stone-400" /> : <ChevronDown size={18} className="text-stone-400" />}
                </div>
              </button>

              {/* Expanded Content */}
              {isExpanded && (
                <div className={`px-5 pb-5 border-t ${rule.border} space-y-4`}>

                  {/* Description */}
                  <div className="pt-4">
                    <p className="text-sm font-arabic text-stone-700 dark:text-stone-300 leading-loose">
                      {rule.descAr}
                    </p>
                  </div>

                  {/* All Letters */}
                  <div>
                    <p className="text-[10px] font-bold text-stone-500 dark:text-stone-400 font-arabic mb-2">الأحرف:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {rule.letters.map((letter, li) => (
                        <span
                          key={li}
                          className={`px-2.5 py-1.5 rounded-xl ${rule.bgLight} ${rule.textColor} text-sm font-bold font-arabic border ${rule.border}`}
                        >
                          {letter}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Example */}
                  <div className={`p-4 rounded-2xl ${rule.bgLight} border ${rule.border}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles size={13} className={rule.textColor} />
                      <span className="text-[10px] font-bold text-stone-500 dark:text-stone-400 font-arabic">مثال تطبيقي:</span>
                    </div>
                    <p className="text-xl font-bold font-arabic text-stone-900 dark:text-stone-100 mb-2" style={{ fontFamily: 'Amiri, serif' }}>
                      {rule.example.arabic}
                    </p>
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg ${rule.color} text-white text-[10px] font-bold font-arabic`}>
                      <span>{rule.example.highlight}</span>
                    </div>
                    <p className="text-xs text-stone-500 dark:text-stone-400 font-arabic mt-2">{rule.example.descAr}</p>
                  </div>

                  {/* Practice Tip */}
                  <div className="flex gap-3 p-4 bg-stone-50 dark:bg-emerald-950/20 rounded-2xl border border-stone-200/80 dark:border-emerald-900/30">
                    <Info size={15} className="text-stone-400 shrink-0 mt-0.5" />
                    <p className="text-xs font-arabic text-stone-600 dark:text-stone-400 leading-relaxed">{rule.tip}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-stone-400 font-arabic">لا توجد نتائج للبحث عن "{searchQuery}"</p>
        </div>
      )}
    </div>
  );
}
