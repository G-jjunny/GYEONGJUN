"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { THEMES, THEME_COLORS, type Theme } from "@/types/theme";
import CheckIcon from "@/components/icons/CheckIcon";
import PlayIcon from "@/components/icons/PlayIcon";
import { springBase, springPress } from "@/lib/motion";

// =============================================================
// FloatingThemePanel — 화면 우측 중앙 고정 테마 전환 패널
// 마크업 + 스타일 + 애니메이션 담당
// store 연결은 ThemePanelConnected가 별도로 수행
// =============================================================

// --------------- 패널 슬라이드 variants ---------------
// 비활성: 패널 전체가 우측으로 숨어 아이콘 탭 끝만 살짝 노출 (peek)
// 활성: 완전히 슬라이드인 + 불투명도 100%
const panelVariants = {
  idle: {
    x: "calc(100% - 14px)",
    opacity: 0.55,
    transition: { ...springBase },
  },
  active: {
    x: 0,
    opacity: 1,
    transition: { ...springBase },
  },
};

// --------------- 내부 컨텐츠(테마 버튼 목록) 지연 등장 variants ---------------
const contentVariants = {
  idle: {
    opacity: 0,
    transition: { duration: 0.08 },
  },
  active: {
    opacity: 1,
    transition: { delay: 0.12, duration: 0.15 },
  },
};

interface FloatingThemePanelProps {
  /** 현재 선택된 테마 (store에서 전달) */
  theme: Theme;
  /** 테마 변경 핸들러 (store에서 전달) */
  setTheme: (theme: Theme) => void;
  /** 인트로 다시보기 핸들러 */
  onReplayIntro?: () => void;
}

// --------------- "Hover me" 배지 variants ---------------
// flex-row-reverse 컨텍스트에서 탭 핸들 바로 왼쪽에 위치
const hintVariants = {
  hidden: {
    opacity: 0,
    x: 12, // 오른쪽에서 슬라이드인 (화면 기준 왼쪽 방향으로 등장)
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 400, damping: 28 },
  },
  exit: {
    opacity: 0,
    x: 8,
    transition: { duration: 0.18, ease: "easeIn" as const },
  },
};

export default function FloatingThemePanel({
  theme,
  setTheme,
  onReplayIntro,
}: FloatingThemePanelProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const hintTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 초기 로드 시 1.5초 후 힌트 첫 등장
  useEffect(() => {
    hintTimerRef.current = setTimeout(() => {
      setShowHint(true);
    }, 1500);
    return () => {
      if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    };
  }, []);

  // isHovered 변화 감시:
  // - true(hover 진입): 배지 즉시 숨기고 pending timer 취소
  // - false(hover 해제): 2.5초 후 배지 재등장
  useEffect(() => {
    if (isHovered) {
      if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
      setShowHint(false);
    } else {
      hintTimerRef.current = setTimeout(() => {
        setShowHint(true);
      }, 2500);
    }
    return () => {
      if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    };
  }, [isHovered]);

  const handleHoverStart = () => {
    setIsHovered(true);
  };

  const panelState = isHovered ? "active" : "idle";

  // 힌트 표시 조건: showHint가 true이고 현재 hover 중이 아님
  const isHintVisible = showHint && !isHovered;

  return (
    <>
      {/* ── "Hover me" 힌트 배지 — 패널 슬라이드와 독립된 fixed 레이어 ── */}
      {/* 패널이 idle 상태일 때 탭 핸들(14px)만 노출되므로, 배지를 부모 밖으로 분리 */}
      <AnimatePresence>
        {isHintVisible && (
          <motion.div
            key="hover-hint"
            variants={hintVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={[
              "fixed z-50",
              "flex items-center gap-1.5",
              "px-2 py-1",
              "border-2 border-solid border-(--color-bg)",
              "bg-(--color-accent)",
              "pointer-events-none select-none",
            ].join(" ")}
            style={{
              right: "calc(14px + 8px)", // 탭 핸들(14px) + 간격(8px)
              top: "50%",
              transform: "translateY(-50%)",
              boxShadow: "-2px 2px 0px var(--color-bg)",
            }}
            aria-hidden="true"
          >
            <span className="font-black text-xs text-(--color-bg) uppercase tracking-wide leading-none whitespace-nowrap font-mono">
              Hover me
            </span>
            {/* 화살표 — 좌우 bouncing 애니메이션 독립 적용 */}
            <motion.span
              className="font-black text-xs text-(--color-bg) leading-none"
              animate={{ x: [0, 4, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1,
                ease: "easeInOut",
              }}
            >
              →
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="fixed z-50 flex flex-row-reverse items-center right-0 top-1/2 -translate-y-1/2"
        variants={panelVariants}
        animate={panelState}
        onHoverStart={handleHoverStart}
        onHoverEnd={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={(e) => {
          // 패널 내부로 포커스가 이동하면 닫지 않음
          if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setIsHovered(false);
          }
        }}
        aria-label="테마 설정 패널"
      >
        {/* ── 탭 핸들 (항상 노출되는 peek 영역) ── */}
        <div
          className={[
            "flex items-center justify-center",
            "w-[14px] h-14 shrink-0",
            "border-t-(length:--border-width) border-b-(length:--border-width) border-l-(length:--border-width) border-solid border-(--color-border)",
            "bg-(--color-surface)",
            "cursor-pointer select-none",
          ].join(" ")}
          style={{ boxShadow: "-4px 0px 0px var(--color-accent)" }}
          aria-hidden="true"
        >
          <motion.span
            animate={{ rotate: isHovered ? 180 : 0 }}
            transition={springBase}
            className="block text-[8px] font-black text-(--color-accent) leading-none"
          >
            {"‹"}
          </motion.span>
        </div>

        {/* ── 패널 본체 ── */}
        <motion.div
          className={[
            "flex flex-col gap-2 p-2 mr-0",
            "border-(length:--border-width) border-solid border-(--color-border)",
            "bg-(--color-surface)",
          ].join(" ")}
          style={{ boxShadow: "-4px 4px 0px var(--color-accent)" }}
          variants={contentVariants}
          animate={panelState}
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
                    ? "border-(--color-accent)"
                    : "border-(--color-border)",
                ].join(" ")}
                style={{
                  backgroundColor: THEME_COLORS[themeId],
                  boxShadow: isActive ? "var(--shadow-sm)" : "none",
                }}
                onClick={() => setTheme(themeId)}
                whileHover={{ x: -2, y: 2, transition: springPress }}
                whileTap={{
                  x: -4,
                  y: 4,
                  boxShadow: "0px 0px 0px transparent",
                  transition: springPress,
                }}
                aria-label={`${themeId} 테마 선택`}
                title={themeId}
              >
                {isActive && <CheckIcon springTransition={springPress} />}
              </motion.button>
            );
          })}

          {/* 구분선 + 인트로 다시보기 버튼 */}
          {onReplayIntro && (
            <>
              <div className="border-t-(length:--border-width) border-solid border-t-(--color-border) my-0.5" />
              <motion.button
                className={[
                  "w-6 h-6 flex items-center justify-center",
                  "rounded-(--radius) cursor-pointer",
                  "border-(length:--border-width) border-solid border-(--color-accent)",
                  "bg-(--color-surface) text-(--color-accent)",
                ].join(" ")}
                onClick={() => {
                  onReplayIntro();
                  setIsHovered(false);
                }}
                whileHover={{ x: -2, y: 2, transition: springPress }}
                whileTap={{
                  x: -4,
                  y: 4,
                  boxShadow: "0px 0px 0px transparent",
                  transition: springPress,
                }}
                aria-label="인트로 다시보기"
                title="인트로 다시보기"
              >
                <PlayIcon />
              </motion.button>
            </>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}
