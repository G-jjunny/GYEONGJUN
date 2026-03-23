// =============================================================
// lib/motion.ts — 공유 Framer Motion spring 프리셋 & 애니메이션 variants
//
// 사용법:
//   import { springBase, fadeUpVariant, staggerContainerVariant } from '@/lib/motion';
// =============================================================

// --------------- Spring 프리셋 ---------------

/** 섹션 등장, 카드 hover 등 일반 spring */
export const springBase = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 24,
};

/** 버튼 Physical Press용 spring */
export const springPress = {
  type: 'spring' as const,
  stiffness: 500,
  damping: 30,
};

/** BrutalCard Lift Effect, 빠른 피드백용 spring */
export const springFast = {
  type: 'spring' as const,
  stiffness: 600,
  damping: 35,
};

// --------------- 공통 애니메이션 Variants ---------------

/** 카드/항목 등장: 아래에서 위로 fade-in */
export const fadeUpVariant = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: springBase,
  },
};

/** stagger 컨테이너: 자식 요소를 순차 등장시킴 */
export const staggerContainerVariant = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};
