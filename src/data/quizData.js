import { ALL_114_SURAHS, getSurahByNumber } from './allSurahs.js';

// Curated Quranic Quiz Collections
export const QUIZ_COLLECTIONS = [
  {
    id: 'juz_amma',
    titleAr: 'مسابقة سور جزء عمّ (37 سورة)',
    titleEn: 'Juz Amma Challenge (37 Surahs)',
    description: 'تحدي الحفظ والتدبر في قصار السور من سورة النبأ إلى سورة الناس.',
    icon: 'Sparkles',
    gradient: 'from-amber-600 to-orange-700',
    surahRange: [78, 114],
    badge: 'الأكثر شيوعاً'
  },
  {
    id: 'ayah_completion',
    titleAr: 'تحدي إكمال الآيات الكريمة',
    titleEn: 'Complete the Ayah Challenge',
    description: 'استمع وتأمل بدايات الآيات واختر التكملة القرآنية الصحيحة والفاصلة المحكمة.',
    icon: 'CheckCircle2',
    gradient: 'from-emerald-700 to-teal-900',
    badge: 'استحضار الحفظ 🎯'
  },
  {
    id: 'mutashabihat',
    titleAr: 'مسابقة متشابهات القرآن وفواصل الآيات',
    titleEn: 'Mutashabihat & Verse Distinctions',
    description: 'اختبار دقيق في ضبط الآيات المتشابهة في الألفاظ والفواصل لتمكين الإتقان التام.',
    icon: 'Compass',
    gradient: 'from-cyan-700 to-blue-900',
    badge: 'للحفاظ المتقنين 💎'
  },
  {
    id: 'gharib_quran',
    titleAr: 'مسابقة غريب القرآن ومعاني المفردات',
    titleEn: 'Gharib Al-Quran & Vocabulary',
    description: 'فهم معاني الألفاظ الغريبة والمفردات اللغوية الدقيقة في التنزيل الحكيم.',
    icon: 'BookOpen',
    gradient: 'from-amber-700 to-yellow-900',
    badge: 'ثراء لغوي 📖'
  },
  {
    id: 'tajweed',
    titleAr: 'مسابقة أحكام التجويد ومخارج الحروف',
    titleEn: 'Master Tajweed Rules',
    description: 'أحكام النون الساكنة والتنوين، الميم الساكنة، المدود، القلقلة، ومخارج وصفات الحروف.',
    icon: 'Mic',
    gradient: 'from-emerald-800 to-green-950',
    badge: 'إتقان التلاوة 🎙️'
  },
  {
    id: 'tiwal',
    titleAr: 'مسابقة السبع الطِّوال',
    titleEn: 'The Seven Long Surahs',
    description: 'أسئلة متقدمة في أطول سور القرآن: البقرة، آل عمران، النساء، المائدة، الأنعام، الأعراف، التوبة.',
    icon: 'BookOpen',
    gradient: 'from-emerald-700 to-teal-800',
    surahRange: [2, 9],
    badge: 'أصول التشريع'
  },
  {
    id: 'asbab_nuzul',
    titleAr: 'مسابقة أسباب النزول وفضائل السور',
    titleEn: 'Occasions of Revelation',
    description: 'المواقف والأحداث التي نزلت فيها آيات وسور القرآن العظيم في العهدين المكي والمدني.',
    icon: 'ShieldCheck',
    gradient: 'from-rose-700 to-pink-900',
    badge: 'فهم وتدبر 📜'
  },
  {
    id: 'musabbihat',
    titleAr: 'مسابقة السور المُسبّحات',
    titleEn: 'Al-Musabbihat Surahs',
    description: 'السور التي افتتحت بتمجيد الله وتسبيحه: الحديد، الحشر، الصف، الجمعة، التغابن، الأعلى.',
    icon: 'Award',
    gradient: 'from-teal-700 to-cyan-800',
    surahNumbers: [57, 59, 61, 62, 64, 87],
    badge: 'تسبيح وتوحيد'
  },
  {
    id: 'hawameem',
    titleAr: 'مسابقة الحواميم السبع (آل حم)',
    titleEn: 'The Seven Ha-Meem Family',
    description: 'عرائس القرآن المتتالية: غافر، فصلت، الشورى، الزخرف، الدخان، الجاثية، الأحقاف.',
    icon: 'Layers',
    gradient: 'from-purple-700 to-indigo-800',
    surahRange: [40, 46],
    badge: 'عرائس القرآن'
  },
  {
    id: 'prophets',
    titleAr: 'مسابقة قصص الأنبياء في القرآن',
    titleEn: 'Stories of the Prophets',
    description: 'السور المسماة بأسماء الأنبياء ومواقف رسالاتهم: يونس، هود، يوسف، إبراهيم، الأنبياء، محمد، نوح.',
    icon: 'HelpCircle',
    gradient: 'from-blue-700 to-indigo-900',
    surahNumbers: [10, 11, 12, 14, 21, 47, 71],
    badge: 'تاريخ وهداية'
  },
  {
    id: 'grand_marathon',
    titleAr: 'ماراثون القرآن الشامل (114 سورة)',
    titleEn: 'The Grand 114 Surahs Marathon',
    description: 'اختبار شامل وممتع يغطي كافة سور القرآن الـ 114 من الفاتحة إلى الناس.',
    icon: 'Flame',
    gradient: 'from-amber-700 via-emerald-800 to-teal-900',
    badge: 'تحدي القمة 🔥'
  }
];

// Curated master questions bank with hints, audio clues, and scholarly sources

// Fisher-Yates array shuffler
export const shuffleArray = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// Shuffles a question's options while keeping correctAnswerIndex in sync
export const shuffleQuestion = (question) => {
  if (!question || !question.optionsAr || question.optionsAr.length <= 1) return question;

  const indices = question.optionsAr.map((_, i) => i);
  const shuffledIndices = shuffleArray(indices);
  const currentCorrect = question.correctAnswerIndex ?? 0;

  return {
    ...question,
    optionsAr: shuffledIndices.map(i => question.optionsAr[i]),
    optionsEn: question.optionsEn ? shuffledIndices.map(i => question.optionsEn[i]) : undefined,
    correctAnswerIndex: shuffledIndices.indexOf(currentCorrect)
  };
};

export const MASTER_SCHOLARLY_QUESTIONS = [
  {
    id: 'taj_1',
    category: 'tajweed',
    categoryNameAr: 'أحكام التجويد',
    difficulty: 'beginner',
    questionAr: "كم عدد أحكام النون الساكنة والتنوين؟",
    questionEn: "How many rules govern Nun Sakinah and Tanween?",
    optionsAr: [
      "ثلاثة أحكام",
      "أربعة أحكام (الإظهار، الإدغام، الإقلاب، الإخفاء)",
      "خمسة أحكام",
      "ستة أحكام"
    ],
    optionsEn: [
      "Three rules",
      "Four rules (Izhar, Idgham, Iqlab, Ikhfa)",
      "Five rules",
      "Six rules"
    ],
    correctAnswerIndex: 1,
    explanationAr: "أحكام النون الساكنة والتنوين أربعة كما قال ابن الجزري والجمزوري: للنون إن تسكن وللتنوين أربع أحكام فخذ تبييني.",
    source: "تحفة الأطفال للشيخ سليمان الجمزوري",
    hintAr: "تذكر بيت التحفة: للنون إن تسكن وللتنوين أربع أحكام فخذ تبييني."
  },
  {
    id: 'taj_2',
    category: 'tajweed',
    categoryNameAr: 'أحكام التجويد',
    difficulty: 'intermediate',
    questionAr: "ما هو حكم النون الساكنة في قوله تعالى: ﴿مِن بَعْدِ﴾؟",
    questionEn: "What rule applies to Nun Sakinah in \"Min Ba'di\"?",
    optionsAr: [
      "إدغام بغنة",
      "إظهار حلقي",
      "إقلاب (قلب النون ميماً مخفاة مع الغنة)",
      "إخفاء حقيقي"
    ],
    optionsEn: [
      "Idgham with Ghunnah",
      "Izhar Halqi",
      "Iqlab (Transforming Nun into Meem with Ghunnah)",
      "Ikhfa Haqiqi"
    ],
    correctAnswerIndex: 2,
    explanationAr: "الإقلاب هو قلب النون الساكنة أو التنوين ميماً مخفاة بغنة عند حرف الباء فقط.",
    source: "الدر الثمين في تجويد كلام رب العالمين",
    hintAr: "يوجد حرف الباء فقط بعد النون الساكنة ويوضع فوقها ميم صغيرة (مـ)."
  },
  {
    id: 'taj_3',
    category: 'tajweed',
    categoryNameAr: 'أحكام التجويد',
    difficulty: 'intermediate',
    questionAr: "ما هي حروف القلقلة المجموعة في جملة شهيرة؟",
    questionEn: "What letters constitute Qalqalah?",
    optionsAr: [
      "قُطْبُ جَدٍّ (ق، ط، ب، ج، د)",
      "يَرْمَلُونَ (ي، ر، م، ل، و، ن)",
      "أَخِي هَاكَ عِلْمًا",
      "صِفْ ذَا ثَنَا"
    ],
    optionsEn: [
      "Qutb Jadd (Qaf, Taa, Baa, Jeem, Dal)",
      "Yarmaloon",
      "Akhi Haka 'Ilman",
      "Sif Dha Thana"
    ],
    correctAnswerIndex: 0,
    explanationAr: "حروف القلقلة خمسة يجمعها قول الناظم: (قلقلةٌ قُطبُ جَدٍّ)، وتقلقل إذا كانت ساكنة سكوناً أصلياً أو عارضاً للوقف.",
    source: "المقدمة الجزرية لابن الجزري",
    hintAr: "خمسة حروف تبدأ بحرف القاف وتجمع في كلمتي قطب جد."
  },
  {
    id: 'taj_4',
    category: 'tajweed',
    categoryNameAr: 'أحكام التجويد',
    difficulty: 'advanced',
    questionAr: "كم حَرَكَةً يُمدُّ المدُّ اللازم (الكلمي والحرفي) لزوماً في رواية حفص عن عاصم؟",
    questionEn: "How many Harakahs is Madd Lazim extended by necessity in Hafs an Asim?",
    optionsAr: [
      "5 حركات استحباباً",
      "4 حركات جوازاً",
      "حركتان قصراً",
      "6 حركات مشبعة لزوماً"
    ],
    optionsEn: [
      "5 Harakahs",
      "4 Harakahs",
      "2 Harakahs",
      "6 Harakahs (obligatory elongation)"
    ],
    correctAnswerIndex: 3,
    explanationAr: "المد اللازم يمد ست حركات مشبعة لزوماً وسمي لازماً للزوم مده عند جميع القراء بمقدار 6 حركات.",
    source: "البرهان في تجويد القرآن",
    hintAr: "هو أطول المدود مقداراً بالإجماع وتساوي 6 حركات."
  },
  {
    id: 'taj_5',
    category: 'tajweed',
    categoryNameAr: 'أحكام التجويد',
    difficulty: 'advanced',
    questionAr: "ما هو المخرج الدقيق لحرف (الضاد) المعجم كما قرره أئمة القراءات؟",
    questionEn: "What is the precise articulation point (Makhraj) of the letter Dad (ض)?",
    optionsAr: [
      "من وسط اللسان مع الحنك الأعلى",
      "من طرف اللسان مع أصول الثنايا العليا",
      "من إحدى حافتي اللسان أو كلتيهما مع ما يحاذيها من الأضراس العليا",
      "من طرف اللسان مع أطراف الثنايا العليا"
    ],
    optionsEn: [
      "Middle of the tongue with hard palate",
      "Tip of the tongue with roots of upper incisors",
      "From one or both edges of the tongue with upper molars",
      "Tip of tongue with tips of upper incisors"
    ],
    correctAnswerIndex: 2,
    explanationAr: "قال ابن الجزري: (والضادُ من حافتهِ إذ وَلِيا * الأضراسَ من أيسرَ أو يُمنَاهَا)، وهو أصعب الحروف وأفصحها.",
    source: "متن الجزرية للإمام ابن الجزري",
    hintAr: "يخرج من حافة اللسان مستطيلة مع الأضراس العليا."
  },
  {
    id: 'taj_6',
    category: 'tajweed',
    categoryNameAr: 'أحكام التجويد',
    difficulty: 'intermediate',
    questionAr: "ما هو حكم الميم الساكنة في قوله تعالى: ﴿لَهُم مَّا يَشَاءُونَ﴾؟",
    questionEn: "What is the rule of Meem Sakinah in \"Lahum Ma Yashaa'oon\"?",
    optionsAr: [
      "إخفاء شفوي",
      "إدغام شفوي (إدغام مثلين صغير مع الغنة)",
      "إظهار شفوي",
      "قلقلة كبرى"
    ],
    optionsEn: [
      "Ikhfa Shafawi",
      "Idgham Shafawi (Idgham Mithlayn Saghir with Ghunnah)",
      "Izhar Shafawi",
      "Qalqalah Kubra"
    ],
    correctAnswerIndex: 1,
    explanationAr: "إذا جاء بعد الميم الساكنة ميم متحركة تدغم فيها وتسمى إدغام مثلين صغير أو إدغاماً شفوياً مع بقاء الغنة.",
    source: "غاية المريد في علم التجويد",
    hintAr: "ميم ساكنة تلتها ميم متحركة، فيلتقي مثلان."
  },
  {
    id: 'comp_1',
    category: 'ayah_completion',
    categoryNameAr: 'إكمال الآيات',
    difficulty: 'beginner',
    surahNumber: 2,
    questionAr: "أكمل قوله تعالى: ﴿يَا أَيُّهَا الَّذِينَ آمَنُوا اسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ ۚ إِنَّ اللَّهَ ...﴾",
    questionEn: "Complete: \"O you who have believed, seek help through patience and prayer. Indeed, Allah is with...\"",
    optionsAr: [
      "عَلِيمٌ حَكِيمٌ",
      "غَفُورٌ رَّحِيمٌ",
      "شَدِيدُ الْعِقَابِ",
      "مَعَ الصَّابِرِينَ"
    ],
    optionsEn: [
      "Knowing and Wise",
      "Forgiving and Merciful",
      "Severe in punishment",
      "With the patient (Ma'as-Sabireen)"
    ],
    correctAnswerIndex: 3,
    explanationAr: "الآية 153 من سورة البقرة: ﴿يَا أَيُّهَا الَّذِينَ آمَنُوا اسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ ۚ إِنَّ اللَّهَ مَعَ الصَّابِرِينَ﴾.",
    source: "سورة البقرة: الآية 153",
    hintAr: "ابحث عن الكلمة المناسبة لذكر الصبر في أول الآية.",
    audioAyah: { surah: 2, ayah: 153 }
  },
  {
    id: 'comp_2',
    category: 'ayah_completion',
    categoryNameAr: 'إكمال الآيات',
    difficulty: 'intermediate',
    surahNumber: 4,
    questionAr: "أكمل قوله تعالى: ﴿إِنَّ اللَّهَ يَأْمُرُكُمْ أَن تُؤَدُّوا الْأَمَانَاتِ إِلَىٰ أَهْلِهَا وَإِذَا حَكَمْتُم بَيْنَ النَّاسِ أَن تَحْكُمُوا ...﴾",
    questionEn: "Complete: \"Indeed, Allah commands you to render trusts to whom they are due and when you judge between people to judge with...\"",
    optionsAr: [
      "بِالْعَدْلِ ۚ إِنَّ اللَّهَ نِعِمَّا يَعِظُكُم بِهِ",
      "بِالْحَقِّ وَأَنتُمْ تَعْلَمُونَ",
      "بِالْقِسْطِ وَلَا تَعْتَدُوا",
      "بِالْمَعْرُوفِ وَأَقِيمُوا الصَّلَاةَ"
    ],
    optionsEn: [
      "With justice; excellent is that which Allah instructs you",
      "With truth while you know",
      "With equity and do not transgress",
      "With good conduct and establish prayer"
    ],
    correctAnswerIndex: 0,
    explanationAr: "سورة النساء الآية 58: ﴿إِنَّ اللَّهَ يَأْمُرُكُمْ أَن تُؤَدُّوا الْأَمَانَاتِ إِلَىٰ أَهْلِهَا وَإِذَا حَكَمْتُم بَيْنَ النَّاسِ أَن تَحْكُمُوا بِالْعَدْلِ ۚ إِنَّ اللَّهَ نِعِمَّا يَعِظُكُم بِهِ ۗ إِنَّ اللَّهَ كَانَ سَمِيعًا بَصِيرًا﴾.",
    source: "سورة النساء: الآية 58",
    hintAr: "العدل هو أساس الحكم وأداء الأمانات.",
    audioAyah: { surah: 4, ayah: 58 }
  },
  {
    id: 'comp_3',
    category: 'ayah_completion',
    categoryNameAr: 'إكمال الآيات',
    difficulty: 'intermediate',
    surahNumber: 13,
    questionAr: "أكمل قوله تعالى: ﴿الَّذِينَ آمَنُوا وَتَطْمَئِنُّ قُلُوبُهُم بِذِكْرِ اللَّهِ ۗ أَلَا بِذِكْرِ اللَّهِ ...﴾",
    questionEn: "Complete: \"Those who have believed and whose hearts are assured by the remembrance of Allah. Unquestionably, by the remembrance of Allah...\"",
    optionsAr: [
      "يَغْفِرُ الذُّنُوبَ",
      "تَطْمَئِنُّ الْقُلُوبُ",
      "يُفْلِحُ الْمُؤْمِنُونَ",
      "تَسْتَقِيمُ الْأُمُورُ"
    ],
    optionsEn: [
      "Sins are forgiven",
      "Hearts are assured (Tatmainnul Quloob)",
      "The believers succeed",
      "Affairs are set right"
    ],
    correctAnswerIndex: 1,
    explanationAr: "سورة الرعد الآية 28: ﴿الَّذِينَ آمَنُوا وَتَطْمَئِنُّ قُلُوبُهُم بِذِكْرِ اللَّهِ ۗ أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ﴾.",
    source: "سورة الرعد: الآية 28",
    hintAr: "الفاصلة مكررة من الكلمة المذكورة في صدر الآية.",
    audioAyah: { surah: 13, ayah: 28 }
  },
  {
    id: 'comp_4',
    category: 'ayah_completion',
    categoryNameAr: 'إكمال الآيات',
    difficulty: 'beginner',
    surahNumber: 17,
    questionAr: "أكمل قوله تعالى في بر الوالدين: ﴿وَاخْفِضْ لَهُمَا جَنَاحَ الذُّلِّ مِنَ الرَّحْمَةِ وَقُل رَّبِّ ارْحَمْهُمَا كَمَا ...﴾",
    questionEn: "Complete: \"And lower to them the wing of humility out of mercy and say: My Lord, have mercy upon them as they...\"",
    optionsAr: [
      "وَصَّيْتَنِي بِهِمَا",
      "عَلَّمَانِي كَبِيرًا",
      "أَحْسَنَا إِلَيَّ دَائِمًا",
      "رَبَّيَانِي صَغِيرًا"
    ],
    optionsEn: [
      "As you commanded me with them",
      "Taught me when grown",
      "Were always good to me",
      "Brought me up when I was small (Rabbayani Sagheera)"
    ],
    correctAnswerIndex: 3,
    explanationAr: "سورة الإسراء الآية 24: ﴿وَاخْفِضْ لَهُمَا جَنَاحَ الذُّلِّ مِنَ الرَّحْمَةِ وَقُل رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا﴾.",
    source: "سورة الإسراء: الآية 24",
    hintAr: "دعاء قرآني مشهور لتربية الصغر.",
    audioAyah: { surah: 17, ayah: 24 }
  },
  {
    id: 'comp_5',
    category: 'ayah_completion',
    categoryNameAr: 'إكمال الآيات',
    difficulty: 'intermediate',
    surahNumber: 65,
    questionAr: "أكمل قوله تعالى: ﴿وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا ۝ وَيَرْزُقْهُ ...﴾",
    questionEn: "Complete: \"And whoever fears Allah - He will make for him a way out. And will provide for him...\"",
    optionsAr: [
      "ذَهَبًا وَفِضَّةً",
      "مِنْ طَيِّبَاتِ الرِّزْقِ",
      "مِنْ حَيْثُ لَا يَحْتَسِبُ",
      "مَا لَا يَعْلَمُونَ"
    ],
    optionsEn: [
      "Gold and silver",
      "From goodly provision",
      "From where he does not expect",
      "What they do not know"
    ],
    correctAnswerIndex: 2,
    explanationAr: "سورة الطلاق الآية 2-3: ﴿وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا ۝ وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ ۚ وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ﴾.",
    source: "سورة الطلاق: الآيتان 2-3",
    hintAr: "الرزق يأتيه من جهة لا تخطر بباله ولا يحسب لها حساباً.",
    audioAyah: { surah: 65, ayah: 3 }
  },
  {
    id: 'comp_6',
    category: 'ayah_completion',
    categoryNameAr: 'إكمال الآيات',
    difficulty: 'advanced',
    surahNumber: 3,
    questionAr: "أكمل قوله تعالى: ﴿فَبِمَا رَحْمَةٍ مِّنَ اللَّهِ لِنتَ لَهُمْ ۖ وَلَوْ كُنتَ فَظًّا غَلِيظَ الْقَلْبِ ...﴾",
    questionEn: "Complete: \"So by mercy from Allah, you were lenient with them. And if you had been rude and harsh in heart, they would have...\"",
    optionsAr: [
      "لَانفَضُّوا مِنْ حَوْلِكَ",
      "لَكَذَّبُوكَ وَتَوَلَّوْا",
      "لَعَصَوْا أَمْرَكَ",
      "لَمَا اتَّبَعُوكَ أَبَدًا"
    ],
    optionsEn: [
      "Disbanded from around you (Lanfaddoo min hawlik)",
      "Denied you and turned away",
      "Disobeyed your command",
      "Never followed you"
    ],
    correctAnswerIndex: 0,
    explanationAr: "سورة آل عمران الآية 159 في شأن أدب النبي ﷺ ورحمته بأصحابه في غزوة أحد: ﴿وَلَوْ كُنتَ فَظًّا غَلِيظَ الْقَلْبِ لَانفَضُّوا مِنْ حَوْلِكَ﴾.",
    source: "سورة آل عمران: الآية 159",
    hintAr: "الانفضاض هو التفرق والابتعاد.",
    audioAyah: { surah: 3, ayah: 159 }
  },
  {
    id: 'mut_1',
    category: 'mutashabihat',
    categoryNameAr: 'متشابهات القرآن',
    difficulty: 'advanced',
    surahNumber: 2,
    questionAr: "في سورة البقرة تكرر قوله: ﴿وَاتَّقُوا يَوْمًا لَّا تَجْزِي نَفْسٌ عَن نَّفْسٍ شَيْئًا...﴾ في موضعين (48 و 123). ما هو الترتيب الصحيح في الموضع الأول (الآية 48)؟",
    questionEn: "In Surah Al-Baqarah, how does the first instance (verse 48) order intercession and ransom?",
    optionsAr: [
      "﴿وَلَا يُؤْخَذُ مِنْهَا فِدْيَةٌ وَلَا شَفَاعَةٌ﴾",
      "﴿وَلَا يُقْبَلُ مِنْهَا عَدْلٌ وَلَا تَنفَعُهَا شَفَاعَةٌ﴾",
      "﴿وَلَا يُقْبَلُ مِنْهَا شَفَاعَةٌ وَلَا يُؤْخَذُ مِنْهَا عَدْلٌ﴾",
      "﴿وَلَا تَنفَعُهَا شَفَاعَةٌ وَلَا يُقْبَلُ مِنْهَا عَدْلٌ﴾"
    ],
    optionsEn: [
      "Nor will ransom be taken from it, nor intercession",
      "Nor will compensation be accepted from it, nor will intercession benefit it",
      "Nor will intercession be accepted from it, nor will compensation be taken",
      "Nor will intercession benefit it nor compensation accepted"
    ],
    correctAnswerIndex: 2,
    explanationAr: "في الآية 48 قُدِّمت الشفاعة مع نفي القبول: ﴿وَلَا يُقْبَلُ مِنْهَا شَفَاعَةٌ وَلَا يُؤْخَذُ مِنْهَا عَدْلٌ﴾، بينما في الآية 123 قُدِّم العدل: ﴿وَلَا يُقْبَلُ مِنْهَا عَدْلٌ وَلَا تَنفَعُهَا شَفَاعَةٌ﴾.",
    source: "ملاك التأويل لابن الزبير الغرناطي ودرة التنزيل للإسكافي",
    hintAr: "الموضع الأول قُدّمت فيه الشفاعة مع الفعل (يُقبل)."
  },
  {
    id: 'mut_2',
    category: 'mutashabihat',
    categoryNameAr: 'متشابهات القرآن',
    difficulty: 'intermediate',
    surahNumber: 6,
    questionAr: "ما الفرق بين قوله في سورة الأنعام: ﴿وَلَا تَقْتُلُوا أَوْلَادَكُم ... نَّحْنُ نَرْزُقُكُمْ وَإِيَّاهُمْ﴾ وقوله في سورة الإسراء: ﴿وَلَا تَقْتُلُوا أَوْلَادَكُمْ ... نَّحْنُ نَرْزُقُهُمْ وَإِيَّاكُمْ﴾؟",
    questionEn: "What is the subtle difference in verse wording between Al-An'am and Al-Isra regarding killing children?",
    optionsAr: [
      "في الأنعام نزل في بني إسرائيل وفي الإسراء نزل في قريش",
      "في الأنعام (مِّنْ إِمْلَاقٍ) لأن الفقر واقع، وفي الإسراء (خَشْيَةَ إِمْلَاقٍ) لأن الفقر متوقع في المستقبل",
      "كلاهما بنفس اللفظ تماماً بلا فرق",
      "في الإسراء نزل تحريم قتل الإناث فقط"
    ],
    optionsEn: [
      "One for Bani Israel and other for Quraysh",
      "In Al-An'am \"from poverty\" (present), in Al-Isra \"for fear of poverty\" (future)",
      "Identical phrasing with no difference",
      "Only female infanticide"
    ],
    correctAnswerIndex: 1,
    explanationAr: "في الأنعام الفقر حاصل ومتحقق فقال: ﴿مِّنْ إِمْلَاقٍ نَّحْنُ نَرْزُقُكُمْ وَإِيَّاهُمْ﴾ فبدأ برزق الآباء، أما في الإسراء فالفقر متوقع مستقبلاً فقال: ﴿خَشْيَةَ إِمْلَاقٍ نَّحْنُ نَرْزُقُهُمْ وَإِيَّاكُمْ﴾ فبدأ برزق الأبناء.",
    source: "البرهان في توجيه متشابه القرآن للكرماني",
    hintAr: "تأمل الفرق بين \"من إملاق\" (حاضر) و\"خشية إملاق\" (خوف مستقبلي)."
  },
  {
    id: 'mut_3',
    category: 'mutashabihat',
    categoryNameAr: 'متشابهات القرآن',
    difficulty: 'advanced',
    surahNumber: 2,
    questionAr: "في سورة البقرة: ﴿ذَٰلِكَ بِأَنَّهُمْ كَانُوا يَكْفُرُونَ بِآيَاتِ اللَّهِ وَيَقْتُلُونَ النَّبِيِّينَ ...﴾، ما هي الكلمة القرآنية الدقيقة للفاصلة؟",
    questionEn: "In Surah Al-Baqarah verse 61, what is the precise phrasing used for killing the prophets?",
    optionsAr: [
      "ظُلْمًا وَعُدْوَانًا",
      "بِغَيْرِ حَقٍّ",
      "بِغَيْرِ جُرْمٍ",
      "بِغَيْرِ الْحَقِّ"
    ],
    optionsEn: [
      "Zulman wa 'udwana",
      "Bi-ghayri haqq (منكرة)",
      "Bi-ghayri jurm",
      "Bi-ghayri al-haqq (معرفة بأل)"
    ],
    correctAnswerIndex: 3,
    explanationAr: "في سورة البقرة (الآية 61) جاءت معرفة: ﴿بِغَيْرِ الْحَقِّ﴾، بينما في سورة آل عمران (الآية 21 والآية 112 والآية 181) جاءت منكرة في مواضع: ﴿بِغَيْرِ حَقٍّ﴾.",
    source: "إغاثة اللهفان في ضبط متشابهات القرآن",
    hintAr: "في سورة البقرة معرفة بالألف واللام: (الحق)."
  },
  {
    id: 'mut_4',
    category: 'mutashabihat',
    categoryNameAr: 'متشابهات القرآن',
    difficulty: 'intermediate',
    surahNumber: 7,
    questionAr: "في قصة موسى عليه السلام مع السحرة، في أي سورة قال السحرة: ﴿آمَنَّا بِرَبِّ هَارُونَ وَمُوسَىٰ﴾ بتقديم هارون على موسى؟",
    questionEn: "In which Surah did Pharaoh's magicians say \"We believe in the Lord of Aaron and Moses\", putting Aaron first?",
    optionsAr: [
      "سورة طه",
      "سورة الأعراف",
      "سورة الشعراء",
      "سورة يونس"
    ],
    optionsEn: [
      "Surah Taha",
      "Surah Al-A'raf",
      "Surah Ash-Shu'ara",
      "Surah Yunus"
    ],
    correctAnswerIndex: 0,
    explanationAr: "في سورة طه قُدّم هارون لمناسبة الفواصل القرآنية المنتهية بالألف المقصورة: ﴿قَالُوا آمَنَّا بِرَبِّ هَارُونَ وَمُوسَىٰ﴾، بينما في الأعراف والشعراء: ﴿قَالُوا آمَنَّا بِرَبِّ الْعَالَمِينَ ۝ رَبِّ مُوسَىٰ وَهَارُونَ﴾.",
    source: "تفسير التحرير والتنوير لابن عاشور",
    hintAr: "فواصل آيات سورة طه كلها تنتهي بالألف المقصورة (هدى، ثرى، موسى)."
  },
  {
    id: 'ghar_1',
    category: 'gharib_quran',
    categoryNameAr: 'غريب القرآن',
    difficulty: 'beginner',
    surahNumber: 112,
    questionAr: "ما معنى قوله تعالى في سورة الإخلاص: ﴿اللَّهُ الصَّمَدُ﴾؟",
    questionEn: "What is the precise meaning of \"As-Samad\" in Surah Al-Ikhlas?",
    optionsAr: [
      "الخالق لكل شيء من العدم",
      "السيد الذي تصمد وتقصد إليه الخلائق في جميع حوائجها، والذي لا جوف له",
      "القوي العزيز الذي لا يُغلب",
      "المحيط بكل زمان ومكان"
    ],
    optionsEn: [
      "The Creator of all from nothing",
      "The Master sought in all needs by all creation, self-sufficient",
      "The Mighty who is never overcome",
      "Encompassing all time and space"
    ],
    correctAnswerIndex: 1,
    explanationAr: "الصمد في لغة العرب هو السيد الكامل في سؤدده وشرفه، الذي يُصمد إليه في الحوائج، وقال ابن عباس: السيد الذي كمل في جميع أنواع الشرف والسؤدد، وهو الذي لا جوف له ولا يطعم.",
    source: "معاني القرآن للفراء وغريب القرآن لابن قتيبة",
    hintAr: "الصمود لغةً هو القصد، فالخلائق تصمد إليه في حوائجها."
  },
  {
    id: 'ghar_2',
    category: 'gharib_quran',
    categoryNameAr: 'غريب القرآن',
    difficulty: 'intermediate',
    surahNumber: 80,
    questionAr: "في سورة عبس، ما معنى كلمة ﴿وَأَبًّا﴾ في قوله تعالى: ﴿وَفَاكِهَةً وَأَبًّا﴾؟",
    questionEn: "What is the meaning of \"Abba\" in Surah Abasa (verse 31)?",
    optionsAr: [
      "حبوب الحنطة والقمح",
      "ثمار التين المجففة",
      "الكَلأُ والمرعى والعشب الذي ترعاه البهائم والأنعام",
      "الأشجار الباسقة"
    ],
    optionsEn: [
      "Wheat grains",
      "Dried figs",
      "Pasture and fodder eaten by grazing animals",
      "Tall trees"
    ],
    correctAnswerIndex: 2,
    explanationAr: "الفاكهة للإنسان، والأبّ هو المرعى والعشب والكَلأ الذي تأكله الدواب والبهائم، لقوله بعد ذلك: ﴿مَّتَاعًا لَّكُمْ وَلِأَنْعَامِكُمْ﴾.",
    source: "تفسير الطبري ولسان العرب",
    hintAr: "انظر لما بعد الآية: ﴿مَّتَاعًا لَّكُمْ وَلِأَنْعَامِكُمْ﴾، فالفاكهة لكم والأب لأنعامكم."
  },
  {
    id: 'ghar_3',
    category: 'gharib_quran',
    categoryNameAr: 'غريب القرآن',
    difficulty: 'intermediate',
    surahNumber: 53,
    questionAr: "ما معنى قوله تعالى في سورة النجم: ﴿تِلْكَ إِذًا قِسْمَةٌ ضِيزَىٰ﴾؟",
    questionEn: "What does \"Dhiza\" mean in Surah An-Najm (verse 22)?",
    optionsAr: [
      "قسمة مقدسة",
      "قسمة متساوية",
      "قسمة متأخرة",
      "قسمة جائرة وظالمة وغير عادلة"
    ],
    optionsEn: [
      "Sacred division",
      "Equal division",
      "Delayed division",
      "An unjust, unfair, and oppressive division"
    ],
    correctAnswerIndex: 3,
    explanationAr: "ضيزى أي جائرة مائلة عن الحق ظالمة، من ضاز يضيز إذا ظلم وجار وانتقص الحق.",
    source: "تفسير السعدي ومفردات الراغب الأصفهاني",
    hintAr: "الرد على المشركين حين جعلوا لله البنات ولهم البنون، فتلك قسمة جائرة ظالمة."
  },
  {
    id: 'ghar_4',
    category: 'gharib_quran',
    categoryNameAr: 'غريب القرآن',
    difficulty: 'advanced',
    surahNumber: 81,
    questionAr: "ما معنى قوله تعالى: ﴿وَاللَّيْلِ إِذَا عَسْعَسَ﴾ في سورة التكوير؟",
    questionEn: "What does \"As'asa\" mean regarding the night in Surah At-Takwir?",
    optionsAr: [
      "أقبل بظلامه، أو أدبر وولى (وهو من ألفاظ الأضداد في لغة العرب)",
      "اشتد برده وريحه",
      "سكنت فيه الحركة تماماً",
      "تلألأت نجومه"
    ],
    optionsEn: [
      "Approached with darkness, or receded and departed (contranym)",
      "Became severely cold",
      "Motion completely ceased",
      "Its stars sparkled"
    ],
    correctAnswerIndex: 0,
    explanationAr: "كلمة عسعس من الأضداد في لسان العرب: تطلق على إقبال الليل بظلامه، وتطلق أيضاً على إدباره ومغادرته، وكلاهما آية من آيات الله العظيمة.",
    source: "تفسير ابن كثير ومفردات القرآن للراغب",
    hintAr: "هي لفظة تحتمل المعنى وضده: إقبال الليل أو إدباره."
  },
  {
    id: 'ghar_5',
    category: 'gharib_quran',
    categoryNameAr: 'غريب القرآن',
    difficulty: 'intermediate',
    surahNumber: 12,
    questionAr: "ما معنى قول امرأة العزيز في سورة يوسف: ﴿الْآنَ حَصْحَصَ الْحَقُّ﴾؟",
    questionEn: "What did the wife of Al-Aziz mean by \"Has-hasa Al-Haqq\" in Surah Yusuf?",
    optionsAr: [
      "تأجل حكم القضاء",
      "ضاع الحق واختفى",
      "ظهر الحق وانكشف بعد خفائه وبان جلياً",
      "اشتد الخلاف بين الشهود"
    ],
    optionsEn: [
      "Judgement was postponed",
      "Truth was lost",
      "The truth has become manifest, clear and revealed",
      "Dispute intensified"
    ],
    correctAnswerIndex: 2,
    explanationAr: "حصحص الحق أي ثبت وظهر واستقر وانكشف أمره بعد أن كان مستوراً، مأخوذ من حصحص إذا ألقى حجارته وبان أثره.",
    source: "الجامع لأحكام القرآن للقرطبي",
    hintAr: "اعتراف امرأة العزيز ببراءة يوسف عليه السلام وظهور صدقه."
  },
  {
    id: 'asb_1',
    category: 'asbab_nuzul',
    categoryNameAr: 'أسباب النزول',
    difficulty: 'beginner',
    surahNumber: 80,
    questionAr: "فيمن نزلت الآيات الأولى من سورة عبس: ﴿عَبَسَ وَتَوَلَّىٰ ۝ أَن جَاءَهُ الْأَعْمَىٰ﴾؟",
    questionEn: "Regarding whom were the opening verses of Surah Abasa revealed?",
    optionsAr: [
      "الصحابي أبو ذر الغفاري رضي الله عنه",
      "الصحابي بلال بن رباح رضي الله عنه",
      "الصحابي عمار بن ياسر رضي الله عنه",
      "الصحابي الجليل عبد الله بن أم مكتوم رضي الله عنه"
    ],
    optionsEn: [
      "Abu Dharr Al-Ghifari (RA)",
      "Bilal ibn Rabah (RA)",
      "Ammar ibn Yasir (RA)",
      "The noble companion Abdullah ibn Umm Maktum (RA)"
    ],
    correctAnswerIndex: 3,
    explanationAr: "أقبل عبد الله بن أم مكتوم الأعمى إلى النبي ﷺ وهو يناجي صناديد قريش يرجو إسلامهم، فكره النبي ﷺ قطعه لكلامه فأنزل الله عتابه الرحيم لنبيه الكريم.",
    source: "أسباب النزول للواحدي والترمذي",
    hintAr: "هو المؤذن الثاني لرسول الله ﷺ في المدينة المنورة مع بلال."
  },
  {
    id: 'asb_2',
    category: 'asbab_nuzul',
    categoryNameAr: 'أسباب النزول',
    difficulty: 'intermediate',
    surahNumber: 48,
    questionAr: "في أي مناسبة تاريخية عظيمة نزلت سورة الفتح: ﴿إِنَّا فَتَحْنَا لَكَ فَتْحًا مُّبِينًا﴾؟",
    questionEn: "On which monumental historical occasion was Surah Al-Fath revealed?",
    optionsAr: [
      "عقب فتح مكة المكرمة مباشرة",
      "في مرجع النبي ﷺ من صلح الحديبية بالعام السادس للهجرة",
      "بعد انتصار المسلمين في غزوة بدر",
      "في حجة الوداع"
    ],
    optionsEn: [
      "Directly after the Conquest of Makkah",
      "On returning from the Treaty of Hudaybiyyah (6 AH)",
      "After the victory at Badr",
      "During the Farewell Pilgrimage"
    ],
    correctAnswerIndex: 1,
    explanationAr: "نزلت سورة الفتح كراع الغميم في طريق العودة من صلح الحديبية، واعتبره الله فتحاً مبيناً لما ترتب عليه من انتشار الإسلام ودخول الناس أفواجاً.",
    source: "صحيح البخاري ومسلم",
    hintAr: "صلح تاريخي عقده النبي ﷺ مع قريش مهد للفتح الأعظم."
  },
  {
    id: 'asb_3',
    category: 'asbab_nuzul',
    categoryNameAr: 'فضائل السور',
    difficulty: 'beginner',
    surahNumber: 67,
    questionAr: "ما هي السورة المانعة المنجية من عذاب القبر التي تشفع لصاحبها وتتكون من 30 آية؟",
    questionEn: "Which Surah consisting of 30 verses intercedes for its reader and shields against grave punishment?",
    optionsAr: [
      "سورة الملك (تبارك)",
      "سورة الواقعة",
      "سورة يس",
      "سورة الرحمن"
    ],
    optionsEn: [
      "Surah Al-Mulk (Tabarak)",
      "Surah Al-Waqi'ah",
      "Surah Ya-Seen",
      "Surah Ar-Rahman"
    ],
    correctAnswerIndex: 0,
    explanationAr: "قال النبي ﷺ: «إن سورة من القرآن ثلاثون آية شفعت لرجل حتى غفر له وهي: تبارك الذي بيده الملك».",
    source: "سنن الترمذي وأبو داود",
    hintAr: "السورة رقم 67 في المصحف وتفتتح باسم الملك والتبارك."
  },
  {
    id: 'asb_4',
    category: 'asbab_nuzul',
    categoryNameAr: 'أسباب النزول',
    difficulty: 'advanced',
    surahNumber: 6,
    questionAr: "ما هي السورة المكية العظيمة التي نزلت جملة واحدة وشيّعها سبعون ألف ملك يعجّون بالتسبيح؟",
    questionEn: "Which great Surah was revealed all at once accompanied by 70,000 angels glorifying Allah?",
    optionsAr: [
      "سورة الإسراء",
      "سورة الأعراف",
      "سورة يونس",
      "سورة الأنعام"
    ],
    optionsEn: [
      "Surah Al-Isra",
      "Surah Al-A'raf",
      "Surah Yunus",
      "Surah Al-An'am"
    ],
    correctAnswerIndex: 3,
    explanationAr: "روى الطبراني وغيره عن ابن عباس رضي الله عنهما: «نزلت سورة الأنعام بمكة ليلاً جملة واحدة، حولها سبعون ألف ملك يجأرون حولها بالتسبيح والتحميد».",
    source: "المعجم الكبير للطبراني وتفسير ابن كثير",
    hintAr: "سورة الحجة والتوحيد وأطول سورة مكية نزلت جملة واحدة (رقمها 6)."
  },
  {
    id: 'tiw_1',
    category: 'tiwal',
    categoryNameAr: 'السبع الطوال',
    difficulty: 'beginner',
    surahNumber: 2,
    questionAr: "ما هي أطول آية في القرآن الكريم بأكمله، وما هو موضوعها؟",
    questionEn: "What is the longest single ayah in the entire Quran, and what is its subject?",
    optionsAr: [
      "آية الكرسي في سورة البقرة",
      "آية الدَّيْن (الآية 282 من سورة البقرة) في تنظيم المعاملات المالية والتوثيق",
      "آخر آية في سورة النساء في المواريث",
      "آية المائدة في بيان المحرمات من الأطعمة"
    ],
    optionsEn: [
      "Ayat Al-Kursi in Al-Baqarah",
      "Ayah of Debt (2:282) regulating contracts and commercial documentation",
      "Last Ayah of An-Nisa on inheritance",
      "Ayah of Al-Ma'idah on dietary prohibitions"
    ],
    correctAnswerIndex: 1,
    explanationAr: "آية الدين رقم 282 من سورة البقرة تشغل صفحة كاملة في المصحف، وتضمنت أحكام كتابة الديون والإشهاد والرهان والعدالة في المعاملات المالية.",
    source: "تفسير ابن كثير ومصحف المدينة",
    hintAr: "تشغل صفحة كاملة في نهاية سورة البقرة."
  },
  {
    id: 'tiw_2',
    category: 'tiwal',
    categoryNameAr: 'السبع الطوال',
    difficulty: 'intermediate',
    surahNumber: 5,
    questionAr: "في أي سورة من السبع الطوال ذكرت آية إكمال الدين ورضا الإسلام ديناً: ﴿الْيَوْمَ أَكْمَلْتُ لَكُمْ دِينَكُمْ...﴾؟",
    questionEn: "In which of the Seven Long Surahs is the verse of perfection of religion revealed?",
    optionsAr: [
      "سورة آل عمران",
      "سورة البقرة",
      "سورة المائدة",
      "سورة التوبة"
    ],
    optionsEn: [
      "Surah Aal-Imran",
      "Surah Al-Baqarah",
      "Surah Al-Ma'idah",
      "Surah At-Tawbah"
    ],
    correctAnswerIndex: 2,
    explanationAr: "نزلت الآية 3 من سورة المائدة يوم عرفة في حجة الوداع يوم الجمعة: ﴿الْيَوْمَ أَكْمَلْتُ لَكُمْ دِينَكُمْ وَأَتْمَمْتُ عَلَيْكُمْ نِعْمَتِي وَرَضِيتُ لَكُمُ الْإِسْلَامَ دِينًا﴾.",
    source: "صحيح البخاري ومسلم",
    hintAr: "السورة الخامسة في المصحف وتسمى أيضاً سورة العقود."
  },
  {
    id: 'juz_1',
    category: 'juz_amma',
    categoryNameAr: 'جزء عم',
    difficulty: 'beginner',
    surahNumber: 97,
    questionAr: "ما هي الليلة المباركة التي خُصّت بسورة كاملة في جزء عم ووصفت بأنها خير من ألف شهر؟",
    questionEn: "Which blessed night is dedicated a whole surah in Juz Amma described as better than a thousand months?",
    optionsAr: [
      "ليلة القدر (في سورة القدر)",
      "ليلة النصف من شعبان",
      "ليلة الإسراء والمعراج",
      "ليلة الجمعة المباركة"
    ],
    optionsEn: [
      "Laylat Al-Qadr (Surah Al-Qadr)",
      "Mid-Sha'ban Night",
      "Night of Isra & Mi'raj",
      "Blessed Friday Night"
    ],
    correctAnswerIndex: 0,
    explanationAr: "سورة القدر تخلد فضل ليلة القدر: ﴿إِنَّا أَنزَلْنَاهُ فِي لَيْلَةِ الْقَدْرِ ۝ وَمَا أَدْرَاكَ مَا لَيْلَةُ الْقَدْرِ ۝ لَيْلَةُ الْقَدْرِ خَيْرٌ مِّنْ أَلْفِ شَهْرٍ﴾.",
    source: "سورة القدر وتفسيرها",
    hintAr: "ليلة عظيمة في العشر الأواخر من رمضان."
  },
  {
    id: 'juz_2',
    category: 'juz_amma',
    categoryNameAr: 'جزء عم',
    difficulty: 'intermediate',
    surahNumber: 103,
    questionAr: "ما هي السورة القصيرة التي قال عنها الإمام الشافعي: (لو ما أنزل الله حجة على خلقه إلا هذه السورة لكفتهم)؟",
    questionEn: "Which brief surah did Imam Ash-Shafi'i praise saying: \"Had Allah only revealed this surah as proof for His creation, it would suffice them\"?",
    optionsAr: [
      "سورة الإخلاص",
      "سورة العصر",
      "سورة الفلق",
      "سورة التكاثر"
    ],
    optionsEn: [
      "Surah Al-Ikhlas",
      "Surah Al-Asr",
      "Surah Al-Falaq",
      "Surah At-Takathur"
    ],
    correctAnswerIndex: 1,
    explanationAr: "سورة العصر احتوت أركان النجاة الأربعة: الإيمان، والعمل الصالح، والتواصي بالحق، والتواصي بالصبر في ثلاث آيات موجزة.",
    source: "مقدمة تفسير ابن كثير",
    hintAr: "سورة من ثلاث آيات تقسم بالزمان وتبين خسارة الإنسان إلا أهل الإيمان والعمل الصالح."
  },
  {
    id: 'prop_1',
    category: 'prophets',
    categoryNameAr: 'قصص الأنبياء',
    difficulty: 'intermediate',
    surahNumber: 21,
    questionAr: "ما هي الكلمات المباركة التي نادى بها نبي الله يونس (ذا النون) عليه السلام في بطن الحوت؟",
    questionEn: "What blessed supplication did Prophet Yunus (Jonah) make inside the belly of the whale?",
    optionsAr: [
      "﴿حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ﴾",
      "﴿رَبِّ إِنِّي ظَلَمْتُ نَفْسِي فَاغْفِرْ لِي﴾",
      "﴿رَبَّنَا ظَلَمْنَا أَنفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا﴾",
      "﴿لَّا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ﴾"
    ],
    optionsEn: [
      "Hasbunallahu wa ni'mal wakeel",
      "Rabbi inni zalamtu nafsi faghfir li",
      "Rabbana zalamna anfusana...",
      "La ilaha illa Anta, Subhanaka, inni kuntu minaz-zalimeen"
    ],
    correctAnswerIndex: 3,
    explanationAr: "سورة الأنبياء الآية 87: ﴿فَنَادَىٰ فِي الظُّلُمَاتِ أَن لَّا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ ۝ فَاسْتَجَبْنَا لَهُ وَنَجَّيْنَاهُ مِنَ الْغَمِّ ۚ وَكَذَٰلِكَ نُنجِي الْمُؤْمِنِينَ﴾.",
    source: "سورة الأنبياء: الآية 87-88",
    hintAr: "دعاء ذي النون الذي ما دعا به مكروب إلا فرّج الله عنه كربته."
  },
  {
    id: 'prop_2',
    category: 'prophets',
    categoryNameAr: 'قصص الأنبياء',
    difficulty: 'intermediate',
    surahNumber: 28,
    questionAr: "من هو النبي الذي ورد اسمه وقصته أكثر من أي نبي آخر في القرآن الكريم (في أكثر من 130 موضعاً)؟",
    questionEn: "Which prophet is mentioned by name most frequently across the entire Quran (over 130 times)?",
    optionsAr: [
      "نوح عليه السلام",
      "إبراهيم عليه السلام (خليل الله)",
      "موسى عليه السلام (كليم الله)",
      "عيسى عليه السلام"
    ],
    optionsEn: [
      "Prophet Nuh (Noah)",
      "Prophet Ibrahim (Abraham)",
      "Prophet Musa (Moses) - Kalimullah",
      "Prophet Isa (Jesus)"
    ],
    correctAnswerIndex: 2,
    explanationAr: "نبي الله موسى كليم الله عليه السلام ذُكر اسمه في القرآن الكريم 136 مرة وسردت تفاصيل دعوته وبني إسرائيل في سور كثيرة كالبقرة والأعراف وطه والقصص.",
    source: "معجم ألفاظ القرآن الكريم بمجمع اللغة العربية",
    hintAr: "كليم الله الذي أرسل إلى فرعون وملئه."
  },
  {
    id: 'taj_7',
    category: 'tajweed',
    categoryNameAr: 'أحكام التجويد',
    difficulty: 'beginner',
    questionAr: "ما هو حكم النون والميم المشددتين في القرآن الكريم مثل: ﴿إِنَّ﴾ و ﴿ثُمَّ﴾؟",
    questionEn: "What is the rule for Mushaddad Nun and Meem in the Quran?",
    optionsAr: [
      "إظهار حلقي سريع",
      "وجوب الغنة بمقدار حركتين ويسمى كل منهما حرف غنة مشدد",
      "إخفاء شفوي مخفف",
      "قلقلة صغرى"
    ],
    optionsEn: [
      "Quick Izhar Halqi",
      "Obligatory Ghunnah of 2 Harakahs (Harf Ghunnah Mushaddad)",
      "Light Ikhfa Shafawi",
      "Minor Qalqalah"
    ],
    correctAnswerIndex: 1,
    explanationAr: "يجب على القارئ إظهار الغنة أكمل ما تكون بمقدار حركتين في النون والميم المشددتين وصلاً ووقفاً، كما قال الجمزوري: وغنّ نوناً ثم ميماً شُدّدا * وسَمِّ كُلاً حرفَ غُنَّةٍ بَدا.",
    source: "تحفة الأطفال للجمزوري",
    hintAr: "تخرج الغنة من الخيشوم بمقدار حركتين في النون والميم المشددتين."
  },
  {
    id: 'taj_8',
    category: 'tajweed',
    categoryNameAr: 'أحكام التجويد',
    difficulty: 'intermediate',
    questionAr: "ما هي حروف الإظهار الحلقي الستة للنون الساكنة والتنوين؟",
    questionEn: "What are the six throat letters of Izhar Halqi?",
    optionsAr: [
      "يرملون (ي، ر، م، ل، و، ن)",
      "قطب جد (ق، ط، ب، ج، د)",
      "الهمزة، الهاء، العين، الحاء، الغين، الخاء",
      "ص، ذ، ث، ك، ج، ش"
    ],
    optionsEn: [
      "Yarmaloon (Yaa, Raa, Meem, Laam, Waw, Noon)",
      "Qutb Jadd (Qaf, Taa, Baa, Jeem, Dal)",
      "Hamzah, Haa, Ayn, Haa (throat), Ghayn, Khaa",
      "Sad, Dhal, Thaa, Kaf, Jeem, Sheen"
    ],
    correctAnswerIndex: 2,
    explanationAr: "حروف الإظهار الحلقي ستة تخرج من الحلق مجموعة في أوائل الكلمات: (أخي هاك علماً حازه غير خاسر): الهمزة والهاء، والعين والحاء، والغين والخاء.",
    source: "غاية المريد في علم التجويد",
    hintAr: "تخرج جميعها من الحلق (أقصاه ووسطه وأدناه)."
  },
  {
    id: 'taj_9',
    category: 'tajweed',
    categoryNameAr: 'أحكام التجويد',
    difficulty: 'intermediate',
    questionAr: "ما هما الحرفان اللذان تدغم فيهما النون الساكنة والتنوين (بغير غنة) إدغاماً كاملاً؟",
    questionEn: "Which two letters take Idgham WITHOUT Ghunnah for Nun Sakinah and Tanween?",
    optionsAr: [
      "الواو والياء",
      "النون والميم",
      "الطاء والدال",
      "اللام والراء"
    ],
    optionsEn: [
      "Waw and Yaa",
      "Noon and Meem",
      "Taa and Dal",
      "Laam and Raa"
    ],
    correctAnswerIndex: 3,
    explanationAr: "تدغم النون الساكنة والتنوين بغير غنة في حرفين فقط هما: اللام والراء، كما في قوله: ﴿مِن لَّدُنْهُ﴾ و ﴿مِن رَّبِّهِمْ﴾.",
    source: "المقدمة الجزرية لابن الجزري",
    hintAr: "حرفان يجمعان في كلمة (لر)."
  },
  {
    id: 'taj_10',
    category: 'tajweed',
    categoryNameAr: 'أحكام التجويد',
    difficulty: 'advanced',
    questionAr: "ما هي أعلى مراتب القلقلة في الأداء التجويدي المتقن؟",
    questionEn: "What is the highest degree of Qalqalah in Tajweed recitation?",
    optionsAr: [
      "المشدد الموقوف عليه مثل: ﴿الْحَقُّ﴾ و ﴿وَتَبَّ﴾",
      "الساكن في وسط الكلمة مثل: ﴿يَقْطَعُونَ﴾",
      "الساكن المخفف في آخر الكلمة موصولاً بما بعده",
      "الحرف المتحرك بالكسر"
    ],
    optionsEn: [
      "Mushaddad letter stopped upon (e.g. Al-Haqq, wa-Tabb)",
      "Sukoon in middle of word (e.g. yaqta'oon)",
      "Light sukoon at end of word joined with next",
      "Voweled letter with Kasrah"
    ],
    correctAnswerIndex: 0,
    explanationAr: "مراتب القلقلة: أكبرها المشدد الموقوف عليه نحو: ﴿الْحَقّ﴾، ثم المخفف الموقوف عليه نحو: ﴿الْفَلَقِ﴾، ثم الساكن وصلاً نحو: ﴿يَطْمَعُ﴾.",
    source: "حق التلاوة لحسني شيخ عثمان والعميد في التجويد",
    hintAr: "تكون في الحرف المشدد الموقوف عليه لثقله واجتماع حرفين ساكنين."
  },
  {
    id: 'taj_11',
    category: 'tajweed',
    categoryNameAr: 'أحكام التجويد',
    difficulty: 'intermediate',
    questionAr: "متى تُفَخَّمُ لامُ لفظِ الجلالة (اللَّه) في تلاوة القرآن الكريم؟",
    questionEn: "When is the letter Laam in the divine name \"Allah\" pronounced with Tafkheem (heaviness)?",
    optionsAr: [
      "دائماً في كل الأحوال بدون استثناء",
      "إذا سبقت بكسر أصلي أو عارض",
      "إذا وقعت بعد فتح أو ضم نحو: ﴿قَالَ اللَّهُ﴾ و ﴿عَبْدُ اللَّهِ﴾",
      "إذا كانت في آخر الآية فقط"
    ],
    optionsEn: [
      "Always in all cases without exception",
      "When preceded by Kasrah",
      "When preceded by Fat-hah or Dammah (e.g. Qala Allah, Abdullah)",
      "Only at the end of an ayah"
    ],
    correctAnswerIndex: 2,
    explanationAr: "تفخم لام اسم الجلالة إذا وقعت بعد فتح أو ضم نحو: ﴿شَهِدَ اللَّهُ﴾ و ﴿نَصْرُ اللَّهِ﴾، وترقق إذا وقعت بعد كسر نحو: ﴿بِسْمِ اللَّهِ﴾.",
    source: "متن الجزرية للإمام ابن الجزري",
    hintAr: "التفخيم يأتي بعد الحركات العليا القوية كالفتحة والضمة."
  },
  {
    id: 'taj_12',
    category: 'tajweed',
    categoryNameAr: 'أحكام التجويد',
    difficulty: 'advanced',
    questionAr: "كم عدد صفات الحروف التي ليس لها ضد في علم التجويد عند الإمام ابن الجزري؟",
    questionEn: "How many Sifat (characteristics) without opposites exist according to Ibn Al-Jazari?",
    optionsAr: [
      "3 صفات",
      "5 صفات",
      "7 صفات (الصفير، القلقلة، اللين، الانحراف، التكرير، التفشي، الاستطالة)",
      "10 صفات"
    ],
    optionsEn: [
      "3 Sifat",
      "5 Sifat",
      "7 Sifat (Safeer, Qalqalah, Leen, Inhiraf, Takreer, Tafash-shi, Istitālah)",
      "10 Sifat"
    ],
    correctAnswerIndex: 2,
    explanationAr: "صفات الحروف التي لا ضد لها سبع صفات نظمها ابن الجزري: صفيرها صادٌ وزايٌ سينُ * قلقلةٌ قُطبُ جَدٍّ واللِّينُ * وانحرافٌ صُحِّحا * في اللام والرا وبتكرير جُعل * وللتفشي الشينُ ضاداً استَطِل.",
    source: "المقدمة الجزرية لباب صفات الحروف",
    hintAr: "سبع صفات متميزة تشمل الصفير والقلقلة والتفشي والاستطالة."
  },
  {
    id: 'comp_7',
    category: 'ayah_completion',
    categoryNameAr: 'إكمال الآيات',
    difficulty: 'beginner',
    surahNumber: 2,
    questionAr: "أكمل قوله تعالى في آية الكرسي: ﴿اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ ...﴾",
    questionEn: "Complete Ayat al-Kursi: \"Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence. Neither...\"",
    optionsAr: [
      "سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ",
      "غَفْلَةٌ وَلَا نِسْيَانٌ",
      "حَسْرَةٌ وَلَا نَدَامَةٌ",
      "تَعَبٌ وَلَا لُغُوبٌ"
    ],
    optionsEn: [
      "Drowsiness overtakes Him nor sleep. To Him belongs whatever is in heavens and earth",
      "Heedlessness nor forgetfulness",
      "Regret nor remorse",
      "Fatigue nor weariness"
    ],
    correctAnswerIndex: 0,
    explanationAr: "سورة البقرة الآية 255 (آية الكرسي أعظم آية في كتاب الله): ﴿لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ﴾، والسِّنَةُ هي ابتداء النعاس والفتور في الحواس.",
    source: "سورة البقرة: الآية 255",
    hintAr: "السِّنة هي النعاس الخفيف قبل النوم العميق.",
    audioAyah: { surah: 2, ayah: 255 }
  },
  {
    id: 'comp_8',
    category: 'ayah_completion',
    categoryNameAr: 'إكمال الآيات',
    difficulty: 'beginner',
    surahNumber: 18,
    questionAr: "أكمل دعاء فتية الكهف: ﴿إِذْ أَوَى الْفِتْيَةُ إِلَى الْكَهْفِ فَقَالُوا رَبَّنَا آتِنَا مِن لَّدُنكَ رَحْمَةً ...﴾",
    questionEn: "Complete the prayer of the Cave Youth: \"Our Lord, grant us from Yourself mercy and...\"",
    optionsAr: [
      "وَاحْفَظْنَا مِن كَيْدِ الْأَعْدَاءِ",
      "وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَدًا",
      "وَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ",
      "وَارْزُقْنَا صَبْرًا وَإِيمَانًا"
    ],
    optionsEn: [
      "And protect us from the plot of enemies",
      "And prepare for us from our affair right guidance (Rashada)",
      "And give us victory over disbelievers",
      "And grant us patience and faith"
    ],
    correctAnswerIndex: 1,
    explanationAr: "سورة الكهف الآية 10: ﴿إِذْ أَوَى الْفِتْيَةُ إِلَى الْكَهْفِ فَقَالُوا رَبَّنَا آتِنَا مِن لَّدُنكَ رَحْمَةً وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَدًا﴾.",
    source: "سورة الكهف: الآية 10",
    hintAr: "الرَّشَد هو التوفيق والسداد إلى طريق الحق.",
    audioAyah: { surah: 18, ayah: 10 }
  },
  {
    id: 'comp_9',
    category: 'ayah_completion',
    categoryNameAr: 'إكمال الآيات',
    difficulty: 'intermediate',
    surahNumber: 55,
    questionAr: "أكمل قوله تعالى في سورة الرحمن: ﴿كُلُّ مَنْ عَلَيْهَا فَانٍ ۝ وَيَبْقَىٰ ...﴾",
    questionEn: "Complete: \"Everyone upon it will perish, and there will remain...\"",
    optionsAr: [
      "مُلْكُ السَّمَاوَاتِ وَالْأَرْضِ",
      "نُورُ السَّمَاوَاتِ وَالْأَرْضِ",
      "وَجْهُ رَبِّكَ ذُو الْجَلَالِ وَالْإِكْرَامِ",
      "عَرْشُ الرَّحْمَٰنِ الْعَظِيمُ"
    ],
    optionsEn: [
      "The dominion of heavens and earth",
      "The light of heavens and earth",
      "The Face of your Lord, Owner of Majesty and Honor",
      "The Throne of the Most Merciful"
    ],
    correctAnswerIndex: 2,
    explanationAr: "سورة الرحمن الآيتان 26-27: ﴿كُلُّ مَنْ عَلَيْهَا فَانٍ ۝ وَيَبْقَىٰ وَجْهُ رَبِّكَ ذُو الْجَلَالِ وَالْإِكْرَامِ﴾.",
    source: "سورة الرحمن: الآيتان 26-27",
    hintAr: "ينتهي باسم من أسماء الله يجمع الجلال والإكرام.",
    audioAyah: { surah: 55, ayah: 27 }
  },
  {
    id: 'comp_10',
    category: 'ayah_completion',
    categoryNameAr: 'إكمال الآيات',
    difficulty: 'intermediate',
    surahNumber: 67,
    questionAr: "أكمل قوله تعالى في سورة الملك: ﴿الَّذِي خَلَقَ الْمَوْتَ وَالْحَيَاةَ لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًا ۚ وَهُوَ ...﴾",
    questionEn: "Complete: \"He who created death and life to test you as to which of you is best in deed - and He is...\"",
    optionsAr: [
      "السَّمِيعُ الْعَلِيمُ",
      "الْغَفُورُ الرَّحِيمُ",
      "الْعَلِيُّ الْقَدِيرُ",
      "الْعَزِيزُ الْغَفُورُ"
    ],
    optionsEn: [
      "The Hearing, the Knowing",
      "The Forgiving, the Merciful",
      "The High, the Powerful",
      "The Exalted in Might, the Forgiving (Al-Azeez Al-Ghafoor)"
    ],
    correctAnswerIndex: 3,
    explanationAr: "سورة الملك الآية 2: ﴿الَّذِي خَلَقَ الْمَوْتَ وَالْحَيَاةَ لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًا ۚ وَهُوَ الْعَزِيزُ الْغَفُورُ﴾، وقرن العزة بالمغفرة ليجمع بين المهابة والرجاء.",
    source: "سورة الملك: الآية 2",
    hintAr: "فاصلة الآية تجمع بين صفتي العزة والمغفرة.",
    audioAyah: { surah: 67, ayah: 2 }
  },
  {
    id: 'comp_11',
    category: 'ayah_completion',
    categoryNameAr: 'إكمال الآيات',
    difficulty: 'advanced',
    surahNumber: 59,
    questionAr: "أكمل خواتيم سورة الحشر: ﴿هُوَ اللَّهُ الَّذِي لَا إِلَٰهَ إِلَّا هُوَ ۖ عَالِمُ الْغَيْبِ وَالشَّهَادَةِ ۖ هُوَ ...﴾",
    questionEn: "Complete: \"He is Allah, other than whom there is no deity, Knower of the unseen and witnessed. He is...\"",
    optionsAr: [
      "الرَّحْمَٰنُ الرَّحِيمُ",
      "الْعَزِيزُ الْحَكِيمُ",
      "الْمَلِكُ الْقُدُّوسُ",
      "السَّلَامُ الْمُؤْمِنُ"
    ],
    optionsEn: [
      "The Entirely Merciful, the Especially Merciful (Ar-Rahman Ar-Raheem)",
      "The Exalted in Might, the Wise",
      "The Sovereign, the Pure",
      "The Perfection, the Bestower of Faith"
    ],
    correctAnswerIndex: 0,
    explanationAr: "سورة الحشر الآية 22: ﴿هُوَ اللَّهُ الَّذِي لَا إِلَٰهَ إِلَّا هُوَ ۖ عَالِمُ الْغَيْبِ وَالشَّهَادَةِ ۖ هُوَ الرَّحْمَٰنُ الرَّحِيمُ﴾ ثم تليها الآية 23: ﴿هُوَ اللَّهُ الَّذِي لَا إِلَٰهَ إِلَّا هُوَ الْمَلِكُ الْقُدُّوسُ...﴾.",
    source: "سورة الحشر: الآية 22",
    hintAr: "تبدأ الأسماء الحسنى في هذه الآية بأعظم صفتي رحمة.",
    audioAyah: { surah: 59, ayah: 22 }
  },
  {
    id: 'comp_12',
    category: 'ayah_completion',
    categoryNameAr: 'إكمال الآيات',
    difficulty: 'intermediate',
    surahNumber: 25,
    questionAr: "أكمل دعاء عباد الرحمن في سورة الفرقان: ﴿وَالَّذِينَ يَقُولُونَ رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ ...﴾",
    questionEn: "Complete: \"And those who say: Our Lord, grant us from among our spouses and offspring comfort to our eyes and...\"",
    optionsAr: [
      "وَأَدْخِلْنَا جَنَّاتِ النَّعِيمِ",
      "وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا",
      "وَثَبِّتْ أَقْدَامَنَا يَوْمَ الدِّينِ",
      "وَتَوَفَّنَا مَعَ الْأَبْرَارِ"
    ],
    optionsEn: [
      "And admit us to Gardens of Delight",
      "And make us an example/leader for the righteous (Imama)",
      "And make firm our feet on Judgement Day",
      "And take our souls with the righteous"
    ],
    correctAnswerIndex: 1,
    explanationAr: "سورة الفرقان الآية 74 من صفات عباد الرحمن: ﴿وَالَّذِينَ يَقُولُونَ رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا﴾.",
    source: "سورة الفرقان: الآية 74",
    hintAr: "دعاء بأن يكونوا قدوة وأئمة في التقوى وأعمال الخير.",
    audioAyah: { surah: 25, ayah: 74 }
  },
  {
    id: 'mut_5',
    category: 'mutashabihat',
    categoryNameAr: 'متشابهات القرآن',
    difficulty: 'advanced',
    surahNumber: 27,
    questionAr: "في سورة النمل: ﴿هُدًى وَبُشْرَىٰ لِلْمُؤْمِنِينَ﴾، بينما في سورة لقمان جاءت: ﴿هُدًى وَرَحْمَةً ...﴾ فما هي الفاصلة القرآنية في لقمان؟",
    questionEn: "In Surah An-Naml it says \"Guidance and good tidings for the believers\", what is the phrasing in Luqman?",
    optionsAr: [
      "لِّلصَّابِرِينَ",
      "لِّلْمُتَّقِينَ",
      "لِّلْمُحْسِنِينَ",
      "لِّلْعَالَمِينَ"
    ],
    optionsEn: [
      "For the patient",
      "For the righteous (Muttaqeen)",
      "For the doers of good (Muhsineen)",
      "For the worlds"
    ],
    correctAnswerIndex: 2,
    explanationAr: "في سورة لقمان الآية 3: ﴿هُدًى وَرَحْمَةً لِّلْمُحْسِنِينَ ۝ الَّذِينَ يُقِيمُونَ الصَّلَاةَ وَيُؤْتُونَ الزَّكَاةَ...﴾ لأن سياق السورة في الإحسان وبر الوالدين.",
    source: "درة التنزيل وغرة التأويل للإسكافي",
    hintAr: "يناسب صفات الإحسان المذكورة بعدها في سورة لقمان."
  },
  {
    id: 'mut_6',
    category: 'mutashabihat',
    categoryNameAr: 'متشابهات القرآن',
    difficulty: 'advanced',
    surahNumber: 26,
    questionAr: "في سورة الشعراء، تكررت فاصلة الآية بعد كل قصة من قصص الأنبياء السبعة: ﴿إِنَّ فِي ذَٰلِكَ لَآيَةً ۖ وَمَا كَانَ أَكْثَرُهُم مُّؤْمِنِينَ ۝ وَإِنَّ رَبَّكَ لَهُوَ ...﴾ فما ختامها الثابت؟",
    questionEn: "In Surah Ash-Shu'ara, what is the recurring verse ending after each prophet's narrative?",
    optionsAr: [
      "الْغَفُورُ الرَّحِيمُ",
      "السَّمِيعُ الْعَلِيمُ",
      "الْعَلِيُّ الْعَظِيمُ",
      "الْعَزِيزُ الرَّحِيمُ"
    ],
    optionsEn: [
      "The Forgiving, the Merciful",
      "The Hearing, the Knowing",
      "The High, the Great",
      "The Exalted in Might, the Merciful (Al-Azeez Ar-Raheem)"
    ],
    correctAnswerIndex: 3,
    explanationAr: "تكرر قوله تعالى: ﴿وَإِنَّ رَبَّكَ لَهُوَ الْعَزِيزُ الرَّحِيمُ﴾ ثماني مرات في سورة الشعراء، فالعزيز لإهلاكه المكذبين، والرحيم لإنجائه الرسل والمؤمنين.",
    source: "تفسير الكشاف للزمخشري وتفسير ابن كثير",
    hintAr: "عزيز في أخذ الظالمين، رحيم بأوليائه المرسلين."
  },
  {
    id: 'mut_7',
    category: 'mutashabihat',
    categoryNameAr: 'متشابهات القرآن',
    difficulty: 'advanced',
    surahNumber: 14,
    questionAr: "في سورة إبراهيم (الآية 6) في استعباد آل فرعون جاءت: ﴿... يَسُومُونَكُمْ سُوءَ الْعَذَابِ وَيُذَبِّحُونَ أَبْنَاءَكُمْ﴾ بالواو، بينما في البقرة والأعراف جاءت:",
    questionEn: "In Surah Ibrahim verse 6 it states \"wa-yudhabbihoona\" with Waw, how is it worded in Al-Baqarah and Al-A'raf?",
    optionsAr: [
      "﴿يُذَبِّحُونَ أَبْنَاءَكُمْ﴾ (بدون واو العطف)",
      "﴿يَقْتُلُونَ أَبْنَاءَكُمْ﴾",
      "﴿وَيَسْتَحْيُونَ نِسَاءَكُمْ﴾ فقط",
      "﴿يُعَذِّبُونَ أَبْنَاءَكُمْ﴾"
    ],
    optionsEn: [
      "Yudhabbihoona abna'akum (without conjunction Waw)",
      "Yaqtuloona abna'akum",
      "Only wa-yastahyoona nisa'akum",
      "Yu'adh-dhiboona abna'akum"
    ],
    correctAnswerIndex: 0,
    explanationAr: "في البقرة (الآية 49) والأعراف (الآية 141) جاءت بدون واو: ﴿يُذَبِّحُونَ أَبْنَاءَكُمْ﴾ بياناً وتفصيلاً لسوء العذاب، أما في إبراهيم فجاءت بالواو ﴿وَيُذَبِّحُونَ﴾ عطفاً لأنواع العذاب المتعددة.",
    source: "ملاك التأويل لابن الزبير والبرهان للكرماني",
    hintAr: "في البقرة جملة الذبح تفسير وتوضيح للعذاب، فلا تحتاج إلى حرف عطف."
  },
  {
    id: 'mut_8',
    category: 'mutashabihat',
    categoryNameAr: 'متشابهات القرآن',
    difficulty: 'intermediate',
    surahNumber: 22,
    questionAr: "ما هو المعنى الدقيق لكلمة ﴿فَتُخْبِتَ لَهُ قُلُوبُهُمْ﴾ في سورة الحج؟",
    questionEn: "What does \"Fa-tukhbita lahu quloobuhum\" mean in Surah Al-Hajj?",
    optionsAr: [
      "فتزداد قسوة وغلظة",
      "فتطمئن وتخشع وتخضع قلوبهم لله عز وجل استسلاماً وسكينة",
      "فتتحير في أمر الدين",
      "فتنبض بسرعة من الخوف المجرد"
    ],
    optionsEn: [
      "Become harder and rough",
      "Become humble, serene, and submissive to Allah",
      "Become confused in religion",
      "Beat rapidly from pure panic"
    ],
    correctAnswerIndex: 1,
    explanationAr: "الإخبات هو الخشوع والتواضع والاستسلام، قال ابن عباس وقتادة: فتخبت له أي تخشع وتطمئن قلوبهم لله، والمخبتون هم المتواضعون الخاشعون.",
    source: "مفردات ألفاظ القرآن للأصفهاني وتفسير الطبري",
    hintAr: "الإخبات مشتق من الخَبْت وهو المكان المطمئن المنخفض من الأرض."
  },
  {
    id: 'ghar_6',
    category: 'gharib_quran',
    categoryNameAr: 'غريب القرآن',
    difficulty: 'beginner',
    surahNumber: 80,
    questionAr: "ما معنى اسم يوم القيامة ﴿الصَّاخَّةُ﴾ في سورة عبس: ﴿فَإِذَا جَاءَتِ الصَّاخَّةُ﴾؟",
    questionEn: "What is the linguistic meaning of \"As-Sakh-khah\" in Surah Abasa?",
    optionsAr: [
      "الزلزلة التي تشق الأرض",
      "الصيحة والنفخة العظيمة التي تصخّ الآذان وتكاد تصمّها لشدة هولها",
      "الريح الباردة الصرصر",
      "الظلمة الشديدة في المحشر"
    ],
    optionsEn: [
      "Earthquake splitting the ground",
      "The piercing deafening cry/blast that strikes ears with terror",
      "The freezing fierce wind",
      "Deep darkness of gathering"
    ],
    correctAnswerIndex: 1,
    explanationAr: "الصاخة هي صيحة القيامة والنفخة الثانية، وسميت صاخة لأنها تصخ الآذان أي تطرقها وتصمها بشدة صوتها حتى تكاد تفلق الأسماع.",
    source: "تفسير القرطبي ومجاز القرآن لأبي عبيدة",
    hintAr: "صخّ الصوت الأذن إذا أصمّها بشدته وقوته."
  },
  {
    id: 'ghar_7',
    category: 'gharib_quran',
    categoryNameAr: 'غريب القرآن',
    difficulty: 'intermediate',
    surahNumber: 113,
    questionAr: "في سورة الفلق، ما معنى قوله تعالى: ﴿وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ﴾؟",
    questionEn: "In Surah Al-Falaq, what does \"Ghasiqin idha waqab\" mean?",
    optionsAr: [
      "العدو إذا هجم بغتة",
      "الحاسد إذا أظهر عداوته",
      "الليل إذا دخل ظلامه واشتد سواده وغمر كل شيء",
      "الساحر إذا عقد عقده"
    ],
    optionsEn: [
      "Enemy attacking suddenly",
      "Envious person showing malice",
      "Night when its darkness enters and completely covers everything",
      "Magician blowing on knots"
    ],
    correctAnswerIndex: 2,
    explanationAr: "الغاسق هو الليل، ووقب أي دخل ظلامه وسواده في كل شيء وغاب الشفق، واستعاذ منه لما ينتشر فيه من الشياطين والسباع وأهل الشر.",
    source: "تفسير ابن كثير ومفردات الراغب",
    hintAr: "الغاسق هو الليل المظلم، ووقب أي دخل وانهمر ظلامه."
  },
  {
    id: 'ghar_8',
    category: 'gharib_quran',
    categoryNameAr: 'غريب القرآن',
    difficulty: 'advanced',
    surahNumber: 21,
    questionAr: "ما معنى قوله تعالى في سورة الأنبياء: ﴿أَنَّ السَّمَاوَاتِ وَالْأَرْضَ كَانَتَا رَتْقًا فَفَتَقْنَاهُمَا﴾؟",
    questionEn: "What does \"Ratqan fa-fataqnahuma\" mean in Surah Al-Anbiya (verse 30)?",
    optionsAr: [
      "متباعدتين فألّف بينهما",
      "مظلمتين فأنارهما بالشمس والقمر",
      "خاليتين فملأهما بالخلائق",
      "كانتا شيئاً واحداً ملتصقاً متصلاً ففصل وفرّق بينهما سبحانه"
    ],
    optionsEn: [
      "Distant then brought together",
      "Dark then illuminated with sun and moon",
      "Empty then filled with creations",
      "Joined together as one united mass, then parted and separated"
    ],
    correctAnswerIndex: 3,
    explanationAr: "الرتق في اللغة هو الالتصاق والانسداد ضد الفتق، فكانتا ملتئمتين متصلتين ففتقهما الله وفصل بين السماء والأرض وأنزل المطر من السماء وأخرج النبات من الأرض.",
    source: "تفسير الطبري والتحرير والتنوير لابن عاشور",
    hintAr: "الرتق هو الضم والالتصاق، والفتق هو الشق والفصل بينهما."
  },
  {
    id: 'ghar_9',
    category: 'gharib_quran',
    categoryNameAr: 'غريب القرآن',
    difficulty: 'intermediate',
    surahNumber: 19,
    questionAr: "في سورة مريم في وصف نبي الله يحيى عليه السلام، ما معنى: ﴿وَحَنَانًا مِّن لَّدُنَّا وَزَكَاةً﴾؟",
    questionEn: "What does \"Hanānan min ladunnā\" mean regarding Prophet Yahya in Surah Maryam?",
    optionsAr: [
      "رحمة ورأفة وتعطفاً عظيماً من عند الله",
      "قوة وشجاعة في مواجهة الظلم",
      "طول عمر وبقاء في الدنيا",
      "غنى وكثرة في الأموال"
    ],
    optionsEn: [
      "Mercy, compassion, and tenderness from Allah",
      "Strength and boldness",
      "Longevity in worldly life",
      "Abundance of wealth"
    ],
    correctAnswerIndex: 0,
    explanationAr: "الحنان في كلام العرب هو الرحمة والشفقة والمحبة والتعطف، قال قتادة وابن عباس: أي رحمة من عندنا ليحيى، ومنه سمي الله تعالى (الحنان المنان).",
    source: "تفسير ابن كثير ولسان العرب لابن منظور",
    hintAr: "الحنان هو العطف والرقة والرحمة الإلهية."
  },
  {
    id: 'ghar_10',
    category: 'gharib_quran',
    categoryNameAr: 'غريب القرآن',
    difficulty: 'intermediate',
    surahNumber: 105,
    questionAr: "ما هو حجر ﴿سِجِّيلٍ﴾ المذكور في قصة أصحاب الفيل: ﴿تَرْمِيهِم بِحِجَارَةٍ مِّن سِجِّيلٍ﴾؟",
    questionEn: "What is the stone of \"Sijjeel\" mentioned in Surah Al-Feel?",
    optionsAr: [
      "حجارة من ثلج متجمد",
      "حجارة من طين متحجر شديد الصلابة طُبخ بنار جهنم",
      "قطع من الحديد والنحاس المنصهر",
      "حجارة من صخور الوديان العادية"
    ],
    optionsEn: [
      "Frozen hail stones",
      "Baked hardened clay stones baked in hellfire",
      "Molten copper and iron fragments",
      "Ordinary valley boulders"
    ],
    correctAnswerIndex: 1,
    explanationAr: "السجيل كلمة معربة من الفارسية (سنك وكل) أي حجر وطين: وهو طين متحجر طُبخ بالنار حتى صار صلباً كالحجارة، أهلك الله به أصحاب الفيل وقوم لوط.",
    source: "تفسير الطبري وغريب القرآن لابن قتيبة",
    hintAr: "طين محروق متصلب كالصخر أعد لعذاب الظالمين."
  },
  {
    id: 'ghar_11',
    category: 'gharib_quran',
    categoryNameAr: 'غريب القرآن',
    difficulty: 'intermediate',
    surahNumber: 22,
    questionAr: "في سورة الحج: ﴿وَأَذِّن فِي النَّاسِ بِالْحَجِّ يَأْتُوكَ رِجَالًا وَعَلَىٰ كُلِّ ضَامِرٍ يَأْتِينَ مِن كُلِّ فَجٍّ عَمِيقٍ﴾ ما معنى ﴿فَجٍّ عَمِيقٍ﴾؟",
    questionEn: "What does \"Fajjin 'Ameeq\" mean in Surah Al-Hajj (verse 27)?",
    optionsAr: [
      "حفرة عميقة في الرمال",
      "بحر واسع متلاطم الأمواج",
      "طريق واسع بعيد سحيق الأرجاء بين جبلين",
      "سفينة ضخمة تمخر العباب"
    ],
    optionsEn: [
      "Deep pit in sand",
      "Vast turbulent sea",
      "Wide, distant, and remote highway between mountains",
      "Gigantic ocean vessel"
    ],
    correctAnswerIndex: 2,
    explanationAr: "الفَجّ هو الطريق الواسع الواضح بين جبلين، والعميق أي البعيد السحيق، والمعنى: يأتون ملبين من كل صقع ناءٍ وطريق بعيد قاصدين البيت العتيق.",
    source: "معاني القرآن للزجاج وتفسير السعدي",
    hintAr: "الفج هو المسلك الواسع، والعميق هنا بمعنى البعيد المسافة."
  },
  {
    id: 'asb_5',
    category: 'asbab_nuzul',
    categoryNameAr: 'أسباب النزول',
    difficulty: 'beginner',
    surahNumber: 108,
    questionAr: "فيمن نزل قوله تعالى في سورة الكوثر: ﴿إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ﴾؟",
    questionEn: "Regarding whom was \"Indeed, your enemy is the one cut off\" in Surah Al-Kawthar revealed?",
    optionsAr: [
      "أبو جهل عمرو بن هشام",
      "العاص بن وائل السهمي لما شمت بموت عبد الله بن رسول الله ﷺ",
      "أمية بن خلف",
      "الوليد بن المغيرة"
    ],
    optionsEn: [
      "Abu Jahl",
      "Al-Aas ibn Wa'il when rejoicing at the death of Prophet's infant son",
      "Umayyah ibn Khalaf",
      "Al-Waleed ibn Al-Mugheerah"
    ],
    correctAnswerIndex: 1,
    explanationAr: "نزلت في العاص بن وائل لما مات القاسم أو عبد الله ابنا النبي ﷺ قال: انقطع ولده فهو أبتر، فأنزل الله أن مبغض النبي وشائنَه هو المنقطع ذكره وأثره من كل خير.",
    source: "أسباب النزول للواحدي وابن عباس",
    hintAr: "هو والد الصحابي الجليل عمرو بن العاص رضي الله عنه قبل إسلام عمرو."
  },
  {
    id: 'asb_6',
    category: 'asbab_nuzul',
    categoryNameAr: 'أسباب النزول',
    difficulty: 'beginner',
    surahNumber: 111,
    questionAr: "ما هي الحادثة التي نزلت فيها سورة المسد: ﴿تَبَّتْ يَدَا أَبِي لَهَبٍ وَتَبَّ﴾؟",
    questionEn: "What event prompted the revelation of Surah Al-Masad (Tabbat Yada)?",
    optionsAr: [
      "حين صعد النبي ﷺ الصفا ونادى قريشاً للإنذار فقال أبو لهب: تباً لك ألهذا جمعتنا؟",
      "بعد انتهاء غزوة بدر الكبرى ومقتل صناديد قريش",
      "عند فتح مكة المكرمة ودخول الكعبة",
      "أثناء الهجرة النبوية في غار ثور"
    ],
    optionsEn: [
      "When the Prophet called Quraysh atop Mount As-Safa and Abu Lahab cursed him",
      "After the Battle of Badr",
      "During the Conquest of Makkah",
      "During the Migration inside Cave Thawr"
    ],
    correctAnswerIndex: 0,
    explanationAr: "صعد النبي ﷺ الصفا فهتف: يا صباحاه! فاجتمعت قريش فقال: لو أخبرتكم أن خيلاً تخرج بسفح هذا الجبل أكنتم مصدقيّ؟ قالوا: نعم ما جربنا عليك كذباً. قال: فإني نذير لكم بين يدي عذاب شديد. فقال أبو لهب: تباً لك سائر اليوم ألهذا جمعتنا؟ فأنزل الله السورة.",
    source: "صحيح البخاري ومسلم",
    hintAr: "صيحة الإنذار الشهيرة على جبل الصفا بمكة المكرمة."
  },
  {
    id: 'asb_7',
    category: 'asbab_nuzul',
    categoryNameAr: 'أسباب النزول',
    difficulty: 'intermediate',
    surahNumber: 93,
    questionAr: "ما سبب نزول سورة الضحى وبشارتها: ﴿مَا وَدَّعَكَ رَبُّكَ وَمَا قَلَىٰ﴾؟",
    questionEn: "Why was Surah Ad-Duha revealed stating \"Your Lord has not forsaken you nor detested you\"?",
    optionsAr: [
      "استبطاء المشركين نزول المطر في مكة",
      "فترة انقطاع الوحي أياماً وتطاول المشركين قائلين: ودّعه ربه وقلاه",
      "عقب عودة النبي ﷺ من رحلة الطائف الحزينة",
      "بسبب مرض الصحابة في بدايات الهجرة"
    ],
    optionsEn: [
      "Delay of rain in Makkah",
      "A temporary pause in revelation when polytheists claimed Allah abandoned him",
      "Returning from Ta'if",
      "Illness among companions after Hijrah"
    ],
    correctAnswerIndex: 1,
    explanationAr: "احتبس جبريل عليه السلام عن النبي ﷺ أياماً، فقالت امرأة من المشركين (أم جميل): يا محمد ما أرى شيطانك إلا قد قلاك وودعك، فحزن النبي ﷺ فأنزل الله سورة الضحى تكذيباً لهم وتسلية له.",
    source: "صحيح البخاري ومسلم",
    hintAr: "فترة احتباس الوحي لحكمة إلهية أثارت شماتة كفار قريش."
  },
  {
    id: 'asb_8',
    category: 'asbab_nuzul',
    categoryNameAr: 'أسباب النزول',
    difficulty: 'intermediate',
    surahNumber: 112,
    questionAr: "ما سبب نزول سورة الإخلاص: ﴿قُلْ هُوَ اللَّهُ أَحَدٌ﴾؟",
    questionEn: "What question prompted the revelation of Surah Al-Ikhlas?",
    optionsAr: [
      "سؤال المشركين واليهود للنبي ﷺ: انسُب لنا ربَّك ومِمَّ هو؟ فأنزل الله صفته الكاملة",
      "نزلت كفارة لحلف اليمين",
      "طلب المسلمين معرفة مواقيت الصلاة",
      "سؤال عن علامات الساعة الكبرى"
    ],
    optionsEn: [
      "Polytheists asking: \"Trace for us the lineage of your Lord\" so Allah revealed His absolute unity",
      "Expiation for taking an oath",
      "Inquiry about prayer timings",
      "Question about major Hour signs"
    ],
    correctAnswerIndex: 0,
    explanationAr: "روى الترمذي وأحمد عن أُبيّ بن كعب أن المشركين قالوا لرسول الله ﷺ: انسُب لنا ربك أمن ذهب هو أم من فضة؟ فأنزل الله تعالى: ﴿قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ﴾.",
    source: "مسند أحمد وسنن الترمذي",
    hintAr: "طلب المشركون نسباً وأوصافاً مادية للرب سبحانه وتعالى عما يصفون."
  },
  {
    id: 'asb_9',
    category: 'asbab_nuzul',
    categoryNameAr: 'أسباب النزول',
    difficulty: 'advanced',
    surahNumber: 2,
    questionAr: "في أي مسألة فقهية نزلت الآية الكريمة: ﴿وَلِلَّهِ الْمَشْرِقُ وَالْمَغْرِبُ ۚ فَأَيْنَمَا تُوَلُّوا فَثَمَّ وَجْهُ اللَّهِ﴾؟",
    questionEn: "Regarding which circumstance was \"And to Allah belongs the east and west, so wherever you turn...\" revealed?",
    optionsAr: [
      "صلاة الجمعة في السفر",
      "في صلاة النافلة على الراحلة في السفر أينما توجهت، وفيمن صلوا لغير القبلة بالاجتهاد في ليلة مظلمة",
      "في صلاة الجنازة فقط",
      "في جمع صلاتي الظهر والعصر"
    ],
    optionsEn: [
      "Friday prayer while traveling",
      "Voluntary prayer on riding mount while traveling and prayer after ijtihad in dark night",
      "Funeral prayer exclusively",
      "Combining Dhuhr and Asr"
    ],
    correctAnswerIndex: 1,
    explanationAr: "روى مسلم عن ابن عمر أنها نزلت في صلاة التطوع على الراحلة حيثما توجهت بالمسافر، وروي أيضاً في سرية صلوا في ليلة مظلمة غامت فيها السماء فصلى كل رجل لجهته ثم تبين خطؤهم فعذرهم الله.",
    source: "صحيح مسلم وجامع الترمذي",
    hintAr: "تيسير ورخصة للمسافر في صلاة النوافل على وسيلة السفر."
  },
  {
    id: 'asb_10',
    category: 'asbab_nuzul',
    categoryNameAr: 'أسباب النزول',
    difficulty: 'intermediate',
    surahNumber: 63,
    questionAr: "فيمن نزل قوله تعالى في سورة المنافقون: ﴿هُمُ الَّذِينَ يَقُولُونَ لَا تُنفِقُوا عَلَىٰ مَنْ عِندَ رَسُولِ اللَّهِ حَتَّىٰ يَنفَضُّوا﴾؟",
    questionEn: "Regarding whom was Surah Al-Munafiqoon revealed?",
    optionsAr: [
      "مسيلمة الكذاب في اليمامة",
      "أبو سفيان بن حرب قبل إسلامه",
      "عبد الله بن أُبَيّ بن سَلُول رأس النفاق بالمدينة",
      "كعب بن الأشرف اليهودي"
    ],
    optionsEn: [
      "Musaylimah the Liar",
      "Abu Sufyan prior to Islam",
      "Abdullah ibn Ubayy ibn Salool, leader of hypocrites in Medina",
      "Ka'b ibn Al-Ashraf"
    ],
    correctAnswerIndex: 2,
    explanationAr: "في غزوة بني المصطلق قال عبد الله بن أبيّ بن سلول: لئن رجعنا إلى المدينة ليخرجن الأعز منها الأذل، وقال: لا تنفقوا على من عند رسول الله حتى ينفضوا، ففضحه الله بسورة المنافقون وتصديق الصحابي الصغير زيد بن أرقم.",
    source: "صحيح البخاري ومسلم",
    hintAr: "زعيم المنافقين في المدينة المنورة."
  },
  {
    id: 'tiw_3',
    category: 'tiwal',
    categoryNameAr: 'السبع الطوال',
    difficulty: 'beginner',
    surahNumber: 9,
    questionAr: "ما هي السورة الوحيدة في السبع الطوال والقرآن كله التي لم تفتتح بالبسملة ﴿بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ﴾؟",
    questionEn: "Which is the ONLY Surah in the Seven Long Surahs and entire Quran that does not begin with the Basmalah?",
    optionsAr: [
      "سورة البقرة",
      "سورة الأنعام",
      "سورة التوبة (براءة)",
      "سورة الأعراف"
    ],
    optionsEn: [
      "Surah Al-Baqarah",
      "Surah Al-An'am",
      "Surah At-Tawbah (Bara'ah)",
      "Surah Al-A'raf"
    ],
    correctAnswerIndex: 2,
    explanationAr: "سورة التوبة هي السورة الوحيدة بلا بسملة، وقال علي بن أبي طالب رضي الله عنه: (لأن البسملة أمان والتوبة نزلت بالسيف ونبذ العهود إلى المشركين ولا أمان للناكثين).",
    source: "تفسير القرطبي والمستدرك للحاكم",
    hintAr: "تسمى أيضاً سورة الفاضحة وبراءة وتقع في الجزء العاشر والحادي عشر."
  },
  {
    id: 'tiw_4',
    category: 'tiwal',
    categoryNameAr: 'السبع الطوال',
    difficulty: 'intermediate',
    surahNumber: 3,
    questionAr: "في أي سورة من السبع الطوال تقع \"آية المباهلة\" الشهيرة مع وفد نصارى نجران؟",
    questionEn: "In which of the Seven Long Surahs is the famous Ayah of Mubahala with the Christians of Najran?",
    optionsAr: [
      "سورة آل عمران (الآية 61)",
      "سورة المائدة",
      "سورة البقرة",
      "سورة النساء"
    ],
    optionsEn: [
      "Surah Aal-Imran (verse 61)",
      "Surah Al-Ma'idah",
      "Surah Al-Baqarah",
      "Surah An-Nisa"
    ],
    correctAnswerIndex: 0,
    explanationAr: "سورة آل عمران الآية 61: ﴿فَمَنْ حَاجَّكَ فِيهِ مِن بَعْدِ مَا جَاءَكَ مِنَ الْعِلْمِ فَقُلْ تَعَالَوْا نَدْعُ أَبْنَاءَنَا وَأَبْنَاءَكُمْ وَنِسَاءَنَا وَنِسَاءَكُمْ وَأَنفُسَنَا وَأَنفُسَكُمْ ثُمَّ نَبْتَهِلْ فَنَجْعَل لَّعْنَتَ اللَّهِ عَلَى الْكَاذِبِينَ﴾.",
    source: "سورة آل عمران وصحيح مسلم",
    hintAr: "السورة الثالثة في ترتيب المصحف الشريف."
  },
  {
    id: 'tiw_5',
    category: 'tiwal',
    categoryNameAr: 'السبع الطوال',
    difficulty: 'advanced',
    surahNumber: 7,
    questionAr: "في أي سورة من السبع الطوال ورد ميثاق الفطرة الأول المأخوذ على جميع بني آدم: ﴿أَلَسْتُ بِرَبِّكُمْ ۖ قَالُوا بَلَىٰ﴾؟",
    questionEn: "In which of the Long Surahs is the primordial covenant \"Am I not your Lord? They said: Yes\" recorded?",
    optionsAr: [
      "سورة الأعراف (الآية 172)",
      "سورة الأنعام",
      "سورة المائدة",
      "سورة التوبة"
    ],
    optionsEn: [
      "Surah Al-A'raf (verse 172)",
      "Surah Al-An'am",
      "Surah Al-Ma'idah",
      "Surah At-Tawbah"
    ],
    correctAnswerIndex: 0,
    explanationAr: "سورة الأعراف الآية 172: ﴿وَإِذْ أَخَذَ رَبُّكَ مِن بَنِي آدَمَ مِن ظُهُورِهِمْ ذُرِّيَّتَهُمْ وَأَشْهَدَهُمْ عَلَىٰ أَنفُسِهِمْ أَلَسْتُ بِرَبِّكُمْ ۖ قَالُوا بَلَىٰ ۛ شَهِدْنَا﴾.",
    source: "سورة الأعراف: الآية 172",
    hintAr: "السورة السابعة في المصحف وبها أول سجدة تلاوة في ترتيب المصحف."
  },
  {
    id: 'tiw_6',
    category: 'tiwal',
    categoryNameAr: 'السبع الطوال',
    difficulty: 'beginner',
    surahNumber: 4,
    questionAr: "ما هي السورة من السبع الطوال التي استوعبت معظم أحكام المواريث (علم الفرائض) وتوزيع التركات في آيات محكمات؟",
    questionEn: "Which of the Long Surahs details the comprehensive laws of Islamic inheritance (Mirath)?",
    optionsAr: [
      "سورة البقرة",
      "سورة المائدة",
      "سورة النساء (الآيات 11 و 12 و 176)",
      "سورة الأنعام"
    ],
    optionsEn: [
      "Surah Al-Baqarah",
      "Surah Al-Ma'idah",
      "Surah An-Nisa (verses 11, 12, and 176)",
      "Surah Al-An'am"
    ],
    correctAnswerIndex: 2,
    explanationAr: "سورة النساء تضمنت أساسيات علم المواريث وقسمة التركات للأولاد والوالدين والزوجين والإخوة والكلالة في الآيات (11-12) والآية الختامية (176): ﴿يُوصِيكُمُ اللَّهُ فِي أَوْلَادِكُمْ...﴾.",
    source: "تفسير السعدي والجامع للقرطبي",
    hintAr: "السورة الرابعة في المصحف وسميت باسم النساء."
  },
  {
    id: 'tiw_7',
    category: 'tiwal',
    categoryNameAr: 'السبع الطوال',
    difficulty: 'intermediate',
    surahNumber: 5,
    questionAr: "ما هي السورة من السبع الطوال التي تسمى أيضاً \"سورة العقود\" وافتتحت بوجوب الوفاء بها؟",
    questionEn: "Which Surah is also titled the Surah of Contracts and opens with honoring covenants?",
    optionsAr: [
      "سورة المائدة ﴿يَا أَيُّهَا الَّذِينَ آمَنُوا أَوْفُوا بِالْعُقُودِ﴾",
      "سورة الأنعام",
      "سورة آل عمران",
      "سورة التوبة"
    ],
    optionsEn: [
      "Surah Al-Ma'idah (\"O you who have believed, fulfill all contracts\")",
      "Surah Al-An'am",
      "Surah Aal-Imran",
      "Surah At-Tawbah"
    ],
    correctAnswerIndex: 0,
    explanationAr: "سورة المائدة تفتتح بقوله تعالى: ﴿يَا أَيُّهَا الَّذِينَ آمَنُوا أَوْفُوا بِالْعُقُودِ﴾ وتشتمل على عقود الأمان والأطعمة والأيمان والنذور والعهود والأخلاق.",
    source: "سورة المائدة وتفسير ابن كثير",
    hintAr: "السورة الخامسة في المصحف وافتتحت بـ \"أوفوا بالعقود\"."
  },
  {
    id: 'tiw_8',
    category: 'tiwal',
    categoryNameAr: 'السبع الطوال',
    difficulty: 'advanced',
    surahNumber: 6,
    questionAr: "في سورة الأنعام من السبع الطوال، كم عدد الأنبياء الذين ذكرت أسماؤهم مجتمعين في سياق حجة إبراهيم المتتالية؟",
    questionEn: "How many prophets are mentioned together in succession in Surah Al-An'am (verses 83-86)?",
    optionsAr: [
      "10 أنبياء",
      "18 نبياً ورسولاً",
      "25 نبياً",
      "12 نبياً"
    ],
    optionsEn: [
      "10 prophets",
      "18 prophets and messengers",
      "25 prophets",
      "12 prophets"
    ],
    correctAnswerIndex: 1,
    explanationAr: "في سورة الأنعام (الآيات 83-86) ذُكر 18 نبياً في موضع واحد متتابع لم يتكرر مثله في القرآن: إبراهيم، إسحاق، يعقوب، نوح، داود، سليمان، أيوب، يوسف، موسى، هارون، زكريا، يحيى، عيسى، إلياس، إسماعيل، اليسع، يونس، لوط.",
    source: "سورة الأنعام: الآيات 83-86",
    hintAr: "أكبر عدد من أسماء الأنبياء ذُكر في سياق قرآني واحد (ثمانية عشر نبياً)."
  },
  {
    id: 'mus_1',
    category: 'musabbihat',
    categoryNameAr: 'السور المسبحات',
    difficulty: 'beginner',
    questionAr: "ما هي السور القرآنية التي تسمى بالسور \"المُسبّحات\"؟",
    questionEn: "Which surahs are known as Al-Musabbihat (The Glorifying Surahs)?",
    optionsAr: [
      "البقرة وآل عمران والنساء",
      "السور التي افتتحت بتمجيد الله وتسبيحه (الحديد، الحشر، الصف، الجمعة، التغابن، الأعلى)",
      "السور المسماة بأسماء الحيوانات والحشرات",
      "السور المفتتحة بالحروف المقطعة"
    ],
    optionsEn: [
      "Al-Baqarah, Aal-Imran, An-Nisa",
      "Surahs opening with Allah's glorification (Hadid, Hashr, Saff, Jumu'ah, Taghabun, A'la)",
      "Surahs named after creatures",
      "Surahs starting with isolated letters"
    ],
    correctAnswerIndex: 1,
    explanationAr: "السور المسبحات هي السور التي تبتدئ بالتسبيح: (سبح) أو (يسبح) أو (سبح اسم ربك الأعلى)، وكان النبي ﷺ لا ينام حتى يقرأ المسبحات ويقول: إن فيهن آية أفضل من ألف آية.",
    source: "سنن الترمذي وأبو داود ومسند أحمد",
    hintAr: "تبدأ بلفظ التسبيح لله تعالى بصيغ الماضي والمضارع والأمر."
  },
  {
    id: 'mus_2',
    category: 'musabbihat',
    categoryNameAr: 'السور المسبحات',
    difficulty: 'intermediate',
    surahNumber: 57,
    questionAr: "في سورة الحديد أولى المسبحات، ما هو الإعجاز الكوني في قوله: ﴿وَأَنزَلْنَا الْحَدِيدَ فِيهِ بَأْسٌ شَدِيدٌ﴾؟",
    questionEn: "What is the celestial miracle in Surah Al-Hadid \"And We sent down iron\"?",
    optionsAr: [
      "أن الحديد تكون في قاع المحيطات",
      "استعمال لفظ (أنزلنا) لأن ذرات الحديد لا يمكن تكوينها في حرارة الشمس بل نزلت من انفجارات النجوم العظمى في الفضاء",
      "أن الحديد خفيف الوزن جداً",
      "أن الحديد لا يصدأ أبداً"
    ],
    optionsEn: [
      "Iron formed at bottom of ocean",
      "Using \"sent down\" because iron is forged in supernova stellar nucleosynthesis outside Earth",
      "Iron is naturally weightless",
      "Iron never oxidizes"
    ],
    correctAnswerIndex: 1,
    explanationAr: "أثبتت الفيزياء الفلكية الحديثة أن عنصر الحديد لا يمكن للأرض ولا لشمسنا توليده لاحتياجه ملايين الدرجات، وإنما تكوّن في المستعرات العظمى بالكون الفسيح ثم نزل وصُبّ على الأرض، مصداقاً لقوله: ﴿وَأَنزَلْنَا الْحَدِيدَ﴾.",
    source: "تفسير الآيات الكونية ومجلة الإعجاز العلمي",
    hintAr: "تأمل في التعبير الدقيق بالفعل (أنزلنا) وليس خلقنا في الأرض."
  },
  {
    id: 'mus_3',
    category: 'musabbihat',
    categoryNameAr: 'السور المسبحات',
    difficulty: 'beginner',
    surahNumber: 62,
    questionAr: "ما هي السورة المسبحة التي فرضت السعي إلى صلاة الجمعة ووجوب ترك البيع والشراء عند ندائها؟",
    questionEn: "Which Musabbihah Surah mandates rushing to the Friday prayer and ceasing trade?",
    optionsAr: [
      "سورة الجمعة",
      "سورة الحشر",
      "سورة التغابن",
      "سورة الحديد"
    ],
    optionsEn: [
      "Surah Al-Jumu'ah",
      "Surah Al-Hashr",
      "Surah At-Taghabun",
      "Surah Al-Hadid"
    ],
    correctAnswerIndex: 0,
    explanationAr: "سورة الجمعة الآية 9: ﴿يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا نُودِيَ لِلصَّلَاةِ مِن يَوْمِ الْجُمُعَةِ فَاسْعَوْا إِلَىٰ ذِكْرِ اللَّهِ وَذَرُوا الْبَيْعَ ۚ ذَٰلِكُمْ خَيْرٌ لَّكُمْ إِن كُنتُمْ تَعْلَمُونَ﴾.",
    source: "سورة الجمعة: الآية 9",
    hintAr: "تحمل نفس اسم اليوم المبارك والأسبوعي للمسلمين."
  },
  {
    id: 'mus_4',
    category: 'musabbihat',
    categoryNameAr: 'السور المسبحات',
    difficulty: 'intermediate',
    surahNumber: 87,
    questionAr: "ما هي السورة من المسبحات التي كان النبي ﷺ يكثر من تلاوتها في صلاة العيدين والجمعة وركعة الوتر؟",
    questionEn: "Which Musabbihah Surah did the Prophet frequently recite in Eid, Friday, and Witr prayers?",
    optionsAr: [
      "سورة الأعلى ﴿سَبِّحِ اسْمَ رَبِّكَ الْأَعْلَى﴾",
      "سورة الصف",
      "سورة التغابن",
      "سورة الحشر"
    ],
    optionsEn: [
      "Surah Al-A'la (\"Glorify the name of your Lord, the Most High\")",
      "Surah As-Saff",
      "Surah At-Taghabun",
      "Surah Al-Hashr"
    ],
    correctAnswerIndex: 0,
    explanationAr: "كان رسول الله ﷺ يقرأ في العيدين وفي الجمعة بـ: ﴿سَبِّحِ اسْمَ رَبِّكَ الْأَعْلَى﴾ و ﴿هَلْ أَتَاكَ حَدِيثُ الْغَاشِيَةِ﴾، وفي ركعة الوتر بـ الأعلى والكافرون والإخلاص.",
    source: "صحيح مسلم وسنن النسائي",
    hintAr: "تبدأ بصيغة الأمر بتسبيح اسم الرب الأعلى (رقمها 87)."
  },
  {
    id: 'mus_5',
    category: 'musabbihat',
    categoryNameAr: 'السور المسبحات',
    difficulty: 'advanced',
    surahNumber: 64,
    questionAr: "في سورة التغابن من المسبحات، ما هو معنى تسمية يوم القيامة بـ \"يَوْمُ التَّغَابُنِ\"؟",
    questionEn: "What is the theological meaning of \"Yawm At-Taghabun\" (Day of Mutual Deprivation)?",
    optionsAr: [
      "يوم اشتداد الرياح والغبار",
      "يوم تظهر فيه الخسارة والغبن العظيم لأهل الباطل وتفاضل أهل الجنة في النعيم ومراتب الفوز",
      "يوم تقسيم الغنائم في المعارك",
      "يوم توديع أهل الدنيا"
    ],
    optionsEn: [
      "Day of violent dust storms",
      "Day when supreme disparity and lost opportunity manifest for disbelievers while righteous triumph",
      "Day of distributing spoils of war",
      "Day of bidding farewell to worldly life"
    ],
    correctAnswerIndex: 1,
    explanationAr: "التغابن تفاعل من الغَبن وهو فوات الحظ والخسارة، وسُمّي يوم القيامة يوم التغابن لأن أهل الجنة يغبنون أهل النار بأخذ مقاعدهم من الجنة، ويظهر الغبن الحقيقي لمن ضيع طاعة ربه.",
    source: "تفسير الطبري والقرطبي لقوله تعالى: ﴿ذَٰلِكَ يَوْمُ التَّغَابُنِ﴾",
    hintAr: "الغبن هو الخسارة البالغة في الصفقة والتجارة مع الله."
  },
  {
    id: 'mus_6',
    category: 'musabbihat',
    categoryNameAr: 'السور المسبحات',
    difficulty: 'intermediate',
    surahNumber: 61,
    questionAr: "في سورة الصف من المسبحات، ما هي البشارة التي ذكرها عيسى عليه السلام لقومه باسم النبي محمد ﷺ؟",
    questionEn: "In Surah As-Saff, by what name did Jesus announce the good tiding of the coming of Prophet Muhammad?",
    optionsAr: [
      "محمد",
      "أحمد ﴿وَمُبَشِّرًا بِرَسُولٍ يَأْتِي مِن بَعْدِي اسْمُهُ أَحْمَدُ﴾",
      "الفارقليط",
      "الأمين"
    ],
    optionsEn: [
      "Muhammad",
      "Ahmad (\"Bringing good tidings of a messenger to come after me whose name is Ahmad\")",
      "Paraclete",
      "Al-Ameen"
    ],
    correctAnswerIndex: 1,
    explanationAr: "سورة الصف الآية 6: ﴿وَإِذْ قَالَ عِيسَى ابْنُ مَرْيَمَ يَا بَنِي إِسْرَائِيلَ إِنِّي رَسُولُ اللَّهِ إِلَيْكُم مُّصَدِّقًا لِّمَا بَيْنَ يَدَيَّ مِنَ التَّوْرَاةِ وَمُبَشِّرًا بِرَسُولٍ يَأْتِي مِن بَعْدِي اسْمُهُ أَحْمَدُ﴾.",
    source: "سورة الصف: الآية 6",
    hintAr: "أحد أسماء النبي الشريفة صيغة مبالغة من الحمد على وزن أفعل."
  },
  {
    id: 'haw_1',
    category: 'hawameem',
    categoryNameAr: 'الحواميم السبع',
    difficulty: 'beginner',
    questionAr: "ما هي سور \"الحواميم السبع\" المتتالية في المصحف الشريف؟",
    questionEn: "What are the Seven Ha-Meem (Hawameem) Surahs in sequence?",
    optionsAr: [
      "الكهف، مريم، طه، الأنبياء، الحج، المؤمنون، النور",
      "غافر، فصّلت، الشورى، الزخرف، الدخان، الجاثية، الأحقاف",
      "يونس، هود، يوسف، الرعد، إبراهيم، الحجر، النحل",
      "الشعراء، النمل، القصص، العنكبوت، الروم، لقمان، السجدة"
    ],
    optionsEn: [
      "Kahf, Maryam, Taha, Anbiya, Hajj, Mu'minoon, Noor",
      "Ghafir, Fussilat, Ash-Shura, Az-Zukhruf, Ad-Dukhan, Al-Jathiyah, Al-Ahqaf",
      "Yunus, Hood, Yusuf, Ra'd, Ibrahim, Hijr, Nahl",
      "Shu'ara, Naml, Qasas, Ankabut, Room, Luqman, Sajdah"
    ],
    correctAnswerIndex: 1,
    explanationAr: "الحواميم سبع سور متتالية في المصحف من السورة رقم 40 (غافر) حتى السورة رقم 46 (الأحقاف)، كلها افتتحت بالحرفين المقطعين ﴿حم﴾ وتسمى عرائس القرآن.",
    source: "فضائل القرآن لأبي عبيد وتفسير القرطبي",
    hintAr: "سبع سور متتالية تفتتح كلها بالحرفين (حم)."
  },
  {
    id: 'haw_2',
    category: 'hawameem',
    categoryNameAr: 'الحواميم السبع',
    difficulty: 'intermediate',
    questionAr: "ماذا قال الصحابي الجليل عبد الله بن مسعود رضي الله عنه في فضل ومكانة سور الحواميم؟",
    questionEn: "What did the noble companion Abdullah ibn Mas'ood say about the Hawameem?",
    optionsAr: [
      "قال: (الحواميم ديباج القرآن وعرائسه وثماره اليانعة)",
      "قال: إنها أطول سور القرآن",
      "قال: إنها نزلت في خيبر",
      "قال: لا يقرأ بها إلا في صلاة الوتر"
    ],
    optionsEn: [
      "He said: \"The Hawameem are the silk brocade and brides of the Quran\"",
      "He said: they are the longest surahs",
      "He said: they were revealed in Khaybar",
      "He said: they are only read in Witr"
    ],
    correctAnswerIndex: 0,
    explanationAr: "روى البيهقي وابن أبي شيبة عن ابن مسعود رضي الله عنه: «إذا وقعتُ في آل حَم وقعتُ في روضات دَمِثات أتأنق فيهن»، وقال: «الحواميم ديباج القرآن»، والديباج هو الحرير الفاخر الموشى بالجمال.",
    source: "شعب الإيمان للبيهقي والمصنف لابن أبي شيبة",
    hintAr: "شبّهها بالديباج (أفخر أنواع الحرير المطرز) لجمال ألفاظها ومعانيها."
  },
  {
    id: 'haw_3',
    category: 'hawameem',
    categoryNameAr: 'الحواميم السبع',
    difficulty: 'intermediate',
    surahNumber: 40,
    questionAr: "في سورة غافر (أولى الحواميم)، ما هي القصة الفريدة التي خلدها القرآن دفاعاً عن موسى عليه السلام؟",
    questionEn: "In Surah Ghafir, which unique defense of Prophet Moses is recorded?",
    optionsAr: [
      "قصة مؤمن آل فرعون الذي كان يكتم إيمانه وناظر فرعون بالحجة والمنطق",
      "قصة السامري وصناعته للعجل",
      "قصة قارون وكنوزه وخسف الأرض به",
      "قصة الخضر مع موسى بالسفينة"
    ],
    optionsEn: [
      "Story of the Believing Man from Pharaoh's family concealing his faith and debating Pharaoh",
      "Story of As-Samiri and the golden calf",
      "Story of Qarun and his swallowed treasures",
      "Story of Al-Khidr and Moses on the boat"
    ],
    correctAnswerIndex: 0,
    explanationAr: "سورة غافر خلدت موقف مؤمن آل فرعون في قوله: ﴿وَقَالَ رَجُلٌ مُّؤْمِنٌ مِّنْ آلِ فِرْعَوْنَ يَكْتُمُ إِيمَانَهُ أَتَقْتُلُونَ رَجُلًا أَن يَقُولَ رَبِّيَ اللَّهُ وَقَدْ جَاءَكُم بِالْبَيِّنَاتِ مِن رَّبِّكُمْ﴾، ولذا سميت السورة أيضاً بسورة (المؤمن).",
    source: "سورة غافر: الآيات 28-45",
    hintAr: "رجل ذو حكمة وشجاعة من عائلة فرعون دافع عن الحق بالحجة البالغة."
  },
  {
    id: 'haw_4',
    category: 'hawameem',
    categoryNameAr: 'الحواميم السبع',
    difficulty: 'intermediate',
    surahNumber: 41,
    questionAr: "في أي سورة من الحواميم قرأ النبي ﷺ على عتبة بن ربيعة حتى خر واضعاً يده على فم النبي قائلاً: ناشدتك بالرحم كفّ؟",
    questionEn: "In which Hawameem Surah did the recitation cause Utbah to beg the Prophet to stop out of awe?",
    optionsAr: [
      "سورة فصّلت عند قوله: ﴿فَإِنْ أَعْرَضُوا فَقُلْ أَنذَرْتُكُمْ صَاعِقَةً مِّثْلَ صَاعِقَةِ عَادٍ وَثَمُودَ﴾",
      "سورة الزخرف",
      "سورة الأحقاف",
      "سورة الشورى"
    ],
    optionsEn: [
      "Surah Fussilat at \"If they turn away, then say: I have warned you of a thunderbolt like that of Aad and Thamud\"",
      "Surah Az-Zukhruf",
      "Surah Al-Ahqaf",
      "Surah Ash-Shura"
    ],
    correctAnswerIndex: 0,
    explanationAr: "جاء عتبة بن ربيعة يفاوض النبي ﷺ، فقرأ عليه النبي ﷺ أوائل سورة فصلت بهدوء وجلال حتى وصل لقوله: ﴿فَإِنْ أَعْرَضُوا فَقُلْ أَنذَرْتُكُمْ صَاعِقَةً مِّثْلَ صَاعِقَةِ عَادٍ وَثَمُودَ﴾، فأمسك عتبة بفمه مناشداً إياه بالرحم من شدة الروع.",
    source: "سيرة ابن هشام وتفسير ابن كثير لسورة فصلت",
    hintAr: "السورة الحادية والأربعون، وتسمى أيضاً سورة المصابيح."
  },
  {
    id: 'haw_5',
    category: 'hawameem',
    categoryNameAr: 'الحواميم السبع',
    difficulty: 'beginner',
    surahNumber: 44,
    questionAr: "في أي سورة من الحواميم وصفت ليلة نزول القرآن الكريم بـ \"الليلة المباركة\"؟",
    questionEn: "In which Hawameem Surah is the night of revelation described as \"a Blessed Night\"?",
    optionsAr: [
      "سورة الشورى",
      "سورة الجاثية",
      "سورة الدخان: ﴿إِنَّا أَنزَلْنَاهُ فِي لَيْلَةٍ مُّبَارَكَةٍ ۚ إِنَّا كُنَّا مُنذِرِينَ﴾",
      "سورة الزخرف"
    ],
    optionsEn: [
      "Surah Ash-Shura",
      "Surah Al-Jathiyah",
      "Surah Ad-Dukhan (\"Indeed, We sent it down during a blessed night\")",
      "Surah Az-Zukhruf"
    ],
    correctAnswerIndex: 2,
    explanationAr: "سورة الدخان تفتتح بقوله تعالى: ﴿حم ۝ وَالْكِتَابِ الْمُبِينِ ۝ إِنَّا أَنزَلْنَاهُ فِي لَيْلَةٍ مُّبَارَكَةٍ ۚ إِنَّا كُنَّا مُنذِرِينَ ۝ فِيهَا يُفْرَقُ كُلُّ أَمْرٍ حَكِيمٍ﴾، والليلة المباركة هي ليلة القدر.",
    source: "سورة الدخان: الآيات 1-4",
    hintAr: "السورة المسماة باسم الدخان الذي هو إحدى علامات الساعة."
  },
  {
    id: 'haw_6',
    category: 'hawameem',
    categoryNameAr: 'الحواميم السبع',
    difficulty: 'advanced',
    surahNumber: 46,
    questionAr: "ما هو المعنى الجغرافي واللغوي لـ \"الأحقاف\" خاتمة سور الحواميم، ومن هم القوم الذين سكنوها؟",
    questionEn: "What is the geographical meaning of \"Al-Ahqaf\" and who were its ancient inhabitants?",
    optionsAr: [
      "الجبال الصخرية الشاهقة، وسكنها قوم ثمود",
      "الأودية الخضراء في بلاد الشام، وسكنها قوم تبع",
      "الكثبان والرمال الهائلة المتراكمة في جنوب شبه الجزيرة العربية، وسكنها قوم هود (عاد)",
      "الكهوف البحرية، وسكنها قوم مدين"
    ],
    optionsEn: [
      "Rocky mountains inhabited by Thamud",
      "Green valleys in Levant inhabited by Tubba",
      "Gigantic curved sand dunes in southern Arabia inhabited by people of Hood (Aad)",
      "Sea caves inhabited by Madyan"
    ],
    correctAnswerIndex: 2,
    explanationAr: "الأحقاف جمع حِقْف، وهو الرمل المعوج المستطيل المتراكم كالجبال، ومنازل الأحقاف كانت بين حضرموت وعُمان في الربع الخالي لبلاد عاد قوم هود، كما قال: ﴿وَاذْكُرْ أَخَا عَادٍ إِذْ أَنذَرَ قَوْمَهُ بِالْأَحْقَافِ﴾.",
    source: "معجم البلدان لياقوت الحموي وتفسير ابن كثير",
    hintAr: "كثبان الرمال العظيمة وموطن نبي الله هود عليه السلام."
  },
  {
    id: 'prop_3',
    category: 'prophets',
    categoryNameAr: 'قصص الأنبياء',
    difficulty: 'intermediate',
    surahNumber: 38,
    questionAr: "نبي آتاه الله الملك والحكمة، وألان له الحديد، وكانت الجبال والطير تسبح معه وترجع ترتيله، من هو؟",
    questionEn: "Which prophet was given kingdom and wisdom, had iron softened for him, and mountains glorified with him?",
    optionsAr: [
      "نبي الله سليمان عليه السلام",
      "نبي الله داود عليه السلام",
      "نبي الله يوسف عليه السلام",
      "نبي الله إدريس عليه السلام"
    ],
    optionsEn: [
      "Prophet Sulayman (Solomon)",
      "Prophet Dawood (David)",
      "Prophet Yusuf (Joseph)",
      "Prophet Idrees (Enoch)"
    ],
    correctAnswerIndex: 1,
    explanationAr: "سورة ص وسورة سبأ: ﴿وَلَقَدْ آتَيْنَا دَاوُودَ مِنَّا فَضْلًا ۖ يَا جِبَالُ أَوِّبِي مَعَهُ وَالطَّيْرَ ۖ وَأَلَنَّا لَهُ الْحَدِيدَ﴾، وكان داود عليه السلام صاحب الزبور وأعذب الناس صوتاً بالتسبيح.",
    source: "سورة سبأ وسورة ص",
    hintAr: "هو والد نبي الله سليمان وقاتل جالوت وصاحب الزبور."
  },
  {
    id: 'prop_4',
    category: 'prophets',
    categoryNameAr: 'قصص الأنبياء',
    difficulty: 'beginner',
    surahNumber: 27,
    questionAr: "نبي علمه الله لغة الطير ومنطق الحيوان، وسخر له الجن والإنس والريح، من هو؟",
    questionEn: "Which prophet was taught the speech of birds and had jinn, men, and wind subjugated to him?",
    optionsAr: [
      "نبي الله سليمان بن داود عليهما السلام",
      "نبي الله عيسى بن مريم عليه السلام",
      "نبي الله موسى كليم الله",
      "نبي الله إبراهيم خليل الرحمن"
    ],
    optionsEn: [
      "Prophet Sulayman ibn Dawood (Solomon)",
      "Prophet Isa ibn Maryam (Jesus)",
      "Prophet Musa (Moses)",
      "Prophet Ibrahim (Abraham)"
    ],
    correctAnswerIndex: 0,
    explanationAr: "سورة النمل الآية 16: ﴿وَوَرِثَ سُلَيْمَانُ دَاوُودَ ۖ وَقَالَ يَا أَيُّهَا النَّاسُ عُلِّمْنَا مَنطِقَ الطَّيْرِ وَأُوتِينَا مِن كُلِّ شَيْءٍ ۖ إِنَّ هَٰذَا لَهُوَ الْفَضْلُ الْمُبِينُ﴾.",
    source: "سورة النمل: الآية 16",
    hintAr: "فهم منطق الهدهد والنملة وبنى محراب بيت المقدس."
  },
  {
    id: 'prop_5',
    category: 'prophets',
    categoryNameAr: 'قصص الأنبياء',
    difficulty: 'intermediate',
    surahNumber: 21,
    questionAr: "نبي ضرب به المثل في الصبر العظيم على المرض وفقد الأهل والمال، فنادى: ﴿أَنِّي مَسَّنِيَ الضُّرُّ وَأَنتَ أَرْحَمُ الرَّاحِمِينَ﴾، من هو؟",
    questionEn: "Which prophet is the epitome of patience in severe affliction who prayed \"Adversity has touched me\"?",
    optionsAr: [
      "نبي الله يعقوب عليه السلام",
      "نبي الله أيوب عليه السلام",
      "نبي الله زكريا عليه السلام",
      "نبي الله يحيى عليه السلام"
    ],
    optionsEn: [
      "Prophet Ya'qoob (Jacob)",
      "Prophet Ayyoob (Job)",
      "Prophet Zakariyya (Zechariah)",
      "Prophet Yahya (John)"
    ],
    correctAnswerIndex: 1,
    explanationAr: "سورة الأنبياء الآيات 83-84: ﴿وَأَيُّوبَ إِذْ نَادَىٰ رَبَّهُ أَنِّي مَسَّنِيَ الضُّرُّ وَأَنتَ أَرْحَمُ الرَّاحِمِينَ ۝ فَاسْتَجَبْنَا لَهُ فَكَشَفْنَا مَا بِهِ مِن ضُرٍّ ۖ وَآتَيْنَاهُ أَهْلَهُ وَمِثْلَهُم مَّعَهُمْ رَحْمَةً مِّنْ عِندِنَا﴾.",
    source: "سورة الأنبياء: الآيات 83-84",
    hintAr: "صاحب الصبر الأيوبي الشهير الذي ارتكض برجله فشرب واغتسل من ماء بارد."
  },
  {
    id: 'prop_6',
    category: 'prophets',
    categoryNameAr: 'قصص الأنبياء',
    difficulty: 'beginner',
    surahNumber: 12,
    questionAr: "ما هي السورة القرآنية التي نزلت كاملة في سرد قصة نبي واحد من طفولته وبئر الإلقاء حتى ملك مصر، وسماها الله \"أحسن القصص\"؟",
    questionEn: "Which Surah narrating a complete prophetic life story from well to Egyptian throne is named \"the Best of Stories\"?",
    optionsAr: [
      "سورة يوسف عليه السلام",
      "سورة هود",
      "سورة إبراهيم",
      "سورة يونس"
    ],
    optionsEn: [
      "Surah Yusuf (Joseph)",
      "Surah Hood",
      "Surah Ibrahim",
      "Surah Yunus"
    ],
    correctAnswerIndex: 0,
    explanationAr: "سورة يوسف تفتتح بقوله: ﴿نَحْنُ نَقُصُّ عَلَيْكَ أَحْسَنَ الْقَصَصِ بِمَا أَوْحَيْنَا إِلَيْكَ هَٰذَا الْقُرْآنَ﴾ وتتميز بوحدة الموضوع وسرد القصة المترابطة من الرؤيا إلى تمام تأويلها.",
    source: "سورة يوسف وتفسير ابن كثير",
    hintAr: "نبي كريم ابن كريم ابن كريم ابن كريم (يوسف بن يعقوب بن إسحاق بن إبراهيم)."
  },
  {
    id: 'prop_7',
    category: 'prophets',
    categoryNameAr: 'قصص الأنبياء',
    difficulty: 'intermediate',
    surahNumber: 11,
    questionAr: "من هو النبي الذي أرسل إلى قوم ثمود وجعل الله معجزته ناقة عظيمة تخرج من الصخر؟",
    questionEn: "Which prophet was sent to the people of Thamud with the miracle she-camel emerging from stone?",
    optionsAr: [
      "نبي الله هود عليه السلام",
      "نبي الله صالح عليه السلام",
      "نبي الله شعيب عليه السلام",
      "نبي الله لوط عليه السلام"
    ],
    optionsEn: [
      "Prophet Hood",
      "Prophet Salih",
      "Prophet Shu'ayb",
      "Prophet Loot"
    ],
    correctAnswerIndex: 1,
    explanationAr: "سورة هود والشمس والأعراف: أرسل الله نبيه صالحاً إلى ثمود في مدائن الحجر (العلا) وأخرج لهم الناقة فكذّبوه وعقروها فأخذتهم الصيحة والرجفة.",
    source: "سورة الأعراف وسورة هود",
    hintAr: "صاحب الناقة المحذرة: ﴿نَاقَةَ اللَّهِ وَسُقْيَاهَا﴾."
  },
  {
    id: 'prop_8',
    category: 'prophets',
    categoryNameAr: 'قصص الأنبياء',
    difficulty: 'intermediate',
    surahNumber: 7,
    questionAr: "نبي لقب بـ \"خطيب الأنبياء\" لحسن مراجعته وبلاغته، وأرسل إلى أهل مَدْيَن وأصحاب الأَيْكَة ينهاهم عن تطفيف الكيل والميزان، من هو؟",
    questionEn: "Known as the \"Orator of the Prophets\", which prophet warned Madyan against shortchanging weights and measures?",
    optionsAr: [
      "نبي الله شعيب عليه السلام",
      "نبي الله صالح عليه السلام",
      "نبي الله هود عليه السلام",
      "نبي الله يونس عليه السلام"
    ],
    optionsEn: [
      "Prophet Shu'ayb",
      "Prophet Salih",
      "Prophet Hood",
      "Prophet Yunus"
    ],
    correctAnswerIndex: 0,
    explanationAr: "نبي الله شعيب عليه السلام أرسل إلى أهل مدين وكان يدعوهم للتوحيد وإيفاء الكيل والميزان بالقسط: ﴿وَإِلَىٰ مَدْيَنَ أَخَاهُمْ شُعَيْبًا ۗ قَالَ يَا قَوْمِ اعْبُدُوا اللَّهَ مَا لَكُم مِّنْ إِلَٰهٍ غَيْرُهُ ۖ قَدْ جَاءَتْكُم بَيِّنَةٌ مِّن رَّبِّكُمْ ۖ فَأَوْفُوا الْكَيْلَ وَالْمِيزَانَ﴾.",
    source: "سورة الأعراف وسورة هود",
    hintAr: "نبي عربي كريم كان صهراً لموسى عليه السلام في مدين."
  },
  {
    id: 'juz_3',
    category: 'juz_amma',
    categoryNameAr: 'جزء عم',
    difficulty: 'beginner',
    surahNumber: 78,
    questionAr: "في سورة النبأ مفتتح جزء عم، ما هو \"النبأ العظيم\" الذي اختلف فيه كفار قريش؟",
    questionEn: "In Surah An-Naba, what is \"An-Naba Al-Azeem\" (The Great News)?",
    optionsAr: [
      "خبر التجارة السنوية إلى الشام",
      "البعث والنشور ويوم القيامة وصدق نبوة محمد ﷺ والقرآن الكريم",
      "بناء سد مأرب",
      "خلافة قبيلة قريش على العرب"
    ],
    optionsEn: [
      "Annual caravan trade to the Levant",
      "Resurrection, Judgement Day, the Prophethood of Muhammad, and the Quran",
      "Building the Ma'rib Dam",
      "Quraysh leadership over Arabia"
    ],
    correctAnswerIndex: 1,
    explanationAr: "سورة النبأ الآيتان 1-3: ﴿عَمَّ يَتَسَاءَلُونَ ۝ عَنِ النَّبَإِ الْعَظِيمِ ۝ الَّذِي هُمْ فِيهِ مُخْتَلِفُونَ﴾، والنبأ العظيم هو البعث بعد الموت وصدق ما جاء به النبي ﷺ من التنزيل والتوحيد.",
    source: "تفسير الطبري وتفسير ابن كثير",
    hintAr: "قضية الإيمان بالبعث والحساب بعد فناء الأجساد."
  },
  {
    id: 'juz_4',
    category: 'juz_amma',
    categoryNameAr: 'جزء عم',
    difficulty: 'beginner',
    surahNumber: 83,
    questionAr: "في سورة المطففين، ما هو \"سِجِّينٌ\" و \"عِلِّيُّونَ\"؟",
    questionEn: "In Surah Al-Mutaffifeen, what are \"Sijjeen\" and \"'Illiyyoon\"?",
    optionsAr: [
      "سجين كتاب وأسفل الأرض لأعمال وأرواح الفجار، وعليون كتاب وأعلى درجات الجنان لأعمال وأرواح الأبرار",
      "اسمان لصنمين من أصنام الجاهلية",
      "ريحان من رياض مكة والمدينة",
      "نجمان في السماء السابعة"
    ],
    optionsEn: [
      "Sijjeen is record and abyss for wicked souls; Illiyyoon is record and exalted heights for righteous",
      "Names of two pre-Islamic idols",
      "Aromatic plants in Makkah and Madinah",
      "Two constellations in the seventh heaven"
    ],
    correctAnswerIndex: 0,
    explanationAr: "سجين: فعيل من السجن والضيق وهو كتاب جامع لأعمال الشياطين والكفار ومقر أرواحهم بأسفل الأرضين، بينما عليون: من العلو والرفعة وهو كتاب أعمال الأبرار في أعلى عليين تحت العرش.",
    source: "تفسير ابن كثير ومفردات الراغب",
    hintAr: "سجين من السجن والنزول، وعليون من العلو والارتفاع."
  },
  {
    id: 'juz_5',
    category: 'juz_amma',
    categoryNameAr: 'جزء عم',
    difficulty: 'intermediate',
    surahNumber: 85,
    questionAr: "ما هي قصة \"أصحاب الأخدود\" التي خلدت في سورة البروج؟",
    questionEn: "What is the historical account of the \"Companions of the Trench\" in Surah Al-Burooj?",
    optionsAr: [
      "عمال حفروا بئراً لطلب الماء ففاض عليهم",
      "مؤمنون ثبتوا على توحيد الله فأحرقهم الملك الظالم ذو نواس في خنادق مشتعلة بالنيران في نجران",
      "بحارة غرقت سفينتهم في أخدود البحر",
      "جيش أبرهة الحبشي حين سار لهدم الكعبة"
    ],
    optionsEn: [
      "Laborers digging a well",
      "Believers who stood firm in monotheism cast into fiery trenches by a tyrannical king in Najran",
      "Sailors whose vessel sank",
      "Abraha's army marching on Kaaba"
    ],
    correctAnswerIndex: 1,
    explanationAr: "سورة البروج الآيات 4-8: ﴿قُتِلَ أَصْحَابُ الْأُخْدُودِ ۝ النَّارِ ذَاتِ الْوَقُودِ ۝ إِذْ هُمْ عَلَيْهَا قُعُودٌ ۝ وَهُمْ عَلَىٰ مَا يَفْعَلُونَ بِالْمُؤْمِنِينَ شُهُودٌ ۝ وَمَا نَقَمُوا مِنْهُمْ إِلَّا أَن يُؤْمِنُوا بِاللَّهِ الْعَزِيزِ الْحَمِيدِ﴾.",
    source: "صحيح مسلم (حديث الغلام والساحب والراهب) وتفسير ابن كثير",
    hintAr: "محرقة تاريخية عظيمة أوقدها ملك كافر لتعذيب المؤمنين بالله."
  },
  {
    id: 'juz_6',
    category: 'juz_amma',
    categoryNameAr: 'جزء عم',
    difficulty: 'beginner',
    surahNumber: 94,
    questionAr: "في سورة الشرح، ما هي البشارة البلاغية العظيمة في قوله تعالى: ﴿فَإِنَّ مَعَ الْعُسْرِ يُسْرًا ۝ إِنَّ مَعَ الْعُسْرِ يُسْرًا﴾؟",
    questionEn: "What is the profound linguistic guarantee in \"Indeed with hardship comes ease\" in Surah Ash-Sharh?",
    optionsAr: [
      "أن العسر جاء معرفاً بأل وهو عسر واحد، بينما اليسر جاء منكراً فهو يسران مختلفان ولن يغلب عسر يسرين",
      "أن اليسر يتأخر دائماً لسنوات طويلة بعد العسر",
      "أن العسر لا يزول أبداً إلا بالموت",
      "أن الآية مخصصة للنبي وحده ولا تنطبق على أمته"
    ],
    optionsEn: [
      "Hardship is definite (one single trial), ease is indefinite repeated (multiple reliefs), so one hardship cannot overcome two eases",
      "Ease is always delayed decades after hardship",
      "Hardship only ceases at death",
      "Verse was exclusively for the Prophet"
    ],
    correctAnswerIndex: 0,
    explanationAr: "قال ابن عباس رضي الله عنهما: «لن يغلب عسر يسرين»، لأن كلمة (العسر) معرّفة بالألف واللام فأعيدت هي بعينها، بينما (يُسراً) نكرة فلما تكررت دلت على يسر ثانٍ جديد غير الأول.",
    source: "تفسير ابن جرير الطبري وتفسير السعدي",
    hintAr: "تأمل في تعريف \"العسر\" وتنكير \"يسراً\" في الآيتين."
  },
  {
    id: 'juz_7',
    category: 'juz_amma',
    categoryNameAr: 'جزء عم',
    difficulty: 'beginner',
    surahNumber: 108,
    questionAr: "ما هو \"الكوثر\" الذي منّ الله به على نبيه محمد ﷺ في سورة الكوثر؟",
    questionEn: "What is \"Al-Kawthar\" bestowed upon Prophet Muhammad in Surah Al-Kawthar?",
    optionsAr: [
      "بستان في أطراف الطائف",
      "نهر عظيم وحوض مبارك في الجنة ماؤه أشد بياضاً من اللبن وأحلى من العسل والخير الكثير المطلق",
      "قصر من ذهب في مكة",
      "سيف قاطع أهداه جبريل للنبي"
    ],
    optionsEn: [
      "Orchard near Ta'if",
      "Vast celestial river and pool in Paradise whiter than milk and sweeter than honey, and abundant goodness",
      "Golden palace in Makkah",
      "Sword gifted by Gabriel"
    ],
    correctAnswerIndex: 1,
    explanationAr: "قال النبي ﷺ: «الكوثر نهر أعطانيه ربي عز وجل في الجنة، عليه خير كثير، ترده أمتي يوم القيامة، آنيته عدد النجوم»، والكوثر لغة صيغة مبالغة تدل على الكثرة المفرطة في كل خير وفضل.",
    source: "صحيح البخاري ومسلم",
    hintAr: "نهر وحوض مبارك في الفردوس الأعلى ترده الأمة المحمدية يوم القيامة."
  },
  {
    id: 'juz_8',
    category: 'juz_amma',
    categoryNameAr: 'جزء عم',
    difficulty: 'intermediate',
    surahNumber: 110,
    questionAr: "ما هي الإشارة العميقة التي فهمها ابن عباس وعمر بن الخطاب رضي الله عنهما من سورة النصر: ﴿إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ﴾؟",
    questionEn: "What deep sign did Ibn Abbas and Umar deduce from Surah An-Nasr?",
    optionsAr: [
      "بدء فتوحات بلاد فارس والروم",
      "نعي النبي ﷺ ودنوّ أجله الشريف بعد أن أتم البلاغ وأكمل الله به الدين",
      "فرض فريضة الحج على الفور",
      "نزول تحريم الخمر بالمدينة"
    ],
    optionsEn: [
      "Commencement of conquering Persia and Rome",
      "Announcement that the Prophet's earthly life and mission were nearing completion (his death notice)",
      "Immediate obligation of Hajj",
      "Prohibition of alcohol"
    ],
    correctAnswerIndex: 1,
    explanationAr: "سأل عمر كبار الصحابة عن سورة النصر فقال ابن عباس: «هو أجل رسول الله ﷺ أعلمه له»، فقال عمر: «ما أعلم منها إلا ما تعلم». فإذا تم النصر ودخل الناس أفواجاً فقد تمت الرسالة وحان لقاء الرفيق الأعلى.",
    source: "صحيح البخاري: كتاب التفسير",
    hintAr: "إذا كملت الرسالة ودخل الناس في دين الله أفواجاً فقد اقترب أجل الرسول ﷺ."
  }
];

// Generator for EVERY ONE OF THE 114 SURAHS
export const generateQuestionsForSurah = (surahNumber) => {
  const surah = getSurahByNumber(surahNumber);
  if (!surah) return [];

  const prevSurah = surah.number > 1 ? getSurahByNumber(surah.number - 1) : null;
  const nextSurah = surah.number < 114 ? getSurahByNumber(surah.number + 1) : null;

  const isMeccan = surah.type === 'Meccan';

  // 1. Classification question (Meccan vs Medinan)
  const qClassification = {
    id: `surah_${surah.number}_q1`,
    surahNumber: surah.number,
    category: 'classification',
    categoryNameAr: 'تصنيف ونزول السورة',
    difficulty: 'beginner',
    questionAr: `سورة ${surah.arabic} هي سورة:`,
    questionEn: `Surah ${surah.english} (${surah.number}) was revealed in:`,
    optionsAr: [
      isMeccan ? 'مكية (نزلت قبل الهجرة النبوية)' : 'مدنية (نزلت بعد الهجرة النبوية)',
      isMeccan ? 'مدنية (نزلت بعد الهجرة النبوية)' : 'مكية (نزلت قبل الهجرة النبوية)',
      'نزلت نصفها بالشام ونصفها بالمدينة',
      'نزلت بالحبشة'
    ],
    optionsEn: [
      isMeccan ? 'Meccan (Revealed before Hijrah)' : 'Medinan (Revealed after Hijrah)',
      isMeccan ? 'Medinan (Revealed after Hijrah)' : 'Meccan (Revealed before Hijrah)',
      'Half in Levant and half in Medina',
      'Revealed in Abyssinia'
    ],
    correctAnswerIndex: 0,
    explanationAr: `سورة ${surah.arabic} سورة ${isMeccan ? 'مكية' : 'مدنية'} وترتيبها بالمصحف الشريف هو السورة رقم ${surah.number}.`,
    source: 'مصحف المدينة النبوية الشريفة',
    hintAr: isMeccan ? 'نزلت بمكة المكرمة قبل هجرة المصطفى ﷺ.' : 'نزلت بالمدينة المنورة بعد الهجرة النبوية المباركة.'
  };

  // 2. Verse count question
  const wrongAyahCounts = [
    Math.max(3, surah.ayahs + 5),
    Math.max(3, surah.ayahs - 4),
    surah.ayahs + 12
  ];
  const qAyahCount = {
    id: `surah_${surah.number}_q2`,
    surahNumber: surah.number,
    category: 'ayahs',
    categoryNameAr: 'عدد الآيات',
    difficulty: 'beginner',
    questionAr: `كم عدد آيات سورة ${surah.arabic} في المصحف الشريف؟`,
    questionEn: `What is the exact number of ayahs in Surah ${surah.english}?`,
    optionsAr: [
      `${surah.ayahs} آية`,
      `${wrongAyahCounts[0]} آية`,
      `${wrongAyahCounts[1]} آية`,
      `${wrongAyahCounts[2]} آية`
    ],
    optionsEn: [
      `${surah.ayahs} Ayahs`,
      `${wrongAyahCounts[0]} Ayahs`,
      `${wrongAyahCounts[1]} Ayahs`,
      `${wrongAyahCounts[2]} Ayahs`
    ],
    correctAnswerIndex: 0,
    explanationAr: `عدد آيات سورة ${surah.arabic} هو ${surah.ayahs} آية بحسب العد الكوفي المعتمد في مصحف المدينة.`,
    source: 'مجمع الملك فهد لطباعة المصحف الشريف',
    hintAr: `العدد الصحيح هو بالضبط ${surah.ayahs} آية.`
  };

  // 3. Mushaf position & order question
  const qOrder = {
    id: `surah_${surah.number}_q3`,
    surahNumber: surah.number,
    category: 'order',
    categoryNameAr: 'ترتيب المصحف الشريف',
    difficulty: 'intermediate',
    questionAr: prevSurah 
      ? `ما هي السورة التي تسبق سورة ${surah.arabic} مباشرة في ترتيب المصحف؟`
      : `ما هي السورة التي تلي سورة ${surah.arabic} مباشرة في ترتيب المصحف؟`,
    questionEn: prevSurah
      ? `Which Surah immediately precedes Surah ${surah.english} in the Quran?`
      : `Which Surah immediately follows Surah ${surah.english} in the Quran?`,
    optionsAr: prevSurah 
      ? [
          `سورة ${prevSurah.arabic}`,
          nextSurah ? `سورة ${nextSurah.arabic}` : 'سورة البقرة',
          'سورة الإخلاص',
          'سورة يوسف'
        ]
      : [
          `سورة ${nextSurah?.arabic || 'البقرة'}`,
          'سورة آل عمران',
          'سورة النساء',
          'سورة الكهف'
        ],
    optionsEn: prevSurah
      ? [
          `Surah ${prevSurah.english}`,
          nextSurah ? `Surah ${nextSurah.english}` : 'Surah Al-Baqarah',
          'Surah Al-Ikhlas',
          'Surah Yusuf'
        ]
      : [
          `Surah ${nextSurah?.english || 'Al-Baqarah'}`,
          'Surah Aal-Imran',
          'Surah An-Nisa',
          'Surah Al-Kahf'
        ],
    correctAnswerIndex: 0,
    explanationAr: prevSurah
      ? `سورة ${surah.arabic} هي السورة رقم (${surah.number}) وتأتي مباشرة بعد سورة ${prevSurah.arabic} رقم (${prevSurah.number}).`
      : `سورة الفاتحة هي أول سورة في المصحف، وتليها مباشرة سورة البقرة.`,
    source: 'فهرس المصحف الشريف',
    hintAr: prevSurah ? `السورة السابقة رقمها ${prevSurah.number} في الفهرس.` : 'تليها السورة رقم 2.'
  };

  // 4. Juz location question
  const wrongJuz = [
    Math.min(30, (surah.juz || 1) + 2),
    Math.max(1, (surah.juz || 1) - 1),
    Math.min(30, (surah.juz || 1) + 4)
  ];
  const qJuz = {
    id: `surah_${surah.number}_q4`,
    surahNumber: surah.number,
    category: 'juz',
    categoryNameAr: 'أجزاء القرآن',
    difficulty: 'intermediate',
    questionAr: `في أي جزء من أجزاء القرآن الكريم تقع بداية سورة ${surah.arabic}؟`,
    questionEn: `In which Juz does Surah ${surah.english} begin?`,
    optionsAr: [
      `الجزء ${surah.juz || 1}`,
      `الجزء ${wrongJuz[0]}`,
      `الجزء ${wrongJuz[1]}`,
      `الجزء ${wrongJuz[2]}`
    ],
    optionsEn: [
      `Juz ${surah.juz || 1}`,
      `Juz ${wrongJuz[0]}`,
      `Juz ${wrongJuz[1]}`,
      `Juz ${wrongJuz[2]}`
    ],
    correctAnswerIndex: 0,
    explanationAr: `تقع سورة ${surah.arabic} في الجزء (${surah.juz || 1}) من أجزاء القرآن الكريم الثلاثين.`,
    source: 'تقسيم أجزاء وأحزاب المصحف الشريف',
    hintAr: `رقم الجزء محصور بين 1 و 30.`
  };

  return [shuffleQuestion(qClassification), shuffleQuestion(qAyahCount), shuffleQuestion(qOrder), shuffleQuestion(qJuz)];
};

// Main dispatcher to generate questions based on user filter/mode
export const getQuizQuestions = ({
  mode = 'collection', // 'collection' | 'surah' | 'category'
  collectionId = 'juz_amma',
  surahNumber = 1,
  category = 'all',
  difficulty = 'all'
}) => {
  let pool = [];

  // Mode 1: Individual Surah Quiz (All 114 Surahs support)
  if (mode === 'surah') {
    const sNum = Number(surahNumber) || 1;
    const surahQuestions = generateQuestionsForSurah(sNum);
    // Add any scholarly questions specifically related to this surah
    const specificScholarly = MASTER_SCHOLARLY_QUESTIONS.filter(q => q.surahNumber === sNum);
    pool = [...specificScholarly, ...surahQuestions];
  } else if (mode === 'collection') {
    // Mode 2: Curated Quran Collections
    if (collectionId === 'grand_marathon') {
      // Pick random questions from across all 114 Surahs + scholarly questions
      const selectedSurahs = [1, 2, 3, 9, 12, 18, 36, 55, 57, 67, 78, 112, 113, 114];
      const marathon = [];
      selectedSurahs.forEach(num => {
        const qList = generateQuestionsForSurah(num);
        if (qList.length > 0) marathon.push(qList[Math.floor(Math.random() * qList.length)]);
      });
      // Mix scholarly questions from across all topics with marathon surah questions
      const randomScholarly = shuffleArray(MASTER_SCHOLARLY_QUESTIONS).slice(0, 15);
      pool = [...randomScholarly, ...marathon];
    } else {
      const collection = QUIZ_COLLECTIONS.find(c => c.id === collectionId);
      const directMatches = MASTER_SCHOLARLY_QUESTIONS.filter(q => q.category === collectionId);

      let targetSurahNumbers = [];
      if (collection && collection.surahRange) {
        for (let i = collection.surahRange[0]; i <= collection.surahRange[1]; i++) {
          targetSurahNumbers.push(i);
        }
      } else if (collection && collection.surahNumbers) {
        targetSurahNumbers = collection.surahNumbers;
      }

      const collectionQuestions = [...directMatches];

      // Include scholarly questions specifically tied to surahs in this collection
      if (targetSurahNumbers.length > 0) {
        MASTER_SCHOLARLY_QUESTIONS.forEach(q => {
          if (q.surahNumber && targetSurahNumbers.includes(q.surahNumber)) {
            if (!collectionQuestions.some(cq => cq.id === q.id)) {
              collectionQuestions.push(q);
            }
          }
        });

        // Also add generated questions from surahs in this collection
        targetSurahNumbers.slice(0, 10).forEach(num => {
          const qList = generateQuestionsForSurah(num);
          if (qList.length > 0) {
            collectionQuestions.push(qList[0]);
            if (qList[1]) collectionQuestions.push(qList[1]);
          }
        });
      }

      pool = collectionQuestions.length > 0 ? collectionQuestions : MASTER_SCHOLARLY_QUESTIONS;
    }
  } else {
    // Mode 3: By General Category / Difficulty
    let results = [...MASTER_SCHOLARLY_QUESTIONS];
    if (category !== 'all') {
      results = results.filter(q => q.category === category);
    }
    if (difficulty !== 'all') {
      results = results.filter(q => q.difficulty === difficulty);
    }
    pool = results.length > 0 ? results : MASTER_SCHOLARLY_QUESTIONS;
  }

  // Deduplicate and randomize:
  // 1) Shuffle every question's options so the correct answer is mixed among A, B, C, D
  // 2) Shuffle the question order so questions appear in random order
  const seen = new Set();
  const uniqueQuestions = [];
  pool.forEach(q => {
    if (q && q.id && !seen.has(q.id)) {
      seen.add(q.id);
      uniqueQuestions.push(shuffleQuestion(q));
    }
  });

  return shuffleArray(uniqueQuestions);
};
