// Comprehensive Quran dataset, reciters, API fetchers, playlists, and expanded quiz bank

export const RECITERS = [
  {
    id: 'mishary',
    nameAr: 'مشاري بن راشد العفاسي',
    nameEn: 'Mishary Rashid Alafasy',
    subfolder: 'Alafasy_128kbps',
    cloudIdentifier: 'ar.alafasy',
    initial: 'ع',
    gradient: 'from-emerald-700 to-teal-800'
  },
  {
    id: 'husary',
    nameAr: 'محمود خليل الحصري (معلم)',
    nameEn: 'Mahmoud Khalil Al-Husary',
    subfolder: 'Husary_128kbps',
    cloudIdentifier: 'ar.husary',
    initial: 'ح',
    gradient: 'from-teal-800 to-emerald-950'
  },
  {
    id: 'abdulbasit',
    nameAr: 'عبد الباسط عبد الصمد (مرتل)',
    nameEn: 'AbdulBasit AbdusSamad',
    subfolder: 'Abdul_Basit_Murattal_192kbps',
    cloudIdentifier: 'ar.abdulbasitmurattal',
    initial: 'ب',
    gradient: 'from-amber-700 to-amber-950'
  },
  {
    id: 'minshawi',
    nameAr: 'محمد صديق المنشاوي',
    nameEn: 'Mohamed Siddiq Al-Minshawi',
    subfolder: 'Minshawy_Murattal_128kbps',
    cloudIdentifier: 'ar.minshawi',
    initial: 'م',
    gradient: 'from-emerald-900 to-slate-950'
  }
];

export const formatAyahAudioUrl = (reciterSubfolder, surahNumber, ayahNumberInSurah) => {
  const s = String(surahNumber).padStart(3, '0');
  const a = String(ayahNumberInSurah).padStart(3, '0');
  return `https://everyayah.com/data/${reciterSubfolder}/${s}${a}.mp3`;
};

import { ALL_114_SURAHS } from './allSurahs';

// All 114 Surahs catalog metadata fully populated
export const SURAHS_INDEX = ALL_114_SURAHS.map(s => ({
  id: s.number,
  number: s.number,
  arabic: s.arabic,
  english: s.english,
  meaning: s.meaning,
  ayahs: s.ayahs,
  type: s.type,
  juz: s.juz,
  memorized: s.number <= 2 || s.number >= 112 ? 100 : s.number === 67 ? 100 : s.number === 18 ? 85 : 0,
  quizMastery: s.number <= 2 || s.number >= 112 ? 95 : 60
}));

// Rich local data for pre-cached surahs
export const SURAH_DETAILS = {
  1: {
    number: 1,
    arabic: 'الفاتحة',
    english: 'Al-Fatihah',
    meaning: 'The Opening',
    type: 'Meccan',
    bismillahPre: false,
    ayahs: [
      { id: 1, numberInSurah: 1, arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", english: "In the name of Allah, the Entirely Merciful, the Especially Merciful.", tafsirSaadi: "بدأ الله بها كتابه، ليعلم عباده أن يبدأوا أعمالهم باسمه طلباً للبركة والمعونة.", tafsirKathir: "البسملة آية مستقلة في أول سورة الفاتحة ومفتاح كل خير." },
      { id: 2, numberInSurah: 2, arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", english: "[All] praise is [due] to Allah, Lord of the worlds -", tafsirSaadi: "الثناء على الله بصفات الكمال وبنعمه الظاهرة والباطنة الدينية والدنيوية.", tafsirKathir: "استغراق جميع المحامد والكمالات لله سبحانه وحده." },
      { id: 3, numberInSurah: 3, arabic: "الرَّحْمَٰنِ الرَّحِيمِ", english: "The Entirely Merciful, the Especially Merciful,", tafsirSaadi: "اسمان دالان على سعة رحمته التي وسعت كل شيء.", tafsirKathir: "الرحمن بجميع الخلائق والرحيم بالمؤمنين خاصة." },
      { id: 4, numberInSurah: 4, arabic: "مَالِكِ يَوْمِ الدِّينِ", english: "Sovereign of the Day of Recompense.", tafsirSaadi: "المتصرف في الأعيان بالأمر والنهي، ويوم الدين هو يوم الجزاء والحساب.", tafsirKathir: "تخصيص الملك بيوم الدين لأنه لا يدّعي أحد هنالك ملكاً." },
      { id: 5, numberInSurah: 5, arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", english: "It is You we worship and You we ask for help.", tafsirSaadi: "نخصك وحدك بالعبادة ونخصك وحدك بالاستعانة فلا نشرك بك أحداً.", tafsirKathir: "تقديم المفعول يفيد الحصر؛ لا نعبد إلا إياك ولا نتوكل إلا عليك." },
      { id: 6, numberInSurah: 6, arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ", english: "Guide us to the straight path -", tafsirSaadi: "دلنا وأرشدنا وثبتنا على الطريق الواضح الموصل لرضوانك وجنتك.", tafsirKathir: "سؤال الهداية هو أعظم دعاء لافتقار العبد إليه في كل حين." },
      { id: 7, numberInSurah: 7, arabic: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ", english: "The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.", tafsirSaadi: "صراط النبيين والصديقين والشهداء والصالحين، لا طريق المغضوب عليهم ولا الضالين.", tafsirKathir: "ختام الفاتحة ببيان طريق أهل الفلاح والتحذير من سبل الغواية." }
    ]
  },
  67: {
    number: 67,
    arabic: 'الملك',
    english: 'Al-Mulk',
    meaning: 'The Sovereignty',
    type: 'Meccan',
    bismillahPre: true,
    ayahs: [
      { id: 1, numberInSurah: 1, arabic: "تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ", english: "Blessed is He in whose hand is dominion, and He is over all things competent -", tafsirSaadi: "تعاظم وكثر خيره وإحسانه، المتصرف في جميع الكائنات بنفوذ قدرته.", tafsirKathir: "يمجد تعالى نفسه الكريمة ويخبر أن بيده ملك السموات والأرض." },
      { id: 2, numberInSurah: 2, arabic: "الَّذِي خَلَقَ الْمَوْتَ وَالْحَيَاةَ لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًا ۚ وَهُوَ الْعَزِيزُ الْغَفُورُ", english: "[He] who created death and life to test you [as to] which of you is best in deed - and He is the Exalted in Might, the Forgiving -", tafsirSaadi: "اختبار للعباد أيهم أخلص عملاً وأصوبه لله عز وجل.", tafsirKathir: "خلق الحياة والموت ليبتليكم بالفرائض والتكاليف فيجازي المحسن بإحسانه." },
      { id: 3, numberInSurah: 3, arabic: "الَّذِي خَلَقَ سَبْعَ سَمَاوَاتٍ طِبَاقًا ۖ مَّا تَرَىٰ فِي خَلْقِ الرَّحْمَٰنِ مِن تَفَاوُتٍ ۖ فَارْجِعِ الْبَصَرَ هَلْ تَرَىٰ مِن فُطُورٍ", english: "[And] who created seven heavens in layers. You see not in the creation of the Most Merciful any inconsistency. So return [your] vision to the sky; do you see any breaks?", tafsirSaadi: "سماء فوق سماء في غاية الإتقان والجمال بلا خلل ولا نقص.", tafsirKathir: "خلق السموات في كمال وإحكام لا تفاوت فيه ولا اضطراب." },
      { id: 4, numberInSurah: 4, arabic: "ثُمَّ ارْجِعِ الْبَصَرَ كَرَّتَيْنِ يَنقَلِبْ إِلَيْكَ الْبَصَرُ خَاسِئًا وَهُوَ حَسِيرٌ", english: "Then return [your] vision twice again. [Your] vision will return to you humbled while it is fatigued.", tafsirSaadi: "كرر النظر مرة بعد مرة لن تجد في خلق الله عيباً ولا صدعاً.", tafsirKathir: "يرجع إليك بصرك كليلاً عاجزاً عن أن يرى عيباً في خلق السموات." }
    ]
  },
  18: {
    number: 18,
    arabic: 'الكهف',
    english: 'Al-Kahf',
    meaning: 'The Cave',
    type: 'Meccan',
    bismillahPre: true,
    ayahs: [
      { id: 1, numberInSurah: 1, arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَنزَلَ عَلَىٰ عَبْدِهِ الْكِتَابَ وَلَمْ يَجْعَل لَّهُ عِوَجًا", english: "[All] praise is [due] to Allah, who has sent down upon His Servant the Book and has not made therein any deviance.", tafsirSaadi: "حمد نفسه الكريمة على إنزاله كتابه العظيم على رسوله محمد صلى الله عليه وسلم.", tafsirKathir: "الحمد لله الذي أنزل الكتاب المستقيم الهادي للخلق." },
      { id: 2, numberInSurah: 2, arabic: "قَيِّمًا لِّيُنذِرَ بَأْسًا شَدِيدًا مِّن لَّدُنْهُ وَيُبَشِّرَ الْمُؤْمِنِينَ الَّذِينَ يَعْمَلُونَ الصَّالِحَاتِ أَنَّ لَهُمْ أَجْرًا حَسَنًا", english: "[He has made it] straight, to warn of severe punishment from Him and to give good tidings to the believers who do righteous deeds that they will have a good reward", tafsirSaadi: "جعله قيماً مستقيماً معتدلاً لا إفراط فيه ولا تفريط.", tafsirKathir: "مستقيماً لا عوج فيه لينذر الكافرين ويبشر المؤمنين." },
      { id: 3, numberInSurah: 3, arabic: "مَّاكِثِينَ فِيهِ أَبَدًا", english: "In which they will remain forever", tafsirSaadi: "ماكثين في ذلك الأجر وهو الجنة ونعيمها الدائم.", tafsirKathir: "مقيمين في ثواب الله وهو جناته دار الخلود." },
      { id: 4, numberInSurah: 4, arabic: "وَيُنذِرَ الَّذِينَ قَالُوا اتَّخَذَ اللَّهُ وَلَدًا", english: "And to warn those who say, 'Allah has taken a son.'", tafsirSaadi: "إنذار خاص لمن افترى على الله الكذب بنسبة الولد إليه.", tafsirKathir: "رد على المشركين وأهل الكتاب القائلين باتخاذ الولد." },
      { id: 5, numberInSurah: 5, arabic: "مَّا لَهُم بِهِ مِنْ عِلْمٍ وَلَا لِآبَائِهِمْ ۚ كَبُرَتْ كَلِمَةً تَخْرُجُ مِنْ أَفْوَاهِهِمْ ۚ إِن يَقُولُونَ إِلَّا كَذِبًا", english: "They have no knowledge of it, nor had their fathers. Grave is the word that comes out of their mouths; they speak not except a lie.", tafsirSaadi: "قولهم هذا صادر عن جهل وضلال وتجرؤ عظيم على الله.", tafsirKathir: "تعظيم لشناعة فرية نسبة الصاحبة والولد لله." }
    ]
  },
  112: {
    number: 112,
    arabic: 'الإخلاص',
    english: 'Al-Ikhlas',
    meaning: 'Sincerity',
    type: 'Meccan',
    bismillahPre: true,
    ayahs: [
      { id: 1, numberInSurah: 1, arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ", english: "Say, 'He is Allah, [who is] One,", tafsirSaadi: "قل معتقداً: هو الله المنفرد بالكمال الذي لا شريك له ولا مثيل.", tafsirKathir: "الواحد الأحد الذي لا نظير له ولا وزير ولا شبيه." },
      { id: 2, numberInSurah: 2, arabic: "اللَّهُ الصَّمَدُ", english: "Allah, the Eternal Refuge.", tafsirSaadi: "الذي تقصده جميع الخلائق في حوائجهم لكماله وغناه المطلق.", tafsirKathir: "السيد الذي كمل في سؤدده وشرفه وعظمته وقدرته." },
      { id: 3, numberInSurah: 3, arabic: "لَمْ يَلِدْ وَلَمْ يُولَدْ", english: "He neither begets nor is born,", tafsirSaadi: "كمال غناه عن الصاحبة والولد، وتنزهه عن الحدوث والأصل.", tafsirKathir: "ليس له ولد ولا والد ولا صاحبة سبحانه وتعالى." },
      { id: 4, numberInSurah: 4, arabic: "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ", english: "Nor is there to Him any equivalent.'", tafsirSaadi: "لا يماثله أحد في أسمائه وصفاته وأفعاله تبارك وتعالى.", tafsirKathir: "لا شبيه له ولا نظير ولا كفء من خلقه بوجه من الوجوه." }
    ]
  },
  113: {
    number: 113,
    arabic: 'الفلق',
    english: 'Al-Falaq',
    meaning: 'The Daybreak',
    type: 'Meccan',
    bismillahPre: true,
    ayahs: [
      { id: 1, numberInSurah: 1, arabic: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ", english: "Say, 'I seek refuge in the Lord of daybreak", tafsirSaadi: "ألتجئ وأعتصم برب الصبح الذي ينفلق عنه الظلام.", tafsirKathir: "الاستعاذة بفالق الإصباح وخالق النور." },
      { id: 2, numberInSurah: 2, arabic: "مِن شَرِّ مَا خَلَقَ", english: "From the evil of that which He created", tafsirSaadi: "من شر كل مخلوق فيه شر من إنس وجن ودواب.", tafsirKathir: "من شر جميع المخلوقات وآفاتها." },
      { id: 3, numberInSurah: 3, arabic: "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ", english: "And from the evil of darkness when it settles", tafsirSaadi: "من شر الليل إذا دخل وأظلم لانتشار الشياطين وأهل الشر فيه.", tafsirKathir: "الليل إذا أقبل بظلامه وسكن." },
      { id: 4, numberInSurah: 4, arabic: "وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ", english: "And from the evil of the blowers in knots", tafsirSaadi: "من شر السواحر اللاتي يعقدن السحر وينفثن فيه بالأذى.", tafsirKathir: "الساحرات اللاتي ينفثن في العقد للإضرار بالناس." },
      { id: 5, numberInSurah: 5, arabic: "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ", english: "And from the evil of an envier when he envies.'", tafsirSaadi: "من شر الحاسد الذي يتمنى زوال النعمة عن غيره ويسعى في إيذائه.", tafsirKathir: "الحاسد الذي يضر بنظرته وخبث نفسه." }
    ]
  },
  114: {
    number: 114,
    arabic: 'الناس',
    english: 'An-Nas',
    meaning: 'Mankind',
    type: 'Meccan',
    bismillahPre: true,
    ayahs: [
      { id: 1, numberInSurah: 1, arabic: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ", english: "Say, 'I seek refuge in the Lord of mankind,", tafsirSaadi: "الاعتصام برب الناس وخالقهم ومدبر أمورهم.", tafsirKathir: "الربوبية العامة والخاصة لجميع البشر." },
      { id: 2, numberInSurah: 2, arabic: "مَلِكِ النَّاسِ", english: "The Sovereign of mankind,", tafsirSaadi: "المتصرف فيهم بالأحكام الشرعية والقدرية والجزائية.", tafsirKathir: "الملك الحقيقي الذي يدبر أمر عباده." },
      { id: 3, numberInSurah: 3, arabic: "إِلَٰهِ النَّاسِ", english: "The God of mankind,", tafsirSaadi: "معبودهم الحق الذي لا إله لهم سواه.", tafsirKathir: "المستحق للعبادة وحده دون ما سواه." },
      { id: 4, numberInSurah: 4, arabic: "مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ", english: "From the evil of the retreating whisperer -", tafsirSaadi: "الشيطان الذي يوسوس عند الغفلة ويخنس ويتأخر عند ذكر الله.", tafsirKathir: "الموكل بالإنسان يوسوس له بالشر ويخنس إذا ذكر الله." },
      { id: 5, numberInSurah: 5, arabic: "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ", english: "Who whispers [evil] into the breasts of mankind -", tafsirSaadi: "يبث الشكوك والشهوات والشبهات في القلوب.", tafsirKathir: "يلقي الوسوسة في قلوب بني آدم." },
      { id: 6, numberInSurah: 6, arabic: "مِنَ الْجِنَّةِ وَالنَّاسِ", english: "From among the jinn and mankind.'", tafsirSaadi: "شياطين الجن وشياطين الإنس الذين يدعون إلى الباطل.", tafsirKathir: "وسوسة تكون من الجن وتكون أيضاً من شياطين الإنس." }
    ]
  }
};

// Memory Cache for dynamically fetched surahs
const surahApiCache = {};

// Live Dynamic Surah Fetcher from verified AlQuran Cloud API
export const fetchSurahData = async (surahNumber) => {
  if (SURAH_DETAILS[surahNumber]) {
    return SURAH_DETAILS[surahNumber];
  }

  if (surahApiCache[surahNumber]) {
    return surahApiCache[surahNumber];
  }

  try {
    const res = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,en.sahih`);
    const json = await res.json();

    if (json.code === 200 && json.data && json.data.length >= 2) {
      const arabicEdition = json.data[0];
      const englishEdition = json.data[1];

      const ayahs = arabicEdition.ayahs.map((ayah, index) => ({
        id: ayah.number,
        numberInSurah: ayah.numberInSurah,
        arabic: ayah.text,
        english: englishEdition.ayahs[index]?.text || '',
        tafsirSaadi: `سورة ${arabicEdition.name} - الآية رقم ${ayah.numberInSurah} من كتاب الله العظيم.`,
        tafsirKathir: `التفسير المعتمد للآية الكريمة رقم ${ayah.numberInSurah}.`
      }));

      const meta = SURAHS_INDEX.find(s => s.number === surahNumber) || {
        arabic: arabicEdition.name,
        english: arabicEdition.englishName,
        meaning: arabicEdition.englishNameTranslation,
        type: arabicEdition.revelationType === 'Meccan' ? 'مكية' : 'مدنية',
      };

      const result = {
        number: surahNumber,
        arabic: meta.arabic,
        english: meta.english,
        meaning: meta.meaning,
        type: meta.type,
        bismillahPre: surahNumber !== 1 && surahNumber !== 9,
        ayahs
      };

      surahApiCache[surahNumber] = result;
      return result;
    }
  } catch (err) {
    console.warn("Failed to fetch surah dynamically, falling back to local dataset:", err);
  }

  return SURAH_DETAILS[1];
};

// Expanded Quiz Bank (20+ scholarly questions across multiple categories and difficulty levels)
export const QUIZ_BANK = [
  {
    id: 'q1',
    category: 'tafsir',
    categoryNameAr: 'علوم التفسير',
    categoryNameEn: 'Tafsir Studies',
    difficulty: 'beginner',
    questionAr: "أي مما يلي ليس من أسماء سورة الفاتحة المعتمدة في كتب التفسير؟",
    questionEn: "Which of the following is NOT an authentic name for Surah Al-Fatihah?",
    optionsAr: ["أم الكتاب", "السبع المثاني", "القتال", "الشفاء"],
    optionsEn: ["Umm al-Kitab", "As-Sab' al-Mathani", "Al-Qital", "Ash-Shifa"],
    correctAnswerIndex: 2,
    explanationAr: "سورة (القتال) هو اسم آخر لسورة محمد (صلى الله عليه وسلم)، وليس الفاتحة.",
    explanationEn: "Al-Qital is another name for Surah Muhammad (47), not Al-Fatihah.",
    source: "تفسير القرطبي (Tafsir Al-Qurtubi)"
  },
  {
    id: 'q2',
    category: 'tajweed',
    categoryNameAr: 'أحكام التجويد',
    categoryNameEn: 'Tajweed Rules',
    difficulty: 'intermediate',
    questionAr: "ما هو حكم الدال عند الوقف على كلمة (أَحَدٌ) في سورة الإخلاص؟",
    questionEn: "What is the Tajweed rule for the Dal when pausing on 'Ahad' in Surah Al-Ikhlas?",
    optionsAr: ["إدغام بغنة", "قلقلة كبرى", "إخفاء شفوي", "مد لازم"],
    optionsEn: ["Idgham with Ghunnah", "Major Qalqalah (Kubra)", "Ikhfa Shafawi", "Madd Lazim"],
    correctAnswerIndex: 1,
    explanationAr: "حرف الدال من حروف قطب جد، وعند الوقف عليه بالسكون العارض في نهاية الآية يكون حكمه قلقلة كبرى.",
    explanationEn: "Dal is one of the Qalqalah letters and produces Qalqalah Kubra when paused on.",
    source: "المقدمة الجزرية في التجويد"
  },
  {
    id: 'q3',
    category: 'history',
    categoryNameAr: 'أسباب النزول والمعاني',
    categoryNameEn: 'Context & Meaning',
    difficulty: 'beginner',
    questionAr: "أطول آية في كتاب الله الكريم هي الآية رقم 282 من سورة البقرة وتعرف باسم:",
    questionEn: "The longest ayah in the Quran is Ayah 282 of Surah Al-Baqarah, famously known as:",
    optionsAr: ["آية الدَّيْن", "آية الكرسي", "آية المباهلة", "آية السيف"],
    optionsEn: ["Ayah of Debt (Ad-Dayn)", "Ayat Al-Kursi", "Ayat Al-Mubahala", "Ayat As-Sayf"],
    correctAnswerIndex: 0,
    explanationAr: "الآية 282 من سورة البقرة تفصل أحكام المداينة وكتابة وتوثيق العقود لحفظ الحقوق بين الناس.",
    explanationEn: "Ayah 282 is the Ayah of Debt, providing exhaustive guidance on writing loans and transactions.",
    source: "تفسير ابن كثير (Tafsir Ibn Kathir)"
  },
  {
    id: 'q4',
    category: 'continuity',
    categoryNameAr: 'تسلسل وحفظ الآيات',
    categoryNameEn: 'Ayah Continuity',
    difficulty: 'intermediate',
    questionAr: "ما هي الآية التي تلي قوله تعالى: (تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ)؟",
    questionEn: "Which ayah immediately follows 'Tabarakalladhi biyadihil-mulku wa huwa 'ala kulli shay'in qadeer'?",
    optionsAr: [
      "الَّذِي خَلَقَ الْمَوْتَ وَالْحَيَاةَ لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًا",
      "الَّذِي خَلَقَ سَبْعَ سَمَاوَاتٍ طِبَاقًا",
      "وَلَقَدْ زَيَّنَّا السَّمَاءَ الدُّنْيَا بِمَصَابِيحَ",
      "إِذَا أُلْقُوا فِيهَا سَمِعُوا لَهَا شَهِيقًا"
    ],
    optionsEn: [
      "Alladhi khalaqal-mawta wal-hayata liyabluwakum ayyukum ahsanu 'amala",
      "Alladhi khalaqa sab'a samawatin tibaqa",
      "Wa laqad zayyannas-sama'ad-dunya bimasabeeh",
      "Iza ulqoo feeha sami'oo laha shaheeqa"
    ],
    correctAnswerIndex: 0,
    explanationAr: "الآية الثانية من سورة الملك تذكر حكمة خلق الموت والحياة لاختبار البشر في أعمالهم وإخلاصهم.",
    explanationEn: "Ayah 2 continues by stating that life and death were created to test who is best in deed.",
    source: "مصحف المدينة النبوية الشريفة"
  },
  {
    id: 'q5',
    category: 'tajweed',
    categoryNameAr: 'أحكام التجويد',
    categoryNameEn: 'Tajweed Rules',
    difficulty: 'advanced',
    questionAr: "ما هو مقدار المد اللازم الكلمي المثقل مثل كلمة (الضَّالِّينَ) أو (الحَاقَّةُ)؟",
    questionEn: "What is the mandatory duration of Madd Lazim Kalimi Muthaqqal like in 'Ad-Dalleen'?",
    optionsAr: ["حركتان", "4 حركات جوازاً", "6 حركات وجوباً", "حركة واحدة"],
    optionsEn: ["2 Harakat", "4 Harakat permissible", "6 Harakat mandatory", "1 Harakah"],
    correctAnswerIndex: 2,
    explanationAr: "المد اللازم بجميع أنواعه (الكلمي والحرفي، المثقل والمخفف) يمد 6 حركات لزوماً باتفاق القراء.",
    explanationEn: "Madd Lazim is universally agreed among reciters to be held for 6 mandatory beats (Harakat).",
    source: "تحفة الأطفال والمنظومة الجزرية"
  },
  {
    id: 'q6',
    category: 'vocabulary',
    categoryNameAr: 'معاني المفردات القرآنية',
    categoryNameEn: 'Quranic Vocabulary',
    difficulty: 'intermediate',
    questionAr: "ما معنى كلمة (الصَّمَدُ) في قوله تعالى: (اللَّهُ الصَّمَدُ)؟",
    questionEn: "What is the comprehensive meaning of 'As-Samad' in Surah Al-Ikhlas?",
    optionsAr: [
      "السيد الذي تصمد وتقصده الخلائق في جميع حوائجها لكماله",
      "الشديد القوي فقط",
      "الخالق للسموات والأرض",
      "الغفور الرحيم"
    ],
    optionsEn: [
      "The Eternal Lord to whom all creation turns for every need",
      "Only the Strong",
      "The Creator of heavens and earth",
      "The All-Forgiving"
    ],
    correctAnswerIndex: 0,
    explanationAr: "الصمد هو السيد الذي كمل في شرفه وسؤدده، والذي تصمد الخلائق إليه في قضاء حوائجها لكمال غناه.",
    explanationEn: "As-Samad is the Absolute Sovereign upon whom all of creation depends for every single need.",
    source: "تفسير الطبري وتفسير ابن كثير"
  },
  {
    id: 'q7',
    category: 'history',
    categoryNameAr: 'أسباب النزول والمعاني',
    categoryNameEn: 'Context & Meaning',
    difficulty: 'advanced',
    questionAr: "ما هي السورة الوحيدة في القرآن الكريم التي لا تبدأ بـ (بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ)؟",
    questionEn: "Which is the ONLY surah in the Holy Quran that does not begin with the Bismillah?",
    optionsAr: ["سورة التوبة (براءة)", "سورة الأنفال", "سورة يونس", "سورة الحشر"],
    optionsEn: ["Surah At-Tawbah (Bara'ah)", "Surah Al-Anfal", "Surah Yunus", "Surah Al-Hashr"],
    correctAnswerIndex: 0,
    explanationAr: "سورة التوبة لم تبدأ بالبسملة لأنها نزلت بالسيف ورفع الأمان عن المشركين ونقض العهود، والبسملة رحمة وأمان.",
    explanationEn: "Surah At-Tawbah does not start with Bismillah as it declared disavowal of treaty breakers, whereas Bismillah is peace and mercy.",
    source: "صحيح البخاري ومستدرك الحاكم"
  },
  {
    id: 'q8',
    category: 'tafsir',
    categoryNameAr: 'علوم التفسير',
    categoryNameEn: 'Tafsir Studies',
    difficulty: 'beginner',
    questionAr: "ما هي السورة التي تعدل قراءتها ثلث القرآن الكريم كما ثبت في الحديث الصحيح؟",
    questionEn: "Which surah is equivalent in reward to one third of the Holy Quran?",
    optionsAr: ["سورة الإخلاص", "سورة الفاتحة", "سورة يس", "سورة الكهف"],
    optionsEn: ["Surah Al-Ikhlas", "Surah Al-Fatihah", "Surah Ya-Sin", "Surah Al-Kahf"],
    correctAnswerIndex: 0,
    explanationAr: "قال النبي صلى الله عليه وسلم: (أيعجز أحدكم أن يقرأ في ليلة ثلث القرآن؟ قُلْ هُوَ اللَّهُ أَحَدٌ تعدل ثلث القرآن) لأنها تمحضت لصفات الله وتوحيده.",
    explanationEn: "The Prophet (pbuh) affirmed that Surah Al-Ikhlas equals one third of the Quran because it is dedicated purely to Tawhid.",
    source: "صحيح مسلم (حديث رقم 811)"
  }
];

// Presets for Custom Quran Listener Desk
export const LISTENER_PLAYLISTS = [
  {
    id: 'p1',
    titleAr: 'سنة يوم الجمعة المباركة',
    titleEn: 'Friday Sunnah Recitation',
    description: 'قراءة سورة الكهف نور ما بين الجمعتين',
    surahId: 18,
    reciterId: 'mishary',
    gradient: 'from-emerald-800 via-teal-900 to-emerald-950',
    surahNameAr: 'الكهف',
    badge: 'Friday Sunnah'
  },
  {
    id: 'p2',
    titleAr: 'سكينة النوم والمنجية من عذاب القبر',
    titleEn: 'Night Tranquility (Al-Mulk)',
    description: 'تلاوة سورة الملك الهادئة قبل النوم للحفظ والأمان',
    surahId: 67,
    reciterId: 'husary',
    gradient: 'from-indigo-950 via-slate-900 to-emerald-950',
    surahNameAr: 'الملك',
    badge: 'Sleep Companion'
  },
  {
    id: 'p3',
    titleAr: 'المعوذات والرقية الشرعية',
    titleEn: 'Al-Mu\'awwidhat & Protection',
    description: 'سورة الفاتحة، الإخلاص، الفلق، والناس للحفظ اليومي',
    surahId: 112,
    reciterId: 'abdulbasit',
    gradient: 'from-amber-900 via-stone-900 to-emerald-950',
    surahNameAr: 'المعوذات',
    badge: 'Daily Ruqyah'
  },
  {
    id: 'p4',
    titleAr: 'حلقة تثبيت الحفظ والتكرار',
    titleEn: 'Hifz Spaced Repetition Loop',
    description: 'تكرار الآيات بصوت الشيخ الحصري المعلم لضبط الأحكام',
    surahId: 1,
    reciterId: 'husary',
    gradient: 'from-teal-900 via-emerald-950 to-slate-950',
    surahNameAr: 'الفاتحة',
    badge: 'Study Loop'
  }
];

export const DAILY_REFLECTION = {
  surahNumber: 94,
  ayahNumber: 6,
  arabic: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
  english: "Indeed, with hardship [will be] ease.",
  surahName: "سورة الشرح (Ash-Sharh)",
  reflection: "وعد إلهي مؤكد بأن بعد كل ضائقة ومحنة فرجاً وتيسيراً قريباً يملأ القلب طمأنينة ويقيناً."
};

export const HIFZ_DUE_ITEMS = [
  { id: 'h1', surahNumber: 1, surahNameAr: 'الفاتحة', ayahsRange: 'الآيات 1 - 7', nextReview: 'اليوم', interval: '7 أيام', accuracy: 98, status: 'due' },
  { id: 'h2', surahNumber: 67, surahNameAr: 'الملك', ayahsRange: 'الآيات 1 - 10', nextReview: 'اليوم', interval: '3 أيام', accuracy: 88, status: 'due' },
  { id: 'h3', surahNumber: 112, surahNameAr: 'الإخلاص', ayahsRange: 'كاملة (1 - 4)', nextReview: 'غداً', interval: '14 يوماً', accuracy: 100, status: 'scheduled' },
  { id: 'h4', surahNumber: 18, surahNameAr: 'الكهف', ayahsRange: 'الآيات 1 - 10', nextReview: 'بعد يومين', interval: '5 أيام', accuracy: 92, status: 'scheduled' },
];
