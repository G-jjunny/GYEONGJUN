"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { THEMES, THEME_COLORS, type Theme } from "@/types/theme";
import PaletteIcon from "@/components/icons/PaletteIcon";
import CheckIcon from "@/components/icons/CheckIcon";
import PlayIcon from "@/components/icons/PlayIcon";
import { springPress } from "@/lib/motion";

// =============================================================
// FloatingThemePanel — 화면 우측 중앙 고정 테마 전환 패널
// 마크업 + 스타일 + 애니메이션 담당
// store 연결은 ThemePanelConnected가 별도로 수행
// =============================================================

interface FloatingThemePanelProps {
  /** 현재 선택된 테마 (store에서 전달) */
  theme: Theme;
  /** 테마 변경 핸들러 (store에서 전달) */
  setTheme: (theme: Theme) => void;
  /** 인트로 다시보기 핸들러 */
  onReplayIntro?: () => void;
}

export default function FloatingThemePanel({
  theme,
  setTheme,
  onReplayIntro,
}: FloatingThemePanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="fixed z-50 flex flex-col items-end gap-2 right-6 top-1/2 -translate-y-1/2"
    >
      {/* 토글 버튼 */}
      <motion.button
        className={[
          "w-10 h-10 flex items-center justify-center",
          "rounded-(--radius)",
          "border-(length:--border-width) border-solid border-accent",
          "bg-surface text-accent",
          "shadow-(--shadow-md)",
          "cursor-pointer",
        ].join(" ")}
        onClick={() => setIsOpen((prev) => !prev)}
        whileHover={{
          x: 2,
          y: 2,
          boxShadow: "var(--shadow-sm)",
          transition: springPress,
        }}
        whileTap={{
          x: 4,
          y: 4,
          boxShadow: "0px 0px 0px transparent",
          transition: springPress,
        }}
        aria-label={isOpen ? "테마 패널 닫기" : "테마 패널 열기"}
      >
        <PaletteIcon />
      </motion.button>

      {/* 테마 버튼 패널 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={[
              "flex flex-col gap-2 p-2",
              "rounded-(--radius)",
              "border-(length:--border-width) border-solid border-(--color-border)",
              "bg-(--color-surface)",
              "shadow-(--shadow-md)",
            ].join(" ")}
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20 }}
            transition={springPress}
          >
            {THEMES.map((themeId) => {
              const isActive = theme === themeId;
              return (
                <motion.button
                  key={themeId}
                  className={[
                    "w-6 h-6 rounded-(--radius) cursor-pointer",
                    "border-(length:--border-width) border-solid",
                    isActive
                      ? "border-accent"
                      : "border-(--color-border)",
                  ].join(" ")}
                  style={{
                    backgroundColor: THEME_COLORS[themeId],
                    boxShadow: isActive ? "var(--shadow-sm)" : "none",
                  }}
                  onClick={() => setTheme(themeId)}
                  whileHover={{ x: 2, y: 2, transition: springPress }}
                  whileTap={{ x: 3, y: 3, transition: springPress }}
                  aria-label={`${themeId} 테마 선택`}
                  title={themeId}
                >
                  {/* 선택된 테마 체크 표시 */}
                  {isActive && <CheckIcon springTransition={springPress} />}
                </motion.button>
              );
            })}

            {/* 구분선 + 인트로 다시보기 버튼 */}
            {onReplayIntro && (
              <>
                <div
                  className="border-t-(length:--border-width) border-solid border-t-(--color-border) my-0.5"
                />
                <motion.button
                  className={[
                    "w-6 h-6 flex items-center justify-center",
                    "rounded-(--radius) cursor-pointer",
                    "border-(length:--border-width) border-solid border-accent",
                    "bg-(--color-surface) text-(--color-accent)",
                  ].join(" ")}
                  onClick={() => {
                    onReplayIntro();
                    setIsOpen(false);
                  }}
                  whileHover={{ x: 2, y: 2, transition: springPress }}
                  whileTap={{ x: 3, y: 3, transition: springPress }}
                  aria-label="인트로 다시보기"
                  title="인트로 다시보기"
                >
                  <PlayIcon />
                </motion.button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
