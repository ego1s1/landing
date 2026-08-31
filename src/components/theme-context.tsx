"use client";

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import { SITE_CONFIG } from "@/lib/site";
import { THEMES, DEFAULT_THEME_ID, type Theme, type ThemeColors } from "@/lib/themes";

// Re-export for consumers that previously imported from here
export { THEMES, DEFAULT_THEME_ID };
export type { Theme, ThemeColors };

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

interface ThemeContextType {
  theme: Theme;
  setThemeById: (id: string) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

const STORAGE_KEY = SITE_CONFIG.themeStorageKey;

/** Apply CSS custom properties to <html> for fluid transitions */
function applyThemeVars(colors: ThemeColors) {
  const root = document.documentElement;
  root.style.setProperty("--th-bg", colors.background);
  root.style.setProperty("--th-surface", colors.surface);
  root.style.setProperty("--th-surface-alt", colors.surfaceAlt);
  root.style.setProperty("--th-border", colors.border);
  root.style.setProperty("--th-border-subtle", colors.borderSubtle);
  root.style.setProperty("--th-text", colors.text);
  root.style.setProperty("--th-text-muted", colors.textMuted);
  root.style.setProperty("--th-text-dim", colors.textDim);
  root.style.setProperty("--th-accent", colors.accent);
  root.style.setProperty("--th-cyan", colors.accentCyan);
  root.style.setProperty("--th-purple", colors.accentPurple);
  root.style.setProperty("--th-green", colors.accentGreen);
  root.style.setProperty("--th-yellow", colors.accentYellow);
  root.style.setProperty("--th-red", colors.accentRed);
  root.style.setProperty("--th-dot", colors.dotGrid);
  root.style.setProperty("--th-shadow", colors.shadow);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(
    () => THEMES.find((t) => t.id === DEFAULT_THEME_ID) ?? THEMES[0]
  );

  // On mount, load persisted theme with error handling for private mode / quota
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const found = THEMES.find((t) => t.id === saved);
        if (found) {
          setTheme(found);
          applyThemeVars(found.colors);
          return;
        }
      }
      applyThemeVars(theme.colors);
    } catch {
      // SecurityError in private mode or quota — fall back to default without crashing
      applyThemeVars(theme.colors);
    }
    // Sync across tabs
    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY || !e.newValue) return;
      const found = THEMES.find((t) => t.id === e.newValue);
      if (found) {
        setTheme(found);
        applyThemeVars(found.colors);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setThemeById = useCallback((id: string) => {
    const found = THEMES.find((t) => t.id === id);
    if (!found) return;
    setTheme(found);
    applyThemeVars(found.colors);
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch {
      // QuotaExceededError or SecurityError — ignore, theme still applies for session
    }
  }, []);

  const value = useMemo(() => ({ theme, setThemeById }), [theme, setThemeById]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
