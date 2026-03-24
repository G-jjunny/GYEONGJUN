"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@/data/portfolio";
import { useModalStore } from "@/store/modalStore";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionWrapper from "@/components/ui/SectionWrapper";
import EmptyPlaceholder from "@/components/ui/EmptyPlaceholder";
import ProjectCard from "@/components/sections/projects/ProjectCard";
import ProjectModal from "@/components/sections/projects/ProjectModal";
import { staggerContainerVariant } from "@/lib/motion";

// =============================================================
// ProjectsSection — 프로젝트 카드 그리드 + 상세 모달
// =============================================================

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const { activeProjectId, openModal, closeModal } = useModalStore();
  const activeProject = projects.find((p) => p.id === activeProjectId) ?? null;

  return (
    <SectionWrapper id="projects">
      <SectionHeading subtitle="Projects">프로젝트</SectionHeading>

      {projects.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpen={() => openModal(project.id)}
            />
          ))}
        </motion.div>
      ) : (
        <EmptyPlaceholder text="프로젝트를 준비 중입니다. data/portfolio.ts에 projects 데이터를 추가하면 여기에 표시됩니다." />
      )}

      <AnimatePresence>
        {activeProject && (
          <ProjectModal project={activeProject} onClose={closeModal} />
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
