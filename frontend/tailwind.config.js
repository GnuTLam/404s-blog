/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      spacing: {
        '50': '12.5rem',  // 200px
        '60': '15rem',    // 240px
        '72': '18rem',    // 288px
      },
      width: {
        '50': '12.5rem',  // 200px
        '60': '15rem',    // 240px
        '72': '18rem',    // 288px
      },
      colors: {
        cyber: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        dark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        light: {
          50: '#faf9f7',          // Warm off-white background
          100: '#f5f4f1',         // Soft cream background  
          200: '#ede9e3',         // Light warm borders
          300: '#e2ddd4',         // Subtle warm borders
          400: '#adb5bd',         // Placeholder text - improved contrast
          500: '#495057',         // Secondary text - improved contrast
          600: '#343a40',         // Primary secondary text - improved contrast  
          700: '#2c3034',         // Primary text - improved contrast
          800: '#1a1d20',         // High contrast text - improved contrast
          900: '#000000',         // Pure black for maximum contrast
          950: '#fdfdfc',         // Soft white instead of pure white
        }
      },
      fontFamily: {
        'cyber': ['Orbitron', 'monospace'],
        'tech': ['Rajdhani', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
        'code': ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      animation: {
        'pulse-soft': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      lineClamp: {
        4: '4',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          'from': { 
            'box-shadow': '0 0 20px #0ea5e944, 0 0 30px #0ea5e922, 0 0 40px #0ea5e911' 
          },
          'to': { 
            'box-shadow': '0 0 30px #0ea5e966, 0 0 40px #0ea5e944, 0 0 50px #0ea5e922' 
          },
        }
      },
    },
  },
  plugins: [],
} 