import React from 'react';
import { BookOpen, Book, Headphones, Award, User } from 'lucide-react';

export default function BottomNav({ currentView, setView }) {
  const tabs = [
    { id: 'dashboard', labelAr: 'الرئيسية', icon: BookOpen },
    { id: 'mushaf', labelAr: 'المصحف', icon: Book },
    { id: 'listener', labelAr: 'استماع', icon: Headphones },
    { id: 'hifz', labelAr: 'الحفظ', icon: Award },
    { id: 'profile', labelAr: 'حسابي', icon: User },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-[#0D1513]/95 backdrop-blur-2xl border-t border-stone-200/80 dark:border-emerald-900/40 px-2 py-2 flex items-center justify-around shadow-2xl" dir="rtl">
      {tabs.map(tab => {
        const isActive = currentView === tab.id;
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => setView(tab.id)}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all ${
              isActive 
                ? 'text-emerald-700 dark:text-emerald-300 font-bold scale-105' 
                : 'text-stone-400 dark:text-stone-400 hover:text-stone-600'
            }`}
          >
            <Icon size={20} className={isActive ? 'stroke-[2.5]' : 'stroke-2'} />
            <span className="text-[10px] font-arabic leading-none">{tab.labelAr}</span>
          </button>
        );
      })}
    </div>
  );
}
