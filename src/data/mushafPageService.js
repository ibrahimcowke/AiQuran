import { SURAHS_INDEX, SURAH_DETAILS } from './quranData';

// Canonical mapping of all 114 Surahs to their starting page in the standard 604-page Medina Mushaf
export const SURAH_START_PAGES = {
  1: 1, 2: 2, 3: 50, 4: 77, 5: 106, 6: 128, 7: 151, 8: 177, 9: 187, 10: 208,
  11: 221, 12: 235, 13: 249, 14: 255, 15: 262, 16: 267, 17: 282, 18: 293, 19: 305, 20: 312,
  21: 322, 22: 332, 23: 342, 24: 350, 25: 359, 26: 367, 27: 377, 28: 385, 29: 396, 30: 404,
  31: 411, 32: 415, 33: 418, 34: 428, 35: 434, 36: 440, 37: 446, 38: 453, 39: 458, 40: 467,
  41: 477, 42: 483, 43: 489, 44: 496, 45: 499, 46: 502, 47: 507, 48: 511, 49: 515, 50: 518,
  51: 520, 52: 523, 53: 526, 54: 528, 55: 531, 56: 534, 57: 537, 58: 542, 59: 545, 60: 549,
  61: 551, 62: 553, 63: 554, 64: 556, 65: 558, 66: 560, 67: 562, 68: 564, 69: 566, 70: 568,
  71: 570, 72: 572, 73: 574, 74: 575, 75: 577, 76: 578, 77: 580, 78: 582, 79: 583, 80: 585,
  81: 586, 82: 587, 83: 587, 84: 589, 85: 590, 86: 591, 87: 591, 88: 592, 89: 593, 90: 594,
  91: 595, 92: 595, 93: 596, 94: 596, 95: 597, 96: 597, 97: 598, 98: 598, 99: 599, 100: 599,
  101: 600, 102: 600, 103: 601, 104: 601, 105: 601, 106: 602, 107: 602, 108: 602, 109: 603, 110: 603,
  111: 603, 112: 604, 113: 604, 114: 604
};

// Memory cache for pages 1 - 604
const pageCache = {};

// CDN for high-resolution Medina Mushaf page plates (King Fahd Complex layout)
export const getMushafPageImageUrl = (pageNumber) => {
  const p = Math.max(1, Math.min(604, Number(pageNumber) || 1));
  const padded = String(p).padStart(3, '0');
  return `https://files.quran.app/hafs/madani/width_1260/page${padded}.png`;
};

// Preload adjacent page images to ensure instant, zero-lag page flips
export const preloadAdjacentPageImages = (pageNumber) => {
  const p = Math.max(1, Math.min(604, Number(pageNumber) || 1));
  if (typeof window !== 'undefined' && window.Image) {
    if (p < 604) {
      const nextImg = new Image();
      nextImg.src = getMushafPageImageUrl(p + 1);
    }
    if (p > 1) {
      const prevImg = new Image();
      prevImg.src = getMushafPageImageUrl(p - 1);
    }
    if (p + 2 <= 604) {
      const next2Img = new Image();
      next2Img.src = getMushafPageImageUrl(p + 2);
    }
  }
};

export const fetchMushafPage = async (pageNumber) => {
  const page = Math.max(1, Math.min(604, Number(pageNumber) || 1));

  // Trigger background image preloading for smooth page turning
  preloadAdjacentPageImages(page);

  if (pageCache[page]) {
    return pageCache[page];
  }

  try {
    const res = await fetch(`https://api.alquran.cloud/v1/page/${page}/quran-uthmani`);
    const json = await res.json();

    if (json.code === 200 && json.data && json.data.ayahs) {
      const pageData = {
        pageNumber: page,
        ayahs: json.data.ayahs.map(a => ({
          number: a.number,
          numberInSurah: a.numberInSurah,
          arabic: a.text,
          surahNumber: a.surah.number,
          surahName: a.surah.name.replace('سُورَةُ ', ''),
          surahEnglishName: a.surah.englishName,
          revelationType: a.surah.revelationType,
          numberOfAyahs: a.surah.numberOfAyahs,
          juz: a.juz,
          hizbQuarter: a.hizbQuarter
        })),
        surahs: json.data.surahs || {}
      };

      pageCache[page] = pageData;

      // Pre-fetch next and prev pages in background for instant page flipping
      if (page < 604 && !pageCache[page + 1]) {
        fetch(`https://api.alquran.cloud/v1/page/${page + 1}/quran-uthmani`)
          .then(r => r.json())
          .then(nextJson => {
            if (nextJson.code === 200 && nextJson.data) {
              pageCache[page + 1] = {
                pageNumber: page + 1,
                ayahs: nextJson.data.ayahs.map(a => ({
                  number: a.number,
                  numberInSurah: a.numberInSurah,
                  arabic: a.text,
                  surahNumber: a.surah.number,
                  surahName: a.surah.name.replace('سُورَةُ ', ''),
                  surahEnglishName: a.surah.englishName,
                  revelationType: a.surah.revelationType,
                  numberOfAyahs: a.surah.numberOfAyahs,
                  juz: a.juz,
                  hizbQuarter: a.hizbQuarter
                })),
                surahs: nextJson.data.surahs || {}
              };
            }
          }).catch(() => {});
      }

      return pageData;
    }
  } catch (err) {
    console.warn(`Failed to fetch page ${page}:`, err);
  }

  // Resilient offline fallback: never leave the user with an empty page
  let surahNum = 1;
  for (let s = 114; s >= 1; s--) {
    if (SURAH_START_PAGES[s] && page >= SURAH_START_PAGES[s]) {
      surahNum = s;
      break;
    }
  }

  const meta = SURAHS_INDEX.find(s => s.number === surahNum) || SURAHS_INDEX[0];
  const detail = SURAH_DETAILS[surahNum] || {
    number: surahNum,
    arabic: meta.arabic,
    english: meta.english,
    revelationType: meta.type === 'مكية' ? 'Meccan' : 'Medinan',
    numberOfAyahs: meta.ayahs,
    ayahs: [
      { id: 1, numberInSurah: 1, arabic: 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ', english: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.' }
    ]
  };

  const fallbackPageData = {
    pageNumber: page,
    ayahs: (detail.ayahs || []).slice(0, 15).map(a => ({
      number: a.id || a.numberInSurah,
      numberInSurah: a.numberInSurah || a.id,
      arabic: a.arabic,
      surahNumber: surahNum,
      surahName: meta.arabic,
      surahEnglishName: meta.english,
      revelationType: meta.type === 'مكية' ? 'Meccan' : 'Medinan',
      numberOfAyahs: meta.ayahs,
      juz: meta.juz || 1,
      hizbQuarter: 1
    })),
    surahs: { [surahNum]: { number: surahNum, name: meta.arabic, englishName: meta.english } }
  };

  return fallbackPageData;
};
