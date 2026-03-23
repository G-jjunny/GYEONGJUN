'use client';

import { motion } from 'framer-motion';
import type { PersonalInfo } from '@/data/portfolio';
import BrutalButton from '@/components/ui/BrutalButton';

// =============================================================
// HeroSection — 포트폴리오 메인 히어로 섹션
// 대형 타이포 이름 + 직함 + 소개 + CTA 버튼 2개
// Pop-up 스태거 애니메이션
// =============================================================

interface HeroSectionProps {
  personal: PersonalInfo;
  onProjectsClick?: () => void;
  onContactClick?: () => void;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 24,
    },
  },
};

export default function HeroSection({
  personal,
  onProjectsClick,
  onContactClick,
}: HeroSectionProps) {
  const displayName = personal.name || '이름을 입력하세요';
  const displayTitle = personal.title || '직함을 입력하세요';
  const displaySubtitle = personal.subtitle || '';

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-20"
      style={{ background: 'var(--color-bg)' }}
    >
      <motion.div
        className="mx-auto flex max-w-5xl flex-col items-start gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {/* 이름 — 대형 타이포, accent 강조 */}
        <motion.h1
          className="text-5xl font-black leading-tight tracking-tighter sm:text-7xl md:text-8xl"
          style={{ color: 'var(--color-text)' }}
          variants={itemVariants}
        >
          {displayName.split('').map((char, i) => (
            <span
              key={i}
              style={{
                color: i < 1 ? 'var(--color-accent)' : undefined,
              }}
            >
              {char}
            </span>
          ))}
        </motion.h1>

        {/* 직함 */}
        <motion.p
          className="text-2xl font-bold sm:text-3xl md:text-4xl"
          style={{ color: 'var(--color-accent)' }}
          variants={itemVariants}
        >
          {displayTitle}
        </motion.p>

        {/* 한 줄 소개 */}
        {displaySubtitle && (
          <motion.p
            className="max-w-2xl text-lg leading-relaxed sm:text-xl"
            style={{ color: 'var(--color-muted)' }}
            variants={itemVariants}
          >
            {displaySubtitle}
          </motion.p>
        )}

        {/* CTA 버튼 */}
        <motion.div
          className="mt-4 flex flex-wrap gap-4"
          variants={itemVariants}
        >
          <BrutalButton
            variant="primary"
            onClick={onProjectsClick}
          >
            프로젝트 보기
          </BrutalButton>
          <BrutalButton
            variant="secondary"
            onClick={onContactClick}
          >
            연락하기
          </BrutalButton>
        </motion.div>

        {/* 장식 — 브루탈리즘 accent 블록 */}
        <motion.div
          className="absolute -bottom-6 right-8 hidden h-24 w-24 md:block"
          style={{
            background: 'var(--color-accent)',
            border: 'var(--border-width) solid var(--color-border)',
            boxShadow: 'var(--shadow-lg)',
          }}
          variants={itemVariants}
          aria-hidden="true"
        />
      </motion.div>
    </section>
  );
}
