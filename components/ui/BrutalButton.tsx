'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';
import { forwardRef } from 'react';
import { springPress } from '@/lib/motion';

// =============================================================
// BrutalButton — 네오 브루탈리즘 버튼 컴포넌트
// variant: primary | secondary | ghost
// Physical Press: spring 기반 x/y 이동 + shadow 축소
// =============================================================

type Variant = 'primary' | 'secondary' | 'ghost';

interface BrutalButtonProps
  extends Omit<HTMLMotionProps<'button'>, 'ref'> {
  variant?: Variant;
  children: React.ReactNode;
}

const variantStyles: Record<Variant, string> = {
  primary: [
    'border-(length:--border-width) border-solid border-accent',
    'bg-accent text-(--color-bg)',
    'shadow-(--shadow-md)',
  ].join(' '),
  secondary: [
    'border-(length:--border-width) border-solid border-accent',
    'bg-surface text-accent',
    'shadow-(--shadow-md)',
  ].join(' '),
  ghost: [
    'border-(length:--border-width) border-solid border-(--color-border)',
    'bg-transparent text-(--color-text)',
    'shadow-none',
  ].join(' '),
};

const BrutalButton = forwardRef<HTMLButtonElement, BrutalButtonProps>(
  ({ variant = 'primary', className = '', children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        className={[
          'inline-flex items-center justify-center',
          'px-6 py-3 font-bold cursor-pointer',
          'rounded-(--radius)',
          variantStyles[variant],
          className,
        ].join(' ')}
        whileHover={{
          x: 2,
          y: 2,
          boxShadow: 'var(--shadow-sm)',
          transition: springPress,
        }}
        whileTap={{
          x: 4,
          y: 4,
          boxShadow: '0px 0px 0px transparent',
          transition: springPress,
        }}
        {...props}
      >
        {children}
      </motion.button>
    );
  },
);

BrutalButton.displayName = 'BrutalButton';

export default BrutalButton;
