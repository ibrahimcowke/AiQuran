import { ALL_114_SURAHS, getSurahByNumber } from './allSurahs';

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
export const MASTER_SCHOLARLY_QUESTIONS = [
  // --- TAJWEED QUESTIONS ---
  {
    id: 'taj_1',
    category: 'tajweed',
    categoryNameAr: 'أحكام التجويد',
    difficulty: 'beginner',
    questionAr: 'كم عدد أحكام النون الساكنة والتنوين؟',
    questionEn: 'How many rules govern Nun Sakinah and Tanween?',
    optionsAr: ['أربعة أحكام (الإظهار، الإدغام، الإقلاب، الإخفاء)', 'ثلاثة أحكام', 'خمسة أحكام', 'ستة أحكام'],
    optionsEn: ['Four rules (Izhar, Idgham, Iqlab, Ikhfa)', 'Three rules', 'Five rules', 'Six rules'],
    correctAnswerIndex: 0,
    explanationAr: 'أحكام النون الساكنة والتنوين أربعة كما قال ابن الجزري والجمزوري: للنون إن تسكن وللتنوين أربع أحكام فخذ تبييني.',
    source: 'تحفة الأطفال للشيخ سليمان الجمزوري',
    hintAr: 'تذكر بيت التحفة: للنون إن تسكن وللتنوين أربع أحكام فخذ تبييني.'
  },
  {
    id: 'taj_2',
    category: 'tajweed',
    categoryNameAr: 'أحكام التجويد',
    difficulty: 'intermediate',
    questionAr: 'ما هو حكم النون الساكنة في قوله تعالى: ﴿مِن بَعْدِ﴾؟',
    questionEn: 'What rule applies to Nun Sakinah in "Min Ba\'di"?',
    optionsAr: ['إقلاب (قلب النون ميماً مخفاة مع الغنة)', 'إظهار حلقي', 'إدغام بغنة', 'إخفاء حقيقي'],
    optionsEn: ['Iqlab (Transforming Nun into Meem with Ghunnah)', 'Izhar Halqi', 'Idgham with Ghunnah', 'Ikhfa Haqiqi'],
    correctAnswerIndex: 0,
    explanationAr: 'الإقلاب هو قلب النون الساكنة أو التنوين ميماً مخفاة بغنة عند حرف الباء فقط.',
    source: 'الدر الثمين في تجويد كلام رب العالمين',
    hintAr: 'يوجد حرف الباء فقط بعد النون الساكنة ويوضع فوقها ميم صغيرة (مـ).'
  },
  {
    id: 'taj_3',
    category: 'tajweed',
    categoryNameAr: 'أحكام التجويد',
    difficulty: 'intermediate',
    questionAr: 'ما هي حروف القلقلة المجموعة في جملة شهيرة؟',
    questionEn: 'What letters constitute Qalqalah?',
    optionsAr: ['قُطْبُ جَدٍّ (ق، ط، ب، ج، د)', 'يَرْمَلُونَ (ي، ر، م، ل، و، ن)', 'أَخِي هَاكَ عِلْمًا', 'صِفْ ذَا ثَنَا'],
    optionsEn: ['Qutb Jadd (Qaf, Taa, Baa, Jeem, Dal)', 'Yarmaloon', 'Akhi Haka \'Ilman', 'Sif Dha Thana'],
    correctAnswerIndex: 0,
    explanationAr: 'حروف القلقلة خمسة يجمعها قول الناظم: (قلقلةٌ قُطبُ جَدٍّ)، وتقلقل إذا كانت ساكنة سكوناً أصلياً أو عارضاً للوقف.',
    source: 'المقدمة الجزرية لابن الجزري',
    hintAr: 'خمسة حروف تبدأ بحرف القاف وتجمع في كلمتي قطب جد.'
  },
  {
    id: 'taj_4',
    category: 'tajweed',
    categoryNameAr: 'أحكام التجويد',
    difficulty: 'advanced',
    questionAr: 'كم حَرَكَةً يُمدُّ المدُّ اللازم (الكلمي والحرفي) لزوماً في رواية حفص عن عاصم؟',
    questionEn: 'How many Harakahs is Madd Lazim extended by necessity in Hafs an Asim?',
    optionsAr: ['6 حركات مشبعة لزوماً', '4 حركات جوازاً', 'حركتان قصراً', '5 حركات استحباباً'],
    optionsEn: ['6 Harakahs (obligatory elongation)', '4 Harakahs', '2 Harakahs', '5 Harakahs'],
    correctAnswerIndex: 0,
    explanationAr: 'المد اللازم يمد ست حركات مشبعة لزوماً وسمي لازماً للزوم مده عند جميع القراء بمقدار 6 حركات.',
    source: 'البرهان في تجويد القرآن',
    hintAr: 'هو أطول المدود مقداراً بالإجماع وتساوي 6 حركات.'
  },
  {
    id: 'taj_5',
    category: 'tajweed',
    categoryNameAr: 'أحكام التجويد',
    difficulty: 'advanced',
    questionAr: 'ما هو المخرج الدقيق لحرف (الضاد) المعجم كما قرره أئمة القراءات؟',
    questionEn: 'What is the precise articulation point (Makhraj) of the letter Dad (ض)?',
    optionsAr: [
      'من إحدى حافتي اللسان أو كلتيهما مع ما يحاذيها من الأضراس العليا',
      'من طرف اللسان مع أصول الثنايا العليا',
      'من وسط اللسان مع الحنك الأعلى',
      'من طرف اللسان مع أطراف الثنايا العليا'
    ],
    optionsEn: [
      'From one or both edges of the tongue with upper molars',
      'Tip of the tongue with roots of upper incisors',
      'Middle of the tongue with hard palate',
      'Tip of tongue with tips of upper incisors'
    ],
    correctAnswerIndex: 0,
    explanationAr: 'قال ابن الجزري: (والضادُ من حافتهِ إذ وَلِيا * الأضراسَ من أيسرَ أو يُمنَاهَا)، وهو أصعب الحروف وأفصحها.',
    source: 'متن الجزرية للإمام ابن الجزري',
    hintAr: 'يخرج من حافة اللسان مستطيلة مع الأضراس العليا.'
  },
  {
    id: 'taj_6',
    category: 'tajweed',
    categoryNameAr: 'أحكام التجويد',
    difficulty: 'intermediate',
    questionAr: 'ما هو حكم الميم الساكنة في قوله تعالى: ﴿لَهُم مَّا يَشَاءُونَ﴾؟',
    questionEn: 'What is the rule of Meem Sakinah in "Lahum Ma Yashaa\'oon"?',
    optionsAr: ['إدغام شفوي (إدغام مثلين صغير مع الغنة)', 'إخفاء شفوي', 'إظهار شفوي', 'قلقلة كبرى'],
    optionsEn: ['Idgham Shafawi (Idgham Mithlayn Saghir with Ghunnah)', 'Ikhfa Shafawi', 'Izhar Shafawi', 'Qalqalah Kubra'],
    correctAnswerIndex: 0,
    explanationAr: 'إذا جاء بعد الميم الساكنة ميم متحركة تدغم فيها وتسمى إدغام مثلين صغير أو إدغاماً شفوياً مع بقاء الغنة.',
    source: 'غاية المريد في علم التجويد',
    hintAr: 'ميم ساكنة تلتها ميم متحركة، فيلتقي مثلان.'
  },

  // --- AYAH COMPLETION QUESTIONS ---
  {
    id: 'comp_1',
    category: 'ayah_completion',
    categoryNameAr: 'إكمال الآيات',
    difficulty: 'beginner',
    surahNumber: 2,
    questionAr: 'أكمل قوله تعالى: ﴿يَا أَيُّهَا الَّذِينَ آمَنُوا اسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ ۚ إِنَّ اللَّهَ ...﴾',
    questionEn: 'Complete: "O you who have believed, seek help through patience and prayer. Indeed, Allah is with..."',
    optionsAr: ['مَعَ الصَّابِرِينَ', 'غَفُورٌ رَّحِيمٌ', 'شَدِيدُ الْعِقَابِ', 'عَلِيمٌ حَكِيمٌ'],
    optionsEn: ['With the patient (Ma\'as-Sabireen)', 'Forgiving and Merciful', 'Severe in punishment', 'Knowing and Wise'],
    correctAnswerIndex: 0,
    explanationAr: 'الآية 153 من سورة البقرة: ﴿يَا أَيُّهَا الَّذِينَ آمَنُوا اسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ ۚ إِنَّ اللَّهَ مَعَ الصَّابِرِينَ﴾.',
    source: 'سورة البقرة: الآية 153',
    hintAr: 'ابحث عن الكلمة المناسبة لذكر الصبر في أول الآية.',
    audioAyah: { surah: 2, ayah: 153 }
  },
  {
    id: 'comp_2',
    category: 'ayah_completion',
    categoryNameAr: 'إكمال الآيات',
    difficulty: 'intermediate',
    surahNumber: 4,
    questionAr: 'أكمل قوله تعالى: ﴿إِنَّ اللَّهَ يَأْمُرُكُمْ أَن تُؤَدُّوا الْأَمَانَاتِ إِلَىٰ أَهْلِهَا وَإِذَا حَكَمْتُم بَيْنَ النَّاسِ أَن تَحْكُمُوا ...﴾',
    questionEn: 'Complete: "Indeed, Allah commands you to render trusts to whom they are due and when you judge between people to judge with..."',
    optionsAr: ['بِالْعَدْلِ ۚ إِنَّ اللَّهَ نِعِمَّا يَعِظُكُم بِهِ', 'بِالْحَقِّ وَأَنتُمْ تَعْلَمُونَ', 'بِالْقِسْطِ وَلَا تَعْتَدُوا', 'بِالْمَعْرُوفِ وَأَقِيمُوا الصَّلَاةَ'],
    optionsEn: ['With justice; excellent is that which Allah instructs you', 'With truth while you know', 'With equity and do not transgress', 'With good conduct and establish prayer'],
    correctAnswerIndex: 0,
    explanationAr: 'سورة النساء الآية 58: ﴿إِنَّ اللَّهَ يَأْمُرُكُمْ أَن تُؤَدُّوا الْأَمَانَاتِ إِلَىٰ أَهْلِهَا وَإِذَا حَكَمْتُم بَيْنَ النَّاسِ أَن تَحْكُمُوا بِالْعَدْلِ ۚ إِنَّ اللَّهَ نِعِمَّا يَعِظُكُم بِهِ ۗ إِنَّ اللَّهَ كَانَ سَمِيعًا بَصِيرًا﴾.',
    source: 'سورة النساء: الآية 58',
    hintAr: 'العدل هو أساس الحكم وأداء الأمانات.',
    audioAyah: { surah: 4, ayah: 58 }
  },
  {
    id: 'comp_3',
    category: 'ayah_completion',
    categoryNameAr: 'إكمال الآيات',
    difficulty: 'intermediate',
    surahNumber: 13,
    questionAr: 'أكمل قوله تعالى: ﴿الَّذِينَ آمَنُوا وَتَطْمَئِنُّ قُلُوبُهُم بِذِكْرِ اللَّهِ ۗ أَلَا بِذِكْرِ اللَّهِ ...﴾',
    questionEn: 'Complete: "Those who have believed and whose hearts are assured by the remembrance of Allah. Unquestionably, by the remembrance of Allah..."',
    optionsAr: ['تَطْمَئِنُّ الْقُلُوبُ', 'يَغْفِرُ الذُّنُوبَ', 'يُفْلِحُ الْمُؤْمِنُونَ', 'تَسْتَقِيمُ الْأُمُورُ'],
    optionsEn: ['Hearts are assured (Tatmainnul Quloob)', 'Sins are forgiven', 'The believers succeed', 'Affairs are set right'],
    correctAnswerIndex: 0,
    explanationAr: 'سورة الرعد الآية 28: ﴿الَّذِينَ آمَنُوا وَتَطْمَئِنُّ قُلُوبُهُم بِذِكْرِ اللَّهِ ۗ أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ﴾.',
    source: 'سورة الرعد: الآية 28',
    hintAr: 'الفاصلة مكررة من الكلمة المذكورة في صدر الآية.',
    audioAyah: { surah: 13, ayah: 28 }
  },
  {
    id: 'comp_4',
    category: 'ayah_completion',
    categoryNameAr: 'إكمال الآيات',
    difficulty: 'beginner',
    surahNumber: 17,
    questionAr: 'أكمل قوله تعالى في بر الوالدين: ﴿وَاخْفِضْ لَهُمَا جَنَاحَ الذُّلِّ مِنَ الرَّحْمَةِ وَقُل رَّبِّ ارْحَمْهُمَا كَمَا ...﴾',
    questionEn: 'Complete: "And lower to them the wing of humility out of mercy and say: My Lord, have mercy upon them as they..."',
    optionsAr: ['رَبَّيَانِي صَغِيرًا', 'عَلَّمَانِي كَبِيرًا', 'أَحْسَنَا إِلَيَّ دَائِمًا', 'وَصَّيْتَنِي بِهِمَا'],
    optionsEn: ['Brought me up when I was small (Rabbayani Sagheera)', 'Taught me when grown', 'Were always good to me', 'As you commanded me with them'],
    correctAnswerIndex: 0,
    explanationAr: 'سورة الإسراء الآية 24: ﴿وَاخْفِضْ لَهُمَا جَنَاحَ الذُّلِّ مِنَ الرَّحْمَةِ وَقُل رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا﴾.',
    source: 'سورة الإسراء: الآية 24',
    hintAr: 'دعاء قرآني مشهور لتربية الصغر.',
    audioAyah: { surah: 17, ayah: 24 }
  },
  {
    id: 'comp_5',
    category: 'ayah_completion',
    categoryNameAr: 'إكمال الآيات',
    difficulty: 'intermediate',
    surahNumber: 65,
    questionAr: 'أكمل قوله تعالى: ﴿وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا ۝ وَيَرْزُقْهُ ...﴾',
    questionEn: 'Complete: "And whoever fears Allah - He will make for him a way out. And will provide for him..."',
    optionsAr: ['مِنْ حَيْثُ لَا يَحْتَسِبُ', 'مِنْ طَيِّبَاتِ الرِّزْقِ', 'ذَهَبًا وَفِضَّةً', 'مَا لَا يَعْلَمُونَ'],
    optionsEn: ['From where he does not expect', 'From goodly provision', 'Gold and silver', 'What they do not know'],
    correctAnswerIndex: 0,
    explanationAr: 'سورة الطلاق الآية 2-3: ﴿وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا ۝ وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ ۚ وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ﴾.',
    source: 'سورة الطلاق: الآيتان 2-3',
    hintAr: 'الرزق يأتيه من جهة لا تخطر بباله ولا يحسب لها حساباً.',
    audioAyah: { surah: 65, ayah: 3 }
  },
  {
    id: 'comp_6',
    category: 'ayah_completion',
    categoryNameAr: 'إكمال الآيات',
    difficulty: 'advanced',
    surahNumber: 3,
    questionAr: 'أكمل قوله تعالى: ﴿فَبِمَا رَحْمَةٍ مِّنَ اللَّهِ لِنتَ لَهُمْ ۖ وَلَوْ كُنتَ فَظًّا غَلِيظَ الْقَلْبِ ...﴾',
    questionEn: 'Complete: "So by mercy from Allah, you were lenient with them. And if you had been rude and harsh in heart, they would have..."',
    optionsAr: ['لَانفَضُّوا مِنْ حَوْلِكَ', 'لَكَذَّبُوكَ وَتَوَلَّوْا', 'لَعَصَوْا أَمْرَكَ', 'لَمَا اتَّبَعُوكَ أَبَدًا'],
    optionsEn: ['Disbanded from around you (Lanfaddoo min hawlik)', 'Denied you and turned away', 'Disobeyed your command', 'Never followed you'],
    correctAnswerIndex: 0,
    explanationAr: 'سورة آل عمران الآية 159 في شأن أدب النبي ﷺ ورحمته بأصحابه في غزوة أحد: ﴿وَلَوْ كُنتَ فَظًّا غَلِيظَ الْقَلْبِ لَانفَضُّوا مِنْ حَوْلِكَ﴾.',
    source: 'سورة آل عمران: الآية 159',
    hintAr: 'الانفضاض هو التفرق والابتعاد.',
    audioAyah: { surah: 3, ayah: 159 }
  },

  // --- MUTASHABIHAT (متشابهات القرآن) ---
  {
    id: 'mut_1',
    category: 'mutashabihat',
    categoryNameAr: 'متشابهات القرآن',
    difficulty: 'advanced',
    surahNumber: 2,
    questionAr: 'في سورة البقرة تكرر قوله: ﴿وَاتَّقُوا يَوْمًا لَّا تَجْزِي نَفْسٌ عَن نَّفْسٍ شَيْئًا...﴾ في موضعين (48 و 123). ما هو الترتيب الصحيح في الموضع الأول (الآية 48)؟',
    questionEn: 'In Surah Al-Baqarah, how does the first instance (verse 48) order intercession and ransom?',
    optionsAr: [
      '﴿وَلَا يُقْبَلُ مِنْهَا شَفَاعَةٌ وَلَا يُؤْخَذُ مِنْهَا عَدْلٌ﴾',
      '﴿وَلَا يُقْبَلُ مِنْهَا عَدْلٌ وَلَا تَنفَعُهَا شَفَاعَةٌ﴾',
      '﴿وَلَا يُؤْخَذُ مِنْهَا فِدْيَةٌ وَلَا شَفَاعَةٌ﴾',
      '﴿وَلَا تَنفَعُهَا شَفَاعَةٌ وَلَا يُقْبَلُ مِنْهَا عَدْلٌ﴾'
    ],
    optionsEn: [
      'Nor will intercession be accepted from it, nor will compensation be taken',
      'Nor will compensation be accepted from it, nor will intercession benefit it',
      'Nor will ransom be taken from it, nor intercession',
      'Nor will intercession benefit it nor compensation accepted'
    ],
    correctAnswerIndex: 0,
    explanationAr: 'في الآية 48 قُدِّمت الشفاعة مع نفي القبول: ﴿وَلَا يُقْبَلُ مِنْهَا شَفَاعَةٌ وَلَا يُؤْخَذُ مِنْهَا عَدْلٌ﴾، بينما في الآية 123 قُدِّم العدل: ﴿وَلَا يُقْبَلُ مِنْهَا عَدْلٌ وَلَا تَنفَعُهَا شَفَاعَةٌ﴾.',
    source: 'ملاك التأويل لابن الزبير الغرناطي ودرة التنزيل للإسكافي',
    hintAr: 'الموضع الأول قُدّمت فيه الشفاعة مع الفعل (يُقبل).'
  },
  {
    id: 'mut_2',
    category: 'mutashabihat',
    categoryNameAr: 'متشابهات القرآن',
    difficulty: 'intermediate',
    surahNumber: 6,
    questionAr: 'ما الفرق بين قوله في سورة الأنعام: ﴿وَلَا تَقْتُلُوا أَوْلَادَكُم ... نَّحْنُ نَرْزُقُكُمْ وَإِيَّاهُمْ﴾ وقوله في سورة الإسراء: ﴿وَلَا تَقْتُلُوا أَوْلَادَكُمْ ... نَّحْنُ نَرْزُقُهُمْ وَإِيَّاكُمْ﴾؟',
    questionEn: 'What is the subtle difference in verse wording between Al-An\'am and Al-Isra regarding killing children?',
    optionsAr: [
      'في الأنعام (مِّنْ إِمْلَاقٍ) لأن الفقر واقع، وفي الإسراء (خَشْيَةَ إِمْلَاقٍ) لأن الفقر متوقع في المستقبل',
      'في الأنعام نزل في بني إسرائيل وفي الإسراء نزل في قريش',
      'كلاهما بنفس اللفظ تماماً بلا فرق',
      'في الإسراء نزل تحريم قتل الإناث فقط'
    ],
    optionsEn: [
      'In Al-An\'am "from poverty" (present), in Al-Isra "for fear of poverty" (future)',
      'One for Bani Israel and other for Quraysh',
      'Identical phrasing with no difference',
      'Only female infanticide'
    ],
    correctAnswerIndex: 0,
    explanationAr: 'في الأنعام الفقر حاصل ومتحقق فقال: ﴿مِّنْ إِمْلَاقٍ نَّحْنُ نَرْزُقُكُمْ وَإِيَّاهُمْ﴾ فبدأ برزق الآباء، أما في الإسراء فالفقر متوقع مستقبلاً فقال: ﴿خَشْيَةَ إِمْلَاقٍ نَّحْنُ نَرْزُقُهُمْ وَإِيَّاكُمْ﴾ فبدأ برزق الأبناء.',
    source: 'البرهان في توجيه متشابه القرآن للكرماني',
    hintAr: 'تأمل الفرق بين "من إملاق" (حاضر) و"خشية إملاق" (خوف مستقبلي).'
  },
  {
    id: 'mut_3',
    category: 'mutashabihat',
    categoryNameAr: 'متشابهات القرآن',
    difficulty: 'advanced',
    surahNumber: 2,
    questionAr: 'في سورة البقرة: ﴿ذَٰلِكَ بِأَنَّهُمْ كَانُوا يَكْفُرُونَ بِآيَاتِ اللَّهِ وَيَقْتُلُونَ النَّبِيِّينَ ...﴾، ما هي الكلمة القرآنية الدقيقة للفاصلة؟',
    questionEn: 'In Surah Al-Baqarah verse 61, what is the precise phrasing used for killing the prophets?',
    optionsAr: ['بِغَيْرِ الْحَقِّ', 'بِغَيْرِ حَقٍّ', 'بِغَيْرِ جُرْمٍ', 'ظُلْمًا وَعُدْوَانًا'],
    optionsEn: ['Bi-ghayri al-haqq (معرفة بأل)', 'Bi-ghayri haqq (منكرة)', 'Bi-ghayri jurm', 'Zulman wa \'udwana'],
    correctAnswerIndex: 0,
    explanationAr: 'في سورة البقرة (الآية 61) جاءت معرفة: ﴿بِغَيْرِ الْحَقِّ﴾، بينما في سورة آل عمران (الآية 21 والآية 112 والآية 181) جاءت منكرة في مواضع: ﴿بِغَيْرِ حَقٍّ﴾.',
    source: 'إغاثة اللهفان في ضبط متشابهات القرآن',
    hintAr: 'في سورة البقرة معرفة بالألف واللام: (الحق).'
  },
  {
    id: 'mut_4',
    category: 'mutashabihat',
    categoryNameAr: 'متشابهات القرآن',
    difficulty: 'intermediate',
    surahNumber: 7,
    questionAr: 'في قصة موسى عليه السلام مع السحرة، في أي سورة قال السحرة: ﴿آمَنَّا بِرَبِّ هَارُونَ وَمُوسَىٰ﴾ بتقديم هارون على موسى؟',
    questionEn: 'In which Surah did Pharaoh\'s magicians say "We believe in the Lord of Aaron and Moses", putting Aaron first?',
    optionsAr: ['سورة طه', 'سورة الأعراف', 'سورة الشعراء', 'سورة يونس'],
    optionsEn: ['Surah Taha', 'Surah Al-A\'raf', 'Surah Ash-Shu\'ara', 'Surah Yunus'],
    correctAnswerIndex: 0,
    explanationAr: 'في سورة طه قُدّم هارون لمناسبة الفواصل القرآنية المنتهية بالألف المقصورة: ﴿قَالُوا آمَنَّا بِرَبِّ هَارُونَ وَمُوسَىٰ﴾، بينما في الأعراف والشعراء: ﴿قَالُوا آمَنَّا بِرَبِّ الْعَالَمِينَ ۝ رَبِّ مُوسَىٰ وَهَارُونَ﴾.',
    source: 'تفسير التحرير والتنوير لابن عاشور',
    hintAr: 'فواصل آيات سورة طه كلها تنتهي بالألف المقصورة (هدى، ثرى، موسى).'
  },

  // --- GHARIB AL-QURAN (غريب القرآن والمعاني) ---
  {
    id: 'ghar_1',
    category: 'gharib_quran',
    categoryNameAr: 'غريب القرآن',
    difficulty: 'beginner',
    surahNumber: 112,
    questionAr: 'ما معنى قوله تعالى في سورة الإخلاص: ﴿اللَّهُ الصَّمَدُ﴾؟',
    questionEn: 'What is the precise meaning of "As-Samad" in Surah Al-Ikhlas?',
    optionsAr: [
      'السيد الذي تصمد وتقصد إليه الخلائق في جميع حوائجها، والذي لا جوف له',
      'الخالق لكل شيء من العدم',
      'القوي العزيز الذي لا يُغلب',
      'المحيط بكل زمان ومكان'
    ],
    optionsEn: [
      'The Master sought in all needs by all creation, self-sufficient',
      'The Creator of all from nothing',
      'The Mighty who is never overcome',
      'Encompassing all time and space'
    ],
    correctAnswerIndex: 0,
    explanationAr: 'الصمد في لغة العرب هو السيد الكامل في سؤدده وشرفه، الذي يُصمد إليه في الحوائج، وقال ابن عباس: السيد الذي كمل في جميع أنواع الشرف والسؤدد، وهو الذي لا جوف له ولا يطعم.',
    source: 'معاني القرآن للفراء وغريب القرآن لابن قتيبة',
    hintAr: 'الصمود لغةً هو القصد، فالخلائق تصمد إليه في حوائجها.'
  },
  {
    id: 'ghar_2',
    category: 'gharib_quran',
    categoryNameAr: 'غريب القرآن',
    difficulty: 'intermediate',
    surahNumber: 80,
    questionAr: 'في سورة عبس، ما معنى كلمة ﴿وَأَبًّا﴾ في قوله تعالى: ﴿وَفَاكِهَةً وَأَبًّا﴾؟',
    questionEn: 'What is the meaning of "Abba" in Surah Abasa (verse 31)?',
    optionsAr: ['الكَلأُ والمرعى والعشب الذي ترعاه البهائم والأنعام', 'ثمار التين المجففة', 'حبوب الحنطة والقمح', 'الأشجار الباسقة'],
    optionsEn: ['Pasture and fodder eaten by grazing animals', 'Dried figs', 'Wheat grains', 'Tall trees'],
    correctAnswerIndex: 0,
    explanationAr: 'الفاكهة للإنسان، والأبّ هو المرعى والعشب والكَلأ الذي تأكله الدواب والبهائم، لقوله بعد ذلك: ﴿مَّتَاعًا لَّكُمْ وَلِأَنْعَامِكُمْ﴾.',
    source: 'تفسير الطبري ولسان العرب',
    hintAr: 'انظر لما بعد الآية: ﴿مَّتَاعًا لَّكُمْ وَلِأَنْعَامِكُمْ﴾، فالفاكهة لكم والأب لأنعامكم.'
  },
  {
    id: 'ghar_3',
    category: 'gharib_quran',
    categoryNameAr: 'غريب القرآن',
    difficulty: 'intermediate',
    surahNumber: 53,
    questionAr: 'ما معنى قوله تعالى في سورة النجم: ﴿تِلْكَ إِذًا قِسْمَةٌ ضِيزَىٰ﴾؟',
    questionEn: 'What does "Dhiza" mean in Surah An-Najm (verse 22)?',
    optionsAr: ['قسمة جائرة وظالمة وغير عادلة', 'قسمة متساوية', 'قسمة متأخرة', 'قسمة مقدسة'],
    optionsEn: ['An unjust, unfair, and oppressive division', 'Equal division', 'Delayed division', 'Sacred division'],
    correctAnswerIndex: 0,
    explanationAr: 'ضيزى أي جائرة مائلة عن الحق ظالمة، من ضاز يضيز إذا ظلم وجار وانتقص الحق.',
    source: 'تفسير السعدي ومفردات الراغب الأصفهاني',
    hintAr: 'الرد على المشركين حين جعلوا لله البنات ولهم البنون، فتلك قسمة جائرة ظالمة.'
  },
  {
    id: 'ghar_4',
    category: 'gharib_quran',
    categoryNameAr: 'غريب القرآن',
    difficulty: 'advanced',
    surahNumber: 81,
    questionAr: 'ما معنى قوله تعالى: ﴿وَاللَّيْلِ إِذَا عَسْعَسَ﴾ في سورة التكوير؟',
    questionEn: 'What does "As\'asa" mean regarding the night in Surah At-Takwir?',
    optionsAr: [
      'أقبل بظلامه، أو أدبر وولى (وهو من ألفاظ الأضداد في لغة العرب)',
      'اشتد برده وريحه',
      'سكنت فيه الحركة تماماً',
      'تلألأت نجومه'
    ],
    optionsEn: [
      'Approached with darkness, or receded and departed (contranym)',
      'Became severely cold',
      'Motion completely ceased',
      'Its stars sparkled'
    ],
    correctAnswerIndex: 0,
    explanationAr: 'كلمة عسعس من الأضداد في لسان العرب: تطلق على إقبال الليل بظلامه، وتطلق أيضاً على إدباره ومغادرته، وكلاهما آية من آيات الله العظيمة.',
    source: 'تفسير ابن كثير ومفردات القرآن للراغب',
    hintAr: 'هي لفظة تحتمل المعنى وضده: إقبال الليل أو إدباره.'
  },
  {
    id: 'ghar_5',
    category: 'gharib_quran',
    categoryNameAr: 'غريب القرآن',
    difficulty: 'intermediate',
    surahNumber: 12,
    questionAr: 'ما معنى قول امرأة العزيز في سورة يوسف: ﴿الْآنَ حَصْحَصَ الْحَقُّ﴾؟',
    questionEn: 'What did the wife of Al-Aziz mean by "Has-hasa Al-Haqq" in Surah Yusuf?',
    optionsAr: ['ظهر الحق وانكشف بعد خفائه وبان جلياً', 'ضاع الحق واختفى', 'تأجل حكم القضاء', 'اشتد الخلاف بين الشهود'],
    optionsEn: ['The truth has become manifest, clear and revealed', 'Truth was lost', 'Judgement was postponed', 'Dispute intensified'],
    correctAnswerIndex: 0,
    explanationAr: 'حصحص الحق أي ثبت وظهر واستقر وانكشف أمره بعد أن كان مستوراً، مأخوذ من حصحص إذا ألقى حجارته وبان أثره.',
    source: 'الجامع لأحكام القرآن للقرطبي',
    hintAr: 'اعتراف امرأة العزيز ببراءة يوسف عليه السلام وظهور صدقه.'
  },

  // --- ASBAB AN-NUZUL (أسباب النزول وفضائل السور) ---
  {
    id: 'asb_1',
    category: 'asbab_nuzul',
    categoryNameAr: 'أسباب النزول',
    difficulty: 'beginner',
    surahNumber: 80,
    questionAr: 'فيمن نزلت الآيات الأولى من سورة عبس: ﴿عَبَسَ وَتَوَلَّىٰ ۝ أَن جَاءَهُ الْأَعْمَىٰ﴾؟',
    questionEn: 'Regarding whom were the opening verses of Surah Abasa revealed?',
    optionsAr: [
      'الصحابي الجليل عبد الله بن أم مكتوم رضي الله عنه',
      'الصحابي بلال بن رباح رضي الله عنه',
      'الصحابي عمار بن ياسر رضي الله عنه',
      'الصحابي أبو ذر الغفاري رضي الله عنه'
    ],
    optionsEn: [
      'The noble companion Abdullah ibn Umm Maktum (RA)',
      'Bilal ibn Rabah (RA)',
      'Ammar ibn Yasir (RA)',
      'Abu Dharr Al-Ghifari (RA)'
    ],
    correctAnswerIndex: 0,
    explanationAr: 'أقبل عبد الله بن أم مكتوم الأعمى إلى النبي ﷺ وهو يناجي صناديد قريش يرجو إسلامهم، فكره النبي ﷺ قطعه لكلامه فأنزل الله عتابه الرحيم لنبيه الكريم.',
    source: 'أسباب النزول للواحدي والترمذي',
    hintAr: 'هو المؤذن الثاني لرسول الله ﷺ في المدينة المنورة مع بلال.'
  },
  {
    id: 'asb_2',
    category: 'asbab_nuzul',
    categoryNameAr: 'أسباب النزول',
    difficulty: 'intermediate',
    surahNumber: 48,
    questionAr: 'في أي مناسبة تاريخية عظيمة نزلت سورة الفتح: ﴿إِنَّا فَتَحْنَا لَكَ فَتْحًا مُّبِينًا﴾؟',
    questionEn: 'On which monumental historical occasion was Surah Al-Fath revealed?',
    optionsAr: [
      'في مرجع النبي ﷺ من صلح الحديبية بالعام السادس للهجرة',
      'عقب فتح مكة المكرمة مباشرة',
      'بعد انتصار المسلمين في غزوة بدر',
      'في حجة الوداع'
    ],
    optionsEn: [
      'On returning from the Treaty of Hudaybiyyah (6 AH)',
      'Directly after the Conquest of Makkah',
      'After the victory at Badr',
      'During the Farewell Pilgrimage'
    ],
    correctAnswerIndex: 0,
    explanationAr: 'نزلت سورة الفتح كراع الغميم في طريق العودة من صلح الحديبية، واعتبره الله فتحاً مبيناً لما ترتب عليه من انتشار الإسلام ودخول الناس أفواجاً.',
    source: 'صحيح البخاري ومسلم',
    hintAr: 'صلح تاريخي عقده النبي ﷺ مع قريش مهد للفتح الأعظم.'
  },
  {
    id: 'asb_3',
    category: 'asbab_nuzul',
    categoryNameAr: 'فضائل السور',
    difficulty: 'beginner',
    surahNumber: 67,
    questionAr: 'ما هي السورة المانعة المنجية من عذاب القبر التي تشفع لصاحبها وتتكون من 30 آية؟',
    questionEn: 'Which Surah consisting of 30 verses intercedes for its reader and shields against grave punishment?',
    optionsAr: ['سورة الملك (تبارك)', 'سورة الواقعة', 'سورة يس', 'سورة الرحمن'],
    optionsEn: ['Surah Al-Mulk (Tabarak)', 'Surah Al-Waqi\'ah', 'Surah Ya-Seen', 'Surah Ar-Rahman'],
    correctAnswerIndex: 0,
    explanationAr: 'قال النبي ﷺ: «إن سورة من القرآن ثلاثون آية شفعت لرجل حتى غفر له وهي: تبارك الذي بيده الملك».',
    source: 'سنن الترمذي وأبو داود',
    hintAr: 'السورة رقم 67 في المصحف وتفتتح باسم الملك والتبارك.'
  },
  {
    id: 'asb_4',
    category: 'asbab_nuzul',
    categoryNameAr: 'أسباب النزول',
    difficulty: 'advanced',
    surahNumber: 6,
    questionAr: 'ما هي السورة المكية العظيمة التي نزلت جملة واحدة وشيّعها سبعون ألف ملك يعجّون بالتسبيح؟',
    questionEn: 'Which great Surah was revealed all at once accompanied by 70,000 angels glorifying Allah?',
    optionsAr: ['سورة الأنعام', 'سورة الأعراف', 'سورة يونس', 'سورة الإسراء'],
    optionsEn: ['Surah Al-An\'am', 'Surah Al-A\'raf', 'Surah Yunus', 'Surah Al-Isra'],
    correctAnswerIndex: 0,
    explanationAr: 'روى الطبراني وغيره عن ابن عباس رضي الله عنهما: «نزلت سورة الأنعام بمكة ليلاً جملة واحدة، حولها سبعون ألف ملك يجأرون حولها بالتسبيح والتحميد».',
    source: 'المعجم الكبير للطبراني وتفسير ابن كثير',
    hintAr: 'سورة الحجة والتوحيد وأطول سورة مكية نزلت جملة واحدة (رقمها 6).'
  },

  // --- SEVEN LONG SURAHS (السبع الطوال) ---
  {
    id: 'tiw_1',
    category: 'tiwal',
    categoryNameAr: 'السبع الطوال',
    difficulty: 'beginner',
    surahNumber: 2,
    questionAr: 'ما هي أطول آية في القرآن الكريم بأكمله، وما هو موضوعها؟',
    questionEn: 'What is the longest single ayah in the entire Quran, and what is its subject?',
    optionsAr: [
      'آية الدَّيْن (الآية 282 من سورة البقرة) في تنظيم المعاملات المالية والتوثيق',
      'آية الكرسي في سورة البقرة',
      'آخر آية في سورة النساء في المواريث',
      'آية المائدة في بيان المحرمات من الأطعمة'
    ],
    optionsEn: [
      'Ayah of Debt (2:282) regulating contracts and commercial documentation',
      'Ayat Al-Kursi in Al-Baqarah',
      'Last Ayah of An-Nisa on inheritance',
      'Ayah of Al-Ma\'idah on dietary prohibitions'
    ],
    correctAnswerIndex: 0,
    explanationAr: 'آية الدين رقم 282 من سورة البقرة تشغل صفحة كاملة في المصحف، وتضمنت أحكام كتابة الديون والإشهاد والرهان والعدالة في المعاملات المالية.',
    source: 'تفسير ابن كثير ومصحف المدينة',
    hintAr: 'تشغل صفحة كاملة في نهاية سورة البقرة.'
  },
  {
    id: 'tiw_2',
    category: 'tiwal',
    categoryNameAr: 'السبع الطوال',
    difficulty: 'intermediate',
    surahNumber: 5,
    questionAr: 'في أي سورة من السبع الطوال ذكرت آية إكمال الدين ورضا الإسلام ديناً: ﴿الْيَوْمَ أَكْمَلْتُ لَكُمْ دِينَكُمْ...﴾؟',
    questionEn: 'In which of the Seven Long Surahs is the verse of perfection of religion revealed?',
    optionsAr: ['سورة المائدة', 'سورة البقرة', 'سورة آل عمران', 'سورة التوبة'],
    optionsEn: ['Surah Al-Ma\'idah', 'Surah Al-Baqarah', 'Surah Aal-Imran', 'Surah At-Tawbah'],
    correctAnswerIndex: 0,
    explanationAr: 'نزلت الآية 3 من سورة المائدة يوم عرفة في حجة الوداع يوم الجمعة: ﴿الْيَوْمَ أَكْمَلْتُ لَكُمْ دِينَكُمْ وَأَتْمَمْتُ عَلَيْكُمْ نِعْمَتِي وَرَضِيتُ لَكُمُ الْإِسْلَامَ دِينًا﴾.',
    source: 'صحيح البخاري ومسلم',
    hintAr: 'السورة الخامسة في المصحف وتسمى أيضاً سورة العقود.'
  },

  // --- JUZ AMMA QUESTIONS ---
  {
    id: 'juz_1',
    category: 'juz_amma',
    categoryNameAr: 'جزء عم',
    difficulty: 'beginner',
    surahNumber: 97,
    questionAr: 'ما هي الليلة المباركة التي خُصّت بسورة كاملة في جزء عم ووصفت بأنها خير من ألف شهر؟',
    questionEn: 'Which blessed night is dedicated a whole surah in Juz Amma described as better than a thousand months?',
    optionsAr: ['ليلة القدر (في سورة القدر)', 'ليلة النصف من شعبان', 'ليلة الإسراء والمعراج', 'ليلة الجمعة المباركة'],
    optionsEn: ['Laylat Al-Qadr (Surah Al-Qadr)', 'Mid-Sha\'ban Night', 'Night of Isra & Mi\'raj', 'Blessed Friday Night'],
    correctAnswerIndex: 0,
    explanationAr: 'سورة القدر تخلد فضل ليلة القدر: ﴿إِنَّا أَنزَلْنَاهُ فِي لَيْلَةِ الْقَدْرِ ۝ وَمَا أَدْرَاكَ مَا لَيْلَةُ الْقَدْرِ ۝ لَيْلَةُ الْقَدْرِ خَيْرٌ مِّنْ أَلْفِ شَهْرٍ﴾.',
    source: 'سورة القدر وتفسيرها',
    hintAr: 'ليلة عظيمة في العشر الأواخر من رمضان.'
  },
  {
    id: 'juz_2',
    category: 'juz_amma',
    categoryNameAr: 'جزء عم',
    difficulty: 'intermediate',
    surahNumber: 103,
    questionAr: 'ما هي السورة القصيرة التي قال عنها الإمام الشافعي: (لو ما أنزل الله حجة على خلقه إلا هذه السورة لكفتهم)؟',
    questionEn: 'Which brief surah did Imam Ash-Shafi\'i praise saying: "Had Allah only revealed this surah as proof for His creation, it would suffice them"?',
    optionsAr: ['سورة العصر', 'سورة الإخلاص', 'سورة الفلق', 'سورة التكاثر'],
    optionsEn: ['Surah Al-Asr', 'Surah Al-Ikhlas', 'Surah Al-Falaq', 'Surah At-Takathur'],
    correctAnswerIndex: 0,
    explanationAr: 'سورة العصر احتوت أركان النجاة الأربعة: الإيمان، والعمل الصالح، والتواصي بالحق، والتواصي بالصبر في ثلاث آيات موجزة.',
    source: 'مقدمة تفسير ابن كثير',
    hintAr: 'سورة من ثلاث آيات تقسم بالزمان وتبين خسارة الإنسان إلا أهل الإيمان والعمل الصالح.'
  },

  // --- STORIES OF THE PROPHETS ---
  {
    id: 'prop_1',
    category: 'prophets',
    categoryNameAr: 'قصص الأنبياء',
    difficulty: 'intermediate',
    surahNumber: 21,
    questionAr: 'ما هي الكلمات المباركة التي نادى بها نبي الله يونس (ذا النون) عليه السلام في بطن الحوت؟',
    questionEn: 'What blessed supplication did Prophet Yunus (Jonah) make inside the belly of the whale?',
    optionsAr: [
      '﴿لَّا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ﴾',
      '﴿رَبِّ إِنِّي ظَلَمْتُ نَفْسِي فَاغْفِرْ لِي﴾',
      '﴿رَبَّنَا ظَلَمْنَا أَنفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا﴾',
      '﴿حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ﴾'
    ],
    optionsEn: [
      'La ilaha illa Anta, Subhanaka, inni kuntu minaz-zalimeen',
      'Rabbi inni zalamtu nafsi faghfir li',
      'Rabbana zalamna anfusana...',
      'Hasbunallahu wa ni\'mal wakeel'
    ],
    correctAnswerIndex: 0,
    explanationAr: 'سورة الأنبياء الآية 87: ﴿فَنَادَىٰ فِي الظُّلُمَاتِ أَن لَّا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ ۝ فَاسْتَجَبْنَا لَهُ وَنَجَّيْنَاهُ مِنَ الْغَمِّ ۚ وَكَذَٰلِكَ نُنجِي الْمُؤْمِنِينَ﴾.',
    source: 'سورة الأنبياء: الآية 87-88',
    hintAr: 'دعاء ذي النون الذي ما دعا به مكروب إلا فرّج الله عنه كربته.'
  },
  {
    id: 'prop_2',
    category: 'prophets',
    categoryNameAr: 'قصص الأنبياء',
    difficulty: 'intermediate',
    surahNumber: 28,
    questionAr: 'من هو النبي الذي ورد اسمه وقصته أكثر من أي نبي آخر في القرآن الكريم (في أكثر من 130 موضعاً)؟',
    questionEn: 'Which prophet is mentioned by name most frequently across the entire Quran (over 130 times)?',
    optionsAr: ['موسى عليه السلام (كليم الله)', 'إبراهيم عليه السلام (خليل الله)', 'نوح عليه السلام', 'عيسى عليه السلام'],
    optionsEn: ['Prophet Musa (Moses) - Kalimullah', 'Prophet Ibrahim (Abraham)', 'Prophet Nuh (Noah)', 'Prophet Isa (Jesus)'],
    correctAnswerIndex: 0,
    explanationAr: 'نبي الله موسى كليم الله عليه السلام ذُكر اسمه في القرآن الكريم 136 مرة وسردت تفاصيل دعوته وبني إسرائيل في سور كثيرة كالبقرة والأعراف وطه والقصص.',
    source: 'معجم ألفاظ القرآن الكريم بمجمع اللغة العربية',
    hintAr: 'كليم الله الذي أرسل إلى فرعون وملئه.'
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

  return [qClassification, qAyahCount, qOrder, qJuz];
};

// Main dispatcher to generate questions based on user filter/mode
export const getQuizQuestions = ({
  mode = 'collection', // 'collection' | 'surah' | 'category'
  collectionId = 'juz_amma',
  surahNumber = 1,
  category = 'all',
  difficulty = 'all'
}) => {
  // Mode 1: Individual Surah Quiz (All 114 Surahs support)
  if (mode === 'surah') {
    const sNum = Number(surahNumber) || 1;
    const surahQuestions = generateQuestionsForSurah(sNum);
    // Add any scholarly questions specifically related to this surah
    const specificScholarly = MASTER_SCHOLARLY_QUESTIONS.filter(q => q.surahNumber === sNum);
    return [...specificScholarly, ...surahQuestions];
  }

  // Mode 2: Curated Quran Collections
  if (mode === 'collection') {
    if (collectionId === 'grand_marathon') {
      // Pick random questions from across all 114 Surahs + scholarly
      const selectedSurahs = [1, 2, 3, 9, 12, 18, 36, 55, 57, 67, 78, 112, 113, 114];
      const marathon = [];
      selectedSurahs.forEach(num => {
        const qList = generateQuestionsForSurah(num);
        if (qList.length > 0) marathon.push(qList[Math.floor(Math.random() * qList.length)]);
      });
      return [...MASTER_SCHOLARLY_QUESTIONS.slice(0, 8), ...marathon];
    }

    // Specialized dedicated collections
    const directMatches = MASTER_SCHOLARLY_QUESTIONS.filter(q => q.category === collectionId);
    if (directMatches.length >= 4) {
      return directMatches;
    }

    const collection = QUIZ_COLLECTIONS.find(c => c.id === collectionId);
    if (!collection) return MASTER_SCHOLARLY_QUESTIONS;

    let targetSurahNumbers = [];
    if (collection.surahRange) {
      for (let i = collection.surahRange[0]; i <= collection.surahRange[1]; i++) {
        targetSurahNumbers.push(i);
      }
    } else if (collection.surahNumbers) {
      targetSurahNumbers = collection.surahNumbers;
    }

    const collectionQuestions = [];
    // Include specific scholarly questions for this collection
    MASTER_SCHOLARLY_QUESTIONS.forEach(q => {
      if (q.category === collectionId || (q.surahNumber && targetSurahNumbers.includes(q.surahNumber))) {
        collectionQuestions.push(q);
      }
    });

    // Generate questions for surahs in this collection
    targetSurahNumbers.slice(0, 8).forEach(num => {
      const qList = generateQuestionsForSurah(num);
      if (qList.length > 0) {
        collectionQuestions.push(qList[0]);
        if (qList[1]) collectionQuestions.push(qList[1]);
      }
    });

    return collectionQuestions.length > 0 ? collectionQuestions : MASTER_SCHOLARLY_QUESTIONS;
  }

  // Mode 3: By General Category / Difficulty
  let results = [...MASTER_SCHOLARLY_QUESTIONS];
  if (category !== 'all') {
    results = results.filter(q => q.category === category);
  }
  if (difficulty !== 'all') {
    results = results.filter(q => q.difficulty === difficulty);
  }
  return results.length > 0 ? results : MASTER_SCHOLARLY_QUESTIONS;
};
