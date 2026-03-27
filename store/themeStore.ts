// =============================================================
// Theme Store — Zustand persist 미들웨어 기반
// =============================================================

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Theme } from "@/types/theme";

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: "amber",
      setTheme: (theme: Theme) => {
        set({ theme });
      },
    }),
    { name: "portfolio-theme" },
  ),
);
