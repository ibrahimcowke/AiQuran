import { ALL_114_SURAHS, getSurahByNumber } from './allSurahs';

// 8 Curated Quranic Quiz Collections
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
    id: 'tiwal',
    titleAr: 'مسابقة السبع الطِّوال',
    titleEn: 'The Seven Long Surahs',
    description: 'أسئلة متقدمة في أطول سور القرآن: البقرة، آل عمران، النساء، المائدة، الأنعام، الأعراف، التوبة.',
    icon: 'BookOpen',
    gradient: 'from-emerald-700 to-teal-800',
    surahRange: [2, 9],
    badge: 'للحفاظ المتقدمين'
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
    id: 'tajweed',
    titleAr: 'مسابقة أحكام التجويد ومخارج الحروف',
    titleEn: 'Master Tajweed Rules',
    description: 'أحكام النون الساكنة والتنوين، الميم الساكنة، المدود، القلقلة، ومخارج الحروف وصفاتها.',
    icon: 'Mic',
    gradient: 'from-emerald-800 to-green-950',
    badge: 'إتقان التلاوة'
  },
  {
    id: 'asbab_nuzul',
    titleAr: 'مسابقة أسباب النزول وفضائل السور',
    titleEn: 'Occasions of Revelation',
    description: 'المواقف والأحداث التي نزلت فيها آيات وسور القرآن العظيم في العهدين المكي والمدني.',
    icon: 'ShieldCheck',
    gradient: 'from-rose-700 to-pink-900',
    badge: 'فهم وتدبر'
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

// Curated master questions bank for key Quranic insights
export const MASTER_SCHOLARLY_QUESTIONS = [
  {
    id: 'm1',
    category: 'tafsir',
    categoryNameAr: 'علوم التفسير',
    difficulty: 'beginner',
    surahNumber: 1,
    questionAr: 'كم عدد آيات سورة الفاتحة بالإجماع؟',
    questionEn: 'How many ayahs are in Surah Al-Fatihah by scholarly consensus?',
    optionsAr: ['7 آيات', '6 آيات', '8 آيات', '10 آيات'],
    optionsEn: ['7 Ayahs', '6 Ayahs', '8 Ayahs', '10 Ayahs'],
    correctAnswerIndex: 0,
    explanationAr: 'سورة الفاتحة سبع آيات وتسمى (السبع المثاني) لقوله تعالى: ﴿وَلَقَدْ آتَيْنَاكَ سَبْعًا مِّنَ الْمَثَانِي وَالْقُرْآنَ الْعَظِيمَ﴾.',
    source: 'تفسير ابن كثير (Tafsir Ibn Kathir)'
  },
  {
    id: 'm2',
    category: 'tiwal',
    categoryNameAr: 'السبع الطوال',
    difficulty: 'beginner',
    surahNumber: 2,
    questionAr: 'ما هي أعظم آية في كتاب الله الكريم، وفي أي سورة تقع؟',
    questionEn: 'Which is the greatest ayah in the Quran and in which Surah is it located?',
    optionsAr: ['آية الكرسي في سورة البقرة', 'آية الدين في سورة البقرة', 'آخر آية في سورة التوبة', 'آية النور في سورة النور'],
    optionsEn: ['Ayat Al-Kursi in Al-Baqarah', 'Ayah of Debt in Al-Baqarah', 'Last Ayah of At-Tawbah', 'Ayat An-Nur in An-Nur'],
    correctAnswerIndex: 0,
    explanationAr: 'آية الكرسي (الآية 255 من سورة البقرة) هي سيدة آي القرآن وأعظمها بنص الحديث النبوي الصحيح.',
    source: 'صحيح مسلم (Sahih Muslim)'
  },
  {
    id: 'm3',
    category: 'history',
    categoryNameAr: 'أسباب النزول',
    difficulty: 'intermediate',
    surahNumber: 9,
    questionAr: 'ما هي السورة الوحيدة في القرآن الكريم التي لا تبدأ بـ (بسم الله الرحمن الرحيم)؟',
    questionEn: 'Which is the only Surah in the Quran that does not begin with the Basmalah?',
    optionsAr: ['سورة التوبة (براءة)', 'سورة الأنفال', 'سورة الحجرات', 'سورة ق'],
    optionsEn: ['Surah At-Tawbah (Bara\'ah)', 'Surah Al-Anfal', 'Surah Al-Hujurat', 'Surah Qaf'],
    correctAnswerIndex: 0,
    explanationAr: 'سورة التوبة نزلت بالسيف ونبذ العهود للمشركين والبسملة رحمة وأمان، فلذلك لم تبدأ بها.',
    source: 'الجامع لأحكام القرآن للقرطبي'
  },
  {
    id: 'm4',
    category: 'musabbihat',
    categoryNameAr: 'المسبحات',
    difficulty: 'intermediate',
    surahNumber: 57,
    questionAr: 'ما هي أول سورة من السور المسبحات حسب ترتيب المصحف الشريف؟',
    questionEn: 'Which is the first Surah among the Musabbihat according to Mushaf order?',
    optionsAr: ['سورة الحديد', 'سورة الحشر', 'سورة الصف', 'سورة الأعلى'],
    optionsEn: ['Surah Al-Hadid (57)', 'Surah Al-Hashr (59)', 'Surah As-Saff (61)', 'Surah Al-A\'la (87)'],
    correctAnswerIndex: 0,
    explanationAr: 'سورة الحديد (رقم 57) هي أولى السور المسبحات، افتتحت بقوله تعالى: ﴿سَبَّحَ لِلَّهِ مَا فِي السَّمَاوَاتِ وَالْأَرْضِ﴾.',
    source: 'علوم القرآن للإتقان للسيوطي'
  },
  {
    id: 'm5',
    category: 'prophets',
    categoryNameAr: 'قصص الأنبياء',
    difficulty: 'beginner',
    surahNumber: 12,
    questionAr: 'السورة التي وصفت في القرآن الكريم بأنها (أحسن القصص) وسردت قصة نبي كاملة هي:',
    questionEn: 'Which Surah is described in the Quran as the "Best of Stories" detailing a prophet\'s entire journey?',
    optionsAr: ['سورة يوسف', 'سورة هود', 'سورة يونس', 'سورة إبراهيم'],
    optionsEn: ['Surah Yusuf', 'Surah Hud', 'Surah Yunus', 'Surah Ibrahim'],
    correctAnswerIndex: 0,
    explanationAr: 'سورة يوسف افتتحت بقوله: ﴿نَحْنُ نَقُصُّ عَلَيْكَ أَحْسَنَ الْقَصَصِ﴾ وسردت قصة نبي الله يوسف عليه السلام كاملة.',
    source: 'تفسير السعدي'
  },
  {
    id: 'm6',
    category: 'hawameem',
    categoryNameAr: 'الحواميم',
    difficulty: 'intermediate',
    surahNumber: 40,
    questionAr: 'كم عدد سور الحواميم (التي تبدأ بحرفي حم) في القرآن الكريم؟',
    questionEn: 'How many Surahs belong to the Ha-Meem (Hawameem) family in the Quran?',
    optionsAr: ['7 سور', '5 سور', '6 سور', '8 سور'],
    optionsEn: ['7 Surahs', '5 Surahs', '6 Surahs', '8 Surahs'],
    correctAnswerIndex: 0,
    explanationAr: 'سور الحواميم سبع سور متتالية في المصحف: غافر، فصلت، الشورى، الزخرف، الدخان، الجاثية، الأحقاف.',
    source: 'معجم علوم القرآن'
  },
  {
    id: 'm7',
    category: 'juz_amma',
    categoryNameAr: 'جزء عم',
    difficulty: 'beginner',
    surahNumber: 112,
    questionAr: 'ما هي السورة التي تعدل قراءتها ثلث القرآن الكريم كما ثبت في الحديث الصحيح؟',
    questionEn: 'Which Surah equals one-third of the Quran when recited as authenticated in Hadith?',
    optionsAr: ['سورة الإخلاص', 'سورة الفلق', 'سورة الكافرون', 'سورة الناس'],
    optionsEn: ['Surah Al-Ikhlas', 'Surah Al-Falaq', 'Surah Al-Kafiroon', 'Surah An-Nas'],
    correctAnswerIndex: 0,
    explanationAr: 'قال النبي ﷺ: «قل هو الله أحد تعدل ثلث القرآن» لأن القرآن أنزل أحكاماً وأخباراً وتوحيداً، والإخلاص محّضت للتوحيد.',
    source: 'صحيح البخاري ومسلم'
  },
  {
    id: 'm8',
    category: 'tajweed',
    categoryNameAr: 'أحكام التجويد',
    difficulty: 'intermediate',
    questionAr: 'كم عدد حروف الإظهار الحلقي للنون الساكنة والتنوين؟',
    questionEn: 'How many letters cause Izhar Halqi for Nun Sakinah and Tanween?',
    optionsAr: ['6 حروف (ء، هـ، ع، ح، غ، خ)', '4 حروف (ي، ن، م، و)', '15 حرفاً', 'حرف واحد (ب)'],
    optionsEn: ['6 letters (Hamzah, Ha, Ain, Haa, Ghain, Kha)', '4 letters', '15 letters', '1 letter'],
    correctAnswerIndex: 0,
    explanationAr: 'حروف الإظهار الحلقي ستة مجموعة في أوائل كلمات: (أخي هاك علماً حازه غير خاسر).',
    source: 'تحفة الأطفال للجمزوري'
  },
  {
    id: 'm9',
    category: 'tafsir',
    categoryNameAr: 'التفسير',
    difficulty: 'advanced',
    surahNumber: 18,
    questionAr: 'ما هي الفتن الأربع الكبرى التي تعالجها سورة الكهف وقصصها الأربع؟',
    questionEn: 'What are the four great trials (fitan) addressed in Surah Al-Kahf?',
    optionsAr: [
      'فتنة الدين، فتنة المال، فتنة العلم، فتنة السلطة',
      'فتنة الشهرة، فتنة التجارة، فتنة النسب، فتنة المرض',
      'فتنة الحرب، فتنة الصيام، فتنة الفقر، فتنة السفر',
      'فتنة الكلام، فتنة النسيان، فتنة الكسل، فتنة الحزن'
    ],
    optionsEn: [
      'Faith (Companions of Cave), Wealth (Two Gardens), Knowledge (Moses & Khidr), Power (Dhul-Qarnayn)',
      'Fame, Commerce, Lineage, Illness',
      'War, Fasting, Poverty, Travel',
      'Speech, Forgetfulness, Laziness, Sorrow'
    ],
    correctAnswerIndex: 0,
    explanationAr: 'قصص الكهف تعالج: أصحاب الكهف (فتنة الدين)، صاحب الجنتين (فتنة المال)، موسى والخضر (فتنة العلم)، وذو القرنين (فتنة الملك والسلطة).',
    source: 'تدبر سورة الكهف للعلماء'
  },
  {
    id: 'm10',
    category: 'juz_amma',
    categoryNameAr: 'جزء عم',
    difficulty: 'beginner',
    surahNumber: 108,
    questionAr: 'ما هي أقصر سورة في القرآن الكريم من حيث عدد الآيات؟',
    questionEn: 'Which is the shortest Surah in the Quran by number of ayahs?',
    optionsAr: ['سورة الكوثر (3 آيات)', 'سورة العصر (3 آيات)', 'سورة النصر (3 آيات)', 'سورة الإخلاص (4 آيات)'],
    optionsEn: ['Surah Al-Kawthar (3 Ayahs, 10 words)', 'Surah Al-Asr (3 Ayahs)', 'Surah An-Nasr (3 Ayahs)', 'Surah Al-Ikhlas (4 Ayahs)'],
    correctAnswerIndex: 0,
    explanationAr: 'سورة الكوثر هي أقصر سورة في القرآن الكريم، 3 آيات وتتكون من 10 كلمات فقط.',
    source: 'مصحف مجمع الملك فهد'
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
    source: 'مصحف المدينة النبوية الشريفة'
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
    source: 'مجمع الملك فهد لطباعة المصحف الشريف'
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
    source: 'فهرس المصحف الشريف'
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
    source: 'تقسيم أجزاء وأحزاب المصحف الشريف'
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
      return [...MASTER_SCHOLARLY_QUESTIONS.slice(0, 5), ...marathon];
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
    targetSurahNumbers.slice(0, 10).forEach(num => {
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
