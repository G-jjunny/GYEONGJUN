'use client';

import { motion } from 'framer-motion';

// =============================================================
// SectionHeading — 섹션 제목 공통 컴포넌트
// 굵은 타이포그래피 + accent 언더라인 효과
// 스크롤 시 등장 애니메이션
// =============================================================

interface SectionHeadingProps {
  children: React.ReactNode;
  /** 부제목 (선택) */
  subtitle?: string;
  className?: string;
}

export default function SectionHeading({
  children,
  subtitle,
  className = '',
}: SectionHeadingProps) {
  return (
    <motion.div
      className={`mb-12 ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <h2
        className={[
          'text-4xl md:text-5xl font-black tracking-tight',
          'text-[var(--color-text)]',
          'relative inline-block',
        ].join(' ')}
      >
        {children}
        {/* accent 언더라인 */}
        <span
          className={[
            'absolute left-0 -bottom-2 h-[4px] w-full',
            'bg-[var(--color-accent)]',
          ].join(' ')}
          aria-hidden="true"
        />
      </h2>

      {subtitle && (
        <p className="mt-4 text-lg text-[var(--color-text-muted)]">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
