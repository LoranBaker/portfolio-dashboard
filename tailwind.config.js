/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      maxWidth: {
        '8xl': '88rem',
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
        'slide-down': 'slide-down 1s ease-out forwards',
        'fade-in-left': 'fade-in-left 0.8s ease-out forwards',
        'fade-in-right': 'fade-in-right 0.8s ease-out forwards',
        'float-1': 'float-1 6s ease-in-out infinite',
        'float-2': 'float-2 8s ease-in-out infinite',
        'float-3': 'float-3 10s ease-in-out infinite',
      },
      keyframes: {
        'fade-in-up': {
          'from': {
            opacity: '0',
            transform: 'translateY(30px)'
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'slide-down': {
          'from': {
            opacity: '0',
            transform: 'translateY(-50px)'
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'fade-in-left': {
          'from': {
            opacity: '0',
            transform: 'translateX(-50px)'
          },
          'to': {
            opacity: '1',
            transform: 'translateX(0)'
          }
        },
        'fade-in-right': {
          'from': {
            opacity: '0',
            transform: 'translateX(50px)'
          },
          'to': {
            opacity: '1',
            transform: 'translateX(0)'
          }
        },
        'float-1': {
          '0%, 100%': { transform: 'translate(20px, 20px) scale(1)' },
          '50%': { transform: 'translate(40px, 10px) scale(1.1)' }
        },
        'float-2': {
          '0%, 100%': { transform: 'translate(80px, 60px) scale(1)' },
          '50%': { transform: 'translate(60px, 40px) scale(0.9)' }
        },
        'float-3': {
          '0%, 100%': { transform: 'translate(120px, 30px) scale(1)' },
          '50%': { transform: 'translate(140px, 50px) scale(1.2)' }
        }
      }
    },
  },
  plugins: [],
}