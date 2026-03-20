import { portfolioData } from '@/data/portfolio';
import HeroSectionWrapper from '@/components/sections/HeroSectionWrapper';
import AboutSection from '@/components/sections/AboutSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import ContactSection from '@/components/sections/ContactSection';

// =============================================================
// 메인 페이지 — 서버 컴포넌트
// 각 섹션에 portfolioData를 주입하여 렌더링
// =============================================================

export default function Home() {
  return (
    <main>
      <HeroSectionWrapper personal={portfolioData.personal} />
      <AboutSection
        bio={portfolioData.personal.bio}
        skills={portfolioData.skills}
      />
      <ProjectsSection projects={portfolioData.projects} />
      <ExperienceSection
        education={portfolioData.education}
        experience={portfolioData.experience}
      />
      <ContactSection
        contact={portfolioData.contact}
        personal={{
          name: portfolioData.personal.name,
          nameEn: portfolioData.personal.nameEn,
        }}
      />
    </main>
  );
}
