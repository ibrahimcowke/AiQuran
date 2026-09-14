/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class', '[data-theme="dark"]', '[data-theme="midnight"]'],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        arabic: ['Amiri', 'Cairo', 'Scheherazade New', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Theme-aware semantic tokens – all driven by CSS variables
        't-bg':       'var(--t-bg)',
        't-surface':  'var(--t-surface)',
        't-surface2': 'var(--t-surface2)',
        't-border':   'var(--t-border)',
        't-text':     'var(--t-text)',
        't-text2':    'var(--t-text2)',
        't-muted':    'var(--t-muted)',
        't-accent':   'var(--t-accent)',
        't-accent2':  'var(--t-accent2)',
        't-gold':     'var(--t-gold)',
        't-nav-active-from': 'var(--t-nav-active-from)',
        't-nav-active-to':   'var(--t-nav-active-to)',
        't-ring':     'var(--t-ring)',
        't-header':   'var(--t-header)',
        't-sidebar':  'var(--t-sidebar)',
        't-input':    'var(--t-input)',
        't-btn':      'var(--t-btn)',
        't-btn-text': 'var(--t-btn-text)',
        't-card':     'var(--t-card)',
        't-progress': 'var(--t-progress)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        themePop: {
          '0%':   { transform: 'scale(0.95)', opacity: '0.7' },
          '60%':  { transform: 'scale(1.03)' },
          '100%': { transform: 'scale(1)',    opacity: '1' },
        },
      },
      animation: {
        'fade-in':   'fadeIn 0.35s ease-out forwards',
        'theme-pop': 'themePop 0.4s ease-out forwards',
      },
      backgroundImage: {
        't-gradient': 'var(--t-gradient)',
      },
    },
  },
  plugins: [],
}
