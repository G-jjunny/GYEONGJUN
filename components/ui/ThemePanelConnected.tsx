"use client";

// =============================================================
// ThemePanelConnected — FloatingThemePanel + themeStore 연결
// frontend-logic-agent 담당: store 연결 로직
// =============================================================

import { useThemeStore } from "@/store/themeStore";
import { useIntroStore } from "@/store/introStore";
import { useModalStore } from "@/store/modalStore";
import FloatingThemePanel from "./FloatingThemePanel";

export default function ThemePanelConnected() {
  const theme = useThemeStore((s) => s.theme);
  const setTheme = useThemeStore((s) => s.setTheme);
  const replay = useIntroStore((s) => s.replay);
  const lightboxOpen = useModalStore((s) => s.lightboxOpen);

  // 라이트박스가 열려있으면 테마 패널을 숨겨서 UI 충돌 방지
  if (lightboxOpen) return null;

  return (
    <FloatingThemePanel
      theme={theme}
      setTheme={setTheme}
      onReplayIntro={replay}
    />
  );
}
