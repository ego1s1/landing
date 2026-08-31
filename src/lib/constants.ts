/**
 * Centralized constants — avoids magic numbers scattered across components
 */

// Nvim gutters — filler lines to show `~` beyond EOF (old-school vim)
export const NVIM_FILLER_MIN_LINES = 10;

// GitHub contributions cache
export const GH_CACHE_TTL_MS = 1000 * 60 * 60 * 6; // 6 hours
export const GH_CACHE_STALE_MS = 1000 * 60 * 60; // 1 hour — revalidate in background
export const GH_CONTRIB_WEEKS = 52; // full year view — scrollable

// Window management
export const WINDOW_MAX_CLOSED = 20; // cap dock DoS
export const WINDOW_ID_REGEX = /^[a-z0-9-]+$/;
