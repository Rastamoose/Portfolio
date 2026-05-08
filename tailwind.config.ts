import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background:      '#0E0E0E',
        elevated:        '#171717',
        primary:         '#E4E4E7',
        secondary:       '#A1A1AA',
        muted:           '#71717A',
        accent:          '#349c5a',
        'accent-dim':    '#1e5e36',
        border:          '#262626',
        'border-strong': '#383838',
      },
      fontFamily: {
        sans: ['var(--font-jetbrains)', 'monospace'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      fontSize: {
        xs:   ['10px', { lineHeight: '1.6' }],
        sm:   ['11.5px', { lineHeight: '1.75' }],
        base: ['11.5px', { lineHeight: '1.75' }],
      },
    },
  },
  plugins: [],
}

export default config
