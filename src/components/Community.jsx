import React, { useState } from 'react';
import {
  Trophy, Users, Star, Share2, Crown, Flame,
  Award, TrendingUp, CheckCircle2, ChevronLeft
} from 'lucide-react';

const LEADERBOARD = [
  { rank: 1, name: 'عبدالله الشمري', country: 'السعودية', score: 9850, streak: 42, badge: '🏆', surahs: 62, accuracy: 98, avatar: 'ع', color: 'from-amber-500 to-yellow-600' },
  { rank: 2, name: 'فاطمة المنصور', country: 'الإمارات', score: 8920, streak: 31, badge: '🥈', surahs: 55, accuracy: 97, avatar: 'ف', color: 'from-stone-400 to-stone-600' },
  { rank: 3, name: 'يوسف البكر', country: 'مصر', score: 8450, streak: 28, badge: '🥉', surahs: 48, accuracy: 95, avatar: 'ي', color: 'from-amber-700 to-orange-800' },
  { rank: 4, name: 'إبراهيم أحمد', country: 'الصومال', score: 7200, streak: 7, badge: '⭐', surahs: 14, accuracy: 94, avatar: 'إ', color: 'from-emerald-600 to-teal-700', isMe: true },
  { rank: 5, name: 'مريم الزهراني', country: 'السعودية', score: 6800, streak: 15, badge: '⭐', surahs: 22, accuracy: 93, avatar: 'م', color: 'from-violet-600 to-purple-700' },
  { rank: 6, name: 'أحمد الرشيد', country: 'الكويت', score: 5900, streak: 9, badge: '📖', surahs: 18, accuracy: 91, avatar: 'أ', color: 'from-blue-600 to-indigo-700' },
  { rank: 7, name: 'خديجة النور', country: 'السودان', score: 5200, streak: 5, badge: '📖', surahs: 12, accuracy: 89, avatar: 'خ', color: 'from-rose-600 to-pink-700' },
];

const CHALLENGES = [
  { id: 1, title: 'ختمة الأسبوع', descAr: 'اقرأ جزءاً كاملاً هذا الأسبوع', reward: '500 نقطة', progress: 65, icon: '📖', expiresIn: '3 أيام' },
  { id: 2, title: 'سبعة أيام متتالية', descAr: 'حافظ على تتابع 7 أيام من القراءة', reward: '1000 نقطة', progress: 100, icon: '🔥', expiresIn: 'مكتمل!', done: true },
  { id: 3, title: 'تحدي التجويد', descAr: 'سجّل 5 تلاوات بدقة %90+', reward: '750 نقطة', progress: 40, icon: '🎙️', expiresIn: '5 أيام' },
  { id: 4, title: 'حافظ الجزء', descAr: 'احفظ جزءاً جديداً كاملاً', reward: '2000 نقطة', progress: 20, icon: '🏆', expiresIn: 'مفتوح' },
];

const PERSONAL_BADGES = [
  { icon: '📖', name: 'قارئ منتظم', earned: true },
  { icon: '🏆', name: 'بطل المسابقات', earned: true },
  { icon: '🎯', name: 'دقة التجويد', earned: true },
  { icon: '🔥', name: 'أسبوع متتالي', earned: true },
  { icon: '⭐', name: 'حافظ جزء عم', earned: false },
  { icon: '🌙', name: 'قيام الليل', earned: false },
];

export default function Community() {
  const [activeTab, setActiveTab] = useState('leaderboard');
  const meData = LEADERBOARD.find(u => u.isMe);

  return (
    <div className="max-w-5xl mx-auto w-full px-4 lg:px-8 py-6 space-y-6" dir="rtl">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200/80 dark:border-emerald-900/40">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 px-3 py-1 rounded-full text-xs font-bold font-arabic mb-2">
            <Trophy size={14} />
            <span>المجتمع والتحديات</span>
            <span className="font-sans text-[10px]" dir="ltr">Community & Leaderboard</span>
          </div>
          <h1 className="text-2xl font-bold font-arabic text-stone-900 dark:text-stone-100">تحدّيات المجتمع والترتيب</h1>
          <p className="text-xs text-stone-500 dark:text-stone-400 font-arabic mt-1">
            تنافس مع إخوانك في حفظ كتاب الله وشاركهم إنجازاتك وتقدمك في الرحلة القرآنية.
          </p>
        </div>
      </div>

      {/* My Rank Card */}
      {meData && (
        <div className="bg-gradient-to-l from-emerald-800 via-teal-900 to-emerald-950 rounded-3xl p-5 sm:p-6 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${meData.color} flex items-center justify-center text-xl font-bold font-arabic shadow-lg`}>
              {meData.avatar}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-amber-300 text-lg">{meData.badge}</span>
                <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full font-arabic">أنت • الترتيب #{meData.rank}</span>
              </div>
              <p className="font-bold font-arabic text-base">{meData.name}</p>
              <p className="text-[10px] text-emerald-300/80 font-arabic">{meData.country}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { label: 'النقاط', value: meData.score.toLocaleString('ar') },
              { label: 'التتابع', value: `${meData.streak}🔥` },
              { label: 'الدقة', value: `${meData.accuracy}%` },
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-[10px] text-emerald-300/70 font-arabic">{stat.label}</p>
                <p className="font-bold font-sans text-base">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex gap-2 p-1 bg-stone-100 dark:bg-emerald-950/40 rounded-2xl">
        {[
          { id: 'leaderboard', label: 'قائمة الترتيب' },
          { id: 'challenges', label: 'التحديات الأسبوعية' },
          { id: 'badges', label: 'إنجازاتي' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold font-arabic transition-all ${
              activeTab === tab.id
                ? 'bg-white dark:bg-[#121E1A] text-stone-900 dark:text-stone-100 shadow-md'
                : 'text-stone-500 dark:text-stone-400 hover:text-stone-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Leaderboard Tab */}
      {activeTab === 'leaderboard' && (
        <div className="space-y-2">
          {LEADERBOARD.map(user => (
            <div
              key={user.rank}
              className={`bg-white dark:bg-[#121E1A] rounded-3xl p-4 border transition-all flex items-center gap-4 ${
                user.isMe
                  ? 'border-emerald-400 dark:border-emerald-600 ring-1 ring-emerald-400/30 shadow-md'
                  : 'border-stone-200/80 dark:border-emerald-900/40 shadow-sm'
              }`}
            >
              {/* Rank */}
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm font-sans shrink-0 ${
                user.rank === 1 ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300' :
                user.rank === 2 ? 'bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-400' :
                user.rank === 3 ? 'bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-400' :
                'bg-stone-50 text-stone-500 dark:bg-emerald-950/30 dark:text-stone-400'
              }`}>
                {user.rank <= 3 ? user.badge : `#${user.rank}`}
              </div>

              {/* Avatar */}
              <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${user.color} text-white flex items-center justify-center font-bold text-sm font-arabic shrink-0`}>
                {user.avatar}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-bold text-sm font-arabic text-stone-900 dark:text-stone-100 truncate">{user.name}</p>
                  {user.isMe && <span className="text-[9px] bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 px-1.5 py-0.5 rounded-full font-arabic shrink-0">أنت</span>}
                </div>
                <p className="text-[10px] text-stone-400 font-arabic">{user.country} • {user.surahs} سورة</p>
              </div>

              {/* Stats */}
              <div className="text-left shrink-0">
                <p className="text-base font-bold font-sans text-stone-900 dark:text-stone-100" dir="ltr">{user.score.toLocaleString()}</p>
                <div className="flex items-center gap-1 justify-end">
                  <Flame size={11} className="text-amber-500" />
                  <span className="text-[10px] text-stone-400 font-sans">{user.streak}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Challenges Tab */}
      {activeTab === 'challenges' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {CHALLENGES.map(challenge => (
            <div
              key={challenge.id}
              className={`bg-white dark:bg-[#121E1A] rounded-3xl p-5 border shadow-sm transition-all ${
                challenge.done
                  ? 'border-emerald-400 dark:border-emerald-600'
                  : 'border-stone-200/80 dark:border-emerald-900/40'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{challenge.icon}</span>
                  <div>
                    <h3 className="font-bold text-sm font-arabic text-stone-900 dark:text-stone-100">{challenge.title}</h3>
                    <p className="text-[10px] text-stone-400 font-arabic">{challenge.expiresIn}</p>
                  </div>
                </div>
                {challenge.done && <CheckCircle2 size={20} className="text-emerald-500 shrink-0" />}
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400 font-arabic mb-3">{challenge.descAr}</p>
              <div className="h-2 bg-stone-100 dark:bg-emerald-950/50 rounded-full overflow-hidden mb-2">
                <div
                  className={`h-full rounded-full transition-all ${challenge.done ? 'bg-emerald-500' : 'bg-gradient-to-l from-amber-500 to-orange-500'}`}
                  style={{ width: `${challenge.progress}%` }}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-stone-400 font-arabic">{challenge.progress}% مكتمل</span>
                <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 font-arabic">{challenge.reward}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Badges Tab */}
      {activeTab === 'badges' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {PERSONAL_BADGES.map((badge, i) => (
            <div
              key={i}
              className={`flex flex-col items-center gap-3 p-6 rounded-3xl border text-center transition-all ${
                badge.earned
                  ? 'border-amber-200 dark:border-amber-800/60 bg-amber-50 dark:bg-amber-950/30 shadow-sm'
                  : 'border-stone-200/80 dark:border-emerald-900/30 bg-stone-50 dark:bg-[#0E1715] opacity-50 grayscale'
              }`}
            >
              <span className="text-4xl">{badge.icon}</span>
              <p className="text-sm font-bold font-arabic text-stone-800 dark:text-stone-200">{badge.name}</p>
              {badge.earned
                ? <span className="text-[10px] text-emerald-600 font-arabic flex items-center gap-1"><CheckCircle2 size={11} /> تم الحصول عليها</span>
                : <span className="text-[10px] text-stone-400 font-arabic">لم تُكتسب بعد</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
