'use client';

import { motion } from 'framer-motion';
import { springBase } from '@/lib/motion';

// =============================================================
// EmptyPlaceholder — 데이터가 비어있을 때 표시하는 공통 UI
// 모든 섹션에서 일관된 빈 상태 표현을 위해 사용
// =============================================================

interface EmptyPlaceholderProps {
  text: string;
  /** framer-motion 등장 애니메이션 사용 여부 (기본 true) */
  animated?: boolean;
  className?: string;
}

export default function EmptyPlaceholder({
  text,
  animated = true,
  className = '',
}: EmptyPlaceholderProps) {
  const baseClass = [
    'flex items-center justify-center rounded-(--radius) px-6 py-12',
    className,
  ].join(' ');

  const baseStyle = {
    border: 'var(--border-width) dashed var(--color-border)',
    color: 'var(--color-muted)',
  };

  if (!animated) {
    return (
      <div className={baseClass} style={baseStyle}>
        <p className="text-center text-sm">{text}</p>
      </div>
    );
  }

  return (
    <motion.div
      className={baseClass}
      style={baseStyle}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={springBase}
    >
      <p className="text-center text-sm">{text}</p>
    </motion.div>
  );
}
