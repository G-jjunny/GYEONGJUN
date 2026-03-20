'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';
import { forwardRef } from 'react';

// =============================================================
// BrutalCard — 네오 브루탈리즘 카드 래퍼 컴포넌트
// accent: true이면 accent 색상 테두리 & 그림자
// hoverable: true이면 Lift Effect 호버 애니메이션 활성화
// =============================================================

interface BrutalCardProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
  accent?: boolean;
  hoverable?: boolean;
  children: React.ReactNode;
}

const springTransition = {
  type: 'spring' as const,
  stiffness: 600,
  damping: 35,
};

const BrutalCard = forwardRef<HTMLDivElement, BrutalCardProps>(
  ({ accent = false, hoverable = false, className = '', children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={[
          'p-6',
          'rounded-[var(--radius)]',
          'bg-[var(--color-surface)]',
          'border-[length:var(--border-width)] border-solid',
          accent
            ? 'border-[var(--color-accent)] shadow-[var(--shadow-md)]'
            : 'border-[var(--color-border)] shadow-[var(--shadow-md)]',
          className,
        ].join(' ')}
        whileHover={
          hoverable
            ? {
                x: -3,
                y: -3,
                boxShadow: 'var(--shadow-lg)',
                transition: springTransition,
              }
            : undefined
        }
        {...props}
      >
        {children}
      </motion.div>
    );
  },
);

BrutalCard.displayName = 'BrutalCard';

export default BrutalCard;
