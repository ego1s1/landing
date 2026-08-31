/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        'nerd': ['JetBrainsMono Nerd Font', 'monospace'],
      },
      colors: {
        // shadcn aliases — now point to unified --th-* vars (theme-aware)
        border: "var(--th-border)",
        input: "var(--th-border-subtle)",
        ring: "var(--th-accent)",
        background: "var(--th-bg)",
        foreground: "var(--th-text)",
        primary: {
          DEFAULT: "var(--th-accent)",
          foreground: "var(--th-bg)",
        },
        secondary: {
          DEFAULT: "var(--th-surface-alt)",
          foreground: "var(--th-text-muted)",
        },
        destructive: {
          DEFAULT: "var(--th-red)",
          foreground: "var(--th-bg)",
        },
        muted: {
          DEFAULT: "var(--th-surface-alt)",
          foreground: "var(--th-text-dim)",
        },
        accent: {
          DEFAULT: "var(--th-cyan)",
          foreground: "var(--th-bg)",
        },
        popover: {
          DEFAULT: "var(--th-surface)",
          foreground: "var(--th-text)",
        },
        card: {
          DEFAULT: "var(--th-surface)",
          foreground: "var(--th-text)",
        },
        // Direct theme tokens for arbitrary usage: bg-th-bg, text-th-accent, etc.
        th: {
          bg: "var(--th-bg)",
          surface: "var(--th-surface)",
          "surface-alt": "var(--th-surface-alt)",
          border: "var(--th-border)",
          "border-subtle": "var(--th-border-subtle)",
          text: "var(--th-text)",
          "text-muted": "var(--th-text-muted)",
          "text-dim": "var(--th-text-dim)",
          accent: "var(--th-accent)",
          cyan: "var(--th-cyan)",
          purple: "var(--th-purple)",
          green: "var(--th-green)",
          yellow: "var(--th-yellow)",
          red: "var(--th-red)",
          dot: "var(--th-dot)",
          shadow: "var(--th-shadow)",
        },
      },
      screens: {
        'xs': '475px',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} 
