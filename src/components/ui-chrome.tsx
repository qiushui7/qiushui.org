'use client';

import { createContext, use, useMemo, useState } from 'react';

export interface UiChromeContextValue {
  isFullScreenMenuOpen: boolean,
  setIsFullScreenMenuOpen: (isOpen: boolean) => void
}

const UiChromeContext = createContext<UiChromeContextValue | null>(null);

export function useUiChrome() {
  const ctx = use(UiChromeContext);
  if (!ctx) {
    throw new Error('useUiChrome must be used within <UiChromeProvider />');
  }
  return ctx;
}

export function UiChromeProvider({ children }: { children: React.ReactNode }) {
  const [isFullScreenMenuOpen, setIsFullScreenMenuOpen] = useState(false);

  const value = useMemo(
    () => ({ isFullScreenMenuOpen, setIsFullScreenMenuOpen }),
    [isFullScreenMenuOpen]
  );

  return (
    <UiChromeContext value={value}>
      {children}
    </UiChromeContext>
  );
}
