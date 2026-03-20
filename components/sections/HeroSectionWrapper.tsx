'use client';

// =============================================================
// HeroSectionWrapper — HeroSection 로직 래퍼
// frontend-logic-agent 담당: 스크롤 이동 로직 소유
// HeroSection(neo-brutalism-ui 결과물)에 핸들러 props 주입
// =============================================================

import HeroSection from './HeroSection';
import type { PersonalInfo } from '@/data/portfolio';

interface HeroSectionWrapperProps {
  personal: PersonalInfo;
}

export default function HeroSectionWrapper({ personal }: HeroSectionWrapperProps) {
  const scrollToSection = (id: string): void => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <HeroSection
      personal={personal}
      onProjectsClick={() => scrollToSection('projects')}
      onContactClick={() => scrollToSection('contact')}
    />
  );
}
