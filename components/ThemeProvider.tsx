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

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Always starts at "dark" to match the server-rendered markup (<html
  // data-theme="dark"> in layout.tsx) — the pre-paint script already
  // flips the DOM attribute for CSS purposes before this ever runs, but
  // React's first client render must still agree with what was sent
  // down from the server or hydration fails. Once mounted, we read the
  // real value and correct state in an effect (a normal post-hydration
  // update, not a mismatch).
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    const t = document.documentElement.dataset.theme;
    if (t === "light" || t === "dark") setThemeState(t);
  }, []);

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
