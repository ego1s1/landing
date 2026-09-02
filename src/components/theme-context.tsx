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
  const [theme, setTheme] = useState<Theme>(() => {
    // Read from inline script's dataset first (set before hydration), then cookie, then localStorage
    // Ensures first React render matches already-painted wallpaper/colors (no flash) and SSR cookie
    if (typeof document !== "undefined") {
      try {
        const themedId = document.documentElement.dataset.theme;
        if (themedId) {
          const found = THEMES.find((t) => t.id === themedId);
          if (found) return found;
        }
        // Cookie fallback (for SSR case where dataset not yet set on first render)
        const cookieMatch = document.cookie.match(new RegExp("(?:^|; )" + STORAGE_KEY + "=([^;]*)"));
        if (cookieMatch) {
          const decoded = decodeURIComponent(cookieMatch[1]);
          const found = THEMES.find((t) => t.id === decoded);
          if (found) return found;
        }
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const found = THEMES.find((t) => t.id === saved);
          if (found) return found;
        }
      } catch {}
    }
    return THEMES.find((t) => t.id === DEFAULT_THEME_ID) ?? THEMES[0];
  });

  // On mount, ensure persisted theme is applied and heal cookie if missing
  useEffect(() => {
    try {
      // Prefer dataset (from inline script / SSR cookie), then cookie, then localStorage
      const themedId = document.documentElement.dataset.theme;
      const cookieMatch = document.cookie.match(new RegExp("(?:^|; )" + STORAGE_KEY + "=([^;]*)"));
      const cookieVal = cookieMatch ? decodeURIComponent(cookieMatch[1]) : null;
      const saved = localStorage.getItem(STORAGE_KEY);
      const candidate = themedId || cookieVal || saved;
      if (candidate) {
        const found = THEMES.find((t) => t.id === candidate);
        if (found && found.id !== theme.id) {
          setTheme(found);
          applyThemeVars(found.colors);
        } else {
          applyThemeVars(theme.colors);
        }
        // Heal cookie if missing but localStorage has it
        if (saved && !cookieVal) {
          document.cookie = `${STORAGE_KEY}=${encodeURIComponent(saved)}; path=/; max-age=31536000; SameSite=Lax`;
        }
        // Ensure dataset matches
        if (found) {
          document.documentElement.dataset.theme = found.id;
          document.documentElement.dataset.wallpaper = found.wallpaper || "";
        }
        return;
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
        try {
          document.cookie = `${STORAGE_KEY}=${encodeURIComponent(e.newValue)}; path=/; max-age=31536000; SameSite=Lax`;
          document.documentElement.dataset.theme = e.newValue;
          document.documentElement.dataset.wallpaper = found.wallpaper || "";
        } catch {}
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
      document.documentElement.dataset.theme = id;
      document.documentElement.dataset.wallpaper = found.wallpaper || "";
      // Cookie for SSR — so next request's server renders correct theme without flash
      document.cookie = `${STORAGE_KEY}=${encodeURIComponent(id)}; path=/; max-age=31536000; SameSite=Lax`;
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
