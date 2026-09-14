import React, { useState, useEffect } from 'react';
import { 
  User, Settings, Award, ShieldCheck, Download, Trash2, 
  CheckCircle2, Bell, Volume2, Book, Sparkles, Sliders, 
  RefreshCw, Save, Moon, Sun, Heart, Flame, Clock, Palette, Check
} from 'lucide-react';
import { RECITERS } from '../data/quranData';
import AvatarBadge, { ISLAMIC_AVATARS } from './AvatarBadge';
import { APP_THEMES } from './Header';

export default function ProfileSettings({
  userProfile,
  setUserProfile,
  appSettings,
  setAppSettings,
  theme,
  setTheme
}) {
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' or 'settings'
  const [saveMessage, setSaveMessage] = useState(null);

  const [formProfile, setFormProfile] = useState(userProfile);
  const [formSettings, setFormSettings] = useState(appSettings);



  const handleSave = () => {
    setUserProfile(formProfile);
    setAppSettings(formSettings);
    localStorage.setItem('aiquran_profile', JSON.stringify(formProfile));
    localStorage.setItem('aiquran_settings', JSON.stringify(formSettings));

    setSaveMessage('تم حفظ التعديلات بنجاح!');
    setTimeout(() => setSaveMessage(null), 2500);
  };

  const handleExportData = () => {
    const data = {
      profile: formProfile,
      settings: formSettings,
      bookmarks: localStorage.getItem('aiquran_bookmarks'),
      exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aiquran-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const handleResetData = () => {
    if (window.confirm('هل أنت متأكد من رغبتك في إعادة ضبط إعدادات الحساب؟ لن يتم حذف المصحف.')) {
      localStorage.removeItem('aiquran_profile');
      localStorage.removeItem('aiquran_settings');
      localStorage.removeItem('aiquran_bookmarks');
      window.location.reload();
    }
  };

  return (
    <div className="max-w-4xl mx-auto w-full px-4 lg:px-8 py-6 space-y-6" dir="rtl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200/80 dark:border-emerald-900/40">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 px-3 py-1 rounded-full text-xs font-bold font-arabic mb-2">
            <User size={14} className="text-emerald-600 dark:text-emerald-400" />
            <span>إدارة الحساب والتفضيلات</span>
            <span className="font-sans text-[10px]" dir="ltr">Profile & App Settings</span>
          </div>
          <h1 className="text-2xl font-bold font-arabic text-stone-900 dark:text-stone-100">
            الملف الشخصي وإعدادات المنصة
          </h1>
          <p className="text-xs text-stone-500 dark:text-stone-400 font-arabic mt-1">
            خصص خط المصحف المفضل لديك، أهدافك اليومية في الحفظ، القارئ المعتمد، والتنبيهات.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1.5 bg-stone-100 dark:bg-emerald-950/50 p-1.5 rounded-2xl">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded-xl text-xs font-bold font-arabic transition-all flex items-center gap-2 ${
              activeTab === 'profile' 
                ? 'bg-white dark:bg-[#14221E] text-emerald-800 dark:text-emerald-300 shadow-sm' 
                : 'text-stone-500 hover:text-stone-800 dark:text-stone-400'
            }`}
          >
            <User size={15} />
            <span>الملف الشخصي</span>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-xl text-xs font-bold font-arabic transition-all flex items-center gap-2 ${
              activeTab === 'settings' 
                ? 'bg-white dark:bg-[#14221E] text-emerald-800 dark:text-emerald-300 shadow-sm' 
                : 'text-stone-500 hover:text-stone-800 dark:text-stone-400'
            }`}
          >
            <Settings size={15} />
            <span>تفضيلات التطبيق</span>
          </button>
        </div>
      </div>

      {saveMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-arabic font-bold flex items-center gap-2 animate-fade-in">
          <CheckCircle2 size={18} className="text-emerald-600" />
          <span>{saveMessage}</span>
        </div>
      )}

      {activeTab === 'profile' ? (
        /* Profile Tab Content */
        <div className="space-y-6">
          
          {/* User Profile Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#121E1A] border border-stone-200/80 dark:border-emerald-900/40 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="relative">
              <AvatarBadge
                avatarId={formProfile.avatarId || 'initial'}
                name={formProfile.name}
                size="xxl"
              />
            </div>

            <div className="flex-1 space-y-3">
              <div>
                <span className="text-xs font-bold text-stone-700 dark:text-stone-300 font-arabic block mb-2">
                  اختر شارة الحساب الإسلامية
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {ISLAMIC_AVATARS.map((av) => (
                    <button
                      key={av.id}
                      onClick={() => setFormProfile({ ...formProfile, avatarId: av.id })}
                      className={`flex items-center gap-2 p-1.5 pr-2.5 rounded-2xl border transition-all ${
                        (formProfile.avatarId || 'initial') === av.id 
                          ? 'border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/70 shadow-sm ring-1 ring-emerald-400' 
                          : 'border-stone-200/80 dark:border-emerald-950/40 hover:bg-stone-50'
                      }`}
                    >
                      <AvatarBadge avatarId={av.id} name={formProfile.name} size="sm" />
                      <span className="text-[11px] font-arabic font-bold text-stone-700 dark:text-stone-200">
                        {av.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* User Information Form */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="p-5 rounded-3xl bg-white dark:bg-[#121E1A] border border-stone-200/80 dark:border-emerald-900/40 space-y-1.5">
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 font-arabic block">
                الاسم الكريم
              </label>
              <input
                type="text"
                value={formProfile.name}
                onChange={(e) => setFormProfile({ ...formProfile, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-2xl bg-stone-100 dark:bg-emerald-950/40 border border-stone-200/80 dark:border-emerald-900/40 text-stone-900 dark:text-stone-100 text-xs sm:text-sm font-arabic focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-[#121E1A] border border-stone-200/80 dark:border-emerald-900/40 space-y-1.5">
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 font-arabic block">
                المستوى الحالي في الحفظ
              </label>
              <select
                value={formProfile.level}
                onChange={(e) => setFormProfile({ ...formProfile, level: e.target.value })}
                className="w-full px-4 py-2.5 rounded-2xl bg-stone-100 dark:bg-emerald-950/40 border border-stone-200/80 dark:border-emerald-900/40 text-stone-900 dark:text-stone-100 text-xs sm:text-sm font-arabic focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="مبتدئ (جزء عم)">مبتدئ (جزء عم)</option>
                <option value="متوسط (5 أجزاء)">متوسط (5 أجزاء)</option>
                <option value="متقدم (15 جزءاً)">متقدم (15 جزءاً)</option>
                <option value="حافظ لكتاب الله كاملاً">حافظ لكتاب الله كاملاً</option>
              </select>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-[#121E1A] border border-stone-200/80 dark:border-emerald-900/40 space-y-1.5">
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 font-arabic block">
                الهدف اليومي للحفظ (آيات في اليوم)
              </label>
              <input
                type="number"
                min="1"
                max="50"
                value={formProfile.dailyAyahGoal}
                onChange={(e) => setFormProfile({ ...formProfile, dailyAyahGoal: Number(e.target.value) })}
                className="w-full px-4 py-2.5 rounded-2xl bg-stone-100 dark:bg-emerald-950/40 border border-stone-200/80 dark:border-emerald-900/40 text-stone-900 dark:text-stone-100 text-xs sm:text-sm font-sans focus:outline-none focus:ring-2 focus:ring-emerald-500"
                dir="ltr"
              />
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-[#121E1A] border border-stone-200/80 dark:border-emerald-900/40 space-y-1.5">
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 font-arabic block">
                نية الحفظ والهمة
              </label>
              <input
                type="text"
                value={formProfile.bio}
                onChange={(e) => setFormProfile({ ...formProfile, bio: e.target.value })}
                placeholder="حفظ وتدبر كتاب الله لابتغاء مرضاته..."
                className="w-full px-4 py-2.5 rounded-2xl bg-stone-100 dark:bg-emerald-950/40 border border-stone-200/80 dark:border-emerald-900/40 text-stone-900 dark:text-stone-100 text-xs sm:text-sm font-arabic focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

          </div>

          {/* Achievement Badges Showcase */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#121E1A] border border-stone-200/80 dark:border-emerald-900/40 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-emerald-950/50">
              <div className="flex items-center gap-2">
                <Award size={18} className="text-amber-500" />
                <h3 className="font-bold text-base font-arabic text-stone-900 dark:text-stone-100">
                  الأوسمة والإنجازات المحققة
                </h3>
              </div>
              <span className="text-xs font-bold text-emerald-600 font-sans" dir="ltr">4 / 6 Unlocked</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { title: 'فاتحة الكتاب', desc: 'حفظ وتثبيت سورة الفاتحة بنسبة 100%', icon: '📖', earned: true },
                { title: 'سفينة النجاة', desc: 'إتمام حفظ ومراجعة سورة الملك المنجية', icon: '👑', earned: true },
                { title: 'إتقان التجويد', desc: 'تطبيق أحكام القلقلة والمد بنجاح في معمل الصوت', icon: '🎙️', earned: true },
                { title: 'مواظبة 7 أيام', desc: 'مراجعة يومية متتالية بدون انقطاع', icon: '🔥', earned: true },
                { title: 'جزء عم كامل', desc: 'حفظ سور جزء عم الثلاثين بالكامل', icon: '🏆', earned: false },
                { title: 'حافظ القرآن', desc: 'ختم القرآن الكريم كاملاً حفظاً وتدبراً', icon: '🌟', earned: false }
              ].map((badge, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border text-center transition-all ${
                    badge.earned 
                      ? 'bg-amber-50/70 dark:bg-amber-950/30 border-amber-200/80 dark:border-amber-800/40 shadow-sm' 
                      : 'bg-stone-50 dark:bg-emerald-950/20 border-stone-200/50 dark:border-emerald-950/30 opacity-40 grayscale'
                  }`}
                >
                  <span className="text-3xl block mb-2">{badge.icon}</span>
                  <h4 className="font-bold text-xs font-arabic text-stone-900 dark:text-stone-100 mb-1">
                    {badge.title}
                  </h4>
                  <p className="text-[10px] text-stone-500 dark:text-stone-400 font-arabic leading-tight">
                    {badge.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      ) : (
        /* Settings Tab Content */
        <div className="space-y-6">
          
          {/* Audio Preferences */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#121E1A] border border-stone-200/80 dark:border-emerald-900/40 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-stone-100 dark:border-emerald-950/50">
              <Volume2 size={18} className="text-emerald-600" />
              <h3 className="font-bold text-base font-arabic text-stone-900 dark:text-stone-100">
                تفضيلات الصوت والتلاوة
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              
              <div className="space-y-1.5">
                <label className="font-bold text-stone-700 dark:text-stone-300 font-arabic block">
                  القارئ الافتراضي
                </label>
                <select
                  value={formSettings.defaultReciterId}
                  onChange={(e) => setFormSettings({ ...formSettings, defaultReciterId: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-100 dark:bg-emerald-950/40 border border-stone-200/80 dark:border-emerald-900/40 text-stone-900 dark:text-stone-100 font-arabic focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                >
                  {RECITERS.map(r => (
                    <option key={r.id} value={r.id} className="dark:bg-[#121E1A]">
                      {r.nameAr}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-stone-700 dark:text-stone-300 font-arabic block">
                  تكرار الآية تلقائياً (للمساعدة في الحفظ)
                </label>
                <select
                  value={formSettings.ayahRepeatCount}
                  onChange={(e) => setFormSettings({ ...formSettings, ayahRepeatCount: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-100 dark:bg-emerald-950/40 border border-stone-200/80 dark:border-emerald-900/40 text-stone-900 dark:text-stone-100 font-arabic focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                >
                  <option value={1}>مرة واحدة (بدون تكرار)</option>
                  <option value={3}>3 مرات متتالية</option>
                  <option value={5}>5 مرات متتالية</option>
                  <option value={10}>10 مرات (تثبيت قوي)</option>
                </select>
              </div>

            </div>

            <div className="flex items-center justify-between pt-3 border-t border-stone-100 dark:border-emerald-950/40">
              <div>
                <span className="font-bold text-xs text-stone-800 dark:text-stone-200 font-arabic block">
                  الانتقال التلقائي للآية التالية
                </span>
                <span className="text-[10px] text-stone-400 font-arabic">
                  تشغيل الآية التالية فور انتهاء تلاوة الآية الحالية
                </span>
              </div>
              <input
                type="checkbox"
                checked={formSettings.autoAdvance}
                onChange={(e) => setFormSettings({ ...formSettings, autoAdvance: e.target.checked })}
                className="w-5 h-5 rounded-lg text-emerald-600 focus:ring-emerald-500 cursor-pointer accent-emerald-600"
              />
            </div>
          </div>

          {/* Reading & Mushaf Font Preferences */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#121E1A] border border-stone-200/80 dark:border-emerald-900/40 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-stone-100 dark:border-emerald-950/50">
              <Book size={18} className="text-emerald-600" />
              <h3 className="font-bold text-base font-arabic text-stone-900 dark:text-stone-100">
                إعدادات خط المصحف والقراءة
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-stone-700 dark:text-stone-300 font-arabic block">
                  خط النص القرآني
                </label>
                <select
                  value={formSettings.mushafFont}
                  onChange={(e) => setFormSettings({ ...formSettings, mushafFont: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-100 dark:bg-emerald-950/40 border border-stone-200/80 dark:border-emerald-900/40 text-stone-900 dark:text-stone-100 font-arabic focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                >
                  <option value="Amiri">خط المصحف الأميري (Amiri Uthmani)</option>
                  <option value="Cairo">خط القاهرة الحديث (Cairo)</option>
                  <option value="Scheherazade New">خط شهرزاد النسخي (Scheherazade)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-stone-700 dark:text-stone-300 font-arabic block">
                  لغة الترجمة والتفسير المصاحب
                </label>
                <select
                  value={formSettings.translationLanguage}
                  onChange={(e) => setFormSettings({ ...formSettings, translationLanguage: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-100 dark:bg-emerald-950/40 border border-stone-200/80 dark:border-emerald-900/40 text-stone-900 dark:text-stone-100 font-arabic focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                >
                  <option value="en">الإنجليزية (Sahih International)</option>
                  <option value="fr">الفرنسية (Muhammad Hamidullah)</option>
                  <option value="ur">الأردية (Fateh Muhammad Jalandhry)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-stone-100 dark:border-emerald-950/40">
              <div>
                <span className="font-bold text-xs text-stone-800 dark:text-stone-200 font-arabic block">
                  تفعيل ألوان أحكام التجويد تلقائياً
                </span>
                <span className="text-[10px] text-stone-400 font-arabic">
                  إظهار علامات المد، القلقلة، الغنة، والإخفاء في كافة الآيات
                </span>
              </div>
              <input
                type="checkbox"
                checked={formSettings.showTajweedByDefault}
                onChange={(e) => setFormSettings({ ...formSettings, showTajweedByDefault: e.target.checked })}
                className="w-5 h-5 rounded-lg text-emerald-600 focus:ring-emerald-500 cursor-pointer accent-emerald-600"
              />
            </div>
          </div>

          {/* Theme & Visual Appearance Preferences */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#121E1A] border border-stone-200/80 dark:border-emerald-900/40 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-emerald-950/50">
              <div className="flex items-center gap-2">
                <Palette size={18} className="text-emerald-600" />
                <h3 className="font-bold text-base font-arabic text-stone-900 dark:text-stone-100">
                  مظهر التطبيق وألوان المصحف (5 أنماط)
                </h3>
              </div>
              <span className="text-xs text-stone-400 font-arabic">اختر الثيم المفضل</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {APP_THEMES.map((t) => {
                const TIcon = t.icon;
                const isSelected = theme === t.id;

                return (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    className={`p-3.5 rounded-2xl border text-right transition-all flex flex-col justify-between gap-3 group relative ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/50 shadow-md ring-2 ring-emerald-500/40'
                        : 'border-stone-200/80 dark:border-emerald-950/50 hover:bg-stone-50 dark:hover:bg-emerald-950/30'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center bg-stone-100 dark:bg-emerald-900/40 ${t.iconColor}`}>
                        <TIcon size={18} />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`w-3.5 h-3.5 rounded-full ${t.dotBg}`} />
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                            <Check size={12} />
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-xs font-arabic text-stone-900 dark:text-stone-100 mb-0.5">
                        {t.nameAr}
                      </h4>
                      <p className="text-[10px] text-stone-500 dark:text-stone-400 font-arabic leading-tight">
                        {t.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Data Export & Backup Actions */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#121E1A] border border-stone-200/80 dark:border-emerald-900/40 shadow-sm space-y-3">
            <h3 className="font-bold text-sm font-arabic text-stone-900 dark:text-stone-100 mb-1">
              النسخ الاحتياطي وإدارة البيانات
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 font-arabic">
              يمكنك تصدير إنجازاتك ونقاط حفظك كملف احترافي أو استعادته لاحقاً على أي جهاز آخر.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={handleExportData}
                className="px-4 py-2.5 rounded-2xl bg-stone-100 dark:bg-emerald-950 text-stone-700 dark:text-stone-200 text-xs font-bold font-arabic flex items-center gap-2 hover:bg-stone-200 transition-colors"
              >
                <Download size={15} />
                <span>تصدير نسخة احتياطية (JSON)</span>
              </button>

              <button
                onClick={handleResetData}
                className="px-4 py-2.5 rounded-2xl bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 text-xs font-bold font-arabic flex items-center gap-2 hover:bg-red-100 transition-colors"
              >
                <Trash2 size={15} />
                <span>إعادة ضبط البيانات</span>
              </button>
            </div>
          </div>

        </div>
      )}

      {/* Persistent Save Button */}
      <div className="pt-2">
        <button
          onClick={handleSave}
          className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold font-arabic text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/20 active:scale-98 transition-all"
        >
          <Save size={18} />
          <span>حفظ كافة التغييرات</span>
        </button>
      </div>

    </div>
  );
}
