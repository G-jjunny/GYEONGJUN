// =============================================================
// ThemeProvider — SSR mismatch 방지 + 초기 DOM 동기화
// =============================================================

"use client";

import { useEffect, useState } from "react";
import { useThemeStore } from "@/store/themeStore";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const theme = useThemeStore((s) => s.theme);

  useEffect(() => {
    setMounted(true);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // 마운트 전에는 children을 그대로 렌더 (레이아웃 시프트 없음)
  if (!mounted) return <>{children}</>;

  return <>{children}</>;
}
