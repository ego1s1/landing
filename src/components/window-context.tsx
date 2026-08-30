"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

export interface WindowState {
  isMinimized: boolean;
  isClosed: boolean;
}

interface WindowMeta {
  title: string;
  shortTitle: string;
  icon?: string;
}

interface WindowContextType {
  windows: Record<string, WindowState>;
  metaMap: Record<string, WindowMeta>;
  registerWindow: (id: string, meta: WindowMeta) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  restoreAll: () => void;
}

const WindowContext = createContext<WindowContextType | null>(null);

export function WindowProvider({ children }: { children: React.ReactNode }) {
  const [windows, setWindows] = useState<Record<string, WindowState>>({});
  const [metaMap, setMetaMap] = useState<Record<string, WindowMeta>>({});

  const registerWindow = useCallback((id: string, meta: WindowMeta) => {
    setMetaMap((prev) => {
      if (prev[id]) return prev;
      return { ...prev, [id]: meta };
    });
    setWindows((prev) => {
      if (prev[id]) return prev;
      return { ...prev, [id]: { isMinimized: false, isClosed: false } };
    });
  }, []);

  const closeWindow = useCallback((id: string) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...(prev[id] || { isMinimized: false }), isClosed: true },
    }));
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...(prev[id] || { isClosed: false }),
        isMinimized: !prev[id]?.isMinimized,
      },
    }));
  }, []);

  const restoreWindow = useCallback((id: string) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { isMinimized: false, isClosed: false },
    }));
  }, []);

  const restoreAll = useCallback(() => {
    setWindows((prev) => {
      const next: Record<string, WindowState> = {};
      Object.keys(prev).forEach((key) => {
        next[key] = { isMinimized: false, isClosed: false };
      });
      return next;
    });
  }, []);

  return (
    <WindowContext.Provider
      value={{
        windows,
        metaMap,
        registerWindow,
        closeWindow,
        minimizeWindow,
        restoreWindow,
        restoreAll,
      }}
    >
      {children}
    </WindowContext.Provider>
  );
}

export function useWindowContext() {
  const ctx = useContext(WindowContext);
  if (!ctx) {
    throw new Error("useWindowContext must be used within WindowProvider");
  }
  return ctx;
}
