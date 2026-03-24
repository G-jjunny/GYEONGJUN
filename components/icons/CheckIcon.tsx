'use client';

import { motion } from 'framer-motion';

interface CheckIconProps {
  className?: string;
  strokeColor?: string;
  springTransition?: object;
}

export default function CheckIcon({
  className = 'w-full h-full p-0.5',
  strokeColor = 'var(--color-bg)',
  springTransition,
}: CheckIconProps) {
  return (
    <motion.svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke={strokeColor}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={springTransition}
    >
      <polyline points="20 6 9 17 4 12" />
    </motion.svg>
  );
}
