'use client';

import { motion } from 'framer-motion';
import BrutalCard from '@/components/ui/BrutalCard';
import { springFast } from '@/lib/motion';

// =============================================================
// ContactCard — 연락처 항목 카드 컴포넌트
// ContactSection에서 사용
// =============================================================

export interface ContactItem {
  key: string;
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}

interface ContactCardProps {
  item: ContactItem;
}

export default function ContactCard({ item }: ContactCardProps) {
  const inner = (
    <BrutalCard hoverable={!!item.href} className="cursor-pointer">
      <div className="flex items-center gap-4">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-(--radius)"
          style={{
            background: 'var(--color-surface)',
            color: 'var(--color-accent)',
            border: 'var(--border-width) solid var(--color-accent)',
          }}
        >
          {item.icon}
        </div>
        <div className="min-w-0 flex-1">
          <p
            className="text-xs font-bold uppercase tracking-wider"
            style={{ color: 'var(--color-muted)' }}
          >
            {item.label}
          </p>
          <p
            className="truncate text-sm font-semibold"
            style={{ color: 'var(--color-text)' }}
          >
            {item.value}
          </p>
        </div>
      </div>
    </BrutalCard>
  );

  if (!item.href) return inner;

  return (
    <motion.a
      href={item.href}
      target={item.key === 'email' ? undefined : '_blank'}
      rel={item.key === 'email' ? undefined : 'noopener noreferrer'}
      className="block no-underline"
      whileHover={{ x: -2, y: -2, transition: springFast }}
      whileTap={{ x: 2, y: 2, transition: springFast }}
    >
      {inner}
    </motion.a>
  );
}
