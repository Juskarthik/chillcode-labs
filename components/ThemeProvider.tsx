"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type Theme = "dark" | "light";

type ThemeCtx = {
  theme: Theme;
  toggle: () => void;
  setTheme: (t: Theme) => void;
};

const Context = createContext<ThemeCtx | null>(null);

/** Reads the theme the pre-paint script already committed to <html>. */
function readInitialTheme(): Theme {
  if (typeof document !== "undefined") {
    const t = document.documentElement.dataset.theme;
    if (t === "light" || t === "dark") return t;
  }
  return "dark";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // initialised from the DOM on the client so the first render matches
  // what the no-FOUC script set; falls back to dark during SSR.
  const [theme, setThemeState] = useState<Theme>(readInitialTheme);

  // keep <html> + storage in sync whenever the theme changes
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* storage may be unavailable; ignore */
    }
  }, [theme]);

  const setTheme = useCallback((t: Theme) => setThemeState(t), []);
  const toggle = useCallback(
    () => setThemeState((t) => (t === "dark" ? "light" : "dark")),
    []
  );

  return (
    <Context.Provider value={{ theme, toggle, setTheme }}>
      {children}
    </Context.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(Context);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

/**
 * Runs before paint to set data-theme from storage / system preference,
 * preventing a flash of the wrong theme. Injected as a raw <script>.
 */
export const themeInitScript = `
(function(){
  try {
    var t = localStorage.getItem('theme');
    if (t !== 'light' && t !== 'dark') {
      t = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    document.documentElement.dataset.theme = t;
  } catch (e) {
    document.documentElement.dataset.theme = 'dark';
  }
})();
`;
