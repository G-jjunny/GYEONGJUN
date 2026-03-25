'use client';

import { motion } from 'framer-motion';
import type { PersonalInfo } from '@/data/portfolio';
import BrutalButton from '@/components/ui/BrutalButton';
import { heroContainerVariant, fadeUpVariant } from '@/lib/motion';

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
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-20 bg-(--color-bg)"
    >
      <motion.div
        className="mx-auto flex max-w-5xl flex-col items-start gap-6"
        variants={heroContainerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {/* 이름 — 대형 타이포, accent 강조 */}
        <motion.h1
          className="text-5xl font-black leading-tight tracking-tighter sm:text-7xl md:text-8xl text-(--color-text)"
          variants={fadeUpVariant}
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
          className="text-2xl font-bold sm:text-3xl md:text-4xl text-(--color-accent)"
          variants={fadeUpVariant}
        >
          {displayTitle}
        </motion.p>

        {/* 한 줄 소개 */}
        {displaySubtitle && (
          <motion.p
            className="max-w-2xl text-lg leading-relaxed sm:text-xl text-(--color-muted)"
            variants={fadeUpVariant}
          >
            {displaySubtitle}
          </motion.p>
        )}

        {/* CTA 버튼 */}
        <motion.div
          className="mt-4 flex flex-wrap gap-4"
          variants={fadeUpVariant}
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
          className="absolute -bottom-6 right-8 hidden h-24 w-24 md:block bg-(--color-accent) border-(length:--border-width) border-solid border-(--color-border) shadow-(--shadow-lg)"
          variants={fadeUpVariant}
          aria-hidden="true"
        />
      </motion.div>
    </section>
  );
}
