'use client';

// =============================================================
// ThemePanelConnected — FloatingThemePanel + themeStore 연결
// frontend-logic-agent 담당: store 연결 로직
// =============================================================

import { useThemeStore } from '@/store/themeStore';
import { useIntroStore } from '@/store/introStore';
import FloatingThemePanel from './FloatingThemePanel';

export default function ThemePanelConnected() {
  const theme = useThemeStore((s) => s.theme);
  const setTheme = useThemeStore((s) => s.setTheme);
  const replay = useIntroStore((s) => s.replay);

  return (
    <FloatingThemePanel
      theme={theme}
      setTheme={setTheme}
      onReplayIntro={replay}
    />
  );
}
