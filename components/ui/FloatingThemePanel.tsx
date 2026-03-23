'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { THEMES, THEME_COLORS, type Theme } from '@/types/theme';

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

const springTransition = {
  type: 'spring' as const,
  stiffness: 500,
  damping: 30,
};

export default function FloatingThemePanel({
  theme,
  setTheme,
  onReplayIntro,
}: FloatingThemePanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="fixed z-50 flex flex-col items-end gap-2"
      style={{ right: '24px', top: '50%', transform: 'translateY(-50%)' }}
    >
      {/* 토글 버튼 */}
      <motion.button
        className={[
          'w-10 h-10 flex items-center justify-center',
          'rounded-[var(--radius)]',
          'border-[length:var(--border-width)] border-solid border-[var(--color-accent)]',
          'bg-[var(--color-surface)] text-[var(--color-accent)]',
          'shadow-[var(--shadow-md)]',
          'cursor-pointer',
        ].join(' ')}
        onClick={() => setIsOpen((prev) => !prev)}
        whileHover={{ x: 2, y: 2, boxShadow: 'var(--shadow-sm)', transition: springTransition }}
        whileTap={{ x: 4, y: 4, boxShadow: '0px 0px 0px transparent', transition: springTransition }}
        aria-label={isOpen ? '테마 패널 닫기' : '테마 패널 열기'}
      >
        {/* 팔레트 아이콘 (SVG) */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="8" r="1.5" fill="currentColor" />
          <circle cx="8" cy="12" r="1.5" fill="currentColor" />
          <circle cx="15" cy="14" r="1.5" fill="currentColor" />
        </svg>
      </motion.button>

      {/* 테마 버튼 패널 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={[
              'flex flex-col gap-2 p-2',
              'rounded-[var(--radius)]',
              'border-[length:var(--border-width)] border-solid border-[var(--color-border)]',
              'bg-[var(--color-surface)]',
              'shadow-[var(--shadow-md)]',
            ].join(' ')}
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20 }}
            transition={springTransition}
          >
            {THEMES.map((themeId) => {
              const isActive = theme === themeId;
              return (
                <motion.button
                  key={themeId}
                  className={[
                    'w-6 h-6 rounded-[var(--radius)] cursor-pointer',
                    'border-[length:var(--border-width)] border-solid',
                    isActive
                      ? 'border-[var(--color-accent)]'
                      : 'border-[var(--color-border)]',
                  ].join(' ')}
                  style={{
                    backgroundColor: THEME_COLORS[themeId],
                    boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
                  }}
                  onClick={() => setTheme(themeId)}
                  whileHover={{ x: 2, y: 2, transition: springTransition }}
                  whileTap={{ x: 3, y: 3, transition: springTransition }}
                  aria-label={`${themeId} 테마 선택`}
                  title={themeId}
                >
                  {/* 선택된 테마 체크 표시 */}
                  {isActive && (
                    <motion.svg
                      className="w-full h-full p-0.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--color-bg)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={springTransition}
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </motion.svg>
                  )}
                </motion.button>
              );
            })}

            {/* 구분선 + 인트로 다시보기 버튼 */}
            {onReplayIntro && (
              <>
                <div
                  style={{
                    borderTop: 'var(--border-width) solid var(--color-border)',
                    margin: '2px 0',
                  }}
                />
                <motion.button
                  className={[
                    'w-6 h-6 flex items-center justify-center',
                    'rounded-[var(--radius)] cursor-pointer',
                    'border-[length:var(--border-width)] border-solid border-[var(--color-accent)]',
                  ].join(' ')}
                  style={{
                    background: 'var(--color-surface)',
                    color: 'var(--color-accent)',
                  }}
                  onClick={() => {
                    onReplayIntro();
                    setIsOpen(false);
                  }}
                  whileHover={{ x: 2, y: 2, transition: springTransition }}
                  whileTap={{ x: 3, y: 3, transition: springTransition }}
                  aria-label="인트로 다시보기"
                  title="인트로 다시보기"
                >
                  {/* 재생 아이콘 */}
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </motion.button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
