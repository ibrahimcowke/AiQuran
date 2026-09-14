import React from 'react';
import { Book, Moon, Sparkles, Award } from 'lucide-react';

export const ISLAMIC_AVATARS = [
  {
    id: 'initial',
    name: 'حرف البداية (إ)',
    type: 'letter',
    char: 'إ',
    bg: 'from-emerald-700 to-teal-800',
    ring: 'border-emerald-500',
    textColor: 'text-amber-300'
  },
  {
    id: 'quran',
    name: 'مصحف مذهب',
    type: 'icon',
    icon: Book,
    bg: 'from-teal-800 to-emerald-950',
    ring: 'border-teal-400',
    textColor: 'text-amber-300'
  },
  {
    id: 'crescent',
    name: 'هلال السكينة',
    type: 'icon',
    icon: Moon,
    bg: 'from-amber-700 to-amber-950',
    ring: 'border-amber-400',
    textColor: 'text-amber-200'
  },
  {
    id: 'star',
    name: 'نجم الهدى',
    type: 'icon',
    icon: Sparkles,
    bg: 'from-emerald-900 to-slate-950',
    ring: 'border-emerald-400',
    textColor: 'text-emerald-300'
  }
];

export default function AvatarBadge({ avatarId, name = 'إبراهيم', size = 'md', className = '' }) {
  const selected = ISLAMIC_AVATARS.find(a => a.id === avatarId) || ISLAMIC_AVATARS[0];
  const firstLetter = name ? name.trim().charAt(0) : 'إ';

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-20 h-20 text-2xl',
    xxl: 'w-24 h-24 text-3xl'
  };

  const chosenSize = sizeClasses[size] || sizeClasses.md;

  return (
    <div 
      className={`
        ${chosenSize} rounded-full bg-gradient-to-tr ${selected.bg} 
        border-2 ${selected.ring} shadow-md shadow-black/10
        flex items-center justify-center select-none shrink-0 ${className}
      `}
    >
      {selected.type === 'letter' ? (
        <span className={`font-arabic font-bold ${selected.textColor} leading-none drop-shadow`}>
          {firstLetter}
        </span>
      ) : (
        <selected.icon size={size === 'xxl' ? 36 : size === 'xl' ? 28 : 18} className={selected.textColor} />
      )}
    </div>
  );
}
